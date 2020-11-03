import { isNullOrUndefined } from 'util';
import { RequestParam } from 'app/model/common/request-param';

export class ParamUtil {

  public static toRequestParams<T>(obj: T) {
    const params: RequestParam[] = [];
    Object.keys(obj).forEach(k => {
      if (!isNullOrUndefined(obj[k])) {
        params.push(new RequestParam(k, obj[k]));
      }
    });
    return params;
  }

}
