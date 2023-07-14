import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UsersService } from "@app/auth/settings/users/services/users.service";
import { data } from "jquery";
import { MessageService, TreeNode } from "primeng/api";
import { Role } from "../../model/role";
import { RoleService } from "../../services/role.service";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

  public isProgressBarLoading: boolean;
  public isLoading: boolean = false;
  role: Role;
  public jsonMenuList: any = [];
  public thisRolesMenuList: any = [];
  roleStatusList: any = [];
  roleGroup: FormGroup;
  selectedLeftMenu: string[] = [];
  items: { label: string; url: string; }[];

  constructor(private roleService: RoleService, private router: Router,
    private messageService: MessageService, private fb: FormBuilder,
    private activateRoute: ActivatedRoute, private usersService: UsersService) {
    this.roleStatusList = [
      { name: "Active", oid: "Active" },
      { name: "Inactive", oid: "Inactive" },
    ];
  }

  ngOnInit(): void {
    this.roleGroup = this.fb.group({
      roleOid: [''],
      organizationOid: [''],
      departmentOid: [''],
      roleId: [''],
      roleDescription: [''],
      roleStatus: [''],
      roleAccessJson: ['']
    })
    console.log(this.activateRoute.snapshot.paramMap.get("oid"));

    this.getRoleByOid(this.activateRoute.snapshot.paramMap.get("oid"));
    this.getMenu();
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Settings / Role / Update Role', url: '/role' }
    ];
  }


  getMenu() {
    this.roleService.getMenuList().subscribe(res => {
      if (res.status === 200) {
        this.jsonMenuList = (res.body);
        this.setFormValue();
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


  getRoleByOid(oid: string) {
    this.isLoading = true;

    this.roleService.getRoleByOid(oid).subscribe(
      (res) => {
        if (res.status === 200) {

          this.role = res.body[0];

          this.setFormValue();
          this.roleService.getRoleByOidMenuJson(oid).subscribe(
            (res) => {
              this.thisRolesMenuList = res.body.menuOids;
              this.usersService.clearCurrentMenuOids();
              this.usersService.setOidToCurrentMenuOidsFromOidMenu(this.thisRolesMenuList);
            }
          );
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
    this.roleGroup.patchValue({
      roleOid: this.role.roleOid,
      organizationOid: this.role.organizationOid,
      departmentOid: this.role.departmentOid,
      roleId: this.role.roleId,
      roleDescription: this.role.roleDescription,
      roleStatus: this.role.roleStatus,
    });
  }

  onUpdate() {
    this.isLoading = true;
    const payload = this.roleGroup.value;

    payload.roleAccessJson = JSON.stringify(this.jsonMenuList);
    this.roleService.updateRole(payload).subscribe(res => {
      if (res.status === 200) {
        this.roleService.saveRoleMenu(this.activateRoute.snapshot.paramMap.get("oid")).subscribe(
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
        this.messageService.add({ severity: 'success', summary: 'Role updated successfully', detail: '' });
        setTimeout(() => {
          this.router.navigate(['role'])
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
  checkInCurrentMenu(givenMenu): boolean {
    if (this.usersService.getCurrentMenuOids().includes(givenMenu.oid)) {
      givenMenu.enable = true;
      return true;
    } else {
      givenMenu.enable = false;
      return false;
    }
  }
}