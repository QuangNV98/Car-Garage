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
export class TransactionService {
    constructor(
        private http: HttpClient
    ) { }

    doCreateTransaction(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/insertTransaction', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    doUpdateTransaction(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/updateTransaction', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    getAllTransRepairing(): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getAllTransRepairing');
        return this.http.get<any[]>(url,{headers: headers});
    }

    getTransRepairingById(request: any): Observable<any>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getTransRepairById', params);
        return this.http.get<any>(url,{headers: headers});
    }

    getListTransEquip(request: any): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getListTransEquip', params);
        return this.http.get<any[]>(url,{headers: headers});
    }

    getAllTransCompleted(): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getAllTransCompleted');
        return this.http.get<any[]>(url,{headers: headers});
    }
}