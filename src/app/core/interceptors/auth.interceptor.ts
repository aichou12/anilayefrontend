import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, throwError } from 'rxjs';

/**
 * Intercepteur pour ajouter le token JWT aux requêtes HTTP
 * et gérer les erreurs d'authentification
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  let authReq = req;
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
        // Gérer l'erreur 401 (Non autorisé)
        tokenService.removeToken();
        // Rediriger vers la page de login
        window.location.href = '/login';
      }
      return throwError(() => error);
    })
  );
};