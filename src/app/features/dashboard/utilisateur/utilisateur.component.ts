import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface User {
  nom: string;
  email: string;
  statut: string;
}

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {
  activeTab: string = 'tous';
  searchTerm: string = '';

  users: User[] = [
    {
      nom: 'Amadou Samb',
      email: 'amadousamb@gmail.com',
      statut: 'Actif'
    },
    {
      nom: 'Serigne moustapha sy',
      email: 'serignemoustaphasy@gmail.com',
      statut: 'Inactif'
    }
  ];

  get filteredUsers(): User[] {
    let filtered = this.users;

    // Filtrer par onglet actif
    if (this.activeTab === 'actif') {
      filtered = filtered.filter(user => user.statut.toLowerCase() === 'actif');
    } else if (this.activeTab === 'inactif') {
      filtered = filtered.filter(user => user.statut.toLowerCase() === 'inactif');
    }

    // Filtrer par terme de recherche
    if (this.searchTerm) {
      filtered = filtered.filter(user =>
        user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}