import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  qty: number;
}

const CART_KEY = 'cartItems';

@Injectable({ providedIn: 'root' })
export class CartService {
  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch {
      return [];
    }
  }
  private save(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  readonly items = signal<CartItem[]>(this.load());

  readonly count = computed(() => this.items().reduce((s, i) => s + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.qty * i.price, 0));

  add(item: Omit<CartItem, 'qty'>) {
    const items = [...this.items()];
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
    else items.push({ ...item, qty: 1 });
    this.items.set(items);
    this.save(items);
  }

  removeOne(id: number) {
    const items = [...this.items()];
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) {
      const nextQty = items[idx].qty - 1;
      if (nextQty <= 0) items.splice(idx, 1);
      else items[idx] = { ...items[idx], qty: nextQty };
      this.items.set(items);
      this.save(items);
    }
  }

  removeAll(id: number) {
    const items = this.items().filter(i => i.id !== id);
    this.items.set(items);
    this.save(items);
  }

  clear() {
    this.items.set([]);
    this.save([]);
  }
}
