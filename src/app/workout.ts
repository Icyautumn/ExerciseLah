export class Workouts{
  _id: number;
  // workout_photo: File;
  workout_photo: string;
  summary : string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  equipment: string;
  workout: listofworkout[];
  foodDetails: foodDetails[];
}

export class listofworkout {
    workout: string;
    set: number;
    rep: number;
  }

export class foodDetails {
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


