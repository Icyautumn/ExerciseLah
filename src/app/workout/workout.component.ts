import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Workouts } from '../workout';
import { WorkoutService } from '../workout.service';
import { listofworkout } from '../workout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, observable, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsService } from '../comments.service';
import { AuthService } from '../auth.service';
import {MatRadioModule} from '@angular/material/radio';
import { ThisReceiver } from '@angular/compiler';
import { ReportService } from '../report.service';

// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class WorkoutComponent implements OnInit {

  listOfWorkouts: Workouts[] = [];
  filteredWorkout: Workouts[] = [];

  // trashcan = faTrashCan;
  createdImage! : Observable<any>;
  createdImageBase64: string;
  updateImage! : Observable<any>;
  updateImageBase64: string;
  image: any;

  summary: string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  workoutDetails: listofworkout[];
  updateForm: FormGroup;
  createWorkout: FormGroup;
  reportworkout: FormGroup;

  setid: number;

  user: string;

  reportworkout_id: string;

  favouriteList: any[] = [];

  reportworkout_workout_creator: string;

  userSecuretoken: string;

  userrole: string;


  constructor(private workoutService: WorkoutService,
    private modalService: NgbModal,
    private fb: FormBuilder, private sanitizer: DomSanitizer, private commentsService: CommentsService, private authService:AuthService, private reportService: ReportService) {

    this.workoutService.getWorkouts().subscribe(data => {
      this.reportworkout = this.fb.group({
        workout_id: '',
        report_type: ['', Validators.required],
        report : ['', Validators.required],
        user_id: ['', Validators.required]
      })
      // get workout
      this.listOfWorkouts = data[0]["result"];
      this.user = this.authService.getSecureToken();
      this.userrole = this.authService.getUserRole();
      // console.log(this.listOfWorkouts);
      this.filteredWorkout = this.listOfWorkouts;
    });
    this.userSecuretoken = this.authService.getSecureToken();
    if(this.userSecuretoken != null){
      this.authService.profileInformation(this.userSecuretoken).subscribe(data=>{
        // console.log(data[0].favourite); 
        this.favouriteList = data[0].favourite;
      })
    }


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
      workout: this.fb.array([]),
      createdBy: ''
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

    this.reportworkout = this.fb.group({
      workout_id: '',
      report_type: ['', Validators.required],
      report : ['', Validators.required],
      user_id: ['', Validators.required],
      user_email: ['', Validators.required],
      workout_creator: ['', Validators.required]
    })
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

  changeToImage(base64String: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

  // onSubmit() {
  //   // just to get the length of list of workouts
  //   this.listOfWorkouts = this.workoutService.getWorkouts();
  //   this.setid = this.listOfWorkouts.length;


  //   this.newWorkout = new Workouts();
  //   this.newWorkout._id = this.setid;
  //   this.newWorkout.workout_photo = this.createdImageBase64;
  //   this.newWorkout.summary = this.createWorkout.value.summary;
  //   this.newWorkout.calories_burnt = this.createWorkout.value.calories_burnt;
  //   this.newWorkout.workout_type = this.createWorkout.value.workout_type;
  //   this.newWorkout.duration = this.createWorkout.value.duration;
  //   this.newWorkout.equipment = this.createWorkout.value.equipment;
  //   this.newWorkout.workout = this.createWorkout.value.workout;
  //   // console.log("created workout", this.newWorkout);
  //   this.workoutService.addWorkout(this.newWorkout);
  //   this.createWorkout.reset();
  //   // clear the image
  //   this.createdImageBase64= '';
  //   // this.readFile(null, null);
  //   this.convertToBase64(null, null);
  //   // clear workout details form
  //   this.workouts.clear();

  // }

  openModalview(contents: any, workout_id: string, workout_creator: string) {
    this.reportworkout_id = workout_id;
    this.reportworkout_workout_creator = workout_creator
    this.modalService.open(contents);
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



  deleteEntireWorkout(EntireWorkout: string) {
    this.workoutService.deleteWorkout(EntireWorkout).subscribe();
    location.reload();
  }

  // Update method starts here

  convertDataUrlToBlob(dataUrl): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'filename', {type: mime});
}

  openModalupdate(contents: any, workoutchosen: Workouts) {
    // console.log("Workout details", workoutchosen.workout);

    var chosenUpdatedImage = this.convertDataUrlToBlob(workoutchosen.workout_photo)

    this.convertToBase64(chosenUpdatedImage, "edit");
    // fill in the details in the formarray
    for(const workout of workoutchosen.workout){
      // console.log("workout workout",workout.workout);
      // console.log("workout.set",workout.set);
      // console.log("workout.rep",workout.rep);
      this.addUpdateWorkoutDetailsmodal(workout.workout, workout.set, workout.rep);
    }
    this.modalService.open(contents, { windowClass: 'my-class' });
    // this.updateimage = workoutchosen.workout_photo;
    // console.log("before", this.updateForm);

    console.log("edit id",workoutchosen._id);
    this.updateForm.patchValue({
      _id: workoutchosen._id,
      summary: workoutchosen.summary,
      calories_burnt: workoutchosen.calories_burnt,
      workout_type: workoutchosen.workout_type,
      duration: workoutchosen.duration,
      equipment: workoutchosen.equipment,
      workout: [workoutchosen.workout]
    });
    // console.log(this.updateForm);
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
    // console.log("id",this.updateForm.value._id);
    this.newWorkout._id = this.updateForm.value._id;
    this.newWorkout.workout_photo = this.updateImageBase64;
    this.newWorkout.summary = this.updateForm.value.summary;
    this.newWorkout.calories_burnt = this.updateForm.value.calories_burnt;
    this.newWorkout.workout_type = this.updateForm.value.workout_type;
    this.newWorkout.duration = this.updateForm.value.duration;
    this.newWorkout.equipment = this.updateForm.value.equipment;
    this.newWorkout.workout = this.updateForm.value.workout;


    this.updateForm.reset();
    // clear the image
    // this.updateimage = [];
    // clear workoutupdate details form
    this.updateworkouts.clear();

  }



  // filter

  filter(name: string){
    this.filteredWorkout = this.listOfWorkouts.filter((obj) =>{
      return obj.workout_type === name;
    })
  }

  noFilter(){
    this.filteredWorkout = this.listOfWorkouts;
  }


  submitReport(){
    this.reportworkout.patchValue({
      workout_id : this.reportworkout_id,
      report_type: this.reportworkout.value.report_type,
      report: this.reportworkout.value.report,
      user_id: this.authService.getSecureToken(),
      // user_email

    });
    this.reportService.reportWorkout(this.reportworkout).subscribe();
    this.modalService.dismissAll();
    this.reportworkout.reset();
  }

  favouriteworkout(workout_id: string){
    // add to favourite in 
  }

}
