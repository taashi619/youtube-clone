import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-65jll847fuvg38tv.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'GR6Ff3V54lPP0ov4ATAS3ggU37B09Pju',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            // secureRoutes:['http://localhost:8080/'],
            // customParamsAuthRequest:{
            //   audience:'http://localhost:8080'
            // }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
