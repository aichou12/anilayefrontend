import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  nom: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Simuler un utilisateur connecté
    const user: User = { nom: 'Anta Niang', role: 'Administrateur' };
    this.currentUserSubject.next(user);
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
