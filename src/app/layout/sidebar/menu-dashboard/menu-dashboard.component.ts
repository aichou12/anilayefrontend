import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../../layout/dashboard.service';

@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.scss']
})
export class MenuDashboardComponent implements OnInit {
  title: string = 'Dashboard';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.currentTitle.subscribe(title => {
      this.title = title;
    });
  }

  onNotificationClick(): void {
    console.log('Notifications clicked');
  }

  onUserProfileClick(): void {
    console.log('User profile clicked');
  }
}