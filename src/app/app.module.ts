import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbAlertModule, NgbHighlight, NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeService } from './employee/employee.service';
import { NgbdSortableHeader } from './employee/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    EmployeeComponent,
    EmployeedetailComponent,
    NotFoundComponent,
    AddEmployeeComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DecimalPipe,
    NgbTypeaheadModule,
    NgbPaginationModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    NgbAlertModule
  ],
  providers: [DecimalPipe, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
