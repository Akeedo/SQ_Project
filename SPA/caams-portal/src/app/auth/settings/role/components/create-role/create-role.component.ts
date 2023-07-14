import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "@app/auth/settings/users/services/users.service";
import { data } from "jquery";
import { MessageService, TreeNode } from "primeng/api";
import { Role } from "../../model/role";
import { RoleService } from "../../services/role.service";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  role: Role;
  public jsonMenuList: any = [];
  roleStatusList: any = [];
  roleGroup: FormGroup;
  selectedLeftMenu: string[] = [];
  items: { label: string; url: string; }[];
  dontShowMenu: boolean = false;

  constructor(private roleService: RoleService, private router: Router, private activateRoute: ActivatedRoute,
    private messageService: MessageService, private fb: FormBuilder, private usersService: UsersService) {
    this.roleStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.roleGroup = this.fb.group({
      roleOid: [''],
      organizationOid: ['ORG-01'],
      departmentOid: ['Cust-01'],
      roleId: [''],
      roleDescription: [''],
      roleStatus: [''],
      roleAccessJson: ['']
    })
    this.getMenu();
    this.usersService.clearCurrentOid();
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Settings / Role / Create New Role', url: '/role' }
    ];
  }

  getMenu() {
    this.roleService.getMenuList().subscribe(res => {
      if (res.status === 200) {
        this.jsonMenuList = (res.body);
        this.usersService.clearCurrentOid();
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

  onSubmit() {
    this.isLoading = true;
    const payload = this.roleGroup.value;
    // this.router.navigate(["create-role"], { relativeTo: this.activateRoute });
    // console.log("check :", payload);

    payload.roleAccessJson = JSON.stringify(this.jsonMenuList);
    this.roleService.saveRole(payload).subscribe(res => {
      if (res.status === 201) {
        this.roleService.saveRoleMenu(res.body.roleOid).subscribe(
          resFromMenu => {
            if (resFromMenu.status == 200) {
              this.messageService.add({ severity: 'success', summary: 'Role updated successfully', detail: '' });
            }
          },
          errorFromMenu => {
            this.isLoading = false;
            if (errorFromMenu.error && errorFromMenu.error.message) {
              this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: 'Role-menu could not be saved.' });
            }
          },
          () => {
            this.isLoading = false;
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Role saved successfully', detail: '' });
        setTimeout(() => {
          this.router.navigate(['role'])
        }, 3000);
      }
    },
      err => {
        this.isLoading = false;
        if (err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: "Please try again later", detail: '' });
        }
      },
      () => {
        this.isLoading = false;
      });
  }

  onCancel() {
    this.router.navigate(['role']);
  }

  updateEnable(menu) {
    menu.enable = !menu.enable;
    if (menu.enable == true) {
      this.usersService.addCurrentMenuOids(menu.oid);
    } else {
      this.usersService.deleteCurrentMenuOids(menu.oid);
    }
  }
}
