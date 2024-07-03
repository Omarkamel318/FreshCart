import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Registerform, loginform } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  baseUrl:string="https://ecommerce.routemisr.com"
  constructor(private _HttpClient: HttpClient) { }
// to connection with api and send form 
  registerFormRequest(form: Registerform):Observable<any> {
   return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,form);

  }
  loginFormRequest(form: loginform):Observable<any> {
   return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin `,form);

  }
 
}

