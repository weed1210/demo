import { PLATFORM_ID, inject, makeStateKey } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { AUTHENTICATION_JWT } from '../../../share/consts/cookie-key';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    var jwt = cookieService.get(AUTHENTICATION_JWT);
    if (jwt) {
      console.log(jwt);
      return true;
    }
    else {
      console.log(jwt);
      router.navigate(['login']);
      return false;
    }
  }

  return false;
};
