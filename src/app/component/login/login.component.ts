import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errMessage: string ='';
  constructor(private _AuthserviceService: AuthserviceService, private _Router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
  });

  sendLoginForm(): void {
    this._AuthserviceService.loginFormRequest(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._Router.navigate(["/home"]);
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error.message
      }
    })

  }

}
