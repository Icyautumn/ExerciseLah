import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable, observable, Subscriber } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
import { FoodDetailsService } from '../food-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommentsService } from '../comments.service';
import { comments } from '../comments';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-createworkout',
  templateUrl: './createworkout.component.html',
  styleUrls: ['./createworkout.component.css']
})
export class CreateworkoutComponent implements OnInit {


  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  data : any[] =[];
  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g', 'Delete'];

  FoodData: any[] = [];
  showData: any[] = [];
  multiplierArray: FormGroup;

  view: any[] = [800, 200];
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  gradient: boolean = false;

  createWorkout: FormGroup;
  createdImage! : Observable<any>;
  updateImage! : Observable<any>;
  createdImageBase64: string;
  updateImageBase64: string;
  setid: number;
  newWorkout: Workouts;
  linearView: any[] = [200, 200];
  linearUnits: string = 'Calories';

  foodData_calories: number = 0;
  foodData_carbohydrates_total_g: number = 0;
  foodData_protein_g: number = 0;
  foodData_sodium_mg: number = 0;
  foodData_sugar_g: number = 0;

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

  listOfWorkouts: Workouts[] = [];

  newComment: comments;

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router,
    private foodDetailsService: FoodDetailsService,
    private commentsService: CommentsService, private authService: AuthService, private foodService: FoodService) {}

  ngOnInit(): void {
    this.createWorkout = this.fb.group({
      _id: '',
      workout_photo: '',
      summary: ['', [Validators.required]],
      calories_burnt: ['', [Validators.required]],
      workout_type: '',
      duration: ['', [Validators.required]],
      equipment: ['', [Validators.required]],
      workout: this.fb.array([])
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
    });

    this.FoodData = [
      {
        name: 'carbohydrates_total_g',
        value: 0
      },
      {
        name: 'protein_g',
        value: 0
      },
      {
        name: 'sodium_mg',
        value: 0
      },
      {
        name: 'sugar_g',
        value: 0
      },
    ];
    this.FoodData = [...this.FoodData];
    this.addWorkoutDetails();
  }

  addFood(){

    // get the values inputted by the user
    var foodInputted = (<HTMLSelectElement>document.getElementById('Food')).value;
    var gramsInputted = (<HTMLSelectElement>document.getElementById('Grams')).value;

    // get the values from library
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
        this.updateTable();
      }
    });



    // reset the form
    (<HTMLSelectElement>document.getElementById('Food')).value = '';
    (<HTMLSelectElement>document.getElementById('Grams')).value = '';
  }


  deleteSpecificFood(index: number){
    // minus out the current values
    this.foodData_calories -= (this.data[index].calories);
    this.foodData_carbohydrates_total_g -= (this.data[index].carbohydrates_total_g)
    this.foodData_protein_g -= (this.data[index].protein_g);
    this.foodData_sodium_mg -= (this.data[index].sodium_mg);
    this.foodData_sugar_g -= (this.data[index].sugar_g);
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
    // take out the food the user clicked on
    this.data.splice(index, 1);
    this.updateTable();
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
  // user selects an image
  onChange = (event: Event, create_or_edit: string) => {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file, create_or_edit);
  }

  convertToBase64(file: File, create_or_edit: string) {
    if(create_or_edit == 'create'){
      this.createdImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'create');
      });
    }else if(create_or_edit == 'edit'){
      this.updateImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'edit');
      });
    } else{
    }
  }

  readFile(file: File, subscriber: Subscriber<any>, create_or_edit: string) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      if(create_or_edit == "create"){
        this.createdImageBase64 = filereader.result.toString();
      } else{
        this.updateImageBase64 = filereader.result.toString();
      }


      subscriber.next(filereader.result);

      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  get workouts() {
    // console.log("get workouts",this.createWorkout);
    return this.createWorkout.controls["workout"] as FormArray;
  }


  addWorkoutDetails() {
    const workoutDetailsForm = this.fb.group({
      workout: ['', Validators.required],
      set: ['', Validators.required],
      rep: ['', Validators.required]
    });
    this.workouts.push(workoutDetailsForm);
  }



  deleteWorkout(workoutIndex: number) {
    this.workouts.removeAt(workoutIndex);
  }

  onSubmit() {

    if(this.createWorkout.valid && this.createdImage != null){

    this.newWorkout = new Workouts();
    this.newWorkout.username = this.authService.getUsername();
    this.newWorkout.workout_photo = this.createdImageBase64;
    this.newWorkout.summary = this.createWorkout.value.summary;
    this.newWorkout.calories_burnt = this.createWorkout.value.calories_burnt;
    this.newWorkout.workout_type = this.createWorkout.value.workout_type;
    this.newWorkout.duration = this.createWorkout.value.duration;
    this.newWorkout.equipment = this.createWorkout.value.equipment;
    this.newWorkout.workout = this.createWorkout.value.workout;
    this.newWorkout.foodDetails = this.dataSource.data;
    this.newWorkout.commentOfUser = [];
    // console.log("created workout", this.newWorkout);
    this.workoutService.addWorkout(this.newWorkout).subscribe();
    console.log(this.newWorkout);
    this.createWorkout.reset();
    // clear the image
    this.createdImageBase64= '';
    // this.readFile(null, null);
    this.convertToBase64(null, null);
    // clear workout details form
    this.workouts.clear();

    // create an empty commment for new workout
    // this.newComment = new comments();
    // this.newComment._idOfWorkout = this.setid;
    // this.newComment.comments = [];
    // this.commentsService.newCommentTable(this.newComment);

    this.router.navigate(['/workout']);
    }else{
      alert('please set an image');
    }
  }
}
