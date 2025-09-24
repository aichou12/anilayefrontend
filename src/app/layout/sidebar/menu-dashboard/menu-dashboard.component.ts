import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService, Utilisateur } from './dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.scss']
})
export class MenuDashboardComponent implements OnInit {
  title: string = 'Dashboard';
  user: Utilisateur | null = null;
  isDropdownOpen = false;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 🎯 Mettre à jour automatiquement le <h1> selon la route active
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        // Forcer le typage en string pour éviter NG9
        const fullTitle = (child?.snapshot.routeConfig?.title as string) || 'Dashboard';
        // Garder seulement la partie avant " - Waterflow"
        return fullTitle.split(' - ')[0];
      })
    ).subscribe(title => {
      this.title = title;
    });

    // 🎯 S'abonner à l'utilisateur connecté
    this.dashboardService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  // 🔔 Notifications
  onNotificationClick(): void {
    console.log('Notifications clicked');
  }

  // 👤 Profil utilisateur
  onUserProfileClick(): void {
    console.log('User profile clicked');
  }

  // 🔽 Dropdown utilisateur
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // 🆔 Initiales de l'utilisateur
  getInitials(user: Utilisateur | null): string {
    if (!user) return '';
    return (user.prenom?.charAt(0).toUpperCase() || '') +
           (user.nom?.charAt(0).toUpperCase() || '');
  }

  // 🚪 Déconnexion
  logout(): void {
    this.authService.logout();           // vide le currentUser dans AuthService
    this.dashboardService.setUser(null); // réinitialise l'utilisateur dans DashboardService
    this.router.navigate(['/login']);    // redirige vers la page de login
    this.isDropdownOpen = false;         // ferme le dropdown
  }
}
