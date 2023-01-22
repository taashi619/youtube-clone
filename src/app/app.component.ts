import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'cloneFront';

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth()
        .subscribe(({ isAuthenticated }) => {
          console.log('app is authenticated',isAuthenticated)
    });
  }

}
