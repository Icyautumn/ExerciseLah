import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { listofworkout } from '../workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  listOfWorkouts: Workouts[] = [];

  image: string;
  summary: string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  workout: listofworkout[];


  constructor(private workoutService: WorkoutService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
      this.listOfWorkouts = this.workoutService.getWorkouts();
   }

   createWorkout: FormGroup;

   newWorkout: Workouts;

  ngOnInit(): void {
  }




  openModal(contents:any, workout: Workouts){
    this.modalService.open(contents,  { windowClass: 'my-class'});
    this.image = workout.workout_photo;
    this.summary = workout.summary;
    this.calories_burnt = workout.calories_burnt;
    this.workout_type = workout.workout_type;
    this.duration = workout.duration;
    this.workout = workout.workout;
  }

}
