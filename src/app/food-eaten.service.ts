import { Injectable } from '@angular/core';
import { listofFoodEaten } from './mock-foodEaten';
import { DatePipe } from '@angular/common';
import { FoodEaten } from './foodEaten';

@Injectable({
  providedIn: 'root'
})
export class FoodEatenService {

  constructor(private datePipe: DatePipe) { }

  updateFoodEaten(items: FoodEaten): void{
    const target = listofFoodEaten.find((item) =>this.datePipe.transform(item.foodDateIntake, 'yyyy-MM-dd') == this.datePipe.transform(items.foodDateIntake, 'yyyy-MM-dd'));
    // console.log(target.foodTakenDetails = items.foodTakenDetails);
    // Object.assign(target, items);
    // console.log(listofFoodEaten);
    this.checkList();


  }

  createNewListOfFoodEaten(items: any){
    // console.log("before",listofFoodEaten);
    listofFoodEaten.push(items);
    // console.log("after",listofFoodEaten);
  }

  getListofFoodEaten(Datechosen: string){
    // console.log("before",listofFoodEaten);
      var inlist = listofFoodEaten.find(c => this.datePipe.transform(c.foodDateIntake) == Datechosen);
      return inlist;


  }

  checkList(){
    // console.log("checkList",listofFoodEaten);
  }
}
