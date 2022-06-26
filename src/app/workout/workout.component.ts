import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { listofworkout } from '../workout';
import { NgxDropzoneModule } from 'ngx-dropzone';


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
  workoutDetails: listofworkout[];


  constructor(private workoutService: WorkoutService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
      this.listOfWorkouts = this.workoutService.getWorkouts();
      console.log(this.listOfWorkouts);
   }

   createWorkout: FormGroup;

   newWorkout: Workouts;

  ngOnInit(): void {
  }

  files: File[] = []

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event){
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  openCreateModal(contents: any){
    this.modalService.open(contents,  { windowClass: 'my-class'});
    this.createWorkout = this.fb.group({
      _id: '',
      workout_photo: '',
      summary: '',
      calories_burnt: '',
      workout_type: '',
      duration: '',
      equipment: '',
      workout: this.fb.array([])
    });
  }




  openModal(contents:any, workout: Workouts){
    this.modalService.open(contents,  { windowClass: 'my-class'});
    this.image = workout.workout_photo;
    this.summary = workout.summary;
    this.calories_burnt = workout.calories_burnt;
    this.workout_type = workout.workout_type;
    this.duration = workout.duration;
    this.workoutDetails = workout.workout;
    console.log(this.workoutDetails);
  }

  get workout(){
    return this.createWorkout.controls["workout_details"] as FormArray;
  }

  addWorkoutDetails(){
    const workoutDetailsForm = this.fb.group({
      workout_name: ['', Validators.required],
      set: ['3', Validators.required],
      rep: ['12', Validators.required]
    });
    this.workout.push(workoutDetailsForm);

  }

}
