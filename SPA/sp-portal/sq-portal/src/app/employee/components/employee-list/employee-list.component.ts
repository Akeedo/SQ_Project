import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  public isLoading: boolean = false;
  public isProgressBarLoading: boolean;
  public trDisabled: boolean = false;
  public defaultSearchText: string = "";
  private searchText: string = this.defaultSearchText;
  public rows: number = 20;
  public totalRecords: number = 0;
  public sessionList: any[];
  public rowsPerPageOptions: any[] = [20, 50, 100];

  @ViewChild('sessionTableRef') sessionTableRef: Table;
  public showAllList: boolean = true;

  @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;
  public role: string = '';
  public resetRequired: string = '';
  private defaultOffset: number = 0;
  private defaultLimit: number = this.rows;
  items: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService
    ) {
      this.items = [
        { label: 'CAAMS', url: '/' },
        { label: 'Settings', url: '/designation' },
        { label: 'Designation', url: '/designation' }
      ];
    }

  ngOnInit(): void {
  }

  onSessionLazyLoad($event) {
    if (!this.isLoading && !this.isProgressBarLoading) {
      const offset = $event.first === 0 ? 0 : $event.first / $event.rows;
      const limit = $event.rows ? $event.rows : this.rows;
      this.getPagedEmployees();
    }
  }

  private getPagedEmployees() {
    this.employeeService.getPagedEmployees().subscribe(res => {
      if (res.status === 200) {
        this.sessionList = res.body.data;
        console.log(this.sessionList);
        
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.sessionList = [];
          this.totalRecords = 0;
        }

        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        }
      },
      () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
      });
  }

  
}
