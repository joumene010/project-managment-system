import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeProject } from '../models/employeeProject.model';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root',
})
export class EmployeeProjectService {
  private baseUrl = environment.apiBaseUrl+'/employee-projects'; 

  constructor(private http: HttpClient) {}

  getAllEmployeeProjects(): Observable<EmployeeProject[]> {
    return this.http.get<EmployeeProject[]>(`${this.baseUrl}`);
  }

  getEmployeeProjectById(id: number): Observable<EmployeeProject> {
    return this.http.get<EmployeeProject>(`${this.baseUrl}/get?id=${id}`);
  }

  getEmployeeProjectsByProject(projectId: number): Observable<EmployeeProject[]> {
    return this.http.get<EmployeeProject[]>(`${this.baseUrl}/getByProject?projectId=${projectId}`);
  }

  getEmployeeProjectsByEmployee(EmployeeId: number): Observable<EmployeeProject[]> {
    return this.http.get<EmployeeProject[]>(`${this.baseUrl}/getByEmployee?employeeId=${EmployeeId}`);
  }

  createEmployeeProject(employeeId: number, projectId: number): Observable<EmployeeProject> {
    const body = { employeeId, projectId };
    return this.http.post<EmployeeProject>(`${this.baseUrl}/create?projectId=${projectId}&employeeId=${employeeId}`,body);
  }

  updateEmployeeProject(employeeProject: EmployeeProject): Observable<EmployeeProject> {
    return this.http.put<EmployeeProject>(`${this.baseUrl}/update`, employeeProject);
  }

  deleteEmployeeProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?id=${id}`);
  }
}
