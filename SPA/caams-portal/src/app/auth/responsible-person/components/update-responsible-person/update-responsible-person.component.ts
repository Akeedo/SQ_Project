import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResponsiblePerson } from '../../model/responsibleperson';
import { ResponsiblePersonService } from '../../services/responsible-person.service';

@Component({
  selector: 'app-update-responsible-person',
  templateUrl: './update-responsible-person.component.html',
  styleUrls: ['./update-responsible-person.component.css']
})
export class UpdateResponsiblePersonComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  responsiblepersonGroup: FormGroup;
  responsibleperson: ResponsiblePerson;
  responsiblepersonlist: any[];
  items: { label: string; url: string; }[];
  ResponsiblePrsonGroup: any;
  responsiblePersonService: any;
  assetOwnerStatusList: any[];


  constructor(
    private fb: FormBuilder,
    private ResponsiblePersonService: ResponsiblePersonService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.assetOwnerStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.responsiblepersonGroup = this.fb.group({
      assetOwnerName: ["", [Validators.required]],
      assetOwnerDesignation: [""],
      assetOwnerUnit: [""],
      assetOwnerStatus: [""],
      assetOwnerEmail: [""],
      assetOwnerMobileNumber: ["", [Validators.required]],
      assetOwnerPhotoFilePath: [""],
      assetOwnerOid: [""],
      loginId: [""],
      organizationOid: ["ORG-01"]
    });
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation / Update Responsible Person', url: '/update-responsible-person' }
    ];
    this.getResponsiblePersonByOid(this.activateRoute.snapshot.paramMap.get("oid"));

  }
  getResponsiblePersonByOid(id: string) {
    this.isLoading = true;
    this.ResponsiblePersonService.getResponsiblePersonByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.responsibleperson = res.body;
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
    this.responsiblepersonGroup.patchValue({
      assetOwnerOid: this.responsibleperson.assetOwnerOid,
      assetOwnerName: this.responsibleperson.assetOwnerName,
      assetOwnerUnit: this.responsibleperson.assetOwnerUnit,
      assetOwnerDesignation: this.responsibleperson.assetOwnerDesignation,
      assetOwnerEmail: this.responsibleperson.assetOwnerEmail,
      assetOwnerMobileNumber: this.responsibleperson.assetOwnerMobileNumber,
      assetOwnerStatus: this.responsibleperson.assetOwnerStatus,
      assetOwnerPhotoFilePath: this.responsibleperson.assetOwnerPhotoFilePath,
      loginId: this.responsibleperson.loginId,
      organizationOid: this.responsibleperson.organizationOid,
    });
  }

  onCancel() {
    this.router.navigate(["responsible-person"]);
  }

  onSubmit() {
    debugger
    console.log(this.activateRoute.snapshot.paramMap.get("oid"))
    this.isLoading = true;
    if (this.responsiblepersonGroup.valid) {
      this.ResponsiblePersonService
        .updateResponsiblePerson(
          this.responsiblepersonGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Responsible Person updated Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["responsible-person"]);
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