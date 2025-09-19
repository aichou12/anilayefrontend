import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  assignedTo: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress' | 'cancelled';
}

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

@Component({
  selector: 'app-maintenance-suivi',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './maintenance-suivi.component.html',
  styleUrl: './maintenance-suivi.component.scss'
})
export class MaintenanceSuiviComponent implements OnInit {
  
  // Properties
  searchTerm: string = '';
  selectedRegion: string = '';
  selectedPeriod: string = '';
  selectedType: string = '';
  selectedStatus: string = '';

  // Stats
  taskStats: TaskStats = {
    totalTasks: 120,
    completedTasks: 120,
    pendingTasks: 0
  };

  // Tasks data
  tasks: Task[] = [
    {
      id: 1,
      name: 'Maintenance de thies',
      assignedTo: 'Amadou Samb',
      date: '13/08/2025',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Maintenance de Dakar',
      assignedTo: 'Serigne moustapha sy',
      date: '13/08/2025',
      status: 'pending'
    }
  ];

  filteredTasks: Task[] = [];

  // Filter options
  regions = ['Dakar', 'Thiès', 'Kaolack', 'Saint-Louis'];
  periods = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Ce trimestre'];
  types = ['Maintenance préventive', 'Maintenance corrective', 'Installation', 'Réparation'];
  statuses = ['Tous', 'Terminé', 'En attente', 'En cours', 'Annulé'];

  ngOnInit() {
    this.filteredTasks = [...this.tasks];
    this.updateStats();
  }

  // Add new task
  onAddTask() {
    console.log('Ajouter une nouvelle tâche');
    // Ici vous pouvez ouvrir un modal ou naviguer vers une page de création
  }

  // Search functionality
  onSearch() {
    this.applyFilters();
  }

  // Filter change handlers
  onRegionChange() {
    this.applyFilters();
  }

  onPeriodChange() {
    this.applyFilters();
  }

  onTypeChange() {
    this.applyFilters();
  }

  onStatusChange() {
    this.applyFilters();
  }

  // Apply all filters
  private applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = !this.searchTerm || 
        task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.selectedStatus || 
        this.selectedStatus === 'Tous' ||
        this.getStatusLabel(task.status) === this.selectedStatus;

      // Ajouter d'autres filtres selon vos besoins
      return matchesSearch && matchesStatus;
    });

    this.updateStats();
  }

  // Get status label in French
  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'completed': 'Terminé',
      'pending': 'En attente',
      'in-progress': 'En cours',
      'cancelled': 'Annulé'
    };
    return statusLabels[status] || status;
  }

  // Get status class for styling
  getStatusClass(status: string): string {
    return status;
  }

  // Update statistics
  private updateStats() {
    this.taskStats = {
      totalTasks: this.filteredTasks.length,
      completedTasks: this.filteredTasks.filter(t => t.status === 'completed').length,
      pendingTasks: this.filteredTasks.filter(t => t.status === 'pending').length
    };
  }

  // View task details
  onViewDetails(task: Task) {
    console.log('Voir détails de la tâche:', task);
    // Ici vous pouvez ouvrir un modal ou naviguer vers une page de détail
  }

  // Utility methods
  formatDate(dateString: string): string {
    // Format the date if needed
    return dateString;
  }

  // Export tasks (bonus feature)
  onExportTasks() {
    const csvContent = this.generateCSV();
    this.downloadCSV(csvContent, 'maintenance-tasks.csv');
  }

  private generateCSV(): string {
    const headers = ['Nom', 'Assigné à', 'Date', 'Statut'];
    const csvData = [headers.join(',')];

    this.filteredTasks.forEach(task => {
      const row = [
        `"${task.name}"`,
        `"${task.assignedTo}"`,
        task.date,
        `"${this.getStatusLabel(task.status)}"`
      ];
      csvData.push(row.join(','));
    });

    return csvData.join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Refresh data
  onRefresh() {
    console.log('Actualisation des données...');
    // Ici vous pouvez recharger les données depuis votre API
    this.ngOnInit();
  }

  // Bulk actions (bonus features)
  onBulkComplete(tasks: Task[]) {
    tasks.forEach(task => {
      if (task.status === 'pending') {
        task.status = 'completed';
      }
    });
    this.updateStats();
  }

  onBulkDelete(tasks: Task[]) {
    const taskIds = tasks.map(t => t.id);
    this.tasks = this.tasks.filter(task => !taskIds.includes(task.id));
    this.applyFilters();
  }
}