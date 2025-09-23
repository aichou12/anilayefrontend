import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { environment } from '../../../../environments/environment';


export interface Utilisateur {
  nom: string;
  prenom: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private pageTitle = new BehaviorSubject<string>('Dashboard');
  currentTitle = this.pageTitle.asObservable();

  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/anilaye/v1/distributeurs';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // ---- Gestion du titre ----
  setTitle(title: string) {
    this.pageTitle.next(title);
  }

  // ---- Gestion utilisateur ----
  setUser(user: Utilisateur | null) {
    this.currentUserSubject.next(user);
  }

  // ---- Authentification headers ----
  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ---- Appels API distributeurs ----
  getActifsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/actifs`, {
      headers: this.getAuthHeaders()
    });
  }

  getInactifsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/inactifs`, {
      headers: this.getAuthHeaders()
    });
  }

  getAlertesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/alertes`, {
      headers: this.getAuthHeaders()
    });
  }
}
