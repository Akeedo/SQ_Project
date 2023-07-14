import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-list-asset',
  templateUrl: './list-asset.component.html',
  styleUrls: ['./list-asset.component.css']
})
export class ListAssetComponent implements OnInit {

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


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private assetService: AssetService,
    private usersService: UsersService) {
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/asset' },
      { label: 'Asset', url: '/asset' }
    ];
  }

  ngOnInit(): void {

  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getPagedAssets(offset, limit);
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
    this.getPagedAssets(this.defaultOffset, this.defaultLimit, this.searchText);
  }

  private getPagedAssets(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {


    this.assetService.getPagedAssets(offset, pageSize, searchText.trim(), this.usersService.getCurrentUser().siteOid).subscribe(res => {
      if (res.status === 200) {
        this.sessionList = res.body.content;
        this.totalRecords = res.body.totalElements;
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


  createAsset() {
    this.router.navigate(["create-asset"], {
      relativeTo: this.activatedRoute,
      queryParams: {
        mode: 'CREATE'
      }
    });
  }

  updateAsset(assetOid: string) {
    this.router.navigate(['update-asset', assetOid], {
      relativeTo: this.activatedRoute,
      queryParams: { mode: 'UPDATE' }
    })
  };


  deleteAsset(assetOid: any) {

    this.confirmationService.confirm({
      target: null,
      header: 'Delete Operation Asset',
      message: "Are you sure that you want to perform this action?",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAssetById(assetOid);
      },
      reject: () => {
        //reject action
      }
    });

  }

  deleteAssetById(assetOid: any) {
    this.isLoading = true;
    this.assetService
      .deleteAssetByAssetOid(assetOid)
      .subscribe(
        (res) => {
          if (res.status === 204) {
            // if (2 == 2) {
            this.messageService.add({
              severity: "success",
              summary: "Asset Deleted Successfully",
              detail: "",
            });
            setTimeout(() => {
              this.isLoading = false;
              this.getPagedAssets(this.defaultOffset, this.defaultLimit, this.searchText);
            }, 5000);
          }
        },
        (err) => {
          this.isLoading = false;
          if (err) {
            // if (err.error && err.error.message) {
            this.messageService.add({
              severity: "error",
              summary: err,
              detail: "",
            });
          }
        },
        () => {
          this.isLoading = false;
        }
      );

  }

  // duplicateAsset(assetOid: any) {
  //   this.router.navigate(['update-asset', assetOid], {
  //     relativeTo: this.activatedRoute,
  //     queryParams: { mode: 'COPY' }
  //   })
  // }

  goToDetailPage(assetOid: any) {
    this.router.navigate(['view-asset', assetOid], {
      relativeTo: this.activatedRoute,
      queryParams: { mode: 'VIEW' }
    })
  }
  goToIssueLog(assetOid: any) {
    this.router.navigate(['issue-log', assetOid], {
      relativeTo: this.activatedRoute,
//      queryParams: { mode: 'VIEW' }
    })
  }
}