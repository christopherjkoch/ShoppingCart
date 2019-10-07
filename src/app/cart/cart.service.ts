import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return Promise.resolve(this.items);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
