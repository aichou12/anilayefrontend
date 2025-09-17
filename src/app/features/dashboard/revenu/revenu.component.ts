import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

declare var Chart: any;

@Component({
  selector: 'app-revenu',
  imports: [CommonModule, MatIconModule],
  templateUrl: './revenu.component.html',
  styleUrl: './revenu.component.scss'
})
export class RevenuComponent implements AfterViewInit {
  @ViewChild('revenueChart', { static: false }) revenueChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('transactionChart', { static: false }) transactionChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef<HTMLCanvasElement>;

  private revenueChartInstance: any;
  private transactionChartInstance: any;
  private pieChartInstance: any;

  ngAfterViewInit() {
    this.initializeCharts();
  }

  private initializeCharts() {
    // Revenue Chart (Line Chart)
    const revenueCtx = this.revenueChart.nativeElement.getContext('2d');
    this.revenueChartInstance = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        datasets: [{
          data: [800, 2200, 2000, 900, 1000, 3500],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          borderWidth: 3,
          fill: true,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#3b82f6',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5000,
            grid: {
              color: '#f3f4f6'
            },
            ticks: {
              color: '#6b7280',
              font: { size: 12 }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#6b7280',
              font: { size: 12 }
            }
          }
        }
      }
    });

    // Transaction Volume Chart (Bar Chart)
    const transactionCtx = this.transactionChart.nativeElement.getContext('2d');
    this.transactionChartInstance = new Chart(transactionCtx, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        datasets: [{
          data: [18, 22, 19, 25, 8, 22],
          backgroundColor: [
            '#8b5cf6',
            '#10b981',
            '#1f2937',
            '#60a5fa',
            '#6b7280',
            '#10b981'
          ],
          borderRadius: 4,
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 30,
            grid: {
              color: '#f3f4f6'
            },
            ticks: {
              color: '#6b7280',
              font: { size: 12 }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#6b7280',
              font: { size: 12 }
            }
          }
        }
      }
    });

    // Payment Distribution Chart (Pie Chart)
    const pieCtx = this.pieChart.nativeElement.getContext('2d');
    this.pieChartInstance = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Orange', 'Wave', 'Autres'],
        datasets: [{
          data: [30, 30, 40],
          backgroundColor: [
            '#f97316',
            '#10b981',
            '#60a5fa'
          ],
          borderWidth: 0,
          cutout: '60%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  ngOnDestroy() {
    // Clean up chart instances
    if (this.revenueChartInstance) {
      this.revenueChartInstance.destroy();
    }
    if (this.transactionChartInstance) {
      this.transactionChartInstance.destroy();
    }
    if (this.pieChartInstance) {
      this.pieChartInstance.destroy();
    }
  }
}