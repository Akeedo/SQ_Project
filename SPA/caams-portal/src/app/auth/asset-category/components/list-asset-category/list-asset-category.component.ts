import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AssetCategoryService } from '../../services/asset-category.service';

@Component({
  selector: 'app-list-asset-category',
  templateUrl: './list-asset-category.component.html',
  styleUrls: ['./list-asset-category.component.css']
})
export class ListAssetCategoryComponent implements OnInit {

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
  items: { label: string; url: string; }[];

  constructor(private assetCategoryService: AssetCategoryService,
    private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAssetCategoryList();
    this.items = [
      {label: 'CAAMS', url: '/'},
      { label: 'Master', url: '/asset-category' },
      { label: 'Asset Category', url: '/asset-category' }
    ];
  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getAssetCategoryList(offset, limit);


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
    this.getAssetCategoryList(this.defaultOffset, this.defaultLimit, this.searchText);

  }

  createAssetCategory() {
    this.router.navigate(["create-asset-category"], { relativeTo: this.activateRoute });
  }

  onUpdate(oid: string) {
    this.router.navigate(['update-asset-category', oid], { relativeTo: this.activateRoute })
  };

  private getAssetCategoryList(offset: number = this.defaultOffset, limit: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.assetCategoryService.getAssetCategories(offset, limit, searchText.trim()).subscribe(res => {
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

  //delete button
  // deleteAssetCategory(assetCategoryOid: any, $event: any) {
  //   debugger
  //   this.confirmationService.confirm({
  //     target: null,
  //     header: 'Delete Master Data Asset Category',
  //     message: 'Are you sure that you want to perform this action?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.deleteAssetCategoryById(assetCategoryOid);
  //     },
  //     reject: () => {
  //       //reject action
  //     }
  //   });

  // }

  // deleteAssetCategoryById(assetCategoryOid: any) {
  //   this.isLoading = true; 
  //   this.assetCategoryService

  //     .deleteAssetCategory(assetCategoryOid)

  //     .subscribe(
  //       (res) => {
  //         if (res.status === 204) {
  //           // if (2 == 2) {
  //           this.messageService.add({
  //             severity: "success",
  //             summary: "Asset Category Deleted Successfully",
  //             detail: "",
  //           });
  //           setTimeout(() => {
  //             this.isLoading = false;
  //             this.getAssetCategoryList(this.defaultOffset, this.defaultLimit, this.searchText);
  //           }, 5000);
  //         }
  //       },
  //       (err) => {
  //         this.isLoading = false;
  //         if (err) {
  //           // if (err.error && err.error.message) {
  //           this.messageService.add({
  //             severity: "error",
  //             summary: err,
  //             detail: "",
  //           });
  //         }
  //       },
  //       () => {
  //         this.isLoading = false;
  //       }
  //     );

  // }

}
