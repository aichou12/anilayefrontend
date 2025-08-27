import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

/**
 * Intercepteur pour ajouter le token JWT aux requêtes HTTP
 * et gérer les erreurs d'authentification
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const token = tokenService.getToken();
  let authReq = req;

  // Ajouter le token aux requêtes authentifiées
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Tentative de rafraîchissement du token
        return authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            // Répéter la requête originale avec le nouveau token
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.accessToken}`
              }
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            // Si le rafraîchissement échoue, déconnecter l'utilisateur
            tokenService.removeToken();
            tokenService.removeRefreshToken();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};