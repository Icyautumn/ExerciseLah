import { Injectable } from '@angular/core';
import { listofFoodDetails } from './mock-foodDetails';

@Injectable({
  providedIn: 'root'
})
export class FoodDetailsService {

  constructor() { }

  getSpecificFood(foodname: string){
    console.log( listofFoodDetails.flatMap(d => d.items).find(c => c.name === foodname));
  }
}
