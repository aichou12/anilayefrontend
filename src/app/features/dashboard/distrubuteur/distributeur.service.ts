import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { environment } from '../../../../environments/environment';

export interface Distributeur {
  id: number;
  nom: string;
  localisation: string;
  etatFiltre?: string;
  actif: boolean;
  createdAt?: string;
  updatedAt?: string;
  filtres?: any[]; // ou définir un type Filtre si tu veux récupérer les filtres
   mapPosition?: { x: number; y: number };
  coordinates?: { lat: number; lng: number };
}

@Injectable({
  providedIn: 'root'
})
export class DistributeurService {
private apiUrl = `${environment.apiUrl}/distributeurs`;


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // Liste complète
  getAllDistributeurs(): Observable<Distributeur[]> {
    return this.http.get<Distributeur[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Liste des actifs
  getActifsDistributeurs(): Observable<Distributeur[]> {
    return this.http.get<Distributeur[]>(`${this.apiUrl}/actifs`, {
      headers: this.getAuthHeaders()
    });
  }

  // Nombre de distributeurs
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
