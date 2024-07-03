import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit{
  products: Product[] = [];
  term:string='';


  constructor(private _ProductsService:ProductsService,
              private _Router:Router,
              private _CartService:CartService ,
              private _ToastrService:ToastrService
              ){}
  ngOnInit(): void {
    this._ProductsService.allProductRequest().subscribe({
      next:res=>{ this.products = res.data;},
      error:err=>{this._Router.navigate(["/**"]);}
    })
  }

  addToCart(product_id:string) {
    this._CartService.addCartRequest(product_id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message);
        this._CartService.countOfItems.next(res.numOfCartItems);        
        
      },
      error: (err) => {
        console.log(err);
        ;
      }
    })
  }

}
