import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JwtPayload } from 'src/app/core/auth/models/jwt-payload.model';
import { CookieService } from 'src/app/core/auth/services/cookie.service';
import { MembersActions } from 'src/app/core/auth/states/members.action';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { TaskSearchAction, TasksActions } from 'src/app/features/task/states/tasks.action';
import { AUTHENTICATION_JWT } from 'src/app/share/consts/cookie-key';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  loggedIn = true;
  loggedInMember: JwtPayload;
  searchForm: FormGroup;

  constructor(
    private store: Store,
    private cookieService: CookieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
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

    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),
    });
  }

  logout() {
    this.cookieService.remove(AUTHENTICATION_JWT);
    this.store.dispatch(MembersActions.logout({
      id: this.loggedInMember.UserId
    }));
    this.router.navigate(['login']);
  }

  onSubmit() {
    console.log(this.searchForm.value.searchValue);
    this.store.dispatch(TaskSearchAction.search({
      searchValue: this.searchForm.value.searchValue
    }));
  }
}
