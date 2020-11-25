import { HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { isNullOrUndefined } from 'util';

export class HeadersUtil {

    public static getHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }

    public static getHeadersAuth(): HttpHeaders {
        const token = Cookie.get('ACCESS_TOKEN');
        if (isNullOrUndefined(token)) {
          return HeadersUtil.getHeaders();
        }
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        });
      }
}