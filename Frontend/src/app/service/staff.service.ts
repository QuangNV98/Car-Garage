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
export class StaffService {
    constructor(
        private http: HttpClient
    ) { }

    getListCities(): Observable<any> {
        const url = 'https://thongtindoanhnghiep.co/api/city';
        return this.http.get<any>(url);
    }

    getListDistricts(city_id: any): Observable<any> {
        const url = 'https://thongtindoanhnghiep.co/api/city/' + city_id + '/district'
        return this.http.get<any>(url);
    }

    getListWards(district_id: any): Observable<any> {
        const url = 'https://thongtindoanhnghiep.co/api/district/' + district_id + '/ward'
        return this.http.get<any>(url);
    }

    // doSaveStaff(request: any): Observable<any> {
    //     console.log(HeadersUtil.getHeadersAuth());
    //     return this.http.post<ResponseData<any>>(environment.apiURL + '/api/doSaveStaff', request, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     });
    // }

    doSaveStaff(request: any): Observable<any>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/hello',params);
        return this.http.get<any>(url,{headers: headers});
      }
}