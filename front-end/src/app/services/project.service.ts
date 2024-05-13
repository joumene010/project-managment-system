import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.apiBaseUrl+'/projects'; 

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/get?id=${id}`);
  }

  getNumberOfProjectsByStatus(status: string): Observable<number> {
    const params = new HttpParams().set('status', status);
    return this.http.get<number>(`${this.baseUrl}/count-by-status`, { params });
  }
  getProjectByName(name: string): Observable<Project> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Project>(`${this.baseUrl}/by-name`, { params });
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/create`, project);
  }

  updateProject(updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/update`, updatedProject);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?id=${id}`);
  }
}
