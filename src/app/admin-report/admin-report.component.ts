import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { WorkoutService } from '../workout.service';
import { PhotosService } from '../photos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {
  @ViewChild('commentsEdit') commentsEdit: TemplateRef<any>; // Note: TemplateRef
  workout_report: any;
  reported_workoutholder: any[] = [];
  workoutholder: FormGroup;
  name: string;
  emailuser: FormGroup;

  workoutholder_1: any;
  constructor(private reportService: ReportService, private modalService: NgbModal, private workoutService: WorkoutService, private fb: FormBuilder, private photosService:PhotosService, private sanitizer:DomSanitizer, private authService:AuthService) {
    this.reportService.getreportworkout().subscribe(data => {
      this.workout_report = data[0].result;
      console.log(this.workout_report);
      for (let i = 0; i < this.workout_report.length; i++)  {
        this.workoutService.getSpecificWorkout(this.workout_report[i].workout_Id).subscribe(async data => {
          // await this.findUserEmail(this.workout_report[i].createdBy)
          // console.log(this.workout_report[i].createdBy);
          // console.log(data[0].result.createdBy);
          // await this.findcreatorEmail(data[0].result.createdBy)
          // console.log(this.workout_report);
            this.workoutholder.patchValue({
              _id: this.workout_report[i].workout_Id,
              workout_type: data[0].result.workout_type,
              equipment: data[0].result.equipment,
              workout_photo: data[0].result.workout_photo,
              summary: data[0].result.summary,
              calories_burnt: data[0].result.calories_burnt,
              duration: data[0].result.duration,
              dateCreated: this.workout_report[i].dateCreated,
              report: this.workout_report[i].report,
              report_type: this.workout_report[i].report_type,
              createdBy: this.workout_report[i].createdBy,
              workoutCreatedBy: data[0].result.createdBy,
              reportid: this.workout_report[i]._id
            });

            this.reported_workoutholder.push(this.workoutholder.value);
            // console.log(this.reported_workoutholder);
        })
      }
    });
  
   }
  
  ngOnInit(): void {
    this.workoutholder = this.fb.group({
      reportid: '',
      _id: '',
      workout_type: '',
      equipment: '',
      workout_photo: '',
      summary: '',
      calories_burnt: '',
      duration: '',
      dateCreated: '',
      report: '',
      report_type: '',
      createdBy: '',
      workoutCreatedBy: '',
      workoutid: ''
    });

    this.emailuser = this.fb.group({
      to: '',
      subject: '',
      report: ''
    })
  }

  changeToImage(base64String: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

  async findUserEmail(userId: string){
   this.authService.profileInformation(userId).subscribe(async data=>{
    await this.workoutholder.patchValue({
      createdBy: data[0].email
    })
    // console.log(this.workoutholder.value);
    })
  }

  async findcreatorEmail(userId: string){
    this.authService.profileInformation(userId).subscribe(async data=>{
     await this.workoutholder.patchValue({
      workoutCreatedBy: data[0].email
     })
    //  console.log(this.workoutholder.value);
     return(data[0].email);
     })
   }


   emailworkoutcreator(workoutcreatorId: string){
    this.authService.profileInformation(workoutcreatorId).subscribe(data =>{
      // console.log(data[0].email);
      this.emailuser.patchValue({
        'to': data[0].email
      });
      this.modalService.open(this.commentsEdit);
    })
   }


   sendEmail(){
    // console.log(this.emailuser.value);
    this.reportService.sendEmail(this.emailuser.value).subscribe();
    this.modalService.dismissAll();
    this.emailuser.reset();
   }

   deleteReport(reportId: string){
    // console.log(reportId);
    this.reportService.deleteReport(reportId).subscribe();
    alert("report solved and removed");
    location.reload();
   }


}
