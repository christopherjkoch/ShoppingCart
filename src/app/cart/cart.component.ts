import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../products/product';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { CartCalculatorService } from './cart-calculator.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
    loading = true;
    data: Observable<IProduct[]>;
    visibleColumns: string[] = ['productName', 'price'];
    total: number;

    constructor(
        private cartService: CartService,
        private cartCalculatorService: CartCalculatorService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.cartService.getItems()
            .then(cart => {
                this.data = of(cart);
                this.total = this.cartCalculatorService.calculateTotal(cart);
            });
    }

    back() {
        this.router.navigate(['/']);
    }

    checkout() {
        this.router.navigate(['/checkout']);
    }

    emptyCart() {
        this.cartService.clearCart();
        this.router.navigate(['/']);
    }
}
