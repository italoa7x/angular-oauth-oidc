import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './oauth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleproject';
  constructor(private oauthService: OAuthService) {
    this.configurationSignOn();
  }

  configurationSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    
  }

  login(){
    this.oauthService.initImplicitFlow();
  }
  
  logout(){
    this.oauthService.logOut();
  }

  get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}