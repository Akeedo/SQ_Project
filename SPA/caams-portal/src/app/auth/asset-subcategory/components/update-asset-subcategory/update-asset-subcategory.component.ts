import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetSubCategory } from '../../model/asset-subcategory';
import { AssetSubCategoryService } from '../../services/asset-subcategory.service';

@Component({
  selector: 'app-update-asset-subcategory',
  templateUrl: './update-asset-subcategory.component.html',
  styleUrls: ['./update-asset-subcategory.component.css']
})
export class UpdateAssetSubcategoryComponent implements OnInit {
  public isLoading: boolean = false;
  assetSubCategoryGroup: FormGroup;
  assetSubCategory: AssetSubCategory;
  items: { label: string; url: string; }[];

  categoryNameList: any[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private assetSubCategoryService: AssetSubCategoryService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private assetsubCategoryService: AssetSubCategoryService) { }

  ngOnInit(): void {
    this.assetSubCategoryGroup = this.fb.group({
      assetCategoryName: [""],
      assetSubCategoryOid: [""],
      subCategoryName: [""],
      organizationOid: ["ORG-01"],
      assetSubCategorySpecificationJson: [""],
      assetCategoryOid: [""]
    });

    this.getCategoryNameList();

    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/asset-subcategory'},
      {label: 'Asset-subcategory / Update-Asset-subcategory', url: '/asset-subcategory'}
  ];
  this.getAssetSubCategoryByOid(this.activateRoute.snapshot.paramMap.get("oid"));
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

  getAssetSubCategoryByOid(id: string) {
    this.isLoading = true;
    this.assetSubCategoryService.assetSubCategoryGetByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.assetSubCategory = res.body;
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
    this.assetSubCategoryGroup = this.fb.group({
      subCategoryName: this.assetSubCategory.subCategoryName,
      assetCategoryName: this.assetSubCategory.assetCategoryName,
      assetSubCategoryOid: this.assetSubCategory.assetSubCategoryOid,
      organizationOid: this.assetSubCategory.organizationOid,
      assetSubCategoryTypeOid: this.assetSubCategory.assetSubCategoryTypeOid,
      assetCategoryOid: this.assetSubCategory.assetCategoryOid,
      assetSubCategorySpecificationJson: this.assetSubCategory.assetSubCategorySpecificationJson
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetSubCategoryGroup.valid) {
      this.assetSubCategoryService
        .updateAssetSubCategory(
          this.assetSubCategoryGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Asset SubCategory updated Successfully",
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

