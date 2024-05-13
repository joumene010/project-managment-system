// authentication.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.apiBaseUrl+'/auth'; 
 
  constructor(private http: HttpClient) {}
 
  public getUser(name : string, password:string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get?name=${name}&password=${password}`);
  }

  
}
