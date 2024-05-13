import { Component , ViewChild, ElementRef} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Observable, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeProject } from 'src/app/models/employeeProject.model';
import { EmployeeProjectService } from 'src/app/services/employee-project.service';



@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  public projects: Project[] = []; 
  public newProject: Project = new Project;
  public deleteProject: Project = new Project;
  public viewProject: Project = new Project;
  public alert !: boolean ;
  public alertMessage !: string ;
  public deleteAlert !: boolean  ;
  public deleteAlertMessage !: string ;


  @ViewChild('addProjectForm') addProjectForm!: NgForm;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  constructor(private projectService: ProjectService, 
    private EmployeeProjectService : EmployeeProjectService,
    private router: Router ) {} 

  public ngOnInit() {
    this.newProject = new Project;
    this.getProjects();
  }

  public getProjects() {
    this.projectService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response; 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProject(addProjectForm : NgForm): void { 
    this.alert= false;
    this.alertMessage="";
    const startDate = new Date(this.newProject.startDate);
    const dueDate = new Date(this.newProject.dueDate);
    this.alert  = startDate > dueDate;
    if (this.alert){
        this.alertMessage="The start date should precede the due date";
    }
    this.projectService.getProjectByName(this.newProject.name).subscribe(
      (response:Project)=>{
        console.log("response",response);
        if(response){
          this.alert = true;
          console.log(this.alert);
          this.alertMessage += "<br/> This name already exists. Please choose another one.";
        }
        if(this.alert == false){
          this.newProject.image = this.newProject.image.replace("C:\\fakepath\\", "../assets/img/projects/");
          this.newProject.status = "Pending";
          this.projectService.createProject(this.newProject).subscribe(
            (response: Project) => {
              const closeButton = document.getElementById("closeButton");
              closeButton?.click();
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
  public closeAddForm(){
      this.addProjectForm.resetForm();
      this.ngOnInit();
    }
  
  public setDeletePorject(projectdelete : Project){
    this.deleteAlert = false;
    this.deleteAlertMessage="";
    this.deleteProject = projectdelete ;
    this.EmployeeProjectService.getEmployeeProjectsByProject(this.deleteProject.id).subscribe(
      (response:EmployeeProject[])=>{
        console.log(response.length);
            if(response.length>0){
                this.deleteAlert = true;
                this.deleteAlertMessage = "TO DELETE A PROJECT YOU GOT TO REMOVE IT4S TEAM FIRST"
                this.ngOnInit();
              }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      
      }
      );
  }

  public onDeleteProject(){
    console.log(this.deleteProject)
    this.projectService.deleteProject(this.deleteProject.id).subscribe(
      (Response : void )=> {
          this.deleteProject = new Project;
          this.ngOnInit() ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public onCancelDeleteProject(){
    this.deleteProject = new Project ;
    this.ngOnInit() ;
  }

  public onViewProject(project : Project){
    this.router.navigate(['/project'], { queryParams: { projectId: project.id } });
  }



}
