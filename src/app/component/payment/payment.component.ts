import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
cart_id:any;
  constructor(private _FormBuilder: FormBuilder,
              private _CartService: CartService,
              private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.cart_id=res.get('cart_id'); 
    }
   })
  }


  checkoutForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: ['', [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
    city: ['']
  })

  checkout(): void {
    console.log(this.checkoutForm);
    this._CartService.checkoutRequest(this.cart_id,this.checkoutForm.value).subscribe({
      next:(res)=>{
        window.open(res.session.url);        
      }
    })

  }

  

}
