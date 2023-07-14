import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-create-license',
  templateUrl: './create-license.component.html',
  styleUrls: ['./create-license.component.css']
})
export class CreateLicenseComponent implements OnInit {

  public isLoading: boolean = false;
  licenseGroup: FormGroup;
  assetCategoryNameList: any[];
  manufacturerNameList:any[];
  vendorNameList:any[];
  categoryNameList: any[];
  minDate: Date;
  maxDate: Date;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder, 
    private licenseService: LicenseService,
    private router: Router,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.licenseGroup = this.fb.group({
        licenseOid:[""],
        licenseName:[""],
        licenseSerial:[""],
        licensePurchasedSeats: [""],
        assetCategoryOid:[""],
        manufacturerOid:[""],
        vendorOid:[""],
        licensePurchaseDate: [''],
        licensePurchaseNumber:[""],
        licensePurchaseCost:[""],
        licenseContact:[""],
        licenseRemarks:[""],
        licenseAvailableSeats:[""],
        organizationOid: ["ORG-01"]
      });
      this.items = [
        {label: 'CAAMS', url: '/'},
        {label: 'Operation / New License', url: '/license'}
    ];

    this.getCategoryNameList();
    this.getManufacturerNameList();
    this.getVendorNameList();

    }
    getCategoryNameList() {
      this.licenseService.getCategoryNameList().subscribe((res) => {
        if (res.status === 200) {   
          console.log(res.body);
          this.assetCategoryNameList = res.body.data;
          console.log(this.assetCategoryNameList);
        }
      });
    }
    getManufacturerNameList(){
      this.licenseService.getManufacturerNameList().subscribe((res) => {
        if (res.status === 200) {   
          console.log(res.body);
          this.manufacturerNameList = res.body.data;
          console.log(this.manufacturerNameList);
        }
      });
    }
  
    getVendorNameList(){
      this.licenseService.getVendorNameList().subscribe((res) => {
        if (res.status === 200) {   
          console.log(res.body);
          this.vendorNameList = res.body.data;
          console.log(this.vendorNameList);
        }
      });
    }
  
    onSubmit() {
      this.isLoading = true;
      
      if (this.licenseGroup.valid) {
        this.licenseGroup.value.licensePurchasedSeats = (+this.licenseGroup.value.licensePurchasedSeats)
        this.licenseService
          .saveLicense(this.licenseGroup.value)
          .subscribe(
            (res) => {
              if (res.status === 201) {
                this.messageService.add({
                  severity: "success",
                  summary: "License saved Successfully",
                  detail: "",
                });
                setTimeout(() => {
                  this.router.navigate(["license"]);
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
  
    onCancel() {
      this.router.navigate(["license"]);
    }

}
