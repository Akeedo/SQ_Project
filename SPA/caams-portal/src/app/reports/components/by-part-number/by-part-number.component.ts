import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-part-number',
  templateUrl: './by-part-number.component.html',
  styleUrls: ['./by-part-number.component.css']
})
export class ByPartNumberComponent implements OnInit {

  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  assetDataList: any;
  public partNo: any =[];

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
      {label: 'By Part Number', url: '/by-part-number'}
     ];
  }
  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getAssetDataByPartNo(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.partNo).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };

  downloadAssetListByPartNo(){
    if(this.partNo =='' || this.partNo==null){
      this.messageService.add({severity: 'error', summary: "Please input a part number", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Part Number", this.partNo,).subscribe(res => {
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
