import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService ,private router: Router) { }

  public login(): void {
    const isAuthenticated = this.authService.getUser(this.username, this.password).subscribe(
      (response : User)=>{
        
        if(response!=null){
        
          sessionStorage.setItem('Login', 'true');
         this.router.navigate(['/dashboard']);
        }else{
          sessionStorage.setItem('Login', 'false');
          this.router.navigate(['/Login']);
        }
      }
    )
    
  
}
}
