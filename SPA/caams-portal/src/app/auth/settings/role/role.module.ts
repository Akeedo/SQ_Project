import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';

import { RoleRoutingModule } from './role-routing.module';
import { ListRoleComponent } from './components/list-role/list-role.component';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';

import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";



@NgModule({
  declarations: [
    ListRoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    TreeModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
  ]
})
export class RoleModule { }
