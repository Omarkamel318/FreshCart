import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { ProductsComponent } from './component/products/products.component';
import { authGuard } from './guard/auth.guard';
import { DetailsComponent } from './component/details/details.component';
import { PaymentComponent } from './component/payment/payment.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},



  {path:"",component:AuthLayoutComponent,children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
  ]},


  {path:"",component:BlankLayoutComponent,children:[
    {path:"home",component:HomeComponent,canActivate:[authGuard]},
    {path:"details/:id",component:DetailsComponent,canActivate:[authGuard]},
    {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
    {path:"cart",component:CartComponent,canActivate:[authGuard]},
    {path:"payment/:cart_id",component:PaymentComponent,canActivate:[authGuard]},
    {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
    {path:"products",component:ProductsComponent,canActivate:[authGuard]},
  ]},

  {path:"** ",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
