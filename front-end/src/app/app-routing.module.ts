import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectComponent } from './components/project/project.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard ] },
  {path:'projects-list',component:ProjectsListComponent, canActivate: [AuthGuard ]},
  {path:'project',component:ProjectComponent, canActivate: [AuthGuard ]},
  {path:'employees-list',component:EmployeesListComponent, canActivate: [AuthGuard ]},
  {path:'employee',component:EmployeeComponent, canActivate: [AuthGuard ]},
  {path:'login',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
