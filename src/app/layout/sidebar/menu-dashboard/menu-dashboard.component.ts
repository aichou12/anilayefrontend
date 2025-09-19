import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService, Utilisateur } from './dashboard.service';
import { AuthService } from '../../../core/services/auth.service';

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
  private router: Router
) {}


  ngOnInit() {
    // S'abonner au titre du dashboard
    this.dashboardService.currentTitle.subscribe(title => {
      this.title = title;
    });

    // S'abonner à l'utilisateur connecté
    this.dashboardService.currentUser$.subscribe(user => {
      this.user = user;
    });
     this.dashboardService.currentUser$.subscribe(user => {
    this.user = user;
  });
  }

  onNotificationClick(): void {
    console.log('Notifications clicked');
  }

  onUserProfileClick(): void {
    console.log('User profile clicked');
  }





toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

getInitials(user: Utilisateur | null): string {
  if (!user) return '';
  return (user.prenom?.charAt(0).toUpperCase() || '') +
         (user.nom?.charAt(0).toUpperCase() || '');
}
logout() {
  this.authService.logout();           // vide le currentUser dans le service Auth
  this.dashboardService.setUser(null); // réinitialise l'utilisateur dans DashboardService
  this.router.navigate(['/login']);    // redirige vers la page de login
  this.isDropdownOpen = false;         // ferme le dropdown
}

}
