import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodDetailsService } from '../food-details.service';
import { FoodDetails } from '../foodDetails';
import { foodTakenDetails } from '../foodEaten';
import { listofFoodDetails } from '../mock-foodDetails';


@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.component.html',
  styleUrls: ['./calorie-tracker.component.css']
})
export class CalorieTrackerComponent implements OnInit {

  createFoodTaken: FormGroup;

  datepickedbyuser  = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFoodTaken = this.fb.group({
      _id: '',
      foodDateIntake: '',
      foodTakenDetails : this.fb.array([]),
    })
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
