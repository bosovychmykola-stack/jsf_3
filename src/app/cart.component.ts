import { Component, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';



@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  template: `
    <div class="card">
      <h2>Кошик</h2>

      <div *ngIf="cart.items().length === 0">
        Кошик порожній. Перейдіть до <a routerLink="/products">товарів</a>.
      </div>

      <div *ngFor="let i of cart.items()" class="cart-row">
        <div>
          <strong>{{ i.title }}</strong>
          <div style="color:var(--muted)">ціна: {{ i.price | currency:'UAH':'symbol':'1.0-0' }}</div>
        </div>
        <div class="cart-qty">
          <button (click)="dec(i.id)">−</button>
          <span>{{ i.qty }}</span>
          <button (click)="inc(i.id)">+</button>
        </div>
        <div><strong>{{ (i.qty * i.price) | currency:'UAH':'symbol':'1.0-0' }}</strong></div>
        <button (click)="remove(i.id)">×</button>
      </div>

      <hr *ngIf="cart.items().length">
      <div *ngIf="cart.items().length" class="cart-summary">
        <div>Всього товарів: {{ cart.count() }}</div>
        <div>Сума: <strong>{{ cart.total() | currency:'UAH':'symbol':'1.0-0' }}</strong></div>
      </div>

      <div style="display:flex; gap:10px; margin-top:12px" *ngIf="cart.items().length">
        <button (click)="checkout()">Оформити замовлення</button>
        <button (click)="cart.clear()">Очистити</button>
      </div>
    </div>
  `,
  styles: [`
    .cart-row {
      display:grid;
      grid-template-columns: 1fr auto auto auto;
      align-items:center;
      gap:12px;
      padding:10px 0;
      border-bottom:1px solid #1f2c4a;
    }
    .cart-qty { display:flex; align-items:center; gap:8px; }
    .cart-qty button { width:32px; padding:6px 0; }
    .cart-summary { display:flex; justify-content:space-between; }
  `]
})
export class CartComponent {
  cart = inject(CartService);
  private auth = inject(AuthService);
  private router = inject(Router);

  inc(id: number) { this.cart.add({ id, title: '', price: this.cart.items().find(i => i.id===id)!.price }); }
  dec(id: number) { this.cart.removeOne(id); }
  remove(id: number) { this.cart.removeAll(id); }

  checkout() {
    if (this.auth.isAuthenticated()) {
      alert('Замовлення оформлено! Дякуємо 🙌');
      this.cart.clear();
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
