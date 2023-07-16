import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './model/login';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { JwtAuth } from 'src/common/constants/jwtAuth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUrl = "security/createToken";
  employeeUrl = "api/v1/Employees";

  constructor(private http: HttpClient) { }

  public login(user: Login): Observable <any>{
    return this.http.post<Login>(`${environment.authUrl}/${this.loginUrl}`,user);
  }
  
  
}
