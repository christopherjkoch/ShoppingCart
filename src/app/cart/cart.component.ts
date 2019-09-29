import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { IProduct } from '../products/product';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
    loading: boolean = true;
    data: Observable<IProduct[]>;
    visibleColumns: string[] = ["productName", "price"];
    total: number;

    constructor(
        private cartService: CartService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.cartService.getItems()
            .then(cart => {
                this.data = of(cart);
                this.calculateTotal(cart);
            })
    }

    calculateTotal(cart: IProduct[]) {
        this.total = cart.reduce((total: number, item: any) => total + item.price, 0);
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