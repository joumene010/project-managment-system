import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeProject } from 'src/app/models/employeeProject.model';
import { Project } from 'src/app/models/project.model';
import { EmployeeProjectService } from 'src/app/services/employee-project.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
public employee = new Employee;
public updatedEmplyeeData = new Employee;
public employeeId !: number;
public projects : EmployeeProject[] = [] ;
public alert !: boolean ;
public alertMessage !: string ;
public image!:string;


constructor(private projectService: ProjectService, 
  private router: ActivatedRoute ,
  private router2 : Router,
  private employeeProjectService : EmployeeProjectService,
  private employeeService : EmployeeService
  ) {}

public ngOnInit() {
  this.router.queryParams.subscribe(params => {
       this.employeeId = params['employeeId'];
       
  });
  this.employeeService.getEmployeeById(this.employeeId).subscribe(
    (response: Employee)=> {
        this.employee = response;
    }
       ,
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  this.employeeProjectService.getEmployeeProjectsByEmployee(this.employeeId).subscribe(
    (response2 : EmployeeProject[])=>{
      this.projects = response2;
   
    }
  ),
  (error: HttpErrorResponse) => {
    alert(error.message);
  }

}

public onUpdateEmployee(form : NgForm){
  this.alert = false;
  this.alertMessage = "";
  this.updatedEmplyeeData = form.value;
  this.updatedEmplyeeData.image = this.employee.image;
  this.updatedEmplyeeData.id = this.employee.id;
  console.log(this.updatedEmplyeeData.phoneNumber.length);

  const observables = [];
  
  if (!this.isValidEmail(this.updatedEmplyeeData.email)) {
    this.alert = true;
    this.alertMessage += '\nThe Email Format Is Not Valid';
  } else {
    observables.push(
      this.employeeService.getEmployeeByEmail(this.updatedEmplyeeData.email)
    );
  }

  if (!(this.updatedEmplyeeData.phoneNumber.length == 8)) {
    this.alert = true;
    this.alertMessage += '\nThe Phone Number Must Contain 8 Numbers';
  } else {
    observables.push(
      this.employeeService.getEmployeeByPhoneNumber(this.updatedEmplyeeData.phoneNumber)
    );
  }

  forkJoin(observables).subscribe(
    (responses: Employee[]) => {
      if (responses[0]!=null && responses[0].id!=this.updatedEmplyeeData.id) {
        this.alert = true;
        this.alertMessage += "\nThere is an employee with this email";
    }

      if (responses[1]!=null && responses[1].id!=this.updatedEmplyeeData.id) {
        this.alert = true;
        this.alertMessage += "\nThere is an employee with this phone number";
      }
      if(!this.alert){
        this.employeeService.updateEmployee(this.updatedEmplyeeData).subscribe(
          (response: Employee) => {
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          });
      }
    },
    (error) => {
      console.error(error);
    
    }
  );
}
public onViewProject(project : Project){
  this.router2.navigate(['/project'], { queryParams: { projectId: project.id } });
}
public isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
public editImage(){
  this.employee.image = this.image.replace("C:\\fakepath\\", "../assets/img/employees/");
  this.employeeService.updateEmployee(this.employee).subscribe(
    (response: Employee) => {
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
}

}

