import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssueCommentsComponent } from './create-issue-comments/create-issue-comments.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "create-issue-comments/:oid",
        component: CreateIssueCommentsComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueCommentsRoutingModule { }
