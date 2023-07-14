import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-asset-history',
  templateUrl: './by-asset-history.component.html',
  styleUrls: ['./by-asset-history.component.css']
})
export class ByAssetHistoryComponent implements OnInit {
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  assetDataList: any;
  public assetOid: any =[];
  public assetProductSerial : any;

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
      {label: 'By Asset History', url: '/by-asset-history'}
     ];
  }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  downloadAssetHistory(){
    if(this.assetProductSerial =='' || this.assetProductSerial==null){
      this.messageService.add({severity: 'error', summary: "Please input an Asset Product Serial Number", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetHistoryPdf("assetProductSerial", this.assetProductSerial,).subscribe(res => {
      if (res.status === 200) {
        this.isLoading = false;
        saveAs(res.body, "asset_history.pdf");
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