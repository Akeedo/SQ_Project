import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OfficeService } from '@app/auth/office/services/office.service';
import { RoleService } from '@app/auth/settings/role/services/role.service';
import { MessageService, TreeNode } from "primeng/api";
import { Users } from '../../model/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  isLoading: boolean = false;
  user: Users;
  public jsonMenuList: any = [];
  userStatusList: any = [];
  userAccessList: any = [];
  roleList: any = [];
  userGroup: FormGroup;
  items: { label: string; url: string; }[];
  public isProgressBarLoading: boolean;
  // public siteOidJson: any = '';
  public siteJson: any = [''];
  public showCheckMenu: boolean = false;

  constructor(private fb: FormBuilder, private usersService: UsersService,
    private officeService: OfficeService, private messageService: MessageService,
    private router: Router, private roleService: RoleService, private activateRoute: ActivatedRoute) {
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
      status: [''],
    })
    // this.getMenu();
    this.getSite();
    this.getRoleList();
    this.getUserByOid(this.activateRoute.snapshot.paramMap.get("oid"));
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Settings / Users / Update User', url: '/users' }
    ];

    // this.userGroup.get('roleOid').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.getMenu(value);
    //   }
    // })
  }

  getRoleList(offset: number = 0, pageSize: number = 0, searchText: string = '') {
    this.roleService.getRole(offset, pageSize, searchText.trim()).subscribe(res => {
      if (res.status === 200) {
        this.roleList = res.body;
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

  getMenu(value: string) {
    this.roleService.getMenuList().subscribe(res => {
      if (res.status === 200) {
        for (let i in res.body) {
          // console.log("res.body check",res.body);
          // console.log("i check",i);


          if (value === res.body[i].roleOid) {
            this.jsonMenuList = JSON.parse(res.body[i].roleAccessJson);
            //      console.log("in update-user this.jsonMenuList 1: ",this.jsonMenuList);
            this.usersService.clearCurrentMenuOids();
            this.usersService.setOidToCurrentMenuOids(this.jsonMenuList);

          }
        }
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

  getUserByOid(oid: string) {
    this.isLoading = true;
    this.usersService.getUserByOid(oid).subscribe(
      (res) => {
        if (res.status === 200) {
          this.user = res.body[0];
          // console.log("for checking user,", res);

          // this.jsonMenuList = JSON.parse(res.body[0].menuJson);
          // this.usersService.setOidToCurrentMenuOids(this.jsonMenuList);

          //let temp = JSON.parse(res.body[0].dataJson);
          // for(let i in temp.siteOid){
          //   this.siteJson += i;
          // }
          //this.siteJson = temp.siteOid;
          this.setFormValue();
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
  }

  setFormValue() {

    this.userGroup.patchValue({
      loginOid: this.user.loginOid,
      userId: this.user.userId,
      password: this.user.password,
      role: this.user.role,
      roleOid: this.user.roleOid,
      mobileNo: this.user.mobileNo,
      name: this.user.name,
      address: this.user.address,
      email: this.user.email,
      siteOid: this.user.siteOid,
      // menuJson: this.user.menuJson,
      // dataJson: this.user.dataJson,
      status: this.user.status,
    });
  }

  onUpdate() {
    this.isLoading = true;
    const payload = this.userGroup.value;
    payload.menuJson = JSON.stringify(this.jsonMenuList);

    this.usersService.updateUser(payload).subscribe(res => {
      if (res.status === 200) {
        this.messageService.add({ severity: 'success', summary: 'User updated successfully', detail: '' });
        setTimeout(() => {
          this.router.navigate(['users'])
        }, 3000);
      }
    },
      err => {
        this.isLoading = false;
        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: '' });
        }
      },
      () => {
        this.isLoading = false;
      });
  }

  onCancel() {
    this.router.navigate(['users']);
  }

  updateEnable(menu) {
    menu.enable = !menu.enable;

    if (menu.enable == true) {

      this.usersService.addCurrentMenuOids(menu.oid);
    }
    //    console.log(this.usersService.getCurrentMenuOids());
  }
}
