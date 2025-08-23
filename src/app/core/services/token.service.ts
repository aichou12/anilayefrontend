import { Injectable } from '@angular/core';

/**
 * Service pour gérer le stockage et la récupération des tokens JWT
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  /**
   * Enregistre le token JWT dans le stockage local
   * @param token - Token JWT à enregistrer
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Récupère le token JWT du stockage local
   * @returns Token JWT ou null si absent
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Supprime le token JWT du stockage local
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Vérifie la présence d'un token JWT
   * @returns Boolean indiquant si un token est présent
   */
  hasToken(): boolean {
    return this.getToken() !== null;
  }
}