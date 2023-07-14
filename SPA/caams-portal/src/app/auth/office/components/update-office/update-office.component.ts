import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Site } from "../../model/site";
import { OfficeService } from "../../services/office.service";

@Component({
  selector: "app-update-office",
  templateUrl: "./update-office.component.html",
  styleUrls: ["./update-office.component.css"],
})
export class UpdateOfficeComponent implements OnInit {
  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  siteGroup: FormGroup;
  site: Site;
  sites: any[];
  siteList: Site[];
  siteStatusList: any[];
  departmentList: any[];
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.siteStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.siteGroup = this.fb.group({
      departmentOid: ["", [Validators.required]],
      organizationOid: ["ORG-01"],
      siteCode: ["123"],
      siteName: ["", [Validators.required]],
      siteAddress: ["", [Validators.required]],
      siteUrl: ["", [Validators.required]],
      siteStatus: ["", [Validators.required]],
      siteOid: ["", [Validators.required]],
      
    });
    this.getSiteByOid(this.activateRoute.snapshot.paramMap.get("oid"));
    this.getDepartmentList();
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/sites'},
      {label: 'Site / Update-Site', url: '/sites'}
  ];
  }

  getDepartmentList(){
    this.officeService.getDepartment().subscribe(res => {
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

  getSiteByOid(id: string) {
    this.isLoading = true;
    this.officeService.getSiteByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.site = res.body;
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

  setFormValue() {
    this.siteGroup.patchValue({
      departmentOid: this.site.departmentOid,
      siteName: this.site.siteName,
      siteAddress: this.site.siteAddress,
      siteUrl: this.site.siteUrl,
      siteStatus: this.site.siteStatus,
      siteOid: this.site.siteOid
    });
  }

  onCancel() {
    this.router.navigate(["sites"]);
  }

  onSubmit() {
    
    this.isLoading = true;
    if (this.siteGroup.valid) {
      this.officeService
        .updateSite(
          this.siteGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Site updated Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["sites"]);
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
