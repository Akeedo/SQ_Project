import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AssetModelService } from '../../services/asset-model.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: "app-list-asset-model",
  templateUrl: "./list-asset-model.component.html",
  styleUrls: ["./list-asset-model.component.css"],
})
export class ListAssetModelComponent implements OnInit {
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

  constructor(private assetModelService: AssetModelService,
    private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAssetModelList();
    this.items = [
      {label: 'CAAMS', url: '/'},
      { label: 'Master', url: '/asset-model' },
      { label: 'Asset Model', url: '/asset-model' }
    ];
  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getAssetModelList(offset, limit);
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
    this.getAssetModelList(this.defaultOffset, this.defaultLimit, this.searchText);
  }

  createAssetModel() {
    this.router.navigate(["create-asset-model"], { relativeTo: this.activateRoute });
  }

  updateAssetModel(oid: string) {
    this.router.navigate(['update-asset-model', oid], { relativeTo: this.activateRoute })
  };

  private getAssetModelList(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.assetModelService.getAssetModel(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        this.sessionList = res.body.data
        this.totalRecords = res.body.totalRecords
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
