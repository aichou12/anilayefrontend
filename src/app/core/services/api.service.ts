import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Service de base pour les appels API
 * Fournit des méthodes génériques pour les opérations CRUD
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Effectue une requête GET
   * @param endpoint - Point de terminaison de l'API
   * @param params - Paramètres de requête optionnels
   * @returns Observable avec la réponse
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  /**
   * Effectue une requête POST
   * @param endpoint - Point de terminaison de l'API
   * @param body - Corps de la requête
   * @returns Observable avec la réponse
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  /**
   * Effectue une requête PUT
   * @param endpoint - Point de terminaison de l'API
   * @param body - Corps de la requête
   * @returns Observable avec la réponse
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  /**
   * Effectue une requête DELETE
   * @param endpoint - Point de terminaison de l'API
   * @returns Observable avec la réponse
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * Effectue une requête PATCH
   * @param endpoint - Point de terminaison de l'API
   * @param body - Corps de la requête
   * @returns Observable avec la réponse
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body);
  }
  
  
}