import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';
@Component({
  selector: 'app-by-product-serial',
  templateUrl: './by-product-serial.component.html',
  styleUrls: ['./by-product-serial.component.css']
})
export class ByProductSerialComponent implements OnInit {
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  assetDataList: any;
  public productSerial: any =[];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private assetService: AssetService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Report List', url: '/'},
      {label: 'By Product Serial', url: '/by-product-serial'}
     ];
  }
  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getAssetDataByProductSerial(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.productSerial).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };

  downloadAssetListByProductSerial(){
    if(this.productSerial =='' || this.productSerial==null){
      this.messageService.add({severity: 'error', summary: "Please input a product serial", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Product Serial", this.productSerial,).subscribe(res => {
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
