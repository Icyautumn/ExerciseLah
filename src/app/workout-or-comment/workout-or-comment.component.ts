import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-workout-or-comment',
  templateUrl: './workout-or-comment.component.html',
  styleUrls: ['./workout-or-comment.component.css']
})
export class WorkoutOrCommentComponent implements OnInit {

  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
