export class FoodEaten{
  _id: number;
  foodDateIntake: Date;
  foodTakenDetails : foodTakenDetails[];
}

export class foodTakenDetails{
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
}
