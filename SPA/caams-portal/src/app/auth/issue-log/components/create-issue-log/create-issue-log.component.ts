import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { FileService } from '@app/common/services/file.service';
import { MessageService } from 'primeng/api';
import { IssueLogService } from '../../services/issue-log.service';
import { AssetService } from '@app/auth/asset/services/asset.service';

@Component({
  selector: 'app-create-issue-log',
  templateUrl: './create-issue-log.component.html',
  styleUrls: ['./create-issue-log.component.css']
})
export class CreateIssueLogComponent implements OnInit {


  jsonMenuList: any;
  userGroup: any;
  showMenuDataJson: any;
  userStatusList: any;
  userAccessList: any;
  siteJson: any;
  roleList: any;
  priorityList: any;

  issueGroup: FormGroup;
  currentIssue: any = {
    "issueName": "test",
    "responsiblePerson": "responsiblePerson",
    "assetStatus": "assetStatus"
  };
  issueStatusList: any;
  issueTypeList: any;
  showDivOngoing = false;
  showDivResolving = false;
  assetStatusList: any;
  responsiblePersonList: any = [];
  assetDateForm: any;
  assetGeneralForm: any;
  today: any = new Date();
  minDate: any;
  minDateYear: any;
  sessionList: any;
  totalRecords: any;
  defaultOffset: number = 0;
  isProgressBarLoading: boolean;
  defaultLimit: number = 200;
  defaultSearchText: string = "";
  currentAssetOid: any;
  currentAssetInfo: any;

  designationGroup: any;
  items: any;
  isLoading: any;
  allRequirementsOK: boolean = true;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private issueLogService: IssueLogService,
    private assetService: AssetService,
  ) {
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/asset' },
      { label: 'Asset', url: '/asset' },
      { label: 'Issue-log', url: '/issue-log' },
      { label: 'New Issue', url: '/new-issue' }
    ];
    this.issueStatusList = [
      { issueStatusName: "Ongoing", issueStatusValue: "Ongoing" },
      { issueStatusName: "Pending", issueStatusValue: "Pending" },
      { issueStatusName: "Resolved", issueStatusValue: "Resolved" },
    ];
    this.issueTypeList = [
      { issueTypeName: "Battery problem", issueTypeValue: "Battery problem" },
      { issueTypeName: "Hardware error", issueTypeValue: "Hardware error" },
      { issueTypeName: "Power supply", issueTypeValue: "Power supply" },
      { issueTypeName: "Keyboard problem", issueTypeValue: "Keyboard problem" },
      { issueTypeName: "RAM", issueTypeValue: "RAM" },
      { issueTypeName: "Motherboard", issueTypeValue: "Motherboard" },
      { issueTypeName: "Screen problem", issueTypeValue: "Screen problem" },
      { issueTypeName: "Other", issueTypeValue: "Other" },
    ];
    this.priorityList = [
      { priorityName: "High", priorityValue: "High" },
      { priorityName: "Medium", priorityValue: "Medium" },
      { priorityName: "Low", priorityValue: "Low" },
    ];
    this.assetStatusList = [
      { assetStatusName: "Assign", assetStatusValue: "Assign" },
      { assetStatusName: "Reserve", assetStatusValue: "Reserve" },
      { assetStatusName: "Repair", assetStatusValue: "Repair" },
      { assetStatusName: "Damage", assetStatusValue: "Damage" },
    ];
  }

  ngOnInit(): void {

    this.currentAssetOid = this.activatedRoute.snapshot.paramMap.get("assetOid");
    this.getCurrentAssetInfo(this.currentAssetOid);
    this.getUserList();
    this.issueGroup = this.fb.group({
      oid: [""],
      issueName: ["", [Validators.required]],
      assetOid: [this.currentAssetOid],
      reportedProblem: [""],
      reportedDate: [this.today],
      issueType: [""],
      issueStatus: [""],
      findOutProblem: [""],
      solutionProvider: [""],
      solutionCost: [""],
      issueDetails: [""],
      priority: [""],
      problemDate: [""],
      remarks: [""],
      estimatedCost: [""],
      solution: [""],
      solutionDate: [""],
      assetStatus: [""],
      responsiblePerson: [""],
    });
  }

  private getCurrentAssetInfo(assetOid: string) {
    this.assetService.findAssetOpByID(assetOid).subscribe(
      res => {
        if (res.status === 200) {
          this.currentAssetInfo = res.body;
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
      }
    );
  }
  private getUserList(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
    this.usersService.getUsers(offset, pageSize, searchText.trim()).subscribe(
      res => {
        if (res.status === 200) {
          this.totalRecords = res.body.length
          res.body.forEach(element => {
            var temp = {
              responsiblePersonName: element.userId,
              responsiblePersonValue: element.loginOid
            };

            this.responsiblePersonList.push(temp);
          });
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
  onStatusChange(selectedValue: any) {
    if (selectedValue.value === "Ongoing" || selectedValue.value === "Pending") {
      this.showDivOngoing = true;
      this.showDivResolving = false;
    } else {
      this.showDivOngoing = true;
      this.showDivResolving = true;
    }
  }
  onIssueChange(selectedValue: any) {
    console.log("selectedValue :", selectedValue);

  }
  onCancel() {
    this.router.navigate(["../../asset/issue-log", this.currentAssetOid]);
  }
  onSubmit() {
    this.allRequirementsOK = true;
    this.checkAllRequirements();

    if (this.allRequirementsOK == true) {
      this.isLoading = true;
      this.issueLogService
        .saveIssueLog(this.issueGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Issue-log saved Successfully",
                detail: "",
              });
              setTimeout(() => {
                this.router.navigate(["../../asset/issue-log", this.currentAssetOid]);
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
      this.messageService.add({
        severity: "failed",
        summary: "Please fill the required fields.",
        detail: "",
      });
    }
  }

  checkAllRequirements() {
    if (this.issueGroup.get("issueName").value == "" || this.issueGroup.get("reportedProblem").value == ""
      || this.issueGroup.get("priority").value == "" || this.issueGroup.get("reportedDate").value == ""
      || this.issueGroup.get("issueType").value == "" || this.issueGroup.get("issueStatus").value == ""
      || this.issueGroup.get("estimatedCost").value == ""
    ) {
      this.allRequirementsOK = false;
    }
    if (this.issueGroup.get("issueStatus").value == "Resolved") {
      if (this.issueGroup.get("findOutProblem").value == "" || this.issueGroup.get("solution").value == ""
        || this.issueGroup.get("solutionProvider").value == "" || this.issueGroup.get("solutionDate").value == ""
        || this.issueGroup.get("solutionCost").value == ""
      ) {
        this.allRequirementsOK = false;
      }
    } else {
      if (this.issueGroup.get("assetStatus").value == "" || this.issueGroup.get("responsiblePerson").value == ""
      ) {
        this.allRequirementsOK = false;
      }
    }
  }


  problemDateValidation(event) {
    let reportedDate = this.issueGroup.get("reportedDate").value;
    let problemDate = this.issueGroup.get("problemDate").value;
    if (event != null && reportedDate != null && reportedDate !== "" && problemDate != null && problemDate !== "") {
      reportedDate = new Date(reportedDate);
      problemDate = new Date(problemDate);
      if (reportedDate < problemDate) {
        this.issueGroup.get(event).setValue('')
        this.messageService.add({
          severity: "error",
          summary: " Dates Error:",
          detail: " Reported Date can't be less than Problem Date.",
        });
      }
      this.issueGroup.get(event).updateValueAndValidity()
    }
  }

  solutionDateValidation(event) {
    let reportedDate = this.issueGroup.get("reportedDate").value;
    let problemDate = this.issueGroup.get("problemDate").value;
    let solutionDate = this.issueGroup.get("solutionDate").value;
    if (event != null && reportedDate != null && reportedDate !== "" && problemDate != null && problemDate !== "" && solutionDate != null && solutionDate !== "") {
      reportedDate = new Date(reportedDate);
      problemDate = new Date(problemDate);
      solutionDate = new Date(solutionDate);

      if (solutionDate < problemDate || solutionDate < reportedDate) {
        this.issueGroup.get(event).setValue('')
        this.messageService.add({
          severity: "error",
          summary: " Dates Error:",
          detail: " Solution Date can't be less than Problem Date or Reported Date.",
        });
      }
      this.issueGroup.get(event).updateValueAndValidity()
    }
  }

}
