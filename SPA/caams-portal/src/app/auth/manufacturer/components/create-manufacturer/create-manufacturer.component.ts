import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ManufacturerService } from "../../services/manufacturer.service";

@Component({
  selector: "app-create-manufacturer",
  templateUrl: "./create-manufacturer.component.html",
  styleUrls: ["./create-manufacturer.component.css"],
})
export class CreateManufacturerComponent implements OnInit {
  public isLoading: boolean = false;
  manufacturerGroup: FormGroup;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
      {label: 'Manufacturer / New Manufacturer', url: '/manufacturer'}
  ];
  }

  onCancel() {
    this.router.navigate(["manufacturer"]);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.manufacturerGroup.valid) {
      this.manufacturerService
        .saveManufacturer(this.manufacturerGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Manufacturer saved Successfully",
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
