import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsInfoComponent } from './contests-info.component';

describe('ContestsInfoComponent', () => {
  let component: ContestsInfoComponent;
  let fixture: ComponentFixture<ContestsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
