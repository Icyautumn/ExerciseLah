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

  addWorktou(item: Workouts): void{
    listOfWorkouts.push(item);
  }
}
