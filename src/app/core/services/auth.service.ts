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
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {
    // Initialisation dans le constructeur pour éviter l'erreur d'utilisation avant l'initialisation
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Connecte un utilisateur avec ses identifiants
   * @param credentials - Identifiants de connexion
   * @returns Observable avec la réponse d'authentification
   */
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/authenticate', credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        // Si le modèle AuthResponse ne possède pas refreshToken, ignorer ce stockage
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns Boolean indiquant l'état d'authentification
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Rafraîchit le token d'authentification
   * @returns Observable avec le nouveau token
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    
    if (!refreshToken) {
      this.logout();
      return new Observable(observer => {
        observer.error(new Error('No refresh token available'));
      });
    }

    return this.apiService.post<any>('auth/refresh-token', { refreshToken }).pipe(
      tap((tokens: any) => {
        this.tokenService.setToken(tokens.accessToken);
        if (tokens.refreshToken) {
          this.tokenService.setRefreshToken(tokens.refreshToken);
        }
      })
    );
  }

  /**
   * Inscrit un nouvel utilisateur
   * @param userData - Données de l'utilisateur à inscrire
   * @returns Observable avec la réponse d'inscription
   */
  register(userData: any): Observable<any> {
    return this.apiService.post<any>('auth/register', userData);
  }

  /**
   * Vérifie un code OTP
   * @param otpRequest - Requête contenant l'email et le code OTP
   * @returns Observable avec la réponse de vérification
   */
  verifyOtp(otpRequest: { email: string, otp: string }): Observable<any> {
    return this.apiService.post<any>('otp/verify', otpRequest);
  }
}