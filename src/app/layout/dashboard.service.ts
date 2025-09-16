import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private pageTitle = new BehaviorSubject<string>('Dashboard');
  currentTitle = this.pageTitle.asObservable();

  setTitle(title: string) {
    this.pageTitle.next(title);
  }
}