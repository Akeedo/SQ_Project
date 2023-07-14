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
  selector: 'app-create-responsible-person',
  templateUrl: './create-responsible-person.component.html',
  styleUrls: ['./create-responsible-person.component.css']
})
export class CreateResponsiblePersonComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  responsiblepersonGroup: FormGroup;
  responsiblepersonlist: any[];
  items: { label: string; url: string; }[];
  ResponsiblePrsonGroup: any;
  assetOwnerStatusList: any[];

  constructor(
    private fb: FormBuilder,
    private responsiblepersonService: ResponsiblePersonService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.assetOwnerStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }
  ngOnInit(): void {
    this.responsiblepersonGroup = this.fb.group({
      assetOwnerName: ["", [Validators.required]],
      assetOwnerDesignation: ["",[Validators.required]],
      assetOwnerUnit: ["", [Validators.required]],
      assetOwnerStatus: ["", [Validators.required]],
      assetOwnerEmail: ["", [Validators.required]],
      assetOwnerMobileNumber: ["", [Validators.required]],
      assetOwnerPhotoFilePath: [""],
      assetOwnerOid: [""],
      loginId: [""],
      organizationOid: ["ORG-01"]
    });
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation / New Responsible Person', url: '/create-responsible-person' }
    ];
  }
  onSubmit() {
    this.isLoading = true;
    if (this.responsiblepersonGroup.valid) {
      this.responsiblepersonService.saveResponsiblePerson(this.responsiblepersonGroup.value).subscribe(
        (res) => {
          if (res.status === 201) {
            this.messageService.add({
              severity: "success",
              summary: "Responsible Person saved Successfully",
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
  onCancel() {
    this.router.navigate(["responsible-person"]);
  }
}