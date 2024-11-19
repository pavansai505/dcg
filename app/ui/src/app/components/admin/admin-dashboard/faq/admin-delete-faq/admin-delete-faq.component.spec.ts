import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteFaqComponent } from './admin-delete-faq.component';

describe('AdminDeleteFaqComponent', () => {
  let component: AdminDeleteFaqComponent;
  let fixture: ComponentFixture<AdminDeleteFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeleteFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDeleteFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
