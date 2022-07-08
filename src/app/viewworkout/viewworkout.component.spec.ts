import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewworkoutComponent } from './viewworkout.component';

describe('ViewworkoutComponent', () => {
  let component: ViewworkoutComponent;
  let fixture: ComponentFixture<ViewworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
