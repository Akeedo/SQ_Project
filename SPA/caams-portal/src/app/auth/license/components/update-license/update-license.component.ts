import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { License } from '../../model/license';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.css']
})
export class UpdateLicenseComponent implements OnInit {
  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  license:License;
  licenselist:any[];
  licenseGroup: FormGroup;
  assetCategoryNameList: any[];
  manufacturerNameList:any[];
  vendorNameList:any[];
  categoryNameList: any[];
  items: { label: string; url: string; }[];
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder, 
    private licenseService: LicenseService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
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
      licensePurchaseDate: [""],
      licensePurchaseNumber:[""],
      licensePurchaseCost:[""],
      licenseContact:[""],
      licenseRemarks:[""],
      licenseAvailableSeats:[""],
      organizationOid: ["ORG-01"]
    });

    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Operation / Update License', url: '/license'}
  ];

  this.getCategoryNameList();
  this.getManufacturerNameList();
  this.getVendorNameList();
  this.getlicenseByOid(this.activateRoute.snapshot.paramMap.get("oid"));

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

  getlicenseByOid(id: string) {
    this.isLoading = true;
    this.licenseService.getlicenseByOid(id).subscribe(
      (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.license = res.body;
          console.log(this.license)
          this.setFormValue();
          console.log(this.licenseGroup)
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
    this.licenseGroup.patchValue({
        licenseOid:this.license.licenseOid,
        licenseName:this.license.licenseName,
        licenseSerial:this.license.licenseSerial,
        licensePurchasedSeats:this.license.licensePurchasedSeats,
        licenseAvailableSeats:this.license.licenseAvailableSeats,
        assetCategoryOid:this.license.assetCategoryOid,
        manufacturerOid:this.license.manufacturerOid,
        vendorOid:this.license.vendorOid,
        licensePurchaseDate:this.license.licensePurchaseDate ? new Date(this.license.licensePurchaseDate) : null,
        licensePurchaseNumber:this.license.licensePurchaseNumber,
        licensePurchaseCost:this.license.licensePurchaseCost,
        licenseContact:this.license.licenseContact,
        licenseRemarks:this.license.licenseRemarks,
        organizationOid:this.license.organizationOid
    
    });
  }

  onCancel() {
    this.router.navigate(["license"]);
  }

  onSubmit() {
    console.log(this.activateRoute.snapshot.paramMap.get("oid"))
    this.isLoading = true;
    if (this.licenseGroup.valid) {
      this.licenseService
        .updateLicense(
          this.licenseGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "License updated Successfully",
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
}
