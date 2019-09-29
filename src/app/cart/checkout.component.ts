import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { IProduct } from '../products/product';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    data: Observable<IProduct[]>;
    visibleColumns: string[] = ["productName", "price"];
    total: number;
    tax: number;
    exemptCategories = ["Candy", "Popcorn", "Coffee"];

    constructor(
        private cartService: CartService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.cartService.getItems()
            .then(cart => {
                this.calculate(cart);
            })
    }

    calculate(cart: IProduct[]) {
        let totalImportTax = 0;
        let totalBasicTax = 0;

        for (var i = 0; i < cart.length; i++) {

            let price = cart[i].price;
            let priceWithTax = cart[i].price;

            // is this item exempt?
            if (!this.exemptCategories.includes(cart[i].productCategory)) {
                let salesTax = this.roundUpWithCeil(price * .10);
                totalBasicTax += salesTax;
                priceWithTax += salesTax;
            }

            if (cart[i].isImported === true) {
                let importTax = this.roundUpWithCeil(price * .05);
                totalImportTax += importTax;
                priceWithTax += importTax;
            }

            cart[i].price = priceWithTax;
        }

        this.total = cart.reduce((total: number, item: any) => total + item.price, 0);
        this.tax = totalImportTax + totalBasicTax;
        this.data = of(cart);
    }

    roundUpWithCeil(val: number) {
        let factor = 0.05;
        return Math.ceil(val / factor) * factor;
    }

    back() {
        this.router.navigate(['/']);
    }

    placeOrder() {
        this.data.subscribe(cart => cart.forEach(cartItem => console.log("1 " + cartItem.productName)));
        console.log("Sales Tax: " + this.tax);
        console.log("Total: " + this.total);

        this.cartService.clearCart();
        this.router.navigate(['/']);
    }
}