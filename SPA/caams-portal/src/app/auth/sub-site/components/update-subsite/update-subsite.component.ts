import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { SubSite } from '../../model/subsite';
import { SubSiteService } from "../../services/subsite.service";

@Component({
  selector: 'app-update-subsite',
  templateUrl: './update-subsite.component.html',
  styleUrls: ['./update-subsite.component.css']
})
export class UpdateSubsiteComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  subSiteStatusList: any[];
  departmentList: any[];
  organizationList: any[];
  subSitelist: any[];
  siteNameList: any[];
  items: { label: string; url: string; }[];
  subSiteGroup: FormGroup;
  SiteService: any;
  subSite: any;

  constructor(
    private fb: FormBuilder,
    private subSiteService: SubSiteService,
    private router: Router,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) {
    this.subSiteStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.subSiteGroup = this.fb.group({

      departmentOid: [""],
      organizationOid: ["ORG-01"],
      siteOid: [""],
      subSiteOid: [""],
      subSiteName: [""],
      subSiteJson: [""],
      subSiteAddress: ['',[Validators.required]],
      subSiteUrl: [""],
      subSiteStatus: ['',[Validators.required]],

    });
    this.getsiteNameList();
    this.getSubSiteByOid(this.activateRoute.snapshot.paramMap.get("oid"));
    this.getDepartmentList();
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Master', url: '/subsite' },
      { label: 'SubSite / UpdateSubSite', url: '/subsite' }
      
    ];
  }
  getDepartmentList() {
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
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        }
      },
      () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
      });

  }

  getSubSiteByOid(id: string) {
    this.isLoading = true;
    this.subSiteService.getSubSiteByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.subSite = res.body;
          this.setFormValue();

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
  }

  getsiteNameList() {
    this.subSiteService.getsiteName().subscribe((res) => {
      if (res.status === 200) {
        this.siteNameList = res.body.data;
      }
    });
  }

  setFormValue() {
    this.subSiteGroup.patchValue({
      departmentOid: this.subSite.departmentOid,
      organizationOid: this.subSite.organizationOid,
      siteOid: this.subSite.siteOid,
      subSiteOid: this.subSite.subSiteOid,
      subSiteName: this.subSite.subSiteName,
      subSiteAddress: this.subSite.subSiteAddress,
      subSiteUrl: this.subSite.subSiteUrl,
      subSiteStatus: this.subSite.subSiteStatus,
      subSiteJson: this.subSite.subSiteJson,
    });
  }
  onCancel() {
    this.router.navigate(["subsite"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.subSiteGroup.valid) {
      this.subSiteService.updateSubSite(this.subSiteGroup.value, this.activateRoute.snapshot.paramMap.get("oid")).subscribe(
        (res) => {
          if (res.status === 200) {
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
