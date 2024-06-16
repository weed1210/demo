import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import { Member } from "../../models/member.model";
import { of, throwError } from "rxjs";
import { ErrorDialogComponent } from "src/app/share/components/error-dialog/error-dialog.component";
import { Router, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AuthModule } from "../../auth.module";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

const member: Member = {
    id: '1',
    email: 'alice@example.com',
    password: 'alice123',
    name: 'Alice Johnson',
    phoneNumber: '123-456-7890'
};

const mockRequest = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
    phoneNumber: '1234567890'
};

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authServiceMock = {
        register: jasmine.createSpy('register').and.returnValue(of(member)),
    }
    let routerMock: Router;
    let dialogMock: MatDialog;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                StoreModule.forRoot({}),
                MatDialogModule,

                AuthModule
            ],
            declarations: [RegisterComponent, ErrorDialogComponent],
            providers: [
                provideAnimationsAsync(),
                provideClientHydration(),
                provideAnimationsAsync(),
                provideHttpClient(),
                { provide: FormBuilder, useValue: FormBuilder },
                { provide: AuthService, useValue: authServiceMock },
                { provide: FormBuilder, useValue: formBuilder },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        component.authService = TestBed.inject(AuthService);

        component.memberRegisterForm = formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            name: ['', Validators.required],
            password: ['', Validators.required],
            phoneNumber: ['', [
                Validators.required,
                Validators.pattern("^[0-9]{10}$"),
            ]],
        });
        routerMock = TestBed.inject(Router);
        dialogMock = TestBed.inject(MatDialog);
        component.dialog = dialogMock;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display validation errors when form is invalid', () => {
        expect(component.memberRegisterForm.invalid).toBeTrue();
        expect(component.memberRegisterForm.get('email')?.errors?.['required']).toBeTrue();
        expect(component.memberRegisterForm.get('name')?.errors?.['required']).toBeTrue();
        expect(component.memberRegisterForm.get('password')?.errors?.['required']).toBeTrue();
        expect(component.memberRegisterForm.get('phoneNumber')?.errors?.['required']).toBeTrue();
    });

    it('should call AuthService.register and navigate to login on success', () => {
        let spyRouter = spyOn(routerMock, 'navigate').and.resolveTo(true);

        component.memberRegisterForm.setValue(mockRequest);
        authServiceMock.register.and.returnValue(of(mockRequest));

        component.onSubmit();

        expect(authServiceMock.register).toHaveBeenCalledWith(mockRequest);
        expect(spyRouter).toHaveBeenCalledWith(['login']);
    });

    it('should open error dialog on register failure', () => {
        let spyDialog = spyOn(dialogMock, 'open');
        const err = new Error('Registration failed');
        authServiceMock.register.and.returnValue(throwError(() => err));
        component.memberRegisterForm.setValue(mockRequest);

        component.onSubmit();
        expect(authServiceMock.register).toHaveBeenCalledWith(mockRequest);
        authServiceMock.register(mockRequest).subscribe({
            error: (err: any) => {
                expect(spyDialog).toHaveBeenCalledWith(ErrorDialogComponent, {
                    data: 'Registration failed'
                });
            }
        })
    });
});