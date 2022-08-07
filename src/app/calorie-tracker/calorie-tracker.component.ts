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
import { FoodService } from '../food.service';

@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.component.html',
  styleUrls: ['./calorie-tracker.component.scss']
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
  foodData_calories: number = 0.0;
  foodData_carbohydrates_total_g: number = 0.0;
  foodData_protein_g: number = 0.0;
  foodData_sodium_mg: number = 0.0;
  foodData_sugar_g: number = 0.0;

  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g', 'Delete'];


  multiplierArray: FormGroup;

  results: any;

  check_if_data_there = false;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private fb: FormBuilder,
    private foodDetailsService: FoodDetailsService, public changeDetectorRef: ChangeDetectorRef,
    private foodEatenService: FoodEatenService, public DatePipe: DatePipe, private postsService: PostsService, private route: ActivatedRoute, private authService: AuthService,
    private foodService: FoodService) {

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.foodService.getFoodCalories(this.id).subscribe(data => {
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

  displayitems() {
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
    if (this.check_if_data_there != true) {
      // create new food calories list in mongodb
      this.foodService.createFoodCalories(this.id, this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy')).subscribe(data => {
        this.results = data;
        this.foodService.getFoodCalories(this.id).subscribe(data => {
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

  addFood() {
    // get the values inputted by the user
    var foodInputted = (<HTMLSelectElement>document.getElementById('Food')).value;
    var gramsInputted = (<HTMLSelectElement>document.getElementById('Grams')).value;

    this.foodService.getFoodDetails(foodInputted).subscribe(data => {
      console.log(data['items'].length, "api");
      for (let i = 0; i < data['items'].length; i++) {
        // get the values from library
        this.carbohydrates_total_g = data['items'][i].carbohydrates_total_g;
        this.calories = data['items'][i].calories;
        this.fat_total_g = data['items'][i].fat_total_g;
        this.protein_g = data['items'][i].protein_g;
        this.sodium_mg = data['items'][i].sodium_mg;
        this.sugar_g = data['items'][i].sugar_g;
        this.serving_size_g = data['items'][i].serving_size_g;
        this.name = data['items'][i].name;
        this.fiber_g = data['items'][i].fiber_g;
        this.potassium_mg = data['items'][i].potassium_mg;
        // multiply the grams which the user has inputted
        var multiplier = parseInt(gramsInputted) / this.serving_size_g;

        // input the multiplied values into the multiplier array
        this.multiplierArray.patchValue({
          "calories": (this.calories * multiplier).toFixed(2),
          'carbohydrates_total_g': (this.carbohydrates_total_g * multiplier).toFixed(2),
          'cholesterol_mg': (this.carbohydrates_total_g * multiplier).toFixed(2),
          'fat_saturated_g': (this.fat_total_g * multiplier).toFixed(2),
          'fat_total_g': (this.fat_total_g * multiplier).toFixed(2),
          'fiber_g': (this.fiber_g * multiplier).toFixed(2),
          'name': this.name,
          'potassium_mg': (this.potassium_mg * multiplier).toFixed(2),
          'protein_g': (this.protein_g * multiplier).toFixed(2),
          'serving_size_g': (this.serving_size_g * multiplier).toFixed(2),
          'sodium_mg': (this.sodium_mg * multiplier).toFixed(2),
          'sugar_g': (this.sugar_g * multiplier).toFixed(2),
        });

        // add the values to its existing values
        this.foodData_calories += (this.calories * multiplier);
        this.foodData_carbohydrates_total_g += + (this.carbohydrates_total_g * multiplier)
        this.foodData_protein_g += (this.protein_g * multiplier);
        this.foodData_sodium_mg += (this.sodium_mg * multiplier);
        this.foodData_sugar_g += (this.sugar_g * multiplier);


        this.data.push(this.multiplierArray.value);
        this.foodService.updateFoodCalories(this.id, this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy'), this.data).subscribe()
        this.updateTable();
      }
    });



    // reset the form
    (<HTMLSelectElement>document.getElementById('Food')).value = '';
    (<HTMLSelectElement>document.getElementById('Grams')).value = '';
  }

  nextDay() {
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() + 1);
    console.log("tmr date", this.datepickedbyuser);
  }

  previousDay(event: Event) {
    this.datepickedbyuser.setDate(this.datepickedbyuser.getDate() - 1);
    console.log("yesterday date", this.datepickedbyuser);
  }
  resetGraphData() {
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
  }


  deleteSpecificFood(index: number) {
    // minus out the current values
    this.foodData_calories -= (this.data[index].calories);
    this.foodData_carbohydrates_total_g -= (this.data[index].carbohydrates_total_g)
    this.foodData_protein_g -= (this.data[index].protein_g);
    this.foodData_sodium_mg -= (this.data[index].sodium_mg);
    this.foodData_sugar_g -= (this.data[index].sugar_g);
    // take out the food the user clicked on
    this.data.splice(index, 1);
    this.updateTable();
    this.foodService.updateFoodCalories(this.id, this.DatePipe.transform(this.datepickedbyuser, 'dd-MM-yyyy'), this.data).subscribe()
  }

}
