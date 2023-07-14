import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-condition',
  templateUrl: './by-condition.component.html',
  styleUrls: ['./by-condition.component.css']
})
export class ByConditionComponent implements OnInit {

  public isLoading: boolean = false;
  conditionList: any = [];
  assetDataList: any;
  public conditionOid: any =[];
  items: { label: string; url: string; }[];

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
      {label: 'By Condition', url: '/by-condition'}
    ];

    this.conditionList =[
      {conditionOid:'Good', conditionName: 'Good'},
      {conditionOid:'Faulty', conditionName: 'Faulty'}
    ]
  }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getAssetDataByCondition(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.conditionOid).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };
  downloadAssetListByCondition(){
    if(this.conditionOid =='' || this.conditionOid==null){
      this.messageService.add({severity: 'error', summary: "Please Select a condition first", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Condition", this.conditionOid,).subscribe(res => {
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
