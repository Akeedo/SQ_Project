import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ManufacturerService } from '../../services/manufacturer.service';

@Component({
  selector: "app-list-manufacturer",
  templateUrl: "./list-manufacturer.component.html",
  styleUrls: ["./list-manufacturer.component.css"],
})
export class ListManufacturerComponent implements OnInit {
  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  public trDisabled: boolean = false;
  public defaultSearchText: string = "";
  private searchText: string = this.defaultSearchText;
  public rows: number = 20;
  public totalRecords: number = 0;
  public sessionList: any[];
  public rowsPerPageOptions: any[] = [20, 50, 100];

  @ViewChild('sessionTableRef') sessionTableRef: Table;
  public showAllList: boolean = true;

  @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;
  public role: string = '';
  public resetRequired: string = '';
  private defaultOffset: number = 0;
  private defaultLimit: number = this.rows;
  items: any;

  constructor(private manufacturerService: ManufacturerService,
    private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getManufacturerList();
    this.items = [
      {label: 'CAAMS', url: '/'},
      { label: 'Master', url: '/manufacturer' },
      { label: 'Manufacturer', url: '/manufacturer' }
    ];
  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getManufacturerList(offset, limit);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.sessionSearchPopRef.nativeElement.focus();
    }, 100);

    fromEvent(this.sessionSearchPopRef.nativeElement, 'keyup')
        .pipe(debounceTime(500),
            distinctUntilChanged())
        .subscribe(($event: any) => {
            this.onSessionSearch($event.target.value.trim());
        });
}

onSessionSearch(value: string) {
    this.searchText = value;
    this.sessionTableRef.reset();
    this.getManufacturerList(this.defaultOffset, this.defaultLimit, this.searchText);
}

  createManufacturer() {
    this.router.navigate(["create-manufacturer"], {
      relativeTo: this.activateRoute,
    });
  }

  updateManufacturer(oid: string) {
    this.router.navigate(['update-manufacturer', oid], { relativeTo: this.activateRoute })
  };

  private getManufacturerList(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.manufacturerService.getManufacturer(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        console.log(res.body)
        this.sessionList = res.body.data;
        this.totalRecords = res.body.totalRecords;
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.sessionList = [];
          this.totalRecords = 0;
        }

        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        }
      },
      () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
      });
  }
}
