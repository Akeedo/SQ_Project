import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-site',
  templateUrl: './by-site.component.html',
  styleUrls: ['./by-site.component.css']
})
export class BySiteComponent implements OnInit {
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  siteList: any = [];
  assetDataList: any;
  public siteOid: any =[];

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
      {label: 'By Site', url: '/by-site'}
    ];
    this.getSiteList();
  }
  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getSiteList() {
    this.assetService.getSiteNameList().subscribe((res) => {
      if (res.status === 200) {
        // console.log(res.body);
        this.siteList = res.body.data;       
      }
    });
  };
  getAssetDataBySiteOid(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.siteOid).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };
  downloadAssetListBySite(){
    if(this.siteOid =='' || this.siteOid==null){
      this.messageService.add({severity: 'error', summary: "Please Select a site first", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Site", this.siteOid,).subscribe(res => {
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
