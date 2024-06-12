import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JwtPayload } from 'src/app/core/auth/models/jwt-payload.model';
import { CookieService } from 'src/app/core/auth/services/cookie.service';
import { MembersActions } from 'src/app/core/auth/states/members.action';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { AUTHENTICATION_JWT } from 'src/app/share/consts/cookie-key';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  loggedIn = true;
  loggedInMember: JwtPayload;

  constructor(
    private store: Store,
    private cookieService: CookieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.select(selectMember).subscribe({
        next: member => {
          console.log(member);
          this.loggedInMember = member;
          if (member?.UserId !== '') {
            this.loggedIn = true;
          }
          else {
            this.loggedIn = false;
          }
        }
      });
    }
  }

  logout() {
    this.cookieService.remove(AUTHENTICATION_JWT);
    this.store.dispatch(MembersActions.logout({
      id: this.loggedInMember.UserId
    }));
    this.router.navigate(['login']);
  }
}
