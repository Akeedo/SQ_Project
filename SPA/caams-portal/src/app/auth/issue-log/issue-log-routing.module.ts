import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssueLogComponent } from './components/create-issue-log/create-issue-log.component';
import { ListIssueLogByStatusComponent } from './components/list-issue-log-by-status/list-issue-log-by-status.component';
import { ListIssueLogComponent } from './components/list-issue-log/list-issue-log.component';
import { UpdateIssueLogComponent } from './components/update-issue-log/update-issue-log.component';
import { ViewIssueLogComponent } from './components/view-issue-log/view-issue-log.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListIssueLogComponent,
      },
      {
        path: "issue-log/:assetOid",
        component: ListIssueLogComponent,
      },
      {
        path: "issue-log-status/:statusType",
        component: ListIssueLogByStatusComponent,
      },
      {
        path: "create-issue/:assetOid",
        component: CreateIssueLogComponent,
      },
      {
        path: "update-issue/:issueOid",
        component: UpdateIssueLogComponent,
      },
      {
        path: "view-issue/:issueOid",
        component: ViewIssueLogComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueLogRoutingModule { }
