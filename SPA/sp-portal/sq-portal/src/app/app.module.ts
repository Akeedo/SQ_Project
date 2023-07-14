import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/components/employee-list/employee-list.component';
import { HomeComponent } from './home/components/home/home.component';
import { LoadingImageModule } from 'src/common/components/loading-image/loading-image.module';
import { PrimengModule } from 'src/common/modules/primeng-modules'; 
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingImageModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
