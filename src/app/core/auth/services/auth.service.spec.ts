import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
    });
    it('should get users',
        inject(
            [HttpTestingController, AuthService],
            (httpMock: HttpTestingController, dataService: AuthService) => {
                const mockJwt = '';

                dataService.login({
                    userName: "f",
                    password: "f",
                }).subscribe({
                    error: (err) => {
                        console.error('Error:', err);
                        expect(err.status).toBe(500);
                    }
                });

                const mockReq = httpMock.expectOne('Users/Login');

                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');
                mockReq.flush(mockJwt);

                httpMock.verify();
            }
        )
    );
});