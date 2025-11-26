import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  template: `
    <div class="card">
      <h2>404 — Сторінку не знайдено</h2>
      <p><a routerLink="/">На головну</a></p>
    </div>
  `
})
export class NotFoundComponent {}
