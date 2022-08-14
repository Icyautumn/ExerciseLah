import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodDetails, listofworkout, Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { PhotosService } from '../photos.service';


@Component({
  selector: 'app-viewworkout',
  templateUrl: './viewworkout.component.html',
  styleUrls: ['./viewworkout.component.css']
})
export class ViewworkoutComponent implements OnInit {
  workout: any;
  id: string;
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

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private photosService: PhotosService) {
    // get id from route
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.workoutService.getSpecificWorkout(this.id).subscribe(data => {
        this.workout = data[0]["result"]
        // console.log(this.workout);
        this.image = this.photosService.changeToImage(this.workout.workout_photo);
        this.summary = this.workout.summary;
        this.calories_burnt = this.workout.calories_burnt;
        this.workout_type = this.workout.workout_type;
        this.duration = this.workout.duration;
        this.workoutDetails = this.workout.workout;
        this.foodDetails = this.workout.foodDetails;
        this.dataSource.data = this.foodDetails;
        // get the total of food details
        for (var i = 0; i < this.foodDetails.length; i++) {
          this.foodData_calories += Number(this.foodDetails[i].calories);
          this.foodData_carbohydrates_total_g += Number(this.foodDetails[i].carbohydrates_total_g);
          this.foodData_protein_g += Number(this.foodDetails[i].protein_g);
          this.foodData_sodium_mg += Number(this.foodDetails[i].sodium_mg);
          this.foodData_sugar_g += Number(this.foodDetails[i].sugar_g);
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
    });

   }

  ngOnInit(): void {



  }
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  changeToImage(base64String: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

}
