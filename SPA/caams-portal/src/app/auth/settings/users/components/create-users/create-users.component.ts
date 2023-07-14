import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { OfficeService } from '@app/auth/office/services/office.service';
import { RoleService } from '@app/auth/settings/role/services/role.service';
import { MessageService, TreeNode } from "primeng/api";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  userGroup: FormGroup;
  items: { label: string; url: string; }[];
  userStatusList: any = [];
  userAccessList: any = [];
  public jsonMenuList: any = [];
  roleList: any = [];
  public showMenuDataJson: boolean = false;
  public siteJson: '';
  public dontLoadInNewUser: boolean = false;

  public userDataJson: any = {
    "organizationOid": "ORG-01",
    "customerOid": [
      "Cust-01"
    ],
    "siteOid": [],
    "accessLevel": "all"
  };

  constructor(private fb: FormBuilder, private usersService: UsersService, private officeService: OfficeService,
    private messageService: MessageService, private router: Router, private roleService: RoleService) {
    this.userStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.userGroup = this.fb.group({
      loginOid: [''],
      userId: [''],
      password: [''],
      role: [''],
      roleOid: [''],
      mobileNo: [''],
      name: [''],
      address: [''],
      email: [''],
      siteOid: [''],
      menuJson: [''],
      dataJson: [''],
      status: ['']
    })
    this.getSite();
    this.getRoleList();

    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Settings / Users / Create User', url: '/users' }
    ];

    this.userGroup.get('roleOid').valueChanges.subscribe(value => {
      if (value) {
        //this.showMenuDataJson = true;
        this.getMenu(value);
      }
    })
  }

  getSite(offset: number = 0, pageSize: number = 0, searchText: string = '') {
    this.officeService.getOffices(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        this.userAccessList = res.body.data
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.userAccessList = [];
        }

        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: '' });
        }
      },
      () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
      });

  }

  getMenu(value: string) {
    this.roleService.getMenuList().subscribe(res => {
      if (res.status === 200) {
        for (let i in res.body) {
          if (value === res.body[i].roleOid) {
            this.jsonMenuList = JSON.parse(res.body[i].roleAccessJson);
            this.usersService.clearCurrentMenuOids();
            this.usersService.setOidToCurrentMenuOids(this.jsonMenuList);
          }
        }
        // this.jsonMenuList = JSON.parse(res.body[1].roleAccessJson);
      }
    },
      err => {
        this.isLoading = false;
        if (err.status === 404) {
          this.jsonMenuList = [];
        }
        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: '' });
        }
      },
      () => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
      });
  }

  getRoleList(offset: number = 0, pageSize: number = 0, searchText: string = '') {
    this.roleService.getRole(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        this.roleList = res.body;
        //console.log("this.roleList :",this.roleList);
      }
    },
      err => {
        this.isProgressBarLoading = false;
        this.isLoading = false;
        if (err.status === 404) {
          this.roleList = [];
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

  check() {
    //console.log(this.siteJson);
  }

  onSubmit() {
    this.isLoading = true;
    this.userDataJson.siteOid.push(this.siteJson);
    this.userGroup.value.dataJson = JSON.stringify(this.userDataJson);
    this.userGroup.value.menuJson = JSON.stringify(this.jsonMenuList);
    this.userGroup.value.role = this.getRoleNameFromRoleOid(this.userGroup.value.roleOid);
    this.usersService.saveUser(this.userGroup.value).subscribe(res => {
      if (res.status === 201) {
        this.messageService.add({ severity: 'success', summary: 'User saved successfully', detail: '' });
        setTimeout(() => {
          this.router.navigate(['users'])
        }, 3000);
      }
    },
      err => {
        this.isLoading = false;
        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        }
      },
      () => {
        this.isLoading = false;
      });
  }
  getRoleNameFromRoleOid(givenRoleOid: any): any {
    for (var i in this.roleList) {
      if (this.roleList[i].roleOid == givenRoleOid) {
        return this.roleList[i].roleId;
      }
    }
    return "";
  }

  onCancel() {
    this.router.navigate(['users']);
  }


  updateEnable(menu) {
    menu.enable = !menu.enable;

    if (menu.enable == true) {

      this.usersService.addCurrentMenuOids(menu.oid);
    }
  }
}
