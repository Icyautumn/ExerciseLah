import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutOrCommentComponent } from './workout-or-comment.component';

describe('WorkoutOrCommentComponent', () => {
  let component: WorkoutOrCommentComponent;
  let fixture: ComponentFixture<WorkoutOrCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutOrCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutOrCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
