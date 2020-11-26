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
export class EquipmentService {
    constructor(
        private http: HttpClient
    ) { }

    doCreateEquipment(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/doCreateEquipment', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    getAllEquipment(): Observable<any[]>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getAllEquipment');
        return this.http.get<any[]>(url,{headers: headers});
    }

    getEquipmentById(request: any): Observable<any>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/api/getEquipmentById', params);
        return this.http.get<any>(url,{headers: headers});
    }

    doUpdateEquipment(request: any): Observable<any> {
        return this.http.post<ResponseData<any>>(environment.apiURL + '/api/updateEquipment', request, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

}