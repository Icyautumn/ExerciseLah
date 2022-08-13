import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutService } from './workout.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CreateworkoutComponent } from './createworkout/createworkout.component';
import { ViewworkoutComponent } from './viewworkout/viewworkout.component';
import { EditworkoutComponent } from './editworkout/editworkout.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WorkoutCommentsComponent } from './workout-comments/workout-comments.component';
import { WorkoutOrCommentComponent } from './workout-or-comment/workout-or-comment.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import {AuthGuard} from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { PhotosService } from './photos.service';
import { FoodService } from './food.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { ReportService } from './report.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    WorkoutComponent,
    CalorieTrackerComponent,
    CreateworkoutComponent,
    ViewworkoutComponent,
    EditworkoutComponent,
    WorkoutCommentsComponent,
    WorkoutOrCommentComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProfileComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    NgxChartsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [WorkoutService, DatePipe, PostsService, AuthService, PhotosService, FoodService, ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
