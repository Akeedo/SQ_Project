import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { MessageService } from 'primeng/api';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{


  public isLoading: boolean = false;
  employeeGroup: FormGroup;
  employee: Employee;
  items: { label: string; url: string; }[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) { 
    this.items = [
      { label: 'SQ', url: '/' },
      { label: 'Update Employee', url: '/update-employee' }
    ];
  }


  ngOnInit(): void {
    this.getEmployeeById(this.activateRoute.snapshot.paramMap.get("id"));
  }

  getEmployeeById(id: string) {
    this.isLoading = true;
    
    this.employeeService.getEmployeeById(id).subscribe(
      (res) => {
          this.employee = res;
          console.log("Hello world");
          console.log(this.employee);
          this.setFormValue();
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
    this.employeeGroup = this.fb.group({
      id: this.employee.id,
      empCode: this.employee.empCode,
      name: this.employee.name,
      phoneNumber: this.employee.phoneNumber,
      address: this.employee.address
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.employeeGroup.valid) {
      this.employeeService
        .updateEmployee(
          this.employeeGroup.value,
          this.activateRoute.snapshot.paramMap.get("id")
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

  onCancel() {
    this.router.navigate(["employee"]);
  }

}
