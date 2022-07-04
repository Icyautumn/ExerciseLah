import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { listofworkout } from '../workout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class WorkoutComponent implements OnInit {

  listOfWorkouts: Workouts[] = [];

  // trashcan = faTrashCan;

  image: File[];
  summary: string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  workoutDetails: listofworkout[];
  updateForm: FormGroup;
  createWorkout: FormGroup;
  updateimage: File[];
  setid: number;


  constructor(private workoutService: WorkoutService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.listOfWorkouts = this.workoutService.getWorkouts();
    this.setid = this.listOfWorkouts.length;
  }



  newWorkout: Workouts;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      _id: '',
      workout_photo: '',
      summary: '',
      calories_burnt: '',
      workout_type: '',
      duration: '',
      equipment: '',
      workout: this.fb.array([])
    });
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

  files: File[] = []

  onSelect(event) {
    // console.log(event);
    if (this.files && this.files.length == 1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpdateRemove(event) {
    // console.log(event);
    this.updateimage.splice(this.updateimage.indexOf(event), 1);
  }

  openCreateModal(contents: any) {
    this.modalService.open(contents, { windowClass: 'my-class' });
  }

  onSubmit() {
    this.newWorkout = new Workouts();
    this.newWorkout._id = this.setid;
    this.newWorkout.workout_photo = this.files;
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
    this.files = [];
    // clear workout details form
    this.workouts.clear();

  }

  openModalview(contents: any, workout: Workouts) {
    this.modalService.open(contents, { windowClass: 'my-class' });
    this.image = workout.workout_photo;
    this.summary = workout.summary;
    this.calories_burnt = workout.calories_burnt;
    this.workout_type = workout.workout_type;
    this.duration = workout.duration;
    this.workoutDetails = workout.workout;
    // console.log();
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



  deleteEntireWorkout(EntireWorkout: number) {
    this.workoutService.deleteWorkout(EntireWorkout);
  }

  openModalupdate(contents: any, workoutchosen: Workouts) {
    console.log("Workout details", workoutchosen.workout);
    for(const workout of workoutchosen.workout){
      console.log("workout workout",workout.workout);
      console.log("workout.set",workout.set);
      console.log("workout.rep",workout.rep);
      this.addUpdateWorkoutDetailsmodal(workout.workout, workout.set, workout.rep);
    }
    this.modalService.open(contents, { windowClass: 'my-class' });
    this.updateimage = workoutchosen.workout_photo;
    // console.log("before", this.updateForm);
    this.updateForm.patchValue({
      _id: workoutchosen._id,
      workout_photo: this.updateimage,
      summary: workoutchosen.summary,
      calories_burnt: workoutchosen.calories_burnt,
      workout_type: workoutchosen.workout_type,
      duration: workoutchosen.duration,
      equipment: workoutchosen.equipment,
      workout: [workoutchosen.workout]
    });
    console.log(this.updateForm);
  }


  get updateworkouts() {
    return this.updateForm.controls["workout"] as FormArray;
  }


  addUpdateWorkoutDetailsmodal(workout, set, rep) {
    const workoutDetailsForm = this.fb.group({
      workout: workout,
      set: set,
      rep: rep
    });
    this.updateworkouts.push(workoutDetailsForm);
  }


  addUpdateWorkoutDetails() {
    const workoutDetailsForm = this.fb.group({
      workout: ['', Validators.required],
      set: ['', Validators.required],
      rep: ['', Validators.required]
    });
    this.updateworkouts.push(workoutDetailsForm);
  }

  deleteUpdateWorkout(workoutIndex: number) {
    this.updateworkouts.removeAt(workoutIndex);
  }
  // code not updated yet
  onUpdate() {
    this.newWorkout = new Workouts();
    this.newWorkout._id = this.updateForm.value._id;
    this.newWorkout.workout_photo = this.updateimage;
    this.newWorkout.summary = this.updateForm.value.summary;
    this.newWorkout.calories_burnt = this.updateForm.value.calories_burnt;
    this.newWorkout.workout_type = this.updateForm.value.workout_type;
    this.newWorkout.duration = this.updateForm.value.duration;
    this.newWorkout.equipment = this.updateForm.value.equipment;
    this.newWorkout.workout = this.updateForm.value.workout;
    // console.log("created workout", this.newWorkout);
    this.workoutService.updateWorkout(this.newWorkout, this.newWorkout._id);
    this.updateForm.reset();
    // clear the image
    this.updateimage = [];
    // clear workout details form
    this.updateworkouts.clear();

  }

}
