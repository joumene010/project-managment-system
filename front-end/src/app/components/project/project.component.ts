import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeProjectService } from 'src/app/services/employee-project.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeProject } from 'src/app/models/employeeProject.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public project = new Project ;
  public projectId !: number;
  public costPercentage!:number;
  public employeesNoP : Employee [] = [];
  public employeeProjects : EmployeeProject[] = [];
  public UpdateMemberInfo = new EmployeeProject ;
  public updatedProjectData = new Project;
  public task !: string;
  public workHours !: number;
  public alert !: boolean ;
  public alertMessage !: string ;

  @ViewChild('updateMemberForm') updateMemberForm!: NgForm;
  constructor(private projectService: ProjectService, 
    private router: ActivatedRoute ,
    private employeeProjectService : EmployeeProjectService,
    private employeeService : EmployeeService
    ) {} 

  public ngOnInit() {
    this.router.queryParams.subscribe(params => {
         this.projectId = params['projectId'];
         
    });
    this.projectService.getProjectById(this.projectId).subscribe(
      (response: Project)=> {
          this.project = response;
          this.costPercentage = (this.project.cost/this.project.budget)*100;
          this.employeeProjectService.getEmployeeProjectsByProject(this.projectId).subscribe(
            (response2 : EmployeeProject[])=>{
              this.employeeProjects = response2;
            }
          ),
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
      }
         ),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  }

  public onUpdateProject(form : NgForm){
    this.updatedProjectData = form.value;
    this.updatedProjectData.id = this.project.id;
    this.updatedProjectData.cost = this.project.cost;
    this.alert= false;
    this.alertMessage="";
    const startDate = new Date(this.updatedProjectData.startDate);
    const dueDate = new Date(this.updatedProjectData.dueDate);
    this.alert  = startDate > dueDate;
    if (this.alert){
        this.alertMessage="The start date should precede the due date";
    }
    this.projectService.getProjectByName(this.updatedProjectData.name).subscribe(
      (response:Project)=>{
        if(response && response.id!=this.updatedProjectData.id){
          this.alert = true;
          console.log(this.alert);
          this.alertMessage += "<br/> This name already exists. Please choose another one.";
        }
        if(this.alert == false){
          
          this.updatedProjectData.image = this.updatedProjectData.image.replace("C:\\fakepath\\", "../assets/img/projects/");
          this.projectService.updateProject(this.updatedProjectData).subscribe(
            (response: Project) => {
              const closeButton = document.getElementById("closeButton");
              closeButton?.click();
              this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      
    );
  }

  public onRemoveEmployee(removeMember : EmployeeProject){
  
    this.project.cost -=(((this.UpdateMemberInfo.employee.salary/25)/10)*this.UpdateMemberInfo.workHours);
    this.projectService.updateProject(this.project).subscribe();
    this.employeeProjectService.deleteEmployeeProject(removeMember.id).subscribe(
      (response: void)=> {
          this.ngOnInit() ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    )
  }

  public onaddMember(projectId : number){
    this.employeeService.getEmployeesNotOnProject(projectId).subscribe(
      (response: Employee[])=> {
        this.employeesNoP  = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    )

  }

  public addEmployee(employee: Employee){ 
    
   this.employeeProjectService.createEmployeeProject(employee.id , this.projectId).subscribe(
      (response)=> {
     
        const closeButton = document.getElementById("closeButton2");
        if (closeButton) {
          closeButton.click();
          
        }
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    ) 
  }

  public setUpdateMemberInfo(employeeProject : EmployeeProject){
        this.UpdateMemberInfo = employeeProject;
  }

  public onUpdateMember(){
    this.UpdateMemberInfo.task = this.task;
    this.project.cost -=(((this.UpdateMemberInfo.employee.salary/25)/10)*this.UpdateMemberInfo.workHours)
    this.UpdateMemberInfo.workHours = this.workHours;
    this.project.cost += ((this.UpdateMemberInfo.employee.salary/25)/10)*this.workHours;
    
    this.projectService.updateProject(this.project).subscribe();
    this.employeeProjectService.updateEmployeeProject(this.UpdateMemberInfo).subscribe(
      (response:EmployeeProject)=> {
        const closeButton = document.getElementById("closeButton3");
        if (closeButton) {
          closeButton.click();
          this.ngOnInit();
        }
    
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    )
  }

  public resetForm(){
    this.updateMemberForm.resetForm();
  }

}

