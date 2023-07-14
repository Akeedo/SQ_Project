import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Vendor } from '../../model/vendor';
import { VendorService } from "../../services/vendor.service";


@Component({
  selector: "app-update-vendor",
  templateUrl: "./update-vendor.component.html",
  styleUrls: ["./update-vendor.component.css"]
})
export class UpdateVendorComponent implements OnInit {

  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  vendorGroup: FormGroup;
  vendor:Vendor;
  vendorlist:any[];
  items: { label: string; url: string; }[];
  

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.vendorGroup = this.fb.group({
      vendorOid: [""],
      organizationOid: ["ORG-01"],
      vendorJson: [""],
      vendorName: ["", [Validators.required]],
      vendorAddress: ["", [Validators.required]],
      vendorUrl: ["", [Validators.required]]
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/vendor'},
      {label: 'Vendor / Update-Vendor', url: '/update-vendor'}
  ];
     this.getVendorByOid(this.activateRoute.snapshot.paramMap.get("oid"));
   
  }
   getVendorByOid(id: string) {
    this.isLoading = true;
    this.vendorService.getVendorByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.vendor = res.body;
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
    this.vendorGroup.patchValue({
      vendorOid: this.vendor.vendorOid,
      organizationOid: this.vendor.organizationOid,
      vendorJson: this.vendor.vendorJson,
      vendorName: this.vendor.vendorName,
      vendorAddress: this.vendor.vendorAddress,
      vendorUrl: this.vendor.vendorUrl,
    });
  }

  onCancel() {
    this.router.navigate(["vendor"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.vendorGroup.valid) {
      this.vendorService
        .updateVendor(
          this.vendorGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
           
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Vendor updated Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["vendor"]);
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
