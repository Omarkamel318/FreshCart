import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import {SpecificProduct} from 'src/app/interfaces/products'
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product_id: any;
  product!: SpecificProduct;
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.product_id = params.get('id')
      }
    });

    this._ProductsService.specificProductRequest(this.product_id).subscribe({
      next: (res) => {
        this.product = res.data;
        console.log(this.product);


      },
      error: (err) => { console.log(err); }
    })
  }
  addToCart(product_id: string): void {
    this._CartService.addCartRequest(product_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.countOfItems.next(res.numOfCartItems);
        this._ToastrService.success(res.message);

      },
      error: (err) => {
        console.log(err);
        ;
      }
    })
  }
  productoption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayHoverPause:true,
    autoplaySpeed:600,
    autoplayTimeout:4000,
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
