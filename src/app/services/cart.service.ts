import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
 
@Injectable({
  providedIn: 'root' 
})
export class CartService {
  baseUrl: string = "https://ecommerce.routemisr.com";
  // to solve problem type string!=type of null 
  myHeader:any={
    token:localStorage.getItem('token')
  };
  countOfItems:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor(
    private _HttpClient:HttpClient,
    private _ToastrService:ToastrService
  ) { }             
    addCartRequest(id:string):Observable<any>{
      return this._HttpClient.post(
        `${this.baseUrl}/api/v1/cart`,
      {
        productId: id
    },
    {
      headers:this.myHeader
    }
    );
    }
    

    getCartRequest():Observable<any>{
      return this._HttpClient.get( `${this.baseUrl}/api/v1/cart`,
      {
        headers:this.myHeader
      }
      );
    }

    removeItemRequest(item_id:string):Observable<any>{
      return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${item_id}`,
      {
        headers:this.myHeader
      }
      );
    }

    updateItemRequest(item_id:string,item_count:number):Observable<any>{  
      return this._HttpClient.put(
        `${this.baseUrl}/api/v1/cart/${item_id}`,
        {
          count:item_count
        },
        { 
          headers:this.myHeader
        }
        
        );

    }
    // ***********payment*******************
    checkoutRequest(cart_id:string,values:object):Observable<any>{
      return this._HttpClient.post(
        `${this.baseUrl}/api/v1/orders/checkout-session/${cart_id}?url=https://github.com/Omarkamel318/FreshCart-E-Commerce.git`,
        values,
        {
          headers:this.myHeader
        }

      );
    }

}
