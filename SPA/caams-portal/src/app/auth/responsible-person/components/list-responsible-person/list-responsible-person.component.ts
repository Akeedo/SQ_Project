import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResponsiblePerson } from '../../model/responsibleperson';
import { ResponsiblePersonService } from '../../services/responsible-person.service';





@Component({
  selector: 'app-list-responsible-person',
  templateUrl: './list-responsible-person.component.html',
  styleUrls: ['./list-responsible-person.component.css']
})
export class ListResponsiblePersonComponent implements OnInit {
  public isLoading: boolean = false;
  ResponsiblePerson: ResponsiblePerson[];
  public isProgressBarLoading: boolean;
  public sessionList: any[];
  public rowsPerPageOptions: any[] = [20, 50, 100];
  @ViewChild('sessionTableRef') sessionTableRef: Table;
  public trDisabled: boolean = false;
  public showAllList: boolean = true;

  public rows: number = 20;
  public defaultSearchText: string = '';
  @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;
  public totalRecords: number = 0;
  public role: string = '';
  public resetRequired: string = '';
  private defaultOffset: number = 0;
  private defaultLimit: number = this.rows;
  private searchText: string = this.defaultSearchText;
  items: {

    label: string; url: string;
  }[];
  isActive = false;
  isInactive = false;




  constructor(private responsibleperesonservice: ResponsiblePersonService,
    private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getresponsibleperson();
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/' },
      { label: ' Responsible Person', url: '/responsible-person' }
    ];
  }
  onChange() {
    if (this.isActive) {
      this.isInactive = false;
    } else if (this.isInactive) {
      this.isActive = false;
    }
  }
  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : ($event.first / $event.rows);
      const limit = $event.rows ? $event.rows : this.rows;
      this.getresponsibleperson(offset, limit);
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
    this.getresponsibleperson(this.defaultOffset, this.defaultLimit, this.searchText);
  }
  createResponsiblePerson() {
    this.router.navigate(['create-responsible-person'], { relativeTo: this.activateRoute })
  }

  updateResponsiblePerson(id: string) {
    this.router.navigate(['update-responsible-person', id], { relativeTo: this.activateRoute })
  }

  // onUpdate(oid: string) {
  //     this.router.navigate(['update-asset-category', oid], { relativeTo: this.activateRoute })
  //   };

  onStatusClickEvent() {


  }


  private getresponsibleperson(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.responsibleperesonservice.getResponsiblePerson(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        this.sessionList = res.body.data
        console.log(res.body.data);
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
