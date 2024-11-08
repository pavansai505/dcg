import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSingupComponent } from './google-singup.component';

describe('GoogleSingupComponent', () => {
  let component: GoogleSingupComponent;
  let fixture: ComponentFixture<GoogleSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSingupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
