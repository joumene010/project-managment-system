import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model'; // Import your Employee model
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiBaseUrl+'/employees'; 

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Employee>(`${this.baseUrl}/get?`,{params});
  }

  getNumberOfEmployees(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getEmployeeByEmail(Email: string): Observable<Employee> {
    const params = new HttpParams().set('email', Email);
    return this.http.get<Employee>(`${this.baseUrl}/by-email`, { params });
  }

  getEmployeeByPhoneNumber(phoneNumber: string): Observable<Employee> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.get<Employee>(`${this.baseUrl}/by-phoneNumber`, { params });
  }

  getEmployeesNotOnProject(projectId: number): Observable<Employee[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<Employee[]>(`${this.baseUrl}/notOnProject`,{params});
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/create`, employee);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update`, updatedEmployee);
  }

  deleteEmployee(id: number): Observable<void> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<void>(`${this.baseUrl}/delete`,{params});
  }
}
