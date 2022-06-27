export class Workouts{
  _id: number;
  // workout_photo: File;
  workout_photo: File[];
  summary : string;
  calories_burnt: number;
  workout_type: string;
  duration: number;
  equipment: string;
  workout: listofworkout[];
}

export class listofworkout {
    workout: string;
    set: number;
    rep: number;
  }



