import { Component, OnInit } from '@angular/core';
import { Workouts } from '../workout';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, observable, Subscriber } from 'rxjs';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';
import { FoodEatenService } from '../food-eaten.service';
import { FoodDetailsService } from '../food-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-editworkout',
  templateUrl: './editworkout.component.html',
  styleUrls: ['./editworkout.component.css']
})
export class EditworkoutComponent implements OnInit {

  workoutchosen: any;
  updateForm: FormGroup;
  createdImage!: Observable<any>;
  createdImageBase64: string;
  updateImage!: Observable<any>;
  updateImageBase64: string;
  image: any;

  displayedColumns: string[] = ['name', 'serving_size_g', 'calories', 'carbohydrates', 'protein', 'sodium', 'sugar_g', 'Delete'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  calories: number;
  carbohydrates_total_g: number;
  fat_total_g: number;
  protein_g: number;
  sodium_mg: number;
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  name: string;
  potassium_mg: number;
  FoodData: any[] = [];
  data: any[] = [];
  linearUnits: string = 'Calories';

  chosenUpdatedImage: File;

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  gradient: boolean = false;


  foodData_calories: number = 0;
  foodData_carbohydrates_total_g: number = 0;
  foodData_protein_g: number = 0;
  foodData_sodium_mg: number = 0;
  foodData_sugar_g: number = 0;


  multiplierArray: FormGroup;


  id: string;
  constructor(private fb: FormBuilder, private workoutService: WorkoutService, private route: ActivatedRoute,
    private foodDetailsService: FoodDetailsService, private foodService: FoodService) {
       // takes the id in the route
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.workoutService.getSpecificWorkout(this.id).subscribe(data => {
        this.workoutchosen = data[0]['result'];
        console.log(this.workoutchosen);
        this.chosenUpdatedImage = this.convertDataUrlToBlob(this.workoutchosen.workout_photo);


        // set image in the web app
        this.updateImage = new Observable((Subscriber: Subscriber<any>) => {
          this.readFile(this.chosenUpdatedImage, Subscriber, 'edit')
        })


        this.data = this.workoutchosen.foodDetails;
        this.updateTable();

        // get the values and store into a variable
        for (var i = 0; i < this.data.length; i++) {
          this.foodData_calories += Number(this.data[i].calories);
          this.foodData_carbohydrates_total_g += Number(this.data[i].carbohydrates_total_g);
          this.foodData_protein_g += Number(this.data[i].protein_g);
          this.foodData_sodium_mg += Number(this.data[i].sodium_mg);
          this.foodData_sugar_g += Number(this.data[i].sugar_g);
        }
        // set the variable
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
        ];
        // fill in the details in the formarray
        for (const workout of this.workoutchosen.workout) {
          this.addUpdateWorkoutDetailsmodal(workout.workout, workout.set, workout.rep);
        }

        this.updateForm.patchValue({
          // _id: this.workoutchosen._id,
          summary: this.workoutchosen.summary,
          calories_burnt: this.workoutchosen.calories_burnt,
          workout_type: this.workoutchosen.workout_type,
          duration: this.workoutchosen.duration,
          equipment: this.workoutchosen.equipment,
          workout: [this.workoutchosen.workout]
        });


        this.multiplierArray = this.fb.group({
          "calories": '',
          'carbohydrates_total_g': '',
          'cholesterol_mg': '',
          'fat_saturated_g': '',
          'fat_total_g': '',
          'fiber_g': '',
          'name': "",
          'potassium_mg': '',
          'protein_g': '',
          'serving_size_g': '',
          'sodium_mg': '',
          'sugar_g': '',
        });

      });
    });
     }

  // when user change photo
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
      summary: ['', [Validators.required]],
      calories_burnt: ['', [Validators.required]],
      workout_type: '',
      duration: '',
      equipment: '',
      workout: this.fb.array([]),
      foodDetails: this.fb.array([]),

    });



  }



  addFood() {

    // get the values inputted by the user
    var foodInputted = (<HTMLSelectElement>document.getElementById('Food')).value;
    var gramsInputted = (<HTMLSelectElement>document.getElementById('Grams')).value;

    // get the values from library
    this.foodService.getFoodDetails(foodInputted).subscribe(data => {
      console.log(data['items'].length, "api");
      for (let i = 0; i < data['items'].length; i++) {
        // get the values from library
        this.carbohydrates_total_g = data['items'][i].carbohydrates_total_g;
        this.calories = data['items'][i].calories;
        this.fat_total_g = data['items'][i].fat_total_g;
        this.protein_g = data['items'][i].protein_g;
        this.sodium_mg = data['items'][i].sodium_mg;
        this.sugar_g = data['items'][i].sugar_g;
        this.serving_size_g = data['items'][i].serving_size_g;
        this.name = data['items'][i].name;
        this.fiber_g = data['items'][i].fiber_g;
        this.potassium_mg = data['items'][i].potassium_mg;
        // multiply the grams which the user has inputted
        var multiplier = parseInt(gramsInputted) / this.serving_size_g;

        // input the multiplied values into the multiplier array
        this.multiplierArray.patchValue({
          "calories": (this.calories * multiplier).toFixed(2),
          'carbohydrates_total_g': (this.carbohydrates_total_g * multiplier).toFixed(2),
          'cholesterol_mg': (this.carbohydrates_total_g * multiplier).toFixed(2),
          'fat_saturated_g': (this.fat_total_g * multiplier).toFixed(2),
          'fat_total_g': (this.fat_total_g * multiplier).toFixed(2),
          'fiber_g': (this.fiber_g * multiplier).toFixed(2),
          'name': this.name,
          'potassium_mg': (this.potassium_mg * multiplier).toFixed(2),
          'protein_g': (this.protein_g * multiplier).toFixed(2),
          'serving_size_g': (this.serving_size_g * multiplier).toFixed(2),
          'sodium_mg': (this.sodium_mg * multiplier).toFixed(2),
          'sugar_g': (this.sugar_g * multiplier).toFixed(2),
        });

        // add the values to its existing values
        this.foodData_calories += (this.calories * multiplier);
        this.foodData_carbohydrates_total_g += + (this.carbohydrates_total_g * multiplier)
        this.foodData_protein_g += (this.protein_g * multiplier);
        this.foodData_sodium_mg += (this.sodium_mg * multiplier);
        this.foodData_sugar_g += (this.sugar_g * multiplier);


        this.data.push(this.multiplierArray.value);
        this.updateTable();
      }
    });
    // reset the form
    (<HTMLSelectElement>document.getElementById('Food')).value = '';
    (<HTMLSelectElement>document.getElementById('Grams')).value = '';
  }

  deleteSpecificFood(index: number) {
    // minus out the current values
    this.foodData_calories -= (this.data[index].calories);
    this.foodData_carbohydrates_total_g -= (this.data[index].carbohydrates_total_g)
    this.foodData_protein_g -= (this.data[index].protein_g);
    this.foodData_sodium_mg -= (this.data[index].sodium_mg);
    this.foodData_sugar_g -= (this.data[index].sugar_g);
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
    ];
    // take out the food the user clicked on
    this.data.splice(index, 1);
    this.updateTable();
  }

  updateTable() {
    // update the tables
    this.dataSource.data = this.data;
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

    // this.newWorkout._id = this.updateForm.value._id;
    this.newWorkout.workout_photo = this.updateImageBase64;
    this.newWorkout.summary = this.updateForm.value.summary;
    this.newWorkout.calories_burnt = this.updateForm.value.calories_burnt;
    this.newWorkout.workout_type = this.updateForm.value.workout_type;
    this.newWorkout.duration = this.updateForm.value.duration;
    this.newWorkout.equipment = this.updateForm.value.equipment;
    this.newWorkout.workout = this.updateForm.value.workout;
    this.newWorkout.foodDetails = this.data;

    this.workoutService.updateWorkout(this.newWorkout, this.id).subscribe();
    this.updateForm.reset();
    // clear the image
    // this.updateimage = [];
    // clear workoutupdate details form
    this.updateworkouts.clear();

  }

}
