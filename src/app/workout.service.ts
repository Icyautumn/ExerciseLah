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
  }

  deleteWorkout(id: number){
    listOfWorkouts.splice(id, 1);
  }
}
