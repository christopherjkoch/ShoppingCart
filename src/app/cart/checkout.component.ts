import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../products/product';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { CartCalculatorService } from './cart-calculator.service';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    data: Observable<IProduct[]>;
    visibleColumns: string[] = ['productName', 'price'];
    total: number;
    tax: number;

    constructor(
        private cartService: CartService,
        private cartCalculatorService: CartCalculatorService,
        public router: Router
    ) { }


    ngOnInit(): void {
        this.cartService.getItems()
            .then(cart => {
                this.tax = this.cartCalculatorService.calculateTotalTax(cart);
                const cartIncludingTaxes = this.cartCalculatorService.calculateLineItemTaxes(cart);
                this.total = this.cartCalculatorService.calculateTotal(cartIncludingTaxes);
                this.data = of(cartIncludingTaxes);
            });
    }

    back() {
        this.router.navigate(['/']);
    }

    placeOrder() {
        this.data.subscribe(cart => cart.forEach(cartItem => console.log('1 ' + cartItem.productName)));
        console.log('Sales Tax: ' + this.tax);
        console.log('Total: ' + this.total);

        this.cartService.clearCart();
        this.router.navigate(['/']);
    }
}
