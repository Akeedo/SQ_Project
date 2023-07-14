import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueLogService } from '@app/auth/issue-log/services/issue-log.service';



@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class AppTopWidgetsComponent implements OnInit {
  [x: string]: any;

  constructor(private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private issueLogService: IssueLogService) { }
  totalAssetData: any;
  // faCoffee = faCoffee;
  ongoingIssueCount: any = 0;
  pendingIssueCount: any = 0;
  relosvedIssueCount: any = 0;

  ngOnInit(): void {
    this.dashboardService.getTotalAsset().subscribe((totalAsset) => {
      this.totalAssetData = totalAsset;
    });

    this.issueLogService.getCountByIssueStaus("Ongoing").subscribe(
      (issueCount) => {
        this.ongoingIssueCount = issueCount.body;
      }
    );
    this.issueLogService.getCountByIssueStaus("Pending").subscribe(
      (issueCount) => {
        this.pendingIssueCount = issueCount.body;
      }
    );
    this.issueLogService.getCountByIssueStaus("Resolved").subscribe(
      (issueCount) => {
        this.relosvedIssueCount = issueCount.body;
      }
    );

  }

  onClickAssetMoreInfo() {
    this.router.navigate(['/asset'], { relativeTo: this.activatedRoute })
  }

  onClickMoreInfoOnStatusType( statusType: any) {
    this.router.navigate(['/issue-log/issue-log-status',statusType]);
    
  }

}
