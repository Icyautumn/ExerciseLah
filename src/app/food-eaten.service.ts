import { Injectable } from '@angular/core';
import { listofFoodEaten } from './mock-foodEaten';
import { DatePipe } from '@angular/common';
import { FoodEaten } from './foodEaten';

@Injectable({
  providedIn: 'root'
})
export class FoodEatenService {

  constructor(private datePipe: DatePipe) { }

  addToListOfFoodEaten(){

  }

  createNewListOfFoodEaten(items: FoodEaten){
    listofFoodEaten.push(items);
    console.log(listofFoodEaten);
  }

  getListofFoodEaten(Datechosen: string){
    var inlist = listofFoodEaten.find(c => this.datePipe.transform(c.foodDateIntake) === Datechosen);
    console.log(inlist);
    // return inlist;
    return inlist;
  }
}
