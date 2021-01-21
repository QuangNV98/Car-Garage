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
export class GuaranteeService {
    constructor(
        private http: HttpClient
    ) { }

    doCreateGuarantee(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/insertGuarantee', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    getAllGuarantee(): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getAllGuarantee');
        return this.http.get<any[]>(url,{headers: headers});
    }

    getGuarantedById(request: any): Observable<any>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getGuarantedById', params);
        return this.http.get<any>(url,{headers: headers});
    }

    doUpdateGuarantee(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/updateGuaranted', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    deleteGuarantedById(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/deleteGuarantedById', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    getListIsGuaranted(request: any): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getListIsGuaranted', params);
        return this.http.get<any[]>(url,{headers: headers});
    }

}