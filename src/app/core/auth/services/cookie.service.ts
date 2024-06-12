'use client'

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Dictionary } from '../../../share/models/dictionary.model';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore: Dictionary<string, string>;
  isBrowser: boolean;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.parseCookies(this.document.cookie);
    }
  }

  public parseCookies(cookies: string) {
    this.cookieStore = {
      data: []
    }
    if (!!cookies === false) { return; }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore.data.push({
        key: cookieArr[0].trim(),
        value: cookieArr[1]
      });
    }
  }

  get(key: string) {
    if (this.isBrowser) {
      this.parseCookies(this.document.cookie);
      let cookieData = !!this.cookieStore.data.find(x => x.key === key)
        ? this.cookieStore.data.find(x => x.key === key)
        : null;
      return cookieData ? cookieData.value : null;
    }
    else {
      return '';
    }
  }

  remove(key: string) {
    if (this.isBrowser) {
      this.document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }
  }

  set(key: string, value: string) {
    if (this.isBrowser) {
      this.document.cookie = key + '=' + value;
    }
  }
}
