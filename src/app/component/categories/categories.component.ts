import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this._ProductsService.allCategoriesRequest().subscribe({
      next:(res)=>{
        this.categories = res.data;
        console.log(this.categories);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

}
