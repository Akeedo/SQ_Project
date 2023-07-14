import { IMPLICIT_REFERENCE } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent  } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IssueLogService } from '../../services/issue-log.service';
import {Issue} from '../../model/issue-log';
import AssetO from '../../../asset/model/asset.model';
import { isUnionTypeNode } from 'typescript';


@Component({
  selector: 'app-list-issue-log-by-status',
  templateUrl: './list-issue-log-by-status.component.html',
  styleUrls: ['./list-issue-log-by-status.component.css']
})
export class ListIssueLogByStatusComponent implements OnInit {

  items: any;
  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  public rows: number = 20;
  statusType: string;
  
  private defaultOffset: number = 0;
  private defaultLimit: number = this.rows;
  public defaultSearchText: string = "";
  public totalRecords: number = 0;
  public totalAssetRecords: number = 0;
  public trDisabled: boolean = false;
  public rowsPerPageOptions: any[] = [20, 50, 100];
  private searchText: string = this.defaultSearchText;
  public issueList: Issue[] = [new Issue()];
  public sessionList: Issue[] = [new Issue()];
  public sessionAssetList: any[]=null;


  @ViewChild('sessionTableRef') sessionTableRef: Table;

  @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;

  constructor(
    private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService, private issueLogService: IssueLogService,
    private assetService: AssetService, private usersService: UsersService
  ) {
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/asset' },
      { label: 'Issue-Log', url: '/issue-log' },
      { label: 'Issue-Status', url: '/issue-log-status' }
    ];
   }

  

  ngOnInit(): void {
    this.statusType = this.activateRoute.snapshot.paramMap.get("statusType");
  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getIssueLogsByStatus(offset, limit);
    }
  }

  getIssueLogsByStatus(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.issueLogService.getAllLogListByStatus(offset, pageSize, searchText.trim(), this.statusType).subscribe(
      res => {
        this.sessionList = res.body.data;
        this.totalRecords = res.body.totalRecords;
        this.getPagedAssets(offset,pageSize);
      }
    );
  }

  private getPagedAssets(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {


    this.assetService.getPagedAssets(offset, pageSize, searchText.trim(), this.usersService.getCurrentUser().siteOid).subscribe(res => {
      if (res.status === 200) {
        this.sessionAssetList = res.body.content;
        this.totalAssetRecords = res.body.totalElements;
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.sessionAssetList = [];
          this.totalAssetRecords = 0;
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
  
  getAssetName(assetOid: string): string {
    const asset = this.sessionAssetList.find(item => item.assetId === assetOid);
    return asset ? asset.assetName : '';
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
    this.getIssueLogsByStatus(this.defaultOffset, this.defaultLimit, this.searchText);
  }
  
  updateIssueLog(issueLogOid: string) {
    this.router.navigate(["../../update-issue", issueLogOid], {
      relativeTo: this.activateRoute,
      queryParams: {
        mode: 'UPDATE'
      }
    });
  }

  goToIssueLogComment(oid: string) {
    this.router.navigate(["issue-comments/create-issue-comments", oid]);
  }

}
