import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetCategory } from '../../model/assetCategory';
import { AssetCategoryService } from '../../services/asset-category.service';

@Component({
  selector: 'app-update-asset-category',
  templateUrl: './update-asset-category.component.html',
  styleUrls: ['./update-asset-category.component.css']
})
export class UpdateAssetCategoryComponent implements OnInit {

  public isLoading: boolean = false;
  assetCategoryGroup: FormGroup;
  assetCategory: AssetCategory;
  items: { label: string; url: string; }[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private assetCategoryService: AssetCategoryService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.assetCategoryGroup = this.fb.group({
      assetCategoryOid: [""],
      organizationOid: [""],
      assetCategoryTypeOid: [""],
      assetCategoryName: [""],
      assetCategorySpecificationJson: [""],
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/asset-category'},
      {label: 'AssetCategory / Update AssetCategory', url: '/asset-category'}
  ];
  this.getAssetCategoryByOid(this.activateRoute.snapshot.paramMap.get("oid"));
  }

  getAssetCategoryByOid(id: string) {
    this.isLoading = true;
    this.assetCategoryService.assetCategoryGetByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.assetCategory = res.body;
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
    this.assetCategoryGroup = this.fb.group({
      assetCategoryOid: this.assetCategory.assetCategoryOid,
      organizationOid: this.assetCategory.organizationOid,
      assetCategoryTypeOid: this.assetCategory.assetCategoryTypeOid,
      assetCategoryName: this.assetCategory.assetCategoryName,
      assetCategorySpecificationJson: this.assetCategory.assetCategorySpecificationJson
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetCategoryGroup.valid) {
      this.assetCategoryService
        .updateAssetCategory(
          this.assetCategoryGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Asset Category updated Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["asset-category"]);
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
    this.router.navigate(["asset-category"]);
  }

}
