import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="card">
      <h1>Головна</h1>
      <p>Ласкаво просимо до лабораторної роботи №3.</p>
      <ul>
        <li>Перейдіть на <a routerLink="/news">/news</a> для перегляду новин.</li>
        <li>Профіль доступний лише після авторизації: <a routerLink="/profile">/profile</a>.</li>
        <li>Дані входу: <code>Admin</code> / <code>12345</code>.</li>
      </ul>
    </div>
  `
})
export class HomeComponent {}
