import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Distributeur {
  id: string;
  code: string;
  status: 'Actif' | 'Maintenance' | 'En panne';
  location: string;
  region: string;
  commune: string;
  quartier: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPosition: {
    x: number;
    y: number;
  };
  lastMaintenance?: Date;
  revenue?: number;
  waterDistributed?: number;
}
@Component({
  selector: 'app-distrubuteur',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
     RouterModule,
      MatIconModule, 
      MatButtonModule],
  templateUrl: './distrubuteur.component.html',
  styleUrl: './distrubuteur.component.scss'
})
export class DistributeurComponent implements OnInit {
  searchTerm: string = '';
  selectedDistributeur: Distributeur | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  showFilter: boolean = false;

  // Données des distributeurs
  distributeurs: Distributeur[] = [
    {
      id: '1',
      code: 'DK-001',
      status: 'Actif',
      location: 'Dakar, Commune de Médina, Quartier Fass',
      region: 'Dakar',
      commune: 'Médina',
      quartier: 'Fass',
      coordinates: { lat: 14.6937, lng: -17.4441 },
      mapPosition: { x: 320, y: 180 },
      lastMaintenance: new Date('2024-01-15'),
      revenue: 45000,
      waterDistributed: 2500
    },
    {
      id: '2',
      code: 'DK-002',
      status: 'Actif',
      location: 'Dakar, Commune de Plateau, Quartier Centre',
      region: 'Dakar',
      commune: 'Plateau',
      quartier: 'Centre',
      coordinates: { lat: 14.6928, lng: -17.4467 },
      mapPosition: { x: 520, y: 320 },
      lastMaintenance: new Date('2024-01-20'),
      revenue: 52000,
      waterDistributed: 3200
    },
    {
      id: '3',
      code: 'TH-003',
      status: 'Maintenance',
      location: 'Thiès, Commune Est, Quartier Diakhao',
      region: 'Thiès',
      commune: 'Est',
      quartier: 'Diakhao',
      coordinates: { lat: 14.7886, lng: -16.9246 },
      mapPosition: { x: 180, y: 280 },
      lastMaintenance: new Date('2024-01-10'),
      revenue: 38000,
      waterDistributed: 1800
    },
    {
      id: '4',
      code: 'TH-001',
      status: 'En panne',
      location: 'Thiès, Commune Est, Quartier Médina Fall',
      region: 'Thiès',
      commune: 'Est',
      quartier: 'Médina Fall',
      coordinates: { lat: 14.7899, lng: -16.9301 },
      mapPosition: { x: 150, y: 400 },
      lastMaintenance: new Date('2023-12-28'),
      revenue: 0,
      waterDistributed: 0
    },
    {
      id: '5',
      code: 'SL-001',
      status: 'Actif',
      location: 'Saint-Louis, Commune Nord, Quartier Sor',
      region: 'Saint-Louis',
      commune: 'Nord',
      quartier: 'Sor',
      coordinates: { lat: 16.0302, lng: -16.4849 },
      mapPosition: { x: 280, y: 120 },
      lastMaintenance: new Date('2024-01-18'),
      revenue: 41000,
      waterDistributed: 2100
    },
    {
      id: '6',
      code: 'LG-001',
      status: 'Actif',
      location: 'Louga, Commune Centre, Quartier Escale',
      region: 'Louga',
      commune: 'Centre',
      quartier: 'Escale',
      coordinates: { lat: 15.6186, lng: -16.2269 },
      mapPosition: { x: 420, y: 160 },
      lastMaintenance: new Date('2024-01-12'),
      revenue: 39000,
      waterDistributed: 1950
    },
    {
      id: '7',
      code: 'KF-001',
      status: 'Maintenance',
      location: 'Kaffrine, Commune Centrale, Quartier Médina',
      region: 'Kaffrine',
      commune: 'Centrale',
      quartier: 'Médina',
      coordinates: { lat: 14.1059, lng: -15.5486 },
      mapPosition: { x: 380, y: 380 },
      lastMaintenance: new Date('2024-01-08'),
      revenue: 35000,
      waterDistributed: 1600
    },
    {
      id: '8',
      code: 'ZG-001',
      status: 'Actif',
      location: 'Ziguinchor, Commune de Boucotte, Quartier Kandé',
      region: 'Ziguinchor',
      commune: 'Boucotte',
      quartier: 'Kandé',
      coordinates: { lat: 12.5829, lng: -16.2700 },
      mapPosition: { x: 200, y: 520 },
      lastMaintenance: new Date('2024-01-22'),
      revenue: 44000,
      waterDistributed: 2300
    },
    {
      id: '9',
      code: 'KL-001',
      status: 'En panne',
      location: 'Kolda, Commune Centrale, Quartier Sikilo',
      region: 'Kolda',
      commune: 'Centrale',
      quartier: 'Sikilo',
      coordinates: { lat: 12.8940, lng: -14.9497 },
      mapPosition: { x: 480, y: 500 },
      lastMaintenance: new Date('2023-12-20'),
      revenue: 0,
      waterDistributed: 0
    },
    {
      id: '10',
      code: 'SG-001',
      status: 'Actif',
      location: 'Sédhiou, Commune Nord, Quartier Marsassoum',
      region: 'Sédhiou',
      commune: 'Nord',
      quartier: 'Marsassoum',
      coordinates: { lat: 12.7086, lng: -15.5564 },
      mapPosition: { x: 350, y: 480 },
      lastMaintenance: new Date('2024-01-16'),
      revenue: 37000,
      waterDistributed: 1900
    },
    {
      id: '11',
      code: 'MB-001',
      status: 'Maintenance',
      location: 'Mbour, Commune Ouest, Quartier Saly',
      region: 'Thiès',
      commune: 'Mbour',
      quartier: 'Saly',
      coordinates: { lat: 14.4199, lng: -16.9597 },
      mapPosition: { x: 120, y: 350 },
      lastMaintenance: new Date('2024-01-05'),
      revenue: 42000,
      waterDistributed: 2200
    },
    {
      id: '12',
      code: 'RF-001',
      status: 'Actif',
      location: 'Rufisque, Commune Centre, Quartier Keury Souf',
      region: 'Dakar',
      commune: 'Rufisque',
      quartier: 'Keury Souf',
      coordinates: { lat: 14.7167, lng: -17.2667 },
      mapPosition: { x: 460, y: 220 },
      lastMaintenance: new Date('2024-01-25'),
      revenue: 48000,
      waterDistributed: 2800
    }
  ];

  filteredDistributeurs: Distributeur[] = [];

  ngOnInit(): void {
    this.filteredDistributeurs = this.distributeurs;
    this.calculateTotalPages();
    
    // Sélectionner le premier distributeur par défaut
    if (this.distributeurs.length > 0) {
      this.selectedDistributeur = this.distributeurs[0];
    }
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDistributeurs = this.distributeurs;
    } else {
      this.filteredDistributeurs = this.distributeurs.filter(distributeur =>
        distributeur.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        distributeur.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        distributeur.region.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        distributeur.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  selectDistributeur(distributeur: Distributeur): void {
    this.selectedDistributeur = distributeur;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Actif':
        return 'actif';
      case 'Maintenance':
        return 'maintenance';
      case 'En panne':
        return 'panne';
      default:
        return '';
    }
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  // Méthodes de pagination
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredDistributeurs.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages, this.currentPage + halfRange);
    
    // Ajuster si on est près du début ou de la fin
    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getPaginatedDistributeurs(): Distributeur[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredDistributeurs.slice(startIndex, endIndex);
  }

  // Méthodes pour les interactions de l'interface
  onNotificationClick(): void {
    console.log('Notifications clicked');
    // Implémenter la logique des notifications
  }

  onUserProfileClick(): void {
    console.log('User profile clicked');
    // Implémenter la logique du profil utilisateur
  }

  // Méthodes pour les actions sur les distributeurs
  onDistributeurAction(action: string, distributeur: Distributeur): void {
    switch (action) {
      case 'maintenance':
        this.scheduleMaintenenance(distributeur);
        break;
      case 'repair':
        this.repairDistributeur(distributeur);
        break;
      case 'view-details':
        this.viewDistributeurDetails(distributeur);
        break;
      default:
        console.log(`Action ${action} not implemented`);
    }
  }

  private scheduleMaintenenance(distributeur: Distributeur): void {
    // Logique pour programmer une maintenance
    distributeur.status = 'Maintenance';
    console.log(`Maintenance programmée pour ${distributeur.code}`);
  }

  private repairDistributeur(distributeur: Distributeur): void {
    // Logique pour réparer un distributeur
    distributeur.status = 'Actif';
    distributeur.lastMaintenance = new Date();
    console.log(`Réparation effectuée pour ${distributeur.code}`);
  }

  private viewDistributeurDetails(distributeur: Distributeur): void {
    // Logique pour afficher les détails d'un distributeur
    console.log(`Détails du distributeur ${distributeur.code}:`, distributeur);
  }

  // Méthodes utilitaires
  getDistributeursByStatus(status: string): Distributeur[] {
    return this.distributeurs.filter(d => d.status === status);
  }

  getTotalRevenue(): number {
    return this.distributeurs.reduce((total, distributeur) => {
      return total + (distributeur.revenue || 0);
    }, 0);
  }

  getTotalWaterDistributed(): number {
    return this.distributeurs.reduce((total, distributeur) => {
      return total + (distributeur.waterDistributed || 0);
    }, 0);
  }

  getStatusCount(): { [key: string]: number } {
    return this.distributeurs.reduce((count, distributeur) => {
      count[distributeur.status] = (count[distributeur.status] || 0) + 1;
      return count;
    }, {} as { [key: string]: number });
  }
}
