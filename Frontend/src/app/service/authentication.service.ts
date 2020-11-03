import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountInfo } from 'app/model/account-info';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ApiUrlUtil } from 'app/utils/api-url.util';
import { RequestParam } from 'app/model/common/request-param';
import { ParamUtil } from 'app/utils/param.util';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
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

}