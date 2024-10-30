import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ContestService } from '../../../services/contest/contest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contest } from '../../../models/contest/contest';
import { CommonModule, DatePipe } from '@angular/common';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { ToastService } from '../../../services/toast/toast.service';
import { error } from 'console';
import { ScoreService } from '../../../services/score/score.service';
import { Score } from '../../../models/course/quiz';

@Component({
  selector: 'app-contests-info',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, DatePipe, CommonModule],
  templateUrl: './contests-info.component.html',
  styleUrl: './contests-info.component.css',
})
export class ContestsInfoComponent {
  contest!: Contest;
  isRegistered: boolean = false;
  isBetween: boolean = false;
  scores:Score[]=[]
  constructor(
    private toast: ToastService,
    private contestService: ContestService,
    private activatedRoute: ActivatedRoute,
    private accessService: AccessControlService,
    private scoreService: ScoreService,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);
      this.contestService.getContestById(id).subscribe({
        next: (data) => {
          this.contest = data;
          this.checkUserRegistration();
          this.loadLeaderBoard()
        },
        error: (err) => console.log(err),
      });
    });
  }

  checkUserRegistration() {
    if (this.accessService.isUser) {
      this.contestService.isUserRegisteredToContest(this.contest.id).subscribe({
        next: (data) => {
          this.isRegistered = data.resultTrue;
          this.isContestStarted();
        },
      });
    }
  }
  isContestStarted() {
    const timestamp1 = new Date(this.contest.startDate);
    const timestamp2 = new Date(this.contest.endDate);

    // Get the current date and time
    const now = new Date();

    // Check if 'now' is between 'timestamp1' and 'timestamp2'
    this.isBetween = now >= timestamp1 && now <= timestamp2;
  }
  loadLeaderBoard(){
    this.scoreService.getScoresByQuiz(this.contest.quiz.id).subscribe({
      next:(data)=>{
        this.scores=data
        this.scores.sort((a, b) => {
          // Compare scoreValue in descending order
          if (b.scoreValue - a.scoreValue !== 0) {
            return b.scoreValue - a.scoreValue;
          }
          
          // If scoreValues are equal, compare createdDate in ascending order
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        });
      }
      
    })

  }
  enrollToContest() {
    if (this.accessService.isUser) {
      this.contestService.registerToContests(this.contest.id).subscribe({
        next: (data) => this.isRegistered=true,
        error: (error) => console.log(error),
      });
    } else {
      this.toast.showToast('Please log in.', 'warning');
    }
  }

  startContest() {
    this.scoreService.didUserParticipate(this.contest.quiz.id).subscribe({
      next: (data) => {
        if (data.userHaveScore) {
          this.toast.showToast('Already attempted.', 'warning');
        } else {
          this.router.navigate(['/contests/' + this.contest.id + '/quiz']);
        }
      },
    });
  }
}
