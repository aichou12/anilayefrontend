import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../layout/dashboard.service';

interface StatCard {
  title: string;
  value: number;
  change: number;
}

interface ChartPoint {
  x: number;
  y: number;
}

interface HeatmapLocation {
  name: string;
  values: number[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedRegion: string = '';
  selectedPeriod: string = '';
  selectedType: string = '';
  selectedStatus: string = '';

  stats: StatCard[] = [
    { title: 'Distributeurs actifs', value: 120, change: 0.5 },
    { title: 'Distributeurs inactifs', value: 0, change: -0.5 },
    { title: 'Alertes (en cours)', value: 2, change: 0.5 }
  ];

  chartPoints: ChartPoint[] = [
    { x: 20, y: 150 }, { x: 120, y: 160 }, { x: 200, y: 130 }, 
    { x: 280, y: 100 }, { x: 380, y: 50 }
  ];

  days: string[] = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  weekDays: string[] = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  heatmapData: HeatmapLocation[] = [
    { name: 'Sédhiou', values: [40, 35, 34, 35, 40, 40, 35] },
    { name: 'Louga', values: [30, 29, 35, 35, 35, 35, 35] },
    { name: 'Saint-Louis', values: [34, 34, 29, 34, 35, 34, 34] },
    { name: 'Kaffrine', values: [29, 29, 29, 29, 29, 29, 29] },
    { name: 'Fatick', values: [29, 29, 29, 29, 29, 20, 20] },
    { name: 'Djourbel', values: [35, 29, 35, 29, 29, 29, 29] },
    { name: 'Tambacounda', values: [35, 20, 29, 35, 35, 35, 36] },
    { name: 'Ziguinchor', values: [35, 29, 29, 35, 35, 36, 36] },
    { name: 'Kédougou', values: [32, 29, 35, 32, 35, 35, 32] },
    { name: 'Kaolack', values: [20, 20, 29, 29, 20, 20, 29] },
    { name: 'Thiès', values: [41, 40, 40, 40, 20, 41, 41] },
    { name: 'Dakar', values: [34, 40, 41, 40, 34, 40, 41] }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.setTitle('Dashboard');
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    console.log('Loading dashboard data...');
    this.updateStats();
  }

  private updateStats(): void {
    if (this.selectedRegion || this.selectedPeriod || this.selectedType || this.selectedStatus) {
      console.log('Updating stats with filters');
    }
  }

  onFilterChange(): void {
    console.log('Filters changed');
    this.updateStats();
    this.updateChartsData();
  }

  getHeatmapClass(value: number): string {
    if (value <= 20) return 'temp-20';
    if (value <= 29) return 'temp-29';
    if (value <= 30) return 'temp-30';
    if (value <= 32) return 'temp-32';
    if (value <= 34) return 'temp-34';
    if (value <= 35) return 'temp-35';
    if (value <= 36) return 'temp-36';
    if (value <= 40) return 'temp-40';
    return 'temp-41';
  }

  refreshHeatmap(): void {
    console.log('Refreshing heatmap...');
    this.loadDashboardData();
  }

  exportHeatmapData(): void {
    console.log('Exporting heatmap data...');
  }

  private updateChartsData(): void {
    console.log('Updating charts data...');
  }
}