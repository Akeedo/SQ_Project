import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AssetModel } from "../../model/assetModel";
import { AssetModelService } from "../../services/asset-model.service";

@Component({
  selector: "app-update-asset-model",
  templateUrl: "./update-asset-model.component.html",
  styleUrls: ["./update-asset-model.component.css"],
})
export class UpdateAssetModelComponent implements OnInit {
  public isLoading: boolean = false;
  assetModelGroup: FormGroup;
  assetModel: AssetModel;
  categoryTypeList: any[];
  categoryNameList: any[];
  subcategoryNameList: any[];
  manufacturerNameList: any[];
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assetModelService: AssetModelService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.assetModelGroup = this.fb.group({
      assetModelOid: [""],
      organizationOid: [""],
      manufacturerOid: [""],
      assetCategoryOid: [""],
      subcategoryOid: [""],
      assetModelName: ["",[Validators.required]],
      assetModelUrl: [""],
      assetModelSpecificationJson: [""]
    });
  
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/asset-model'},
      {label: 'Asset Model / Update Asset Model', url: '/asset-model'}
  ];

    this.getCategoryTypeList();
    this.getCategoryNameList();
    this.getManufacturerNameList();
    this.getAssetModelByOid(this.activateRoute.snapshot.paramMap.get("oid"));

    this.assetModelGroup.get('assetCategoryOid').valueChanges.subscribe(value => {
      
      if (value) {
        this.getSubcategoryNameList(value);
      }
    })
  }

  getAssetModelByOid(id: string) {
    this.isLoading = true;
    this.assetModelService.assetModelGetByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.assetModel = res.body;
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
    this.assetModelGroup = this.fb.group({
      assetModelOid: this.assetModel.assetModelOid,
      organizationOid: this.assetModel.organizationOid,
      manufacturerOid: this.assetModel.manufacturerOid,
      assetCategoryOid: this.assetModel.assetCategoryOid,
      subcategoryOid: this.assetModel.subcategoryOid,
      assetModelName: this.assetModel.assetModelName,
      assetModelUrl: this.assetModel.assetModelUrl,
      assetModelSpecificationJson: [""]
    });
    this.getSubcategoryNameList(this.assetModel.assetCategoryOid)
  }

  onSubmit() {
    this.isLoading = true;
    if (this.assetModelGroup.valid) {
      this.assetModelService
        .updateAssetModel(
          this.assetModelGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Model updated Successfully",
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

  getCategoryTypeList() {
    this.assetModelService.getCategoryTypeList().subscribe((res) => {
      if (res.status === 200) {
        this.categoryTypeList = res.body;
      }
    });
  }

  getCategoryNameList() {
    this.assetModelService.getCategoryNameList().subscribe((res) => {
      if (res.status === 200) {
        this.categoryNameList = res.body.data;
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
  onCancel() {
    this.router.navigate(["asset-model"]);
  }
}
