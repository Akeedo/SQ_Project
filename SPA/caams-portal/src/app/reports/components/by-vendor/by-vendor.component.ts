import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-vendor',
  templateUrl: './by-vendor.component.html',
  styleUrls: ['./by-vendor.component.css']
})
export class ByVendorComponent implements OnInit {
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  vendorList: any = [];
  assetDataList: any;
  public vendorOid: any =[];
  public vendorName: any =[];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private assetService: AssetService,
    private reportService: ReportService
    ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Report List', url: '/'},
      {label: 'By Vendor', url: '/by-vendor'}
    ];
    this.getVendorList();
  }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getVendorList() {
    this.assetService.getVendorList().subscribe((res) => {
      if (res.status === 200) {
        // console.log(res.body);
        this.vendorList = res.body.data;       
      }
    });
  };

  downloadAssetListByVendor(){
    if(this.vendorOid =='' || this.vendorOid==null){
      this.messageService.add({severity: 'error', summary: "Please Select a manufacture first", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Vendor", this.vendorOid,).subscribe(res => {
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
  getAssetDataByVendorOid(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.vendorOid).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };

}
