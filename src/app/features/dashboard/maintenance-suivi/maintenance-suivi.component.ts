import { Component, OnInit } from '@angular/core';
import { Maintenance, MaintenanceService } from './maintenance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
 selector: 'app-maintenance-suivi',
  templateUrl: './maintenance-suivi.component.html',
  styleUrls: ['./maintenance-suivi.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule  // <- IL FAUT L'AJOUTER
  ]
})
export class MaintenanceSuiviComponent implements OnInit {

  maintenances: Maintenance[] = [];
  filteredMaintenances: Maintenance[] = [];
totalTasks = 0;
  completedTasks = 0; // DISPONIBLE
  pendingTasks = 0; 
  // Pagination
  currentPage = 1;
  pageSize = 5; // nombre de lignes par page
  totalPages = 1;

  // Recherche / filtre
  searchTerm: string = '';

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit() {
    this.loadMaintenances();
    
  }

 loadMaintenances() {
  this.maintenanceService.getAllMaintenances().subscribe({
    next: (data) => {
      this.maintenances = data;
      this.applyFilters();
      this.calculateStats();  // <-- ici
    },
    error: (err) => console.error('Erreur chargement maintenances', err)
  });
}

calculateStats() {
  this.totalTasks = this.maintenances.length;
  this.completedTasks = this.maintenances.filter(m => m.etatApresMaintenance === 'DISPONIBLE').length;
  this.pendingTasks = this.maintenances.filter(m => m.etatApresMaintenance !== 'DISPONIBLE').length;
}


  // Filtre simple par description ou distributeur
  applyFilters() {
    this.filteredMaintenances = this.maintenances.filter(m =>
      !this.searchTerm ||
      m.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (m.distributeur?.nom && m.distributeur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );

    this.totalPages = Math.ceil(this.filteredMaintenances.length / this.pageSize);
    this.currentPage = 1; // reset page à 1 après filtre
  }

  // Pagination
  get paginatedMaintenances(): Maintenance[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredMaintenances.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if(page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
get visiblePages(): number[] {
  const totalToShow = 5; // nombre de pages visibles
  let start = Math.max(this.currentPage - 2, 1);
  let end = Math.min(start + totalToShow - 1, this.totalPages);

  // Ajuster start si on est près de la fin
  start = Math.max(end - totalToShow + 1, 1);

  const pages = [];
  for(let i = start; i <= end; i++) pages.push(i);
  return pages;
}

}
