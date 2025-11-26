import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [NgFor],
  template: `
    <div class="card">
      <h2>Новини</h2>
      <p style="color: var(--muted);">Демонстраційний список новин.</p>
      <ul>
        <li *ngFor="let n of news">
          <strong>{{n.title}}</strong><br>
          <small>{{n.date}}</small>
          <p>{{n.text}}</p>
        </li>
      </ul>
    </div>
  `
})
export class NewsComponent {
  news = [
    { title: 'Лабораторна №3', date: '2025-10-21', text: 'Маршрути, авторизація та захист профілю.'}
  ];
}
