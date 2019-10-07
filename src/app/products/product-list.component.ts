import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loading = true;
  data: Observable<IProduct[]>;
  visibleColumns: string[] = ['productName', 'price', 'actions'];
  resultsLength = 0;
  errorMessage: string;

  constructor(
    private productService: ProductService,
    public router: Router
  ) { }

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
        this.data = of(response);
        this.resultsLength = response.length;
      }, (err: any) => {
        console.log(err);
        this.errorMessage = 'Unable to load products';
      });

  }

  cart() {
    this.router.navigate(['/cart']);
  }
}
