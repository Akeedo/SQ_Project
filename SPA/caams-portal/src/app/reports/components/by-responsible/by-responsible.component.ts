import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { ReportService } from '@app/reports/services/report.service';
import { MessageService } from 'primeng/api';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-responsible',
  templateUrl: './by-responsible.component.html',
  styleUrls: ['./by-responsible.component.css']
})
export class ByResponsibleComponent implements OnInit {
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  assetDataList: any;
  public responsibleBy: any =[];

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
      {label: 'Responsible By', url: '/by-responsible'}
    ];
  }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };


  downloadAssetListResponsibleBy(){
    if(this.responsibleBy =='' || this.responsibleBy==null){
      this.messageService.add({severity: 'error', summary: "Please input a Responsible Person", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("ResponsibleBy", this.responsibleBy,).subscribe(res => {
      if (res.status === 200) {
        this.isLoading = false;
      saveAs(res.body, "asset_list_responsible_by.pdf");
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


