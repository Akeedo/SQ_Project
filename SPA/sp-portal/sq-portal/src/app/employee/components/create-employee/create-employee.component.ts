import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CompanyService } from '../../company.service';
import { DepartmentService } from '../../department.service';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  public isLoading: boolean = false;
  employeeGroup: FormGroup;
  items: { label: string; url: string; }[];
  public companies: any[];
  public departments: any[];
  public selectDepartments: any[];
  isDropdownDisabled= true;
  options: SelectItem[];
  optionsForApproval : SelectItem[];
  mode: string = 'CREATE';
  role: string;
  currentEmployee: Employee;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService,
    private messageService: MessageService
    ) {
      this.items = [
        { label: 'SQ', url: '/' },
        { label: 'Create Employee', url: '/create-employee' }
      ];
      this.options = [
        {label:'Select a status', value:null},
        {label:'Draft', value:'Draft'},
        {label:'Send', value:'Send'}
      ];

      this.optionsForApproval = [
        {label:'Select a status', value:null},
        {label:'Approve', value:'Approve'},
        {label:'Reject', value:'Reject'}
      ];
    
    }

    ngOnInit(): void {
      this.setRole();
      this.prepareEmployeeOperationForm(null);
      this.initFeatures();
      this.getCompanies();
      this.getDepartments();
    }

    setRole(){
      const token = localStorage.getItem('jwtToken'); // replace 'your_token_key' with the key you used to store the token
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url.replace('-', '+').replace('_', '/');
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
  
      this.role = payload.role;
      console.log(this.role);
    }

    initFeatures() {

      this.mode = this.activatedRoute.snapshot.queryParamMap.get("mode");
  
      if (this.mode) {
        switch (this.mode) {
          case "CREATE": {
            this.prepareEmployeeOperationForm(new Employee());
            break;
          }
  
          case "UPDATE": {
            this.getEmployeeById(this.activatedRoute.snapshot.paramMap.get("id"));
  
            break;
          }
          case "REVIEW": {
            this.getEmployeeById(this.activatedRoute.snapshot.paramMap.get("id"));
             
            break;
          }
        }
      }
    }

    isInputDisabled(): boolean {
      return this.role === 'Approver'; 
  }

    getEmployeeById(id: string) {
      this.isLoading = true;
      
      this.employeeService.getEmployeeById(id).subscribe(
        (res) => {
            this.currentEmployee = res;
            console.log("Hello world");
            console.log(this.currentEmployee);
            this.prepareEmployeeOperationForm(this.currentEmployee);
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

    prepareEmployeeOperationForm(employee: Employee){
      employee = employee ? employee : new Employee();
      if(this.role === 'Approver'){
        employee.status = this.updateEmployeeStatus(employee.status);
        }
      this.employeeGroup = this.fb.group({
        id:           [employee.id],
        empCode:      [employee.empCode],
        name:         [employee.name],
        phoneNumber:  [employee.phoneNumber],
        address:      [employee.address],
        status:       [employee.status],
        companyId:    [employee.companyId],
        departmentId: [employee.departmentId]
      });
      if(this.role === 'Approver'){
      this.employeeGroup.controls['companyId'].disable(); 
      }
      this.employeeGroup.controls['departmentId'].disable();
    }

    updateEmployeeStatus(status: string): string {
      const option = this.optionsForApproval.find(opt => opt.value === status);
  
      if (option) {
          return option.value;
      } else {
          return null;
      }
  }

    onSelectChange(selectedValue: any) {
    if (selectedValue) {
      this.employeeGroup.controls['departmentId'].enable();
      } else {
        this.employeeGroup.controls['departmentId'].disable();
      }
      this.selectDepartments = this.departments.filter(department => department.companyId == selectedValue);
    }

    getCompanies(){
      this.companyService.getCompanies().subscribe((res) => {
        this.companies = res;
      });
    }

    getDepartments(){
      this.departmentService.getDepartments().subscribe((res) => {
        this.departments = res;
        this.selectDepartments = res;
        console.log(this.departments);
        })
    }

    onSubmit() {
      this.isLoading = true;
      if (this.employeeGroup.valid) {
        let employeeData = {...this.employeeGroup.value};
        delete employeeData.id;
        this.employeeService
          .saveEmployee(employeeData)
          .subscribe(
            (res) => {
              this.messageService.add({
                  severity: "success",
                  summary: "Employee saved Successfully",
                  detail: "",
                });
                setTimeout(() => {
                  this.router.navigate(["employee"]);
                }, 200);
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

    onUpdate() {
      this.isLoading = true;
      if (this.employeeGroup.valid) {
        this.employeeService
        .updateEmployee(
          this.employeeGroup.value,
          this.activatedRoute.snapshot.paramMap.get("id")
        )
          .subscribe(
            (res) => {
              this.messageService.add({
                  severity: "success",
                  summary: "Employee saved Successfully",
                  detail: "",
                });
                setTimeout(() => {
                  this.router.navigate(["employee"]);
                }, 200);
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
