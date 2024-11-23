import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export function baseUrlInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const apiReq = req.clone({ url: `${environment.apiBaseUrl}${req.url}` });
  return next(apiReq);
}
