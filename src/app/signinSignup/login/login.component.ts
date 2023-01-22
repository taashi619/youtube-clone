import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from './../../auth-service.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/Request/loginRequest';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  password = new FormControl();
  username=new FormControl();
  isAuthenticated:boolean=false;
  constructor(private authService : AuthServiceService,private snackBar: MatSnackBar,private odicSecurityService : OidcSecurityService,private router:Router){
    this.loginForm = new FormGroup(
      {
        username:this.username,
        password:this.password
      }
    );
    this.odicSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated})=>{
        this.isAuthenticated=isAuthenticated;

      }
    )

  }

  login(){
    const loginDeatils : LoginRequest={
      "username":this.loginForm.get('username')?.value,
      "password":this.loginForm.get('password')?.value
    }
    this.authService.login(loginDeatils).subscribe(
      (res)=>{
        // console.log(res);
        this.snackBar.open(
          "Succesfuly logged the user","OK"
        );
        localStorage.setItem("user", JSON.stringify(res));
        this.isAuthenticated=true;
        this.router.navigateByUrl("/home");
        this.loginForm.reset();

      }
    )
  }

}
