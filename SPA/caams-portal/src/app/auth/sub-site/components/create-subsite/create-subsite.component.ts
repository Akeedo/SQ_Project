import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { SubSite } from '../../model/subsite';
import { SubSiteService } from "../../services/subsite.service";


@Component({
  selector: 'app-create-subsite',
  templateUrl: './create-subsite.component.html',
  styleUrls: ['./create-subsite.component.css']
})
export class CreateSubsiteComponent implements OnInit {
  
  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  subSiteStatusList: any[];
  subSiteStatus: SubSite[];
  departmentList:any[];
  organizationList:any[];
  subSitelist:any[];
  siteNameList:any[];
  items: { label: string; url: string; }[];
  subSiteGroup: FormGroup;
  SiteService: any;

  constructor(
    private fb: FormBuilder,
    private subSiteService: SubSiteService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.subSiteStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.subSiteGroup = this.fb.group({

      departmentOid: ["",[Validators.required]],
      organizationOid:["ORG-01"],
      siteOid: [""],
      subSiteOid: [""],
      subSiteName: ['',[Validators.required]],
      subSiteAddress: ['',[Validators.required]],
      subSiteUrl: [""],
      subSiteStatus: ['',[Validators.required]],
    });
this.getDepartmentList();
this.getsiteNameList();
this.getOrganizationNameList();
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/subsite'},
      {label: 'Subsite / New SubSite', url: '/subsite'}
  ];
    
  }
  getsiteNameList() {
    this.subSiteService.getsiteName().subscribe((res) => {
      if (res.status === 200) {   
        this.siteNameList = res.body.data;
      }
    });
  }
  getOrganizationNameList() {
    this.subSiteService. getOrganization().subscribe((res) => {
      if (res.status === 200) {   
        this.siteNameList = res.body.data.content;
      }
    });
  }
  getDepartmentList(){
    this.subSiteService.getDepartment().subscribe(res => {
      if (res.status === 200) {
          this.departmentList = res.body
      }
  },
  err => {
      this.isProgressBarLoading = false;
      this.isLoading = false;
      if (err.status === 404) {
          this.departmentList = [];
      }

      if (err.error && err.error.message) {
          this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
      }
  },
  () => {
      this.isProgressBarLoading = false;
      this.isLoading = false;
  });

  }
  onCancel() {
    this.router.navigate(["subsite"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.subSiteGroup.valid) {
      this.subSiteService.saveSubSite(this.subSiteGroup.value).subscribe(
        (res) => {
          if (res.status === 201) {
            this.messageService.add({
              severity: "success",
              summary: "SubSite saved Successfully",
              detail: "",
            });
            setTimeout(() => {
              this.router.navigate(["subsite"]);
            }, 2000);
          }
        },
        (err) => {
          this.isLoading = false;
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: "error",
              summary: err.error.message,
              detail: "",
            });
          }
        },
        () => {
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill up all the required fields",
        detail: "",
      });
    }
  }
 
}
