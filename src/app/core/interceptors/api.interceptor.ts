import type { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from '../auth/services/cookie.service';
import { AUTHENTICATION_JWT } from '../../share/consts/cookie-key';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get(AUTHENTICATION_JWT);
  const apiReq = req.clone({
    url: `https://localhost:7262/api/${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${token ?? ''}`
    }
  });
  return next(apiReq);
};