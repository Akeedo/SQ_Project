import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RadioButtonModule} from 'primeng/radiobutton';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {TimelineModule} from 'primeng/timeline';
import {ButtonModule} from 'primeng/button';

import { EmployeeListComponent } from './employee/components/employee-list/employee-list.component';
import { HomeComponent } from './home/components/home/home.component';
import { LoadingImageModule } from 'src/common/components/loading-image/loading-image.module';
import { PrimengModule } from 'src/common/modules/primeng-modules'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';

import { LoginComponent } from './Login/component/login/login.component';

export function createTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,

    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingImageModule,
    PrimengModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpBackend]
      }
  }),
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  RadioButtonModule   ,
  PasswordModule      ,
  ToastModule         ,
  DropdownModule      ,
  CheckboxModule      ,
  CalendarModule      ,
  ConfirmDialogModule ,
  MultiSelectModule   ,
  TimelineModule      ,
  ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
