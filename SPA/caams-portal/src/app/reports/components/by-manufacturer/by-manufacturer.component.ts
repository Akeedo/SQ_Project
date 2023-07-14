import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '@app/reports/services/report.service';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-by-manufacturer',
  templateUrl: './by-manufacturer.component.html',
  styleUrls: ['./by-manufacturer.component.css']
})
export class ByManufacturerComponent implements OnInit {

  manufecturerFromGroup: FormGroup
  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  manufacturerList: any = [];
  assetDataList: any;
  public manufacturerOid: any =[];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private assetService: AssetService,
    private reportService: ReportService
    ) { }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };

  getManufacturerList() {

    this.assetService.getManfacturerList().subscribe((res) => {
      if (res.status === 200) {
        // console.log(res.body);
        this.manufacturerList = res.body.data;       
      }
    });
  };

  getAssetDataByManufacturerOid(){    
    // let manufacturerOid = Object.keys(this.manufecturerFromGroup.value).map(key => this.manufecturerFromGroup.value[key]);    
    this.assetService.getAssetDataByManufacturerOid(this.manufacturerOid).subscribe((res) => {
      if (res.status === 200) {        
        this.assetDataList = res.body.data;       
      }
    });
  };

  ngOnInit(): void {
    this.manufecturerFromGroup = this.fb.group({
      manufacturerOid: [""],          
    });

    this.items = [
      {label: 'Report List', url: '/'},
      {label: 'By Manufecturer', url: '/by-manufecturer'}
     ];
  this.getManufacturerList();
  }

  downloadAssetListByManufacturer(){
    if(this.manufacturerOid =='' || this.manufacturerOid==null){
      this.messageService.add({severity: 'error', summary: "Please Select a manufacture first", detail: ''});
      return;
    }
    this.isLoading = true;
    this.reportService.getAssetListPdf("Manufacturer", this.manufacturerOid,).subscribe(res => {
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
