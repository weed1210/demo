import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { Router, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { jwtDecode } from "jwt-decode";
import { of, throwError } from "rxjs";
import { ErrorDialogComponent } from "src/app/share/components/error-dialog/error-dialog.component";
import { AUTHENTICATION_JWT } from "src/app/share/consts/cookie-key";
import { HeaderComponent } from "./header.component";
import { ShareModule } from "../../share.module";
import { CookieService } from "src/app/core/auth/services/cookie.service";
import { initialMemberState } from "src/app/core/auth/states/members.reducer";
import { selectMember } from "src/app/core/auth/states/members.selector";
import { MembersActions } from "src/app/core/auth/states/members.action";
import { JwtPayload } from "src/app/core/auth/models/jwt-payload.model";
import { TaskSearchAction } from "src/app/features/task/states/tasks.action";

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzNjc3OGVkZC03OTU4LTQwNTctOTk2Ni0zYzI5ODViOTA2NWIiLCJFbWFpbCI6InZlbmRldHRhOXoxNDdAZ21haWwuY29tIiwiVXNlck5hbWUiOiJ2ZW5kZXR0YTl6MTQ3QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik1lbWJlciIsIlBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsImV4cCI6MTcxODUzNjU3NSwiaXNzIjoiT25saW5lX01hcmtldHBsYWNlX1N5c3RlbSIsImF1ZCI6Ik9ubGluZV9NYXJrZXRwbGFjZV9TeXN0ZW0ifQ.XxsRG7Oogy55PnJBr5NvcAVNZ0RUY1kwhe51yjbhAyk";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let cookieServiceMock = {
        remove: jasmine.createSpy('remove'),
    }
    let routerMock: Router;
    let storeMock: MockStore;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                StoreModule.forRoot({}),
                MatDialogModule,

                ShareModule
            ],
            declarations: [HeaderComponent],
            providers: [
                provideAnimationsAsync(),
                provideClientHydration(),
                provideAnimationsAsync(),
                provideHttpClient(),
                { provide: FormBuilder, useValue: FormBuilder },
                { provide: FormBuilder, useValue: formBuilder },
                { provide: CookieService, useValue: cookieServiceMock },
                provideMockStore({
                    initialState: {
                        member: jwtDecode(jwtToken),
                    },
                    selectors: [
                        {
                            selector: selectMember,
                            value: jwtDecode(jwtToken)
                        }
                    ]
                }),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        storeMock = TestBed.inject(MockStore);

        component.searchForm = formBuilder.group({
            searchValue: ['abc'],
        });
        routerMock = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change display when unauthorize', () => {
        storeMock.overrideSelector(selectMember, initialMemberState);
        component.ngOnInit();
        expect(component.loggedIn).toBe(false);
    });

    it('should logout and change display', () => {
        let spyStore = spyOn(storeMock, "dispatch");
        let spyRouter = spyOn(routerMock, "navigate");
        component.logout();
        expect(cookieServiceMock.remove).toHaveBeenCalledWith(AUTHENTICATION_JWT);
        expect(spyStore).toHaveBeenCalledWith(MembersActions.logout({
            id: (jwtDecode(jwtToken) as JwtPayload).UserId
          }));
        expect(spyRouter).toHaveBeenCalledWith(['login']);
    });

    it('should logout and change display', () => {
        let spyStore = spyOn(storeMock, "dispatch");
        
        component.onSubmit();
        expect(spyStore).toHaveBeenCalledWith(TaskSearchAction.search({
            searchValue: component.searchForm.value.searchValue
          }));
    });
});