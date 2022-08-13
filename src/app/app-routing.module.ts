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
import {AuthGuard} from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdminReportComponent } from './admin-report/admin-report.component';

const routes: Routes = [
  { path: 'nav', component: NavComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'workout', component: WorkoutComponent},
  { path: 'viewWorkout/:id', component: ViewworkoutComponent},
  { path: 'createworkout', component: CreateworkoutComponent, canActivate: [AuthGuard], data: {permission: {only: ["user", "admin"]}}},
  { path: 'calorie_tracker/:id', component: CalorieTrackerComponent, canActivate: [AuthGuard], data: {permission: {only: ["user", "admin"]}}},
  { path: 'editWorkout/:id', component: EditworkoutComponent},
  { path: 'viewWorkout/comments/:id', component: WorkoutCommentsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {permission: {only: ["admin"]}}},
  { path: 'admin', component: AdminComponent},
  { path: 'profile/:uid', component: ProfileComponent, canActivate: [AuthGuard], data: {permission: {only: ["user"]}}},
  { path: '', component: WorkoutComponent, pathMatch: 'full'},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'reset-password/:id/:token', component: ResetpasswordComponent},
  { path: 'admin-report', component: AdminReportComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
