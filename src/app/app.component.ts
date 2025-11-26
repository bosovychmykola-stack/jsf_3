import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { CartService } from './cart.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <header>
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="assets/angular.svg" alt="Angular" width="28" height="28">
        <strong>Lab3 Angular</strong>
      </div>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Головна</a>
        <a routerLink="/news" routerLinkActive="active">Новини</a>
        <a routerLink="/products" routerLinkActive="active">Товари</a> <!-- ⬅ нове -->
        <a routerLink="/cart" routerLinkActive="active">Кошик ({{ cart.count() }})</a> <!-- ⬅ нове -->
        <a routerLink="/profile" routerLinkActive="active">Профіль</a>
      </nav>
      <div>
        <button *ngIf="!isAuth()" (click)="goLogin()">Увійти</button>
        <button *ngIf="isAuth()" (click)="logout()">Вийти</button>
      </div>
    </header>
    <main class="container">
      <router-outlet/>
    </main>
  `
})
export class AppComponent {
  private router = inject(Router);
  auth = inject(AuthService);
  cart = inject(CartService); 

  isAuth = () => this.auth.isAuthenticated();

  goLogin() { this.router.navigateByUrl('/login'); }
  logout() { this.auth.logout(); this.router.navigateByUrl('/'); }
}
