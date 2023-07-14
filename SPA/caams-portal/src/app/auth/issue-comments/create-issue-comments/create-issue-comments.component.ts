import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DesignationService } from '@app/auth/designation/services/designation.service';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { FileService } from '@app/common/services/file.service';
import { ConfirmationService, MessageService, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { stringify } from 'querystring';
import { getAllJSDocTagsOfKind, setConstantValue } from 'typescript';
import { IssueCommentServiceService } from '../issue-comment-service.service';
import { IssueCommentsAndReplies } from '../model/issue-comments-and-replies.model';
import { IssueComments } from '../model/issue-comments.model';
import { Reply } from '../model/reply.model';
import { IssueLogService } from '@app/auth/issue-log/services/issue-log.service';
import { AssetService } from '@app/auth/asset/services/asset.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-issue-comments',
  templateUrl: './create-issue-comments.component.html',
  styleUrls: ['./create-issue-comments.component.css'],
  providers: [DatePipe]
})
export class CreateIssueCommentsComponent implements OnInit {

  public isLoading: boolean = true;
  public isCommentAdded: boolean = false;
  public isReplyButtonDisplay: boolean = true;
  public replyTree: boolean = false;
  commentIssueGroup: FormGroup;
  replyIssueGroup: FormGroup;
  issueGroup: FormGroup;
  items: { label: string; url: string;}[];
  commentSize: any;
  replySize: any;
  issueComments: IssueComments = new IssueComments();
  reply:Reply = new Reply();
  BasicShow: boolean = false;
  
  currentAssetOid: any;
  currentAssetInfo: any;
  public isProgressBarLoading: boolean;
  public trDisabled: boolean = false;
  public defaultSearchText: string = "";
  private searchText: string = this.defaultSearchText;
  public rows: number = 20;
  public totalRecords: number = 0;
  public issueCommentList: any[];
  public issueCommentsAndReplies: IssueCommentsAndReplies[] = [new IssueCommentsAndReplies()];
  public issueReplyList: any[];
  public sessionList: any[];
  public rowsPerPageOptions: any[] = [20, 50, 100];
  public role: string = '';
  public resetRequired: string = '';
  public isCommentBoxVisible: boolean = false;
  private defaultOffset: number = 0;
  private defaultLimit: number = this.rows;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private issueCommentServiceService: IssueCommentServiceService,
    private issueLogService: IssueLogService,
    private assetService: AssetService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private usersService: UsersService,
    private location: Location,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.issueComments.issueOid = this.activatedRoute.snapshot.paramMap.get("oid");

    this.initializeFormGroup();
    this.items = [
      {label: 'CAAMS', url: '/'},
      {label: 'Issue Comments / New Issue Comments', url: '/issue-comments'}
    ];

    this.primengConfig.ripple = true;
    this.getIssueInformationFromOid();
    this.getAllIssueComments();
  }

  getIssueInformationFromOid(){
    this.issueLogService.getIssueLogByOid(this.defaultOffset, this.defaultLimit, this.defaultSearchText, this.issueComments.issueOid).subscribe(
      res => {
        if (res.status === 200) {
          this.currentAssetOid = res.body.data[0].assetOid;
          this.getCurrentAssetInfo(this.currentAssetOid);
          this.setIssueFormValue(res.body.data[0]);
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

  getFormattedDate(dateString: string): string {
    if (dateString === null || dateString.trim() === "") {
      return dateString = "";
    } else {
      const date = new Date(dateString);
      return this.datePipe.transform(date, 'dd/MM/yyyy'); 
    }
  }

  setIssueFormValue(issueData: any) {

    this.issueGroup = this.fb.group({
      oid: issueData.oid,
      issueName: issueData.issueName,
      assetOid: issueData.assetOid,
      reportedProblem: issueData.reportedProblem,
      reportedDate: issueData.reportedDate,
      issueType: issueData.issueType,
      //      issueStatus: issueData.,
      findOutProblem: issueData.findingProblem,
      solutionProvider: issueData.solutionProvider,
      solutionCost: issueData.cost,
      issueDetails: issueData.issueDetails,
      priority: issueData.priority,
      problemDate: issueData.problemDate,
      remarks: issueData.remarks,
      estimatedCost: issueData.estimatedCost,
      solution: issueData.solution,
      solutionDate: issueData.solutionDate,
      assetStatus: issueData.assetStatus,
      //      responsiblePerson: issueData.,

    });
  }

  reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.location.path()]);
  }

  private getAllIssueComments() {
    this.isProgressBarLoading = true;
    this.isProgressBarLoading = true;
    this.issueCommentServiceService.getAllIssueCommentsFromIssueOid(this.issueComments.issueOid).subscribe(res => {
        if (res.status === 200) {
        this.issueCommentList = res.body;
        this.getAllIssueReplies();
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.issueCommentList = [];
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

  private getAllIssueReplies() {
    this.isProgressBarLoading = true;
    this.isProgressBarLoading = true;
    this.issueCommentServiceService.getAllIssueReplies().subscribe(res => {
      if (res.status === 200) {
        let result = res.body;
        this.issueReplyList = result;
        this.setReplyToComment();
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.issueReplyList = [];
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

  cancelComment(){
    this.isCommentBoxVisible = false;
  }

  initializeFormGroup(){
    this.commentIssueGroup = this.fb.group({
      oid: [""],
      issueOid: this.issueComments.issueOid,
      comment: [""],
    });

    this.replyIssueGroup = this.fb.group({
      oid: [""],
      commentOid: [""],
      reply: [""],
    });

    this.issueGroup = this.fb.group({
      oid: [""],
      issueName: ["", [Validators.required]],
      assetOid: [""],
      reportedProblem: [""],
      reportedDate: [""],
      issueType: [""],
      //    issueStatus: [""],
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
      //    responsiblePerson: [""],

    });
  }

  saveComments() {
    this.isLoading = true;
    if (this.commentIssueGroup.valid) {
      this.issueCommentServiceService
        .saveComments(this.commentIssueGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Issue saved Successfully",
                detail: "",
              });
              this.reloadPage();
              this.issueComments = res.body;
              this.isCommentAdded = true;
      	      this.isLoading = false;
      	      this.isReplyButtonDisplay = false;
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


  mapReply(reply) {
    return {
      oid: reply.oid,
      reply: reply.reply,
      commentOid: reply.commentOid,
      createdBy: reply.createdBy,
      createdOn: new Date(reply.createdOn).toLocaleDateString(),
      updatedBy: reply.updatedBy,
      updatedOn: new Date(reply.updatedOn).toLocaleDateString()
    };
  }
  
  mapComment(comment, replies) {
    const filteredReplies = replies.filter(reply => reply.commentOid === comment.oid);
    const mappedReplies = filteredReplies.map(reply => this.mapReply(reply));
  
    return {
      oid: comment.oid,
      issueOid: comment.issueOid,
      comment: comment.comment,
      createdBy: comment.createdBy,
      createdOn: new Date(comment.createdOn).toLocaleDateString(),
      updatedBy: comment.updatedBy,
      updatedOn: new Date(comment.updatedOn).toLocaleDateString(),
      replies: mappedReplies
    };
  }
  
  setReplyToComment() {
    this.isProgressBarLoading = true;
    this.issueCommentsAndReplies = this.issueCommentList.map(comment => this.mapComment(comment, this.issueReplyList));
    this.issueCommentsAndReplies = this.issueCommentsAndReplies.filter(obj => Object.keys(obj).length > 0);
    this.isProgressBarLoading = false;
  }

  saveReplies() {
    this.BasicShow = false;
    this.isLoading = true;
  
    if (this.replyIssueGroup.valid) {
      this.issueCommentServiceService
        .saveReplies(this.replyIssueGroup.value)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Issue saved Successfully",
                detail: "",
              });
          this.isLoading = false;
          this.reloadPage();
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

  setReplyFormValue(issueCommentOid: String) {
    this.replyIssueGroup = this.fb.group({
      oid: "",
      commentOid: issueCommentOid,
      reply: ""
      });
  }

  showDialog(oid: any) {
    this.setReplyFormValue(oid);
    this.BasicShow = true;
}

  onCancel() {
    this.router.navigate(["issue-comments"]);
  }

}
