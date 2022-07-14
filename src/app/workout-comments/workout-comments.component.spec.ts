import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCommentsComponent } from './workout-comments.component';

describe('WorkoutCommentsComponent', () => {
  let component: WorkoutCommentsComponent;
  let fixture: ComponentFixture<WorkoutCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
