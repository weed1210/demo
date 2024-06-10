import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JwtPayload } from 'src/app/core/auth/models/jwt-payload.model';
import { CookieService } from 'src/app/core/auth/services/cookie.service';
import { MembersActions } from 'src/app/core/auth/states/members.action';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { AUTHENTICATION_JWT } from 'src/app/core/ultilities/consts/cookie-key';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  loggedIn = false;
  loggedInMember: JwtPayload;

  constructor(
    private store: Store, 
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(selectMember).subscribe({
      next: member => {
        console.log(member);
        this.loggedInMember = member;
        if (member?.UserID !== '') {
          this.loggedIn = true;
        }
        else {
          this.loggedIn = false;
        }
      }
    });
  }

  logout() {
    this.cookieService.remove(AUTHENTICATION_JWT);
    this.store.dispatch(MembersActions.logout({
      id: this.loggedInMember.UserID
    }));
    this.router.navigate(['login']);
  }
}
