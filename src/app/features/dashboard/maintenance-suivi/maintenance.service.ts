import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Distributeur {
  id: number;
  nom: string;
}

export interface Maintenance {
  id: number;
  dateMaintenance: string; // string car JSON convertira LocalDateTime
  description: string;
  etatApresMaintenance: 'DISPONIBLE' | 'EN_MAINTENANCE' | 'EN_PANNE';
  distributeur?: Distributeur; // optional si parfois null
}



@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  // ton URL backend

  private apiUrl = `${environment.apiUrl}/maintenances`;

  constructor(private http: HttpClient) {}

  getAllMaintenances(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.apiUrl);
  }

  getMaintenanceByDistributeur(distributeurId: number): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/distributeur/${distributeurId}`);
  }

  getMaintenanceByEtat(etat: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/etat/${etat}`);
  }
}
