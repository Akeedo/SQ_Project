import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { UpdateUsersComponent } from './components/update-users/update-users.component';

import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUsersComponent,
    UpdateUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
    MultiSelectModule
  ]
})
export class UsersModule { }
