import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountInfo } from 'app/model/account-info';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ApiUrlUtil } from 'app/utils/api-url.util';
import { RequestParam } from 'app/model/common/request-param';
import { ParamUtil } from 'app/utils/param.util';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  checkCredentials(): boolean {
    if (Cookie.get('ACCESS_TOKEN') != null && Cookie.get('ACCESS_TOKEN') != '') {
      console.log(Cookie.get('ACCESS_TOKEN'))
      // this.router.navigate(['/login']);
      // not login
      return true;
    }
    return false;
  }

  saveToken(token: any) {
    Cookie.delete('ACCESS_TOKEN');
    Cookie.delete('USER_NM');
    Cookie.delete('USER_ID');
    Cookie.delete('USER_ROLE');

    const expireDate = new Date().getTime() + (100000 * token.expires_in);
    Cookie.set('ACCESS_TOKEN', token.token, expireDate);
    // Cookie.set('USER_NM', token.usernm, expireDate);
    // Cookie.set('USER_ID', token.userId, expireDate);
    // Cookie.set('USER_ROLE', token.userRoles, expireDate);

    // this.saveLoginInfo(token.userId);

    this.router.navigate(['/admin/']);
  }

  login(account: AccountInfo): Observable<any> {

    const authArl = environment.apiURL + '/authenticate';

    const params: RequestParam[] = ParamUtil.toRequestParams(account);
    // params.append('grant_type', 'password');
    console.log('params',params);
    // const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/authenticate',params);

    let headers = new HttpHeaders();
    // headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers = headers.append('Content-type', 'application/json');

    // headers = headers.append('Authorization', AuthConstant.AUTHORIZATION_VALUE);

    return this.http.post<any>(authArl,account, {headers: headers, observe: 'response'});
  }

  logout() {
    Cookie.delete('ACCESS_TOKEN');
    Cookie.delete('USER_NM');
    Cookie.delete('USER_ID');
    Cookie.delete('USER_ROLE');
    this.router.navigate(['/login']);
  }

}