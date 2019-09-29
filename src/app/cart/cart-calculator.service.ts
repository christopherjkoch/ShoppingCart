import { Injectable } from '@angular/core';
import { IProduct } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartCalculatorService {
    exemptCategories = ["Candy", "Popcorn", "Coffee"];

    calculateTotal(cart: IProduct[]) {
        return cart.reduce((total: number, item: any) => total + item.price, 0);
    }

    calculateTotalTax(cart: IProduct[]) {
        let totalImportTax = 0;
        let totalBasicTax = 0;

        for (var i = 0; i < cart.length; i++) {

            let price = cart[i].price;

            // is this item exempt?
            if (!this.exemptCategories.includes(cart[i].productCategory)) {
                let salesTax = this.roundUpWithCeil(price * .10);
                totalBasicTax += salesTax; 
            }

            if (cart[i].isImported === true) {
                let importTax = this.roundUpWithCeil(price * .05);
                totalImportTax += importTax;
            }
        }

        return totalImportTax + totalBasicTax;
    }

    calculateLineItemTaxes(cart: IProduct[]) {

        for (var i = 0; i < cart.length; i++) {

            let price = cart[i].price;
            let priceWithTax = cart[i].price;

            // is this item exempt?
            if (!this.exemptCategories.includes(cart[i].productCategory)) {
                let salesTax = this.roundUpWithCeil(price * .10);
                priceWithTax += salesTax;
            }

            if (cart[i].isImported === true) {
                let importTax = this.roundUpWithCeil(price * .05);
                priceWithTax += importTax;
            }

            cart[i].price = priceWithTax;
        }

        return cart;
    }

    roundUpWithCeil(val: number) {
        let factor = 0.05;
        return Math.ceil(val / factor) * factor;
    }
  }