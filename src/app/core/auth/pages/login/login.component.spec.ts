import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { Router, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of, throwError } from "rxjs";
import { ErrorDialogComponent } from "src/app/share/components/error-dialog/error-dialog.component";
import { AuthModule } from "../../auth.module";
import { AuthService } from "../../services/auth.service";
import { CookieService } from "../../services/cookie.service";
import { LoginComponent } from "./login.component";
import { AUTHENTICATION_JWT } from "src/app/share/consts/cookie-key";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../models/jwt-payload.model";
import { MembersActions } from "../../states/members.action";

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzNjc3OGVkZC03OTU4LTQwNTctOTk2Ni0zYzI5ODViOTA2NWIiLCJFbWFpbCI6InZlbmRldHRhOXoxNDdAZ21haWwuY29tIiwiVXNlck5hbWUiOiJ2ZW5kZXR0YTl6MTQ3QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik1lbWJlciIsIlBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsImV4cCI6MTcxODUzNjU3NSwiaXNzIjoiT25saW5lX01hcmtldHBsYWNlX1N5c3RlbSIsImF1ZCI6Ik9ubGluZV9NYXJrZXRwbGFjZV9TeXN0ZW0ifQ.XxsRG7Oogy55PnJBr5NvcAVNZ0RUY1kwhe51yjbhAyk"

const mockRequest = {
    userName: 'test@example.com',
    password: 'password123',
};

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceMock = {
        login: jasmine.createSpy('login').and.returnValue(of(jwtToken)),
    }
    let cookieServiceMock = {
        set: jasmine.createSpy('set'),
    }
    let routerMock: Router;
    let dialogMock: MatDialog;
    let storeMock: MockStore;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                StoreModule.forRoot({}),
                MatDialogModule,

                AuthModule
            ],
            declarations: [LoginComponent, ErrorDialogComponent],
            providers: [
                provideAnimationsAsync(),
                provideClientHydration(),
                provideAnimationsAsync(),
                provideHttpClient(),
                { provide: FormBuilder, useValue: FormBuilder },
                { provide: AuthService, useValue: authServiceMock },
                { provide: FormBuilder, useValue: formBuilder },
                { provide: CookieService, useValue: cookieServiceMock },
                provideMockStore(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        component.authService = TestBed.inject(AuthService);
        component.cookieService = TestBed.inject(CookieService);

        storeMock = TestBed.inject(MockStore);
        component.store = storeMock;

        component.loginForm = formBuilder.group({
            userName: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', Validators.required],
        });
        routerMock = TestBed.inject(Router);
        component.router = routerMock;
        dialogMock = TestBed.inject(MatDialog);
        component.dialog = dialogMock;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display validation errors when form is invalid', () => {
        expect(component.loginForm.invalid).toBeTrue();
        expect(component.loginForm.get('userName')?.errors?.['required']).toBeTrue();
        expect(component.loginForm.get('password')?.errors?.['required']).toBeTrue();
    });

    it('should call AuthService.login and navigate to tasks on success', () => {
        var memberToken = jwtDecode(jwtToken) as JwtPayload;
        let spyRouter = spyOn(routerMock, 'navigate').and.resolveTo(true);
        let spyStore = spyOn(storeMock, "dispatch");

        component.loginForm.setValue(mockRequest);
        component.onSubmit();

        expect(spyStore).toHaveBeenCalledWith(MembersActions.login({
            member: memberToken
        }));
        expect(authServiceMock.login).toHaveBeenCalledWith(mockRequest);
        expect(cookieServiceMock.set).toHaveBeenCalledWith(AUTHENTICATION_JWT, jwtToken);
        expect(spyRouter).toHaveBeenCalledWith(['tasks']);
    });

    it('should open error dialog on register failure', () => {
        let spyDialog = spyOn(dialogMock, 'open');
        const err = new Error('Login failed');
        authServiceMock.login.and.returnValue(throwError(() => err));
        component.loginForm.setValue(mockRequest);

        component.onSubmit();
        expect(authServiceMock.login).toHaveBeenCalledWith(mockRequest);
        authServiceMock.login(mockRequest).subscribe({
            error: (err: any) => {
                expect(spyDialog).toHaveBeenCalledWith(ErrorDialogComponent, {
                    data: 'Login failed'
                });
            }
        })
    });
});