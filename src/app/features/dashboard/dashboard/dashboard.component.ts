import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord Anilaye.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    
    p {
      color: #666;
      font-size: 1.1rem;
    }
  `]
})
export class DashboardComponent {}