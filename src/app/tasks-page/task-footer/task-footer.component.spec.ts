import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFooterComponent } from './task-footer.component';

describe('TaskFooterComponent', () => {
  let component: TaskFooterComponent;
  let fixture: ComponentFixture<TaskFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
