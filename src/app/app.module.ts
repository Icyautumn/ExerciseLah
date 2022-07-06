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
    CalorieTrackerComponent,
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
    MatIconModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ContactsService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
