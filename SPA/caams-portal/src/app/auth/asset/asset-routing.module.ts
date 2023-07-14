import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIssueLogComponent } from '../issue-log/components/list-issue-log/list-issue-log.component';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { ListAssetComponent } from './components/list-asset/list-asset.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateIssueLogComponent } from '../issue-log/components/create-issue-log/create-issue-log.component';
import { UpdateIssueLogComponent } from '../issue-log/components/update-issue-log/update-issue-log.component';
import { ViewIssueLogComponent } from '../issue-log/components/view-issue-log/view-issue-log.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListAssetComponent,
      },
      {
        path: "create-asset",
        component: CreateAssetComponent,
      },
      {
        path: "update-asset/:assetOid",
        component: CreateAssetComponent,
      },
      {
        path: "view-asset/:assetOid",
        component: ViewAssetComponent,
      },
      // {
      //   path: "issue-log/status:issueStatus",
      //   component: ListIssueLogByStatusComponent,
      // },
      // {
      //   path: "create-issue",
      //   component: CreateIssueLogComponent,
      // },
      // {
      //   path: "update-issue/:issueOid",
      //   component: UpdateIssueLogComponent,
      // },
      // {
      //   path: "view-issue/:issueOid",
      //   component: ViewIssueLogComponent,
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
