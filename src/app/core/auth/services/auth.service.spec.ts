import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Member } from '../models/member.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService
            ]
        });

        authService = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no outstanding HTTP requests
    });

    it('should fail login', () => {
        const errorMessage = 'Username or password is not valid';

        authService.login({
            userName: "",
            password: "",
        }).subscribe({
            next: () => {
                fail('expected an error, not a successful response');
            },
            error: err => {
                console.error('Error:', err);
                expect(err.status).toBe(500);
            }
        });

        const mockReq = httpMock.expectOne('Users/Login');
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({ error: errorMessage }, { status: 500, statusText: '' });
    }
    );

    it('should return jwt token', () => {
        const mockJwt = { access_token: "" };
        httpMock.verify();

        authService.login({
            userName: "",
            password: "",
        }).subscribe({
            next: res => {
                console.log(res);
                expect(res).toEqual(mockJwt.access_token);
            },
            error: () => {
                fail('expected an successful response, not an error');
            }
        });

        const mockReq = httpMock.expectOne('Users/Login');
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockJwt);
    });

    it('should return registered member', () => {
        const mockMember: Member = {
            id: '',
            email: '',
            password: '',
            name: '',
            phoneNumber: '',
        };
        authService.register({
            email: '',
            phoneNumber: '',
            password: '',
            name: ''
        }).subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual(mockMember);
            }
        });

        const mockReq = httpMock.expectOne('Members/Register');
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockMember);
    });

    it('should return members', () => {
        const mockMembers: Member[] = [];
        authService.getMembers().subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual([]);
            }
        });

        const mockReq = httpMock.expectOne('Members');
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockMembers);
    });
});