import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersDataComponent } from './numbers-data.component';

describe('NumbersDataComponent', () => {
  let component: NumbersDataComponent;
  let fixture: ComponentFixture<NumbersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
