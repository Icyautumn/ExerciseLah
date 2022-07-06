import { FoodEaten } from "./foodEaten";

export const listofFoodEaten: FoodEaten[] = [
  {
    foodDateIntake: new Date("2022/7/7"),
    foodTakenDetails:[{
        "sugar_g": 1.2,
        "fiber_g": 2.2,
        "serving_size_g": 100,
        "sodium_mg": 10,
        "name": "potato",
        "potassium_mg": 70,
        "fat_saturated_g": 0,
        "fat_total_g": 0.1,
        "calories": 92.7,
        "cholesterol_mg": 0,
        "protein_g": 2.5,
        "carbohydrates_total_g": 21
    },
    {
        "sugar_g": 2.2,
        "fiber_g": 3.2,
        "serving_size_g": 200,
        "sodium_mg": 20,
        "name": "sugar",
        "potassium_mg": 80,
        "fat_saturated_g": 10,
        "fat_total_g": 0.5,
        "calories": 200,
        "cholesterol_mg": 5,
        "protein_g": 5,
        "carbohydrates_total_g": 21
    },
    ]
  }
];
