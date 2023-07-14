import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IssueLogService } from '../../services/issue-log.service';
import { AssetService } from '@app/auth/asset/services/asset.service';


@Component({
  selector: 'app-list-issue-log',
  templateUrl: './list-issue-log.component.html',
  styleUrls: ['./list-issue-log.component.css']
})
export class ListIssueLogComponent implements OnInit {
  currentAssetOid: string;

  goToIssueLog(oid: string) {
    this.router.navigate(["issue-comments/create-issue-comments", oid]);
  }

  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  public trDisabled: boolean = false;
  public defaultSearchText: string = "";
  private searchText: string = this.defaultSearchText;
  public rows: number = 20;
  public pageSize: number = 200;
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
  currentAssetInfo: any;



  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private issueLogService: IssueLogService,
    private assetService: AssetService,
  ) {
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/asset' },
      { label: 'Asset', url: '/asset' },
      { label: 'Issue-log', url: '/issue-log' }
    ];
  }

  ngOnInit(): void {
    this.currentAssetOid = this.activateRoute.snapshot.paramMap.get("assetOid");
    this.getCurrentAssetInfo(this.currentAssetOid);
  }


  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getIssueLogs(offset, limit);
    }
  }

  getIssueLogs(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.issueLogService.getAllLogListByAssetOid(offset, pageSize, searchText.trim(), this.currentAssetOid).subscribe(
      res => {
        this.sessionList = res.body.data;
        this.totalRecords = res.body.totalRecords;
      }
    );
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

  onSessionSearch(arg0: any) {
    throw new Error('Method not implemented.');
  }

  createIssue() {
    this.router.navigate(["../../create-issue", this.currentAssetOid], {
      relativeTo: this.activateRoute,
      queryParams: {
        mode: 'CREATE'
      }
    });
  }

  updateIssueLog(issueLogOid: string) {
    this.router.navigate(["../../update-issue", issueLogOid], {
      relativeTo: this.activateRoute,
      queryParams: {
        mode: 'UPDATE'
      }
    });
  }

  private getCurrentAssetInfo(assetOid: string) {
    this.assetService.findAssetOpByID(assetOid).subscribe(
      res => {
        if (res.status === 200) {
          this.currentAssetInfo = res.body;
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
      }
    );
  }
}



