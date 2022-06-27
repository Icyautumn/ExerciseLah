import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { listofworkout } from '../workout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class WorkoutComponent implements OnInit {

  listOfWorkouts: Workouts[] = [];

  image: File[];
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



   newWorkout: Workouts;

  ngOnInit(): void {
  }

  files: File[] = []

  onSelect(event) {
    console.log(event);
    if(this.files && this.files.length == 1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event){
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  openCreateModal(contents: any){
    this.modalService.open(contents,  { windowClass: 'my-class'});

  }

  onSubmit(){
    this.newWorkout = new Workouts();
    this.newWorkout._id = 1;
    this.newWorkout.workout_photo = this.files;
    this.newWorkout.summary = this.createWorkout.value.summary;
    this.newWorkout.calories_burnt = this.createWorkout.value.calories_burnt;
    this.newWorkout.workout_type = this.createWorkout.value.workout_type;
    this.newWorkout.duration = this.createWorkout.value.duration;
    this.newWorkout.equipment = this.createWorkout.value.equipment;
    this.newWorkout.workout = this.createWorkout.value.workout;
    console.log(this.newWorkout);
    this.workoutService.addWorkout(this.newWorkout);
    this.createWorkout.reset();
    this.files = [];

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

  createWorkout = this.fb.group({
    _id: '',
    workout_photo: '',
    summary: '',
    calories_burnt: '',
    workout_type: '',
    duration: '',
    equipment: '',
    workout: this.fb.array([])
  });

  get workouts(){
    return this.createWorkout.controls["workout"] as FormArray;
  }

  addWorkoutDetails(){
    const workoutDetailsForm = this.fb.group({
      workout: ['', Validators.required],
      set: ['', Validators.required],
      rep: ['', Validators.required]
    });
    this.workouts.push(workoutDetailsForm);
    console.log(this.files);
  }

  deleteWorkout(workoutIndex: number){
    this.workouts.removeAt(workoutIndex);
  }

}
