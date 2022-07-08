import { Injectable } from '@angular/core';
import { Workouts } from './workout';
import { listOfWorkouts } from './mock-workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() { }

  getWorkouts(): Workouts[] {
    return listOfWorkouts;
  }

  addWorkout(item: Workouts): void{
    listOfWorkouts.push(item);
    // console.log("list of workouts",listOfWorkouts);
  }

  deleteWorkout(id: number){
    listOfWorkouts.splice(id, 1);
  }

  updateWorkout(item: Workouts, itemid: number): void{
    const target = listOfWorkouts.find((item) =>item._id === itemid);
    Object.assign(target, item);
  }

  getSpecificWorkout(id: number){
    const target = listOfWorkouts.find((item) =>item._id == id);
    return target;
  }
}
