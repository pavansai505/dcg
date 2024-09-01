import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsQuizComponent } from './contests-quiz.component';

describe('ContestsQuizComponent', () => {
  let component: ContestsQuizComponent;
  let fixture: ComponentFixture<ContestsQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestsQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
