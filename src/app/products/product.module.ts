import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product.routing';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
} from '@angular/material';
import { CartService } from '../cart/cart.service';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../cart/checkout.component';
import { CartCalculatorService } from '../cart/cart-calculator.service';

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
    ],
    declarations: [ProductListComponent, ProductDetailComponent, CartComponent, CheckoutComponent, CheckoutComponent],
    providers: [ProductService, CartService, CartCalculatorService],
})
export class ProductModule { }