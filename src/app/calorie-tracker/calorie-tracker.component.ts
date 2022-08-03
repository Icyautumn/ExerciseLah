import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodDetailsService } from '../food-details.service';
import { FoodEatenService } from '../food-eaten.service';
import { FoodDetails, itemDetails } from '../foodDetails';
import { foodTakenDetails } from '../foodEaten';
import { listofFoodDetails } from '../mock-foodDetails';
import { listofFoodEaten } from '../mock-foodEaten';
import { FoodEaten } from '../foodEaten';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DatePipe } from '@angular/common';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Double } from 'mongodb';

@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.component.html',
  styleUrls: ['./calorie-tracker.component.css']
})
export class CalorieTrackerComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  myForm!: FormGroup;
  posts: any = [];

  foodDetailsAlreadyTaken: itemDetails[] = [];

  createFoodTaken: FormGroup;

  datepickedbyuser = new Date();

  nameOfFood: string;

  foodeaten: any;

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

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  gradient: boolean = false;

  linearUnits: string = 'Calories';

  id: string;

  FoodData: any[] = [];
  data: any[] = [];
  foodData_calories: number = 0;
  foodData_carbohydrates_total_g: number = 0;
  foodData_protein_g: number = 0;
  foodData_sodium_mg: number = 0;
  foodData_sugar_g: number = 0;

  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g', 'Delete'];


  multiplierArray: FormGroup;

  results: any;

  check_if_data_there = false;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder,
    private foodDetailsService: FoodDetailsService, public changeDetectorRef: ChangeDetectorRef,
    private foodEatenService: FoodEatenService, public DatePipe: DatePipe, private postsService: PostsService, private route: ActivatedRoute, private authService: AuthService) {

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.authService.getFoodCalories(this.id).subscribe(data => {
        this.results = data;
        console.log(this.results);
        this.displayitems();
      });
    });

    // try {
    //   this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser)).foodTakenDetails);
    // } catch (err: unknown) {
    //   this.foodeaten = new FoodEaten();
    //   this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser, 'yyyy-MM-dd'))
    //   this.foodEatenService.createNewListOfFoodEaten(this.foodeaten)
    // }

  }

  displayitems(){
    // find the correct date to fit to the table
    for (let i = 0; i < this.results[0].foodCalories.length; i++) {
      if (this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy') == this.results[0].foodCalories[i].date) {
        this.data = (this.results[0].foodCalories[i].foodItems);
        this.check_if_data_there = true;
        for (var j = 0; j < this.data.length; j++) {
          this.foodData_calories += parseInt(this.data[j].calories);
          this.foodData_carbohydrates_total_g += parseInt(this.data[j].carbohydrates_total_g);
          this.foodData_protein_g += parseInt(this.data[j].protein_g);
          this.foodData_sodium_mg += parseInt(this.data[j].sodium_mg);
          this.foodData_sugar_g += parseInt(this.data[j].sugar_g);
        }
      }
    }
    if(this.check_if_data_there != true){
      // create new food calories list in mongodb
      this.authService.createFoodCalories(this.id, this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy')).subscribe(data => {
        this.results = data;
      this.authService.getFoodCalories(this.id).subscribe(data => {
        this.results = data;
        console.log(this.results, "null");
        this.displayitems();
      });
    });

      }
    this.updateTable();
    this.check_if_data_there = false;
  }

  updateTable() {
    // update the tables
    this.dataSource.data = this.data;
    this.FoodData = [
      {
        name: 'carbohydrates_total_g',
        value: this.foodData_carbohydrates_total_g
      },
      {
        name: 'protein_g',
        value: this.foodData_protein_g
      },
      {
        name: 'sodium_mg',
        value: this.foodData_sodium_mg
      },
      {
        name: 'sugar_g',
        value: this.foodData_sugar_g
      },
    ];
  }

  ngOnInit(): void {
    this.createFoodTaken = this.fb.group({
      foodDateIntake: '',
      foodTakenDetails: this.fb.array([]),
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

    this.FoodData = [
      {
        name: 'carbohydrates_total_g',
        value: this.foodData_carbohydrates_total_g
      },
      {
        name: 'protein_g',
        value: this.foodData_protein_g
      },
      {
        name: 'sodium_mg',
        value: this.foodData_sodium_mg
      },
      {
        name: 'sugar_g',
        value: this.foodData_sugar_g
      },
    ];

  }

  showDate() {
    this.datepickedbyuser;
  }

  get foodTakeDetails() {
    return this.createFoodTaken.controls["foodTakenDetails"] as FormArray;
  }

  addFood() {

  }

  addFoodTakenDetails() {
    const FoodTakenDetailsForm = this.fb.group({
      name: ['', Validators.required],
      serving_size_g: ['', Validators.required],
    });
    this.foodTakeDetails.push(FoodTakenDetailsForm);
  }

  getFoodData(idInTheArray: number) {
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

    // if (this.dataSource[0].name == "" || this.dataSource[0].name == null) {
    //   this.dataSource.pop();
    //   this.dataSource = this.dataSource.concat(this.multiplierArray.value);
    // } else {
    //   // fit the details in the table
    //   this.dataSource = this.dataSource.concat(this.multiplierArray.value);
    // }
    // console.log(this.dataSource);





    this.foodeaten = new Object();
    this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser, 'yyyy-MM-dd'),)
    this.foodeaten.foodTakenDetails = this.dataSource;
    this.foodEatenService.updateFoodEaten(this.foodeaten);
    console.log(this.foodeaten);

    // this.foodEatenService.addToListOfFoodEaten();

  }
  // ChangeTheValues(foodArray, foodServingMulitplier){
  //   for(const [k,v] of Object.entries(foodArray)){

  //   }
  // }

  nextDay() {
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() + 1);
    console.log("tmr date", this.datepickedbyuser);
  }

  previousDay(event: Event) {
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() - 1);
    console.log("yesterday date", this.datepickedbyuser);
  }
  resetGraphData(){
    this.foodData_calories = 0;
    this.foodData_carbohydrates_total_g = 0;
    this.foodData_protein_g = 0;
    this.foodData_sodium_mg = 0;
    this.foodData_sugar_g = 0;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.datepickedbyuser = event.value;
    console.log("date", this.datepickedbyuser);
    this.resetGraphData();

    this.displayitems();
    // this.dataSource.splice(0);

    // for (let i = 0; i < this.results[0].foodCalories.length; i++){
    //   if (this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy') == this.results[0].foodCalories[i].date) {
    //     console.log("true");
    //     this.dataSource = this.dataSource.concat(this.results[0].foodCalories[i].foodItems);
    //   }
    //   else{
    //     // create new food calories list in mongodb
    //   }
    // }



    // try {
    //   this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser, 'yyyy-MM-dd')).foodTakenDetails);
    // } catch (error) {
    //   this.foodeaten = new Object();
    //   this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser))
    //   this.foodeaten.foodTakenDetails = this.multiplierArray.value;
    //   console.log("this is what i am creating", this.foodeaten);
    //   this.foodEatenService.createNewListOfFoodEaten(this.foodeaten)
    //   this.foodEatenService.checkList();
    // }
    // clear the table


    // console.log(this.dataSource = this.dataSource.concat(this.foodEatenService.getListofFoodEaten(this.DatePipe.transform(this.datepickedbyuser)).foodTakenDetails));
    // console.log("today's food", this.dataSource);
    // console.log(this.datepickedbyuser);

    this.foodEatenService.checkList();
  }


  deleteSpecificFood(index: number) {
    // this.dataSource.splice(index, 1);
    // console.log("delete", this.dataSource);
    // this.foodeaten = new FoodEaten();
    // this.foodeaten.foodDateIntake = new Date(this.DatePipe.transform(this.datepickedbyuser))
    // this.foodeaten.foodTakenDetails = this.dataSource;
    // this.foodEatenService.updateFoodEaten(this.foodeaten);
    this.foodEatenService.checkList();
  }

}
