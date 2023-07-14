import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { ReportService } from '@app/reports/services/report.service';
import { MessageService } from 'primeng/api';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  categoryFromGroup: FormGroup;
  assetCategoryList: any = [];
  packageList: any = [];
  public assetCategoryOid: any =[];
  public assetCategoryTypeOid: any =[];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private messageService: MessageService,
    private reportService: ReportService
    ) { }

  goBack() {
    this.router.navigate(["reports"], {
    });
  };

  getPackageList() {
    this.assetService.getPackageList().subscribe((res) => {
      if (res.status === 200) {
        this.packageList = res.body.data
      }
    });
  };

  getAssetCategoryList() {
    this.assetService.getAssetCategoryList().subscribe((res) => {
      if (res.status === 200) {
        this.assetCategoryList = res.body.data;
      }
    });
  }
  
  ngOnInit(): void {

    this.categoryFromGroup = this.fb.group({
      assetCategoryOid: [""],
      assetCategoryTypeOid: [""],
    });

  this.items = [
      {label: 'CAAMS', url: '/'},  

      { label: 'Report List', url: '/' },
      { label: 'By Category', url: '/by-category' }
    ];
    this.getPackageList();
    this.getAssetCategoryList();
  }

  downloadAssetsByCategoryWithCategoryType(){
    // if(this.assetCategoryOid =='' || this.assetCategoryOid==null){
    //   this.messageService.add({severity: 'error', summary: "Please Select a Category first", detail: ''});
    //   return;
    // }
    this.isLoading = true;
    let requiredParameterTypes;
    let requiredParameters;
    
    if(this.assetCategoryOid != "" && this.assetCategoryTypeOid != ""){
      requiredParameterTypes = "Category,CategoryType";
      requiredParameters = this.assetCategoryOid +","+ this.assetCategoryTypeOid;
    }
    else if(this.assetCategoryOid == "" && this.assetCategoryTypeOid != ""){
      requiredParameterTypes = "CategoryType";
      requiredParameters = this.assetCategoryTypeOid;
    }else if(this.assetCategoryOid != "" && this.assetCategoryTypeOid == ""){
      requiredParameterTypes = "Category";
      requiredParameters = this.assetCategoryOid;
    }else{
      requiredParameterTypes = "";
      requiredParameters = "";
    }
    

    this.reportService.getAssetListPdf(requiredParameterTypes, requiredParameters).subscribe(res => {
      if (res.status === 200) {
        this.isLoading = false;
      saveAs(res.body, "asset_list.pdf");
      }
    },
    err => {
        this.isLoading = false;
        if (err.status === 404) {
          this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
          return;
        }
        if(err.status ===500){
          this.messageService.add({severity: 'error', summary: "Data not found", detail: ''});
          return;
        }
        if (err.error && err.error.message) {
            this.messageService.add({severity: 'error', summary: 'Data not found', detail: ''});
        }
    },
    () => {
        this.isLoading = false;
    });
  }

}
