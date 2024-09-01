import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsLeaderboardComponent } from './contests-leaderboard.component';

describe('ContestsLeaderboardComponent', () => {
  let component: ContestsLeaderboardComponent;
  let fixture: ComponentFixture<ContestsLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestsLeaderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestsLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
