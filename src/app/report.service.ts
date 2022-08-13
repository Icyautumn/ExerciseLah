import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reporturl: string = "http://localhost:3000/api/report/";

  constructor(private http: HttpClient) {}



  reportWorkout(report: any){
    return this.http.put<any[]>(this.reporturl + "workout", {
      "workout_id": report.value.workout_id,
      "report_type": report.value.report_type,
      "report": report.value.report,
      "user_id": report.value.user_id
    })
  }
}
