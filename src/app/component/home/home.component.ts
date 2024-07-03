import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product, category } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: category[] = [];
  products: Product[] = [];
  cart_items:number=0;
  term:string='';
 
  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  
        ) { }
  ngOnInit(): void {
    this._ProductsService.allCategoriesRequest().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);

      },
      error: (err) => {
        this._Router.navigate(["/**"]);
      }
    });
    this._ProductsService.allProductRequest().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        this._Router.navigate(["/**"]);
      }
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

  catoption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:600,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  sliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:10000,
    autoplaySpeed:600,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


}
