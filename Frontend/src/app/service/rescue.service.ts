import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from 'app/model/common/response-data';
import { environment } from 'environments/environment';
import { HeadersUtil } from 'app/utils/header.util';
import { RequestParam } from 'app/model/common/request-param';
import { ParamUtil } from 'app/utils/param.util';
import { ApiUrlUtil } from 'app/utils/api-url.util';


@Injectable({
    providedIn: 'root'
})
export class RescueService {
    constructor(
        private http: HttpClient
    ) { }

    getAllRescue(): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getAllSos');
        return this.http.get<any[]>(url,{headers: headers});
    }

    doUpdateState(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/doUpdateStateSos', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    doIgnore(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/doIgnoreSos', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

}