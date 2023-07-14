import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Designation } from '../../model/designation.model';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-update-designation',
  templateUrl: './update-designation.component.html',
  styleUrls: ['./update-designation.component.css']
})
export class UpdateDesignationComponent implements OnInit {

  public isLoading: boolean = false;
  designationGroup: FormGroup;
  designation: Designation;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private designationService: DesignationService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.designationGroup = this.fb.group({
      oid: [""],
      designationName: [""]
    });
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Settings', url: '/update-designation'},
      {label: 'Update / Update Designation', url: '/update-designation'}
  ];
  console.log("in init");
  
  this.getDesignationByOid(this.activateRoute.snapshot.paramMap.get("oid"));
  }

  getDesignationByOid(id: string) {
    this.isLoading = true;
    console.log("Hello world");
    
    this.designationService.getDesignationByOid(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.designation = res.body;
          console.log("Hello world");
          console.log(this.designation);
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

  onSubmit() {
    this.isLoading = true;
    if (this.designationGroup.valid) {
      this.designationService
        .updateDesignation(
          this.designationGroup.value,
          this.activateRoute.snapshot.paramMap.get("oid")
        )
        .subscribe(
          (res) => {
            if (res.status === 200) {
              this.messageService.add({
                severity: "success",
                summary: "Designation updated Successfully",
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

  setFormValue() {
    this.designationGroup = this.fb.group({
      oid: this.designation.oid,
      designationName: this.designation.designationName,
    });
  }

  onCancel() {
    this.router.navigate(["designation"]);
  }


}
