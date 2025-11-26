import { Component, inject } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';

type Product = { id: number; title: string; description: string; price: number };

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [NgFor, CurrencyPipe],
  template: `
    <div class="card">
      <h2>Товари</h2>
      <div class="products-grid">
        <div class="product" *ngFor="let p of products">
          <h3>{{ p.title }}</h3>
          <p style="color:var(--muted)">{{ p.description }}</p>
          <p><strong>{{ p.price | currency:'UAH':'symbol':'1.0-0' }}</strong></p>
          <button (click)="add(p)">Додати до кошика</button>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent {
  private cart = inject(CartService);

  products: Product[] = [
    { id: 1, title: 'Ноутбук',   description: '15.6", 16GB RAM, SSD', price: 32000 },
    { id: 2, title: 'Смартфон',  description: '6.5", 128GB',          price: 15000 },
    { id: 3, title: 'Навушники', description: 'Bluetooth, шумодав',    price: 2800  },
    { id: 4, title: 'Монітор',   description: '27", 144Hz',           price: 9500  },
  ];

  add(p: Product) {
    this.cart.add({ id: p.id, title: p.title, price: p.price });
  }
}
