import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { OtpVerificationComponent } from './features/auth/otp-verification/otp-verification.component';
import { MenuDashboardComponent } from './layout/sidebar/menu-dashboard/menu-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { 
    path: 'dashboard', 
    component: MenuDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Vue d\'ensemble - Waterflow'
      },
      {
        path: 'distributeurs',
        loadComponent: () => import('./features/dashboard/distrubuteur/distrubuteur.component').then(m => m.DistributeurComponent), // ✅ Correction ici
        title: 'Distributeurs - Waterflow'
      },
      {
        path: 'revenu',
        loadComponent: () => import('./features/dashboard/revenu/revenu.component').then(m => m.RevenuComponent), 
        title: 'Revenu - Waterflow'
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./features/dashboard/maintenance-suivi/maintenance-suivi.component').then(m => m.MaintenanceSuiviComponent),
        title: 'Maintenant et Suivi - Waterflow'
      },
      {
        path: 'utilisateurs',
        loadComponent: () => import('./features/dashboard/utilisateur/utilisateur.component').then(m => m.UtilisateurComponent),
        title: 'Utilisateur - Waterflow'
      },
      {
        path: 'rapports',
        loadComponent: () => import('./features/dashboard/rapport/rapport.component').then(m => m.RapportComponent),
        title: 'Rapports - Waterflow'
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];