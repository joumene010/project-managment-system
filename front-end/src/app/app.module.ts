import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeProjectService } from './services/employee-project.service';
import { EmployeeService } from './services/employee.service';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './components/project/project.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectsListComponent,
    AddProjectModalComponent,
    ProjectComponent,
    EmployeesListComponent,
    EmployeeComponent,
    LoginComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule, // Add RouterModule here
    AppRoutingModule // Assuming you have an AppRoutingModule with routes
  ],
  providers: [ProjectService, EmployeeProjectService ,EmployeeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
