import { HomeComponent } from './../home/home.component';
import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ViewChild(HomeComponent)
  // home_access: HomeComponent;
  @Output() open = new EventEmitter<boolean>();

  showFiller = false;
  opened=false;
  isAuthenticated: boolean = false;
  constructor(private odicSecurityService : OidcSecurityService,private router:Router,private authService:AuthServiceService ){


  }


  ngOnInit(): void {
    this.odicSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated})=>{
        this.isAuthenticated=isAuthenticated;

      }
    )
  }
  ngDoCheck(){
    if(this.authService.getCurrentUser()){
      // console.log(this.authService.getCurrentUser());
      this.isAuthenticated=true;
    }
  }

  login(){
    this.router.navigateByUrl("/login");

  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated=false;
  }
  sidenav(){
    if (this.opened) {
      this.open.emit(false);
      this.opened=false;
      // this.open=false;
      // console.log(this.open);
      // this.home_access.open=false;
    }else{
      // this.home_access.open=true;
      // this.open=true;
      this.open.emit(true);
      this.opened=true;
      // console.log(this.open);
    }

  }
}
