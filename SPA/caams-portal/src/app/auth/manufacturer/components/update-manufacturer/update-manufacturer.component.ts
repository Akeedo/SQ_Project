import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ManufacturerModel } from "../../model/manufacturerModel";
import { ManufacturerService } from "../../services/manufacturer.service";

@Component({
  selector: "app-update-manufacturer",
  templateUrl: "./update-manufacturer.component.html",
  styleUrls: ["./update-manufacturer.component.css"],
})
export class UpdateManufacturerComponent implements OnInit {
  public isLoading: boolean = false;
  manufacturerGroup: FormGroup;
  manufacturerModel: ManufacturerModel;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.manufacturerGroup = this.fb.group({
      manufacturerOid: [""],
      organizationOid: ["ORG-01"],
      manufacturerName: ["", [Validators.required]],
      manufacturerAddress: ["", [Validators.required]],
      manufacturerUrl: ["", [Validators.required]],
      manufacturerJson: [""]
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Master', url: '/manufacturer'},
      {label: 'Manufacturer / Update Manufacturer', url: '/manufacturer'}
  ];
    this.getManufacturerByOid(this.activateRoute.snapshot.paramMap.get("oid"));
  }

  getManufacturerByOid(id: string) {
    this.isLoading = true;
    this.manufacturerService.getManufacturerByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.manufacturerModel = res.body;
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
    this.manufacturerGroup = this.fb.group({
      manufacturerOid: this.manufacturerModel.manufacturerOid,
      organizationOid: this.manufacturerModel.organizationOid,
      manufacturerName: this.manufacturerModel.manufacturerName,
      manufacturerAddress: this.manufacturerModel.manufacturerAddress,
      manufacturerUrl: this.manufacturerModel.manufacturerUrl,
      manufacturerJson: this.manufacturerModel.manufacturerJson
    });
  }

  onCancel() {
    this.router.navigate(["manufacturer"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.manufacturerGroup.valid) {
      this.manufacturerService
        .updateManufacturer(
          this.manufacturerGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Manufacturer updated Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["manufacturer"]);
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
