import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSinginComponent } from './google-singin.component';

describe('GoogleSinginComponent', () => {
  let component: GoogleSinginComponent;
  let fixture: ComponentFixture<GoogleSinginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSinginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
