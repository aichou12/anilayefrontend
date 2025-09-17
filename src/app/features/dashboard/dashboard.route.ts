import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    title: 'Vue d\'ensemble - Waterflow'
  },
  {
    path: 'distributeurs',
    loadComponent: () => import('./distrubuteur/distrubuteur.component').then(m => m.DistributeurComponent),
    title: 'Distributeurs - Waterflow'
  },
  {
    path: 'revenu',
    loadComponent: () => import('./revenu/revenu.component').then(m => m.RevenuComponent),
    title: 'Revenu - Waterflow'
  },
  {
    path: 'revenu',
    loadComponent: () => import('./maintenance-suivi/maintenance-suivi.component').then(m => m.MaintenanceSuiviComponent),
    title: 'Maintenance et Suivi - Waterflow'
  },
  
];