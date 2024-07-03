import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any;
  cart_id: string = '';
  numOfItems:number=0;

  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) { }


  ngOnInit(): void {
    this._CartService.getCartRequest().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.cart_id = res.data._id;
        console.log(res);

      }
    }) ;
    this._CartService.countOfItems.subscribe((res)=>{this.numOfItems=res})
  }

  removeItem(item_id: string): void {
    this._CartService.removeItemRequest(item_id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this._CartService.countOfItems.next(res.numOfCartItems);
        console.log(res);

      }
    })
  }

  updateItemCount(item_id: string, item_count: number, el1: HTMLButtonElement, el2: HTMLButtonElement): void {

    if (item_count >= 1) {
      
      this._Renderer2.setAttribute(el1, "disabled", "true");
      this._Renderer2.setAttribute(el2, "disabled", "true");
      this._CartService.updateItemRequest(item_id, item_count).subscribe({
        next: (res) => {
          this.cartData = res.data;
          console.log(res.data);

        },
        error: (err) => {
          this._Renderer2.removeAttribute(el1, "disabled");
          this._Renderer2.removeAttribute(el2, "disabled");
        }
      });
    }
  }

}
