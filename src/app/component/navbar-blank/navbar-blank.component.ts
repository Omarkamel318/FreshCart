import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit  {

  cart_items:number=0;
 
constructor(private _Router:Router
            ,private _CartService:CartService
            ,private _Renderer2:Renderer2){}


ngOnInit(): void {
  this._CartService.getCartRequest().subscribe({
    next:(res)=>{
      this._CartService.countOfItems.next(res.numOfCartItems);
    }
  })
  this._CartService.countOfItems.subscribe(
    {
      next:(res)=>{this.cart_items=res}
    }
    );
    
  }
  
@ViewChild('nav') navElement!:ElementRef;
@HostListener('window:scroll')
 onscroll()
{
if (window.scrollY>400){
  this._Renderer2.addClass(this.navElement.nativeElement,'px-md-5')
}
else{  this._Renderer2.removeClass(this.navElement.nativeElement,'px-md-5')
}
}
signout(){
  localStorage.removeItem('token');
  this._Router.navigate(["/login"]);
}
}
