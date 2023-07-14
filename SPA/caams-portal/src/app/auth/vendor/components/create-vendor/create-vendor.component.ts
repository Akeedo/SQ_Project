import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { VendorService } from "../../services/vendor.service";
@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css']
})
export class CreateVendorComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  vendorGroup: FormGroup;
  vendorlist:any[];
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    this.vendorGroup = this.fb.group({
      vendorOid: [""],
      organizationOid: ["ORG-01"],
      vendorJson: [""],
      vendorName: ["", [Validators.required]],
      vendorAddress: ["",[Validators.required]],
      vendorUrl: ["",[Validators.required]],
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/vendor'},
      {label: 'Vendor / New-Vendor', url: '/vendor'}
  ];
   
  }

  onCancel() {
    this.router.navigate(["vendor"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.vendorGroup.valid) {
      this.vendorService.saveVendor(this.vendorGroup.value).subscribe(
        (res) => {
          if (res.status === 201) {
            this.messageService.add({
              severity: "success",
              summary: "Vendor saved Successfully",
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
