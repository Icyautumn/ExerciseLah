import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodCalories: string = "http://localhost:1337/api/foodCalories/";
  foodDetails: string = "http://localhost:1337/api/food/";

  constructor(private http: HttpClient) { }

  getFoodCalories(id: string){
    return this.http.post<any[]>(this.foodCalories, {
      "id": id
    });
  }

  createFoodCalories(id: string, date: string){
    return this.http.put<any[]>(this.foodCalories + "create", {
      "id": id,
      "date": date
    });
  }

  updateFoodCalories(id: string, date: string, foodItem: any){
    return this.http.put<any[]>(this.foodCalories + "update", {
      "id": id,
      "date": date,
      'foodItems': foodItem
    });
  }

  getFoodDetails(foodItem: string){
    return this.http.post<any[]>(this.foodDetails, {
      "food": foodItem
    })
  }
}
