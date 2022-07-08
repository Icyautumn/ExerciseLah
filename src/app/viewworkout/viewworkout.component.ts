import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listofworkout, Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { DomSanitizer } from '@angular/platform-browser';


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
    });
  }

  changeToImage(base64String: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }



}
