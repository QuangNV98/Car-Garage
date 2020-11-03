import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { AccountInfo } from 'app/model/account-info';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private authService: AuthenticationService) { }

  login(account: AccountInfo): Observable<any>  {
    return this.authService.login(account);
  }
}
