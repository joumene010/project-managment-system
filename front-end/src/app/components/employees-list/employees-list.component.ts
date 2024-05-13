import { Component , ViewChild, ElementRef} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProjectService } from '../../services/employee-project.service';
import { Employee } from '../../models/employee.model';
import { Observable, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { forkJoin } from 'rxjs';
import { EmployeeProject } from 'src/app/models/employeeProject.model';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  public employees: Employee[] = []; 
  public newEmployee: Employee = new Employee;
  public deleteEmployee : Employee = new Employee;
  public viewEmployee : Employee = new Employee;
  public alert !: boolean ;
  public alertMessage !: string ;
  public deleteAlert !: boolean  ;
  public deleteAlertMessage !: string ;
  

  @ViewChild('addEmployeeCloseButton') addEmployeeCloseButton !: ElementRef;
  @ViewChild('addEmployeeForm') addEmployeeForm!: NgForm;

  constructor(private EmployeeService: EmployeeService, 
    private EmployeeProjectService : EmployeeProjectService,
    private router: Router ) {} 

  public ngOnInit() {
    this.newEmployee = new Employee;
    this.getEmployees();
  
   
  }

  public getEmployees() {
    this.EmployeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response; 

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





  public onAddEmployee(): void {
    this.alert = false;
    this.alertMessage = "";
    this.newEmployee.image = this.newEmployee.image.replace("C:\\fakepath\\", "../assets/img/employees/");
  
    const observables = [];
  
    if (!this.isValidEmail(this.newEmployee.email)) {
      this.alert = true;
      this.alertMessage += '\nThe Email Format Is Not Valid';
    } else {
      observables.push(
        this.EmployeeService.getEmployeeByEmail(this.newEmployee.email)
      );
    }
  
    if (!(this.newEmployee.phoneNumber.length == 8)) {
      this.alert = true;
      this.alertMessage += '\nThe Phone Number Must Contain 8 Numbers';
    } else {
      observables.push(
        this.EmployeeService.getEmployeeByPhoneNumber(this.newEmployee.phoneNumber)
      );
    }
  
    forkJoin(observables).subscribe(
      (responses: Employee[]) => {
        if (responses[0]!=null) {
          this.alert = true;
          this.alertMessage += "\nThere is an employee with this email";
        }
  
        if (responses[1]!=null) {
          this.alert = true;
          this.alertMessage += "\nThere is an employee with this phone number";
        }
  
        if (!this.alert) {
          this.EmployeeService.createEmployee(this.newEmployee).subscribe(
            (response: Employee) => {
              const closeButton = document.getElementById("closeButton");
              closeButton?.click();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
        }
      },
      (error) => {
        console.error(error);
        // Handle error appropriately
      }
    );
  }
  

  public closeAddForm(){
      this.addEmployeeForm.resetForm();
      this.ngOnInit();
    }
  
  public setDeleteEmployee(Employeedelete : Employee){
    this.deleteAlert = false;
    this.deleteAlertMessage="";
    this.deleteEmployee = Employeedelete ;
    console.log(this.deleteEmployee);
    this.EmployeeProjectService.getEmployeeProjectsByEmployee(this.deleteEmployee.id).subscribe(
      (response:EmployeeProject[])=>{
        console.log(response.length);
            if(response.length>0){
                this.deleteAlert = true;
                this.deleteAlertMessage = "This employee is part of a project \n Make sure to remove it from the project \n if you want to delete him"
                this.ngOnInit();
              }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      
      }
      );

  }

  onDeleteEmployee(){
    this.EmployeeService.deleteEmployee(this.deleteEmployee.id).subscribe(
        (Response : void )=> {
            this.ngOnInit() ;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        
        }
      )
  }
  onCancelDeleteEmployee(){
    this.ngOnInit() 
  }

  public onViewEmployee(employee : Employee){

  
    this.router.navigate(['/employee'], { queryParams: { employeeId: employee.id } });
  }

  public isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

}
