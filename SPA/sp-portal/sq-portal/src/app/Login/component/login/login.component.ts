import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Login } from '../../model/login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
    ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName:[""],
      password:[""]
    })
  }

  public loginDto = new Login();

  onSubmit(){
    this.router.navigate(["home"]);
  }

}
