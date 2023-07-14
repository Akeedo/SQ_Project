import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '@app/common/services/file.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrls: ['./create-designation.component.css']
})
export class CreateDesignationComponent implements OnInit {

  public isLoading: boolean = false;
  designationGroup: FormGroup;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private designationService: DesignationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.designationGroup = this.fb.group({
      oid: [""],
      designationName: [""],

    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: ' Settings', url: '/designation'},
      {label: 'Designation / New Designation', url: '/designation'}
  ];
  }

  onSubmit() {
    this.isLoading = true;
    if (this.designationGroup.valid) {
      this.designationService
        .saveDesignation(this.designationGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Designation saved Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["designation"]);
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
    this.router.navigate(["designation"]);
  }

}
