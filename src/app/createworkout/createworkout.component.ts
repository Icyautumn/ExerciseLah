import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable, observable, Subscriber } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';


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

  createWorkout: FormGroup;
  createdImage! : Observable<any>;
  updateImage! : Observable<any>;
  createdImageBase64: string;
  updateImageBase64: string;
  setid: number;
  newWorkout: Workouts;

  listOfWorkouts: Workouts[] = [];

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private workoutService: WorkoutService, private router: Router) {
    this.listOfWorkouts = this.workoutService.getWorkouts();
    this.setid = this.listOfWorkouts.length;
   }

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

    if(this.createWorkout.valid){
      // just to get the length of list of workouts
    this.listOfWorkouts = this.workoutService.getWorkouts();
    this.setid = this.listOfWorkouts.length;
    this.newWorkout = new Workouts();
    this.newWorkout._id = this.setid;
    this.newWorkout.workout_photo = this.createdImageBase64;
    this.newWorkout.summary = this.createWorkout.value.summary;
    this.newWorkout.calories_burnt = this.createWorkout.value.calories_burnt;
    this.newWorkout.workout_type = this.createWorkout.value.workout_type;
    this.newWorkout.duration = this.createWorkout.value.duration;
    this.newWorkout.equipment = this.createWorkout.value.equipment;
    this.newWorkout.workout = this.createWorkout.value.workout;
    // console.log("created workout", this.newWorkout);
    this.workoutService.addWorkout(this.newWorkout);
    this.createWorkout.reset();
    // clear the image
    this.createdImageBase64= '';
    // this.readFile(null, null);
    this.convertToBase64(null, null);
    // clear workout details form
    this.workouts.clear();
    this.router.navigate(['/workout']);
    }else{
      alert('please fill up the form');
    }


  }

}
