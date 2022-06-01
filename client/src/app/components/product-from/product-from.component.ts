import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFromComponent implements OnInit {

  product = {} as Product;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(){
    if(this.product.name !== '' && this.product.description !== '' &&
    this.product.price !== 0){
      console.log(this.product);
    this.productService.addProduct(this.product);
    this.product = {} as Product;
    }


    
  }

}
