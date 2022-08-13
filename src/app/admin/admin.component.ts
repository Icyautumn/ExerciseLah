import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { WorkoutService } from '../workout.service';
import { PhotosService } from '../photos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(private reportService: ReportService, private workoutService: WorkoutService, private fb: FormBuilder, private photosService:PhotosService, private sanitizer:DomSanitizer) {
    

  }
  selectedIndex = 0;

  selectTab(index: number): void {
    this.selectedIndex = index;
  }



  ngOnInit(): void {
  }

  

}
