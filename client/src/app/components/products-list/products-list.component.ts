import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: any[] = [];
  editingProduct!: Product;
  editing: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(producst =>{
      console.log(producst);
      this.products = producst;
    })
  }

  deleteProduct(product: any){
    this.productService.deleteProduct(product);
  }

  editProduct(product: any){
    this.editingProduct = product;
    this.editing = !this.editing;
  }

  updateProduct(){
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }

}
