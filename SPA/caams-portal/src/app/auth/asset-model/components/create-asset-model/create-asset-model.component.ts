import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AssetModelService } from "../../services/asset-model.service";

@Component({
  selector: "app-create-asset-model",
  templateUrl: "./create-asset-model.component.html",
  styleUrls: ["./create-asset-model.component.css"],
})
export class CreateAssetModelComponent implements OnInit {
  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  assetModelGroup: FormGroup;
  categoryTypeList: any[];
  categoryNameList: any[];
  organizationList: any[];
  subcategoryNameList: any[];
  manufacturerNameList: any[];
  items: { label: string; url: string; }[];
  AssetModelService: any;

  constructor(
    private fb: FormBuilder,
    private assetModelService: AssetModelService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.assetModelGroup = this.fb.group({
      assetModelOid: [""],
      organizationOid: ["ORG-01"],
      manufacturerOid: [""],
      assetCategoryOid: [""],
      subcategoryOid: [""],
      assetModelName: ["",[Validators.required]],
      assetModelUrl: [""],
      assetModelSpecificationJson: [""]
    });

    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Master', url: '/asset-model' },
      { label: 'AssetModel / New Asset Model', url: '/asset-model' }
    ];
    this.getCategoryTypeList();
    this.getCategoryNameList();
    this.getManufacturerNameList();

    this.assetModelGroup.get('assetCategoryOid').valueChanges.subscribe(value => {
      if (value) {
        this.subcategoryNameList = null;
        this.getSubcategoryNameList(value);
      }
    })
  }

  getCategoryTypeList() {
    this.assetModelService.getCategoryTypeList().subscribe((res) => {
      if (res.status === 200) {

        this.categoryTypeList = res.body.data;
      }
    });
  }

  getCategoryNameList() {
    this.assetModelService.getCategoryNameList().subscribe((res) => {
      if (res.status === 200) {
        console.log(res.body);
        this.categoryNameList = res.body.data;
        console.log(this.categoryNameList);
      }
    });
  }

  getSubcategoryNameList(oid: string) {
    this.assetModelService.getSubcategoryNameList(oid).subscribe((res) => {
      if (res.status === 200) {
        this.subcategoryNameList = res.body.data;
      }
    });
  }

  getManufacturerNameList() {
    this.assetModelService.getManufacturerNameList().subscribe((res) => {
      if (res.status === 200) {
        this.manufacturerNameList = res.body.data;
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetModelGroup.valid) {
      this.assetModelService.saveAssetModel(this.assetModelGroup.value).subscribe(
        (res) => {
          if (res.status === 201) {
            this.messageService.add({
              severity: "success",
              summary: "Asset Model saved Successfully",
              detail: "",
            });
            setTimeout(() => {
              this.router.navigate(["asset-model"]);
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
    this.router.navigate(["asset-model"]);
  }
}
