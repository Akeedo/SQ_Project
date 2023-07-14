import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetCategoryService } from '../../services/asset-category.service';

@Component({
  selector: 'app-create-asset-category',
  templateUrl: './create-asset-category.component.html',
  styleUrls: ['./create-asset-category.component.css']
})
export class CreateAssetCategoryComponent implements OnInit {

  public isLoading: boolean = false;
  assetCategoryGroup: FormGroup;
  items: { label: string; url: string; }[];

  constructor(private fb: FormBuilder, private assetCategoryService: AssetCategoryService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.assetCategoryGroup = this.fb.group({
      assetCategoryOid: [""],
      assetCategoryName: [""],
      organizationOid: ["ORG-01"],
      assetCategorySpecificationJson: [""],
      assetCategoryTypeOid: ["cat-01"]
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: ' Master', url: '/asset-category'},
      {label: 'AssetCategory / New AssetCategory', url: '/asset-category'}
  ];
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetCategoryGroup.valid) {
      this.assetCategoryService
        .saveAssetCategory(this.assetCategoryGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Asset Category saved Successfully",
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
