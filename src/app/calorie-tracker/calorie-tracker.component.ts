import { ChangeDetectorRef , Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodDetailsService } from '../food-details.service';
import { FoodEatenService } from '../food-eaten.service';
import { FoodDetails, itemDetails } from '../foodDetails';
import { foodTakenDetails } from '../foodEaten';
import { listofFoodDetails } from '../mock-foodDetails';
import { listofFoodEaten } from '../mock-foodEaten';
import { FoodEaten } from '../foodEaten';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.component.html',
  styleUrls: ['./calorie-tracker.component.css']
})
export class CalorieTrackerComponent implements OnInit {

  foodDetailsAlreadyTaken: itemDetails[] = [];

  createFoodTaken: FormGroup;

  datepickedbyuser  = new Date();

  nameOfFood: string;

  foodeaten: FoodEaten;

  gramsOfFood: number;

  calories: number;
  carbohydrates_total_g: number;
  fat_total_g: number;
  protein_g: number;
  sodium_mg: number;
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  name: string;
  potassium_mg: number;

  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g'];

  dataSource : any[] = [];

  multiplierArray: FormGroup;



  constructor(private changeDetectorRefs: ChangeDetectorRef,private fb: FormBuilder,
    private foodDetailsService: FoodDetailsService, public changeDetectorRef: ChangeDetectorRef,
    private foodEatenService: FoodEatenService, public DatePipe: DatePipe) {
      console.log("user", this.DatePipe.transform(this.datepickedbyuser, 'yyyy-MM-dd'));
      // console.log("food date",this.DatePipe.transform(this.foodEatenService.getListofFoodEaten(this.datepickedbyuser)[0].foodDateIntake, 'yyyy-MM-dd'));


      // console.log(this.DatePipe.transform(this.foodEatenService.getListofFoodEaten(this.datepickedbyuser)[0].foodDateIntake) === this.DatePipe.transform(this.datepickedbyuser));
      try{
        console.log(this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser)).foodTakenDetails));
      } catch (err: unknown){
        this.foodeaten = new FoodEaten();
        this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser))
        this.foodEatenService.createNewListOfFoodEaten(this.foodeaten)
      }

    }

  ngOnInit(): void {
    this.createFoodTaken = this.fb.group({
      foodDateIntake: '',
      foodTakenDetails : this.fb.array([]),
    });
    this.multiplierArray = this.fb.group({
      "calories": '',
      'carbohydrates_total_g': '',
      'cholesterol_mg': '',
      'fat_saturated_g': '',
      'fat_total_g': '',
      'fiber_g': '',
      'name': "",
      'potassium_mg': '',
      'protein_g': '',
      'serving_size_g': '',
      'sodium_mg': '',
      'sugar_g': '',
    })

  }

  showDate(){
    console.log(this.datepickedbyuser);
  }

  get foodTakeDetails(){
    return this.createFoodTaken.controls["foodTakenDetails"] as FormArray;
  }

  addFoodTakenDetails(){
    const FoodTakenDetailsForm = this.fb.group({
      name: ['', Validators.required],
      serving_size_g: ['', Validators.required],
    });
    this.foodTakeDetails.push(FoodTakenDetailsForm);
  }

  getFoodData(idInTheArray: number){
    // get name of food
    this.nameOfFood = this.createFoodTaken.value.foodTakenDetails[idInTheArray].name;
    // get grams of food
    this.gramsOfFood = this.createFoodTaken.value.foodTakenDetails[idInTheArray].serving_size_g;

    this.carbohydrates_total_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).carbohydrates_total_g;
    this.calories = this.foodDetailsService.getSpecificFood(this.nameOfFood).calories;
    this.fat_total_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).fat_total_g;
    this.protein_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).protein_g;
    this.sodium_mg = this.foodDetailsService.getSpecificFood(this.nameOfFood).sodium_mg;
    this.sugar_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).sugar_g;
    this.serving_size_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).serving_size_g;
    this.name = this.foodDetailsService.getSpecificFood(this.nameOfFood).name;
    this.fiber_g = this.foodDetailsService.getSpecificFood(this.nameOfFood).fiber_g;
    this.potassium_mg = this.foodDetailsService.getSpecificFood(this.nameOfFood).potassium_mg;

    var multiplier = this.gramsOfFood / this.serving_size_g;

    this.multiplierArray.patchValue({
      "calories": this.calories * multiplier,
      'carbohydrates_total_g': this.carbohydrates_total_g * multiplier,
      'cholesterol_mg': this.carbohydrates_total_g * multiplier,
      'fat_saturated_g': this.fat_total_g * multiplier,
      'fat_total_g': this.fat_total_g * multiplier,
      'fiber_g': this.fiber_g * multiplier,
      'name': this.name,
      'potassium_mg': this.potassium_mg * multiplier,
      'protein_g': this.protein_g * multiplier,
      'serving_size_g': this.serving_size_g * multiplier,
      'sodium_mg': this.sodium_mg * multiplier,
      'sugar_g': this.sugar_g * multiplier,
    })

    if(this.dataSource[0].name == "" || this.dataSource[0].name == null){
      this.dataSource.pop();
      this.dataSource = this.dataSource.concat(this.multiplierArray.value);
    }else{
      // fit the details in the table
        this.dataSource = this.dataSource.concat(this.multiplierArray.value);
    }
    console.log(this.dataSource);





    this.foodeaten = new FoodEaten();
    this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser))
    this.foodeaten.foodTakenDetails = this.dataSource;

    console.log("time to see",this.foodeaten);
    this.foodEatenService.updateFoodEaten(this.foodeaten);

    this.multiplierArray.reset();

    // this.foodEatenService.addToListOfFoodEaten();

  }
  // ChangeTheValues(foodArray, foodServingMulitplier){
  //   for(const [k,v] of Object.entries(foodArray)){

  //   }
  // }

  nextDay(){
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() +1);
    console.log("tmr date", this.datepickedbyuser);
  }

  previousDay(event: Event){
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() -1);
    console.log("yesterday date", this.datepickedbyuser);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>){
    this.datepickedbyuser = event.value;
    try{
      console.log(this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser)).foodTakenDetails));
    } catch (err: unknown){
      this.foodeaten = new FoodEaten();
      this.foodeaten.foodTakenDetails = this.multiplierArray.value;
      this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser))
      this.foodEatenService.createNewListOfFoodEaten(this.foodeaten)
    }
    // clear the table
    this.dataSource.splice(0);

    console.log(this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser)).foodTakenDetails));
    console.log("today's food",this.dataSource);
    console.log(this.datepickedbyuser);
  }

}
