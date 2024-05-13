import { EmployeeProject } from "./employeeProject.model";

export class Employee {
    id!: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    jobTitle: string;
    employeeCode: string;
    salary: number;
    image:string;


    constructor() {
      
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phoneNumber = "";
        this.jobTitle = "";
        this.employeeCode = "";
        this.salary = 0;
        this.image="";
        
    }
}
