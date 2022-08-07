import { Injectable } from '@angular/core';
import { Workouts } from './workout';
import { listOfWorkouts } from './mock-workout';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  workout: string = "http://localhost:3000/api/workout/";

  constructor(private http: HttpClient) { }

  getWorkouts(): Workouts[] {
    return listOfWorkouts;
  }

  addWorkout(item: Workouts){
    console.log(item);
    return this.http.put<any[]>(this.workout + "add", {
      'username': item.username,
      'workout_photo': item.workout_photo,
      'summary': item.summary,
      'calories_burnt': item.calories_burnt,
      'workout_type': item.workout_type,
      'duration': item.duration,
      'equipment': item.equipment,
      'listOfWorkout': item.workout,
      'foodDetails': item.foodDetails,
      'commentOfUser': item.commentOfUser
    });
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
