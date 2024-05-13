import { Employee } from "./employee.model";
import { Project } from "./project.model";

export class EmployeeProject {
    id!: number;
    employee: Employee;
    project: Project;
    task: string;
    workHours: number;

    constructor() {
     
        this.employee = new Employee();
        this.project = new Project();
        this.task = "";
        this.workHours = 0;
    }
}
