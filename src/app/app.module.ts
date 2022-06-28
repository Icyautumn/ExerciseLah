import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CreatecontactComponent } from './createcontact/createcontact.component';
import { DisplaycontactComponent } from './displaycontact/displaycontact.component';
import { UpdatecontactComponent } from './updatecontact/updatecontact.component';
import { DeletecontactComponent } from './deletecontact/deletecontact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from './contacts.service';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutService } from './workout.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CreatecontactComponent,
    DisplaycontactComponent,
    UpdatecontactComponent,
    DeletecontactComponent,
    WorkoutComponent,
    CalorieTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    NgxDropzoneModule
  ],
  providers: [ContactsService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
