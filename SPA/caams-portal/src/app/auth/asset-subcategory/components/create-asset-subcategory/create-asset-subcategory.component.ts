import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetSubCategoryService } from '../../services/asset-subcategory.service';

@Component({
  selector: 'app-create-asset-subcategory',
  templateUrl: './create-asset-subcategory.component.html',
  styleUrls: ['./create-asset-subcategory.component.css']
})
export class CreateAssetSubcategoryComponent implements OnInit {
  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  categoryTypeList: any[];
  categoryNameList: any[];
  organizationList:any[];
  subcategoryNameList: any[];
  assetSubCategoryGroup: FormGroup;
  SubCategoryService:any[];
  items: { label: string; url: string; }[];
  

  constructor(private fb: FormBuilder, private assetsubCategoryService: AssetSubCategoryService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.assetSubCategoryGroup = this.fb.group({
      assetSubCategoryOid: [""],
      organizationOid: ["ORG-01"],
      subCategoryName: [""],
      assetCategoryName: [""],
      assetSubCategorySpecificationJson: [""],
      assetCategoryOid: [""]
    });

  this.getCategoryNameList();

  this.items = [
    {label: 'CAAMS', url: '/'},
    {label: 'Master', url: '/asset-subcategory'},
    {label: 'Asset SubCategory / New Asset SubCategory', url: '/asset-subcategory'}
];

  }
  
  getCategoryNameList() {
    this.assetsubCategoryService.getCategoryNameList().subscribe((res) => {
      if (res.status === 200) {   
        console.log(res.body);
        this.categoryNameList = res.body.data;
        console.log(this.categoryNameList);
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetSubCategoryGroup.valid) {
      this.assetsubCategoryService
        .saveAssetSubCategory(this.assetSubCategoryGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Asset Sub-Category saved Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["asset-subcategory"]);
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
    this.router.navigate(["asset-subcategory"]);
  }
}