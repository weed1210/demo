import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { AUTHENTICATION_JWT } from '../../ultilities/consts/cookie-key';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router: Router = inject(Router);
  if (cookieService.get(AUTHENTICATION_JWT)) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
