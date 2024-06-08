import { Inject, Injectable } from '@angular/core';
import { Dictionary } from '../../ultilities/models/dictionary';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore: Dictionary<string, string>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.parseCookies(this.document.cookie);
  }

  public parseCookies(cookies = this.document.cookie) {
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
    this.parseCookies();
    let cookieData = !!this.cookieStore.data.find(x => x.key === key)
      ? this.cookieStore.data.find(x => x.key === key)
      : null;
    return cookieData ? cookieData.value : null;
  }

  remove(key: string) {
    this.document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string) {
    this.document.cookie = key + '=' + value;
  }
}
