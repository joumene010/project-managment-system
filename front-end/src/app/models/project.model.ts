import { EmployeeProject } from "./employeeProject.model";

export class Project {
  id!: number;
  name: string;
  description: string;
  budget: number;
  cost: number;
  startDate: string;
  dueDate: string;
  status: string;
  image: string;


  constructor() {

    this.name = "";
    this.description = "";
    this.budget = 0;
    this.cost = 0;
    this.startDate = "";
    this.dueDate = "";
    this.status = "";
    this.image = "";
   
  }
}
