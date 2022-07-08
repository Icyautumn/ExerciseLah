import { Component, OnInit } from '@angular/core';
import { Workouts } from '../workout';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, observable, Subscriber } from 'rxjs';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editworkout',
  templateUrl: './editworkout.component.html',
  styleUrls: ['./editworkout.component.css']
})
export class EditworkoutComponent implements OnInit {

  workoutchosen: Workouts;
  updateForm: FormGroup;
  createdImage!: Observable<any>;
  createdImageBase64: string;
  updateImage!: Observable<any>;
  updateImageBase64: string;
  image: any;
  id: number;
  constructor(private fb: FormBuilder, private workoutService: WorkoutService, private route: ActivatedRoute) { }


  onChange = (event: Event, create_or_edit: string) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file, create_or_edit);
  }

  convertDataUrlToBlob(dataUrl): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'filename', { type: mime });
  }

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

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.workoutchosen = this.workoutService.getSpecificWorkout(this.id);
      var chosenUpdatedImage = this.convertDataUrlToBlob(this.workoutchosen.workout_photo)

      this.convertToBase64(chosenUpdatedImage, "edit");
      // fill in the details in the formarray
      for (const workout of this.workoutchosen.workout) {
        console.log("workout workout", workout.workout);
        console.log("workout.set", workout.set);
        console.log("workout.rep", workout.rep);
        this.addUpdateWorkoutDetailsmodal(workout.workout, workout.set, workout.rep);
      }

      console.log("edit id", this.workoutchosen._id);
      this.updateForm.patchValue({
        _id: this.workoutchosen._id,
        summary: this.workoutchosen.summary,
        calories_burnt: this.workoutchosen.calories_burnt,
        workout_type: this.workoutchosen.workout_type,
        duration: this.workoutchosen.duration,
        equipment: this.workoutchosen.equipment,
        workout: [this.workoutchosen.workout]
      });
      console.log(this.updateForm);
    });
  }

  convertToBase64(file: File, create_or_edit: string) {
    if (create_or_edit == 'create') {
      this.createdImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'create');
      });
    } else if (create_or_edit == 'edit') {
      this.updateImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'edit');
      });
    } else {

    }


  }

  readFile(file: File, subscriber: Subscriber<any>, create_or_edit: string) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      if (create_or_edit == "create") {
        this.createdImageBase64 = filereader.result.toString();
      } else {
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

  newWorkout: Workouts;

  onUpdate() {
    this.newWorkout = new Workouts();
    console.log("id", this.updateForm.value._id);
    this.newWorkout._id = this.updateForm.value._id;
    this.newWorkout.workout_photo = this.updateImageBase64;
    this.newWorkout.summary = this.updateForm.value.summary;
    this.newWorkout.calories_burnt = this.updateForm.value.calories_burnt;
    this.newWorkout.workout_type = this.updateForm.value.workout_type;
    this.newWorkout.duration = this.updateForm.value.duration;
    this.newWorkout.equipment = this.updateForm.value.equipment;
    this.newWorkout.workout = this.updateForm.value.workout;

    this.workoutService.updateWorkout(this.newWorkout, this.newWorkout._id);
    this.updateForm.reset();
    // clear the image
    // this.updateimage = [];
    // clear workoutupdate details form
    this.updateworkouts.clear();

  }
}
