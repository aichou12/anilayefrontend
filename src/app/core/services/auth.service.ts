import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {
    // Initialisation dans le constructeur pour éviter l'erreur d'utilisation avant l'initialisation
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/authenticate', credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  

  logout(): void {
    this.tokenService.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  register(userData: any): Observable<any> {
    return this.apiService.post<any>('auth/register', userData);
  }

  verifyOtp(otpRequest: { email: string, otp: string }): Observable<any> {
    return this.apiService.post<any>('otp/verify', otpRequest);
  }
}