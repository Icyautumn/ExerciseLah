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

  getWorkouts() {
    return this.http.post<any[]>(this.workout +'get', {
    })
  }

  getSpecificWorkout(id: string) {
    return this.http.post<any[]>(this.workout+ "specific", {
      "id": id
    })
  }

  addWorkout(item: Workouts){
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

  deleteWorkout(id: string){
    return this.http.delete<any[]>(this.workout+ "delete/" + id, {
    })
  }

  updateWorkout(item: Workouts, itemid: string){
    return this.http.put<any[]>(this.workout + "update/" + itemid, {
      "workout_photo": item.workout_photo,
      "summary": item.summary,
      "calories_burn": item.calories_burnt,
      "workout_type": item.workout_type,
      "duration": item.duration,
      "equipment": item.equipment,
      "workout": item.workout,
      "foodDetails": item.foodDetails
    })
  }


}
