import { ChangeDetectorRef , Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodDetailsService } from '../food-details.service';
import { FoodDetails, itemDetails } from '../foodDetails';
import { foodTakenDetails } from '../foodEaten';
import { listofFoodDetails } from '../mock-foodDetails';
import { listofFoodEaten } from '../mock-foodEaten';
import { FoodEaten } from '../foodEaten';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


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

  gramsOfFood: number;

  calories: number;
  carbohydrates_total_g: number;
  fat_total_g: number;
  protein_g: number;
  sodium_mg: number;
  sugar_g: number;

  serving_size_g: number;
  name: string;


  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g'];

  dataSource : any[] = [];



  constructor(private changeDetectorRefs: ChangeDetectorRef,private fb: FormBuilder, private foodDetailsService: FoodDetailsService, public changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createFoodTaken = this.fb.group({
      _id: '',
      foodDateIntake: '',
      foodTakenDetails : this.fb.array([]),
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

    console.log("foodticked",this.nameOfFood);
    console.log(this.foodDetailsService.getSpecificFood(this.nameOfFood));
    // this.foodDetailsAlreadyTaken.push(this.foodDetailsService.getSpecificFood(this.nameOfFood));

    this.dataSource = this.dataSource.concat(this.foodDetailsService.getSpecificFood(this.nameOfFood));

    console.log("taken", this.dataSource);

  }

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
    console.log(this.datepickedbyuser);
  }

}
