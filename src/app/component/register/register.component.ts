import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent { 
  errMessage: string ='';
  constructor(private _AuthserviceService: AuthserviceService, private _Router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.minLength(3),Validators.required]),
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    rePassword: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  },this.checkPass);

  sendRegisterForm(): void {
    this._AuthserviceService.registerFormRequest(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._Router.navigate(["/login"]);
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error.message
      }
    })

  }
  // custom validators
// fire error if group:formgroup?!
  checkPass(group:any):null|object{
   return group.get('rePassword')?.value===group.get("password")?.value ? null :{mismatch:true}
  }

}
