import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Site } from "../../model/site";
import { OfficeService } from "../../services/office.service";

@Component({
  selector: "app-create-office",
  templateUrl: "./create-office.component.html",
  styleUrls: ["./create-office.component.css"],
})
export class CreateOfficeComponent implements OnInit {
  
  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  siteGroup: FormGroup;
  siteStatusList: any[];
  siteList: Site[];
  departmentList: any[];
  items: { label: string; url: string; }[];
  subSiteService: any;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private router: Router,
    private messageService: MessageService
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
    });
    this.getDepartmentList();
    
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master ', url: '/sites'},
      {label: 'Site / New Site', url: '/sites'}
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

  onCancel() {
    this.router.navigate(["sites"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.siteGroup.valid) {
      this.officeService.saveSite(this.siteGroup.value).subscribe(
        (res) => {
          if (res.status === 201) {
            this.messageService.add({
              severity: "success",
              summary: "Site saved Successfully",
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
