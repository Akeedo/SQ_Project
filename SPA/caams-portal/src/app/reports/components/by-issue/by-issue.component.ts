import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-issue',
  templateUrl: './by-issue.component.html',
  styleUrls: ['./by-issue.component.css']
})
export class ByIssueComponent implements OnInit {

  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  ddlItems: any = [];
  issueFromGroup: FormGroup
  
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  goBack(){
    this.router.navigate(["reports"], {
    });
  };
  
  ngOnInit(): void {
    this.issueFromGroup = this.fb.group({
      issueOid: [""],          
    });

    this.ddlItems = [
      {"oid": "All", "name": "All" },
      {"oid": "Ongoing", "name": "Ongoing" },
      {"oid": "Pending", "name": "Pending" },
      {"oid": "Resolved", "name": "Resolved" },
    ]
    this.items = [
      {label: 'Report List', url: '/'},
      {label: 'By Issue', url: '/by-issue'}
  ];
  }

}
