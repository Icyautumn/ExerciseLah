import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';
import { CreateworkoutComponent } from './createworkout/createworkout.component';
import { EditworkoutComponent } from './editworkout/editworkout.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ViewworkoutComponent } from './viewworkout/viewworkout.component';
import { WorkoutCommentsComponent } from './workout-comments/workout-comments.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  { path: 'nav', component: NavComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'workout', component: WorkoutComponent},
  { path: 'viewWorkout/:id', component: ViewworkoutComponent},
  { path: 'createworkout', component: CreateworkoutComponent},
  { path: 'calorie_tracker', component: CalorieTrackerComponent},
  { path: 'editWorkout/:id', component: EditworkoutComponent},
  { path: 'viewWorkout/comments/:id', component: WorkoutCommentsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: WorkoutComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
