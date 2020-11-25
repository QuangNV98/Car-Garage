import { ParamUtil } from './../utils/param.util';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { AccountInfo } from 'app/model/account-info';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private authService: AuthenticationService) { }

  isLoggedIn() {
    return this.authService.checkCredentials();
  }

  saveToken(token: any) {
    this.authService.saveToken(token);
  }

  login(account: AccountInfo): Observable<any>  {
    return this.authService.login(account);
  }

  logout() {
    this.authService.logout();
  }
}
