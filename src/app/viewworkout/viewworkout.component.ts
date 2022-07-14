import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodDetails, listofworkout, Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-viewworkout',
  templateUrl: './viewworkout.component.html',
  styleUrls: ['./viewworkout.component.css']
})
export class ViewworkoutComponent implements OnInit {
  workout: Workouts;
  id: number;
  image: any;
  summary: string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  workoutDetails: listofworkout[];
  foodDetails: foodDetails[];
  FoodData: any[] = [];

  // set original values
  foodData_calories: number = 0;
  foodData_carbohydrates_total_g: number = 0;
  foodData_protein_g: number = 0;
  foodData_sodium_mg: number = 0;
  foodData_sugar_g: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  linearUnits: string = 'Calories';
  gradient: boolean = false;

  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g'];

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // get id from route
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.workout = this.workoutService.getSpecificWorkout(this.id);
      this.image = this.changeToImage(this.workout.workout_photo);
      this.summary = this.workout.summary;
      this.calories_burnt = this.workout.calories_burnt;
      this.workout_type = this.workout.workout_type;
      this.duration = this.workout.duration;
      this.workoutDetails = this.workout.workout;
      this.foodDetails = this.workout.foodDetails;
      this.dataSource.data = this.foodDetails;

      // get the total of food details
      for (var i = 0; i < this.foodDetails.length; i++){
        this.foodData_calories += this.foodDetails[i].calories;
        this.foodData_carbohydrates_total_g += this.foodDetails[i].carbohydrates_total_g;
        this.foodData_protein_g += this.foodDetails[i].protein_g;
        this.foodData_sodium_mg += this.foodDetails[i].sodium_mg;
        this.foodData_sugar_g += this.foodDetails[i].sugar_g;
      }
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
      ]
    });
  }

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  changeToImage(base64String: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }





}
