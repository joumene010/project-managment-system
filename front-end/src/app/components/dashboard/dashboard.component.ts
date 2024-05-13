import { Component, Inject, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable, map } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../services/project.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent  {
  employeeCount: number = 0;
  inProgressProjectsCount: number = 0;
  completedProjectsCount: number = 0;
  canceledProjectsCount: number = 0;
 

  projects: any[] = [];
  
  constructor(private employeeService: EmployeeService, private projectService: ProjectService) {
   
  }

  ngOnInit(): void {
    this.getEmployeeCount();
    this.getProjectCounts();
    this.getProjectList();
   
  }
    
  

  getEmployeeCount(): void {
    this.employeeService.getNumberOfEmployees().subscribe((count: number) => {
      this.employeeCount = count;
    });
  }

  getProjectCounts(): void {

    this.projectService.getNumberOfProjectsByStatus('in progress').subscribe((count:number) => {
      this.inProgressProjectsCount = count;
    });

    this.projectService.getNumberOfProjectsByStatus('completed').subscribe((count:number) => {
      this.completedProjectsCount = count;
    });

    this.projectService.getNumberOfProjectsByStatus('canceled').subscribe((count:number) => {
      this.canceledProjectsCount =  count;
    });
  }

  getProjectList(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

 
}
