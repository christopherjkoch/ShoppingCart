import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    loading = true;
    product: IProduct;
    errorMessage: string;
    productId: number;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        public route: ActivatedRoute,
        public router: Router,
    ) {
        this.productId = +this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.errorMessage = '';
        this.loading = true;

        const productsObservable = this.productService.getProducts();
        productsObservable
            .pipe(
                finalize(() => { this.loading = false; })
            )
            .subscribe(response => {
                this.product = response.find(p => p.productId === this.productId);
            }, (err: any) => {
                console.log(err);
                this.errorMessage = 'Unable to load product';
            });
    }

    back() {
        this.router.navigate(['/']);
    }

    addToCart() {
        this.cartService.addToCart(this.product);
        this.router.navigate(['/']);
    }

}
