import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection;
  products: Observable<any[]>;
  productDoc!: AngularFirestoreDocument;

  constructor( private db: AngularFirestore) {
    //this.products = db.collection('products').valueChanges();
    this.productsCollection = db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
   }

   getProducts(){
    return this.products;

   }

   addProduct(product: Product){
    this.productsCollection.add(product);
   }

   deleteProduct(product: Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete();
   }

   updateProduct(product: Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
   }
}
