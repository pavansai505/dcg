import { Component } from '@angular/core';
import { Contest } from '../../../models/course/contest';
import { ToastService } from '../../../services/toast/toast.service';
import { ContestService } from '../../../services/contest/contest.service';
import { ActivatedRoute } from '@angular/router';
import { AccessControlService } from '../../../services/auth/access-control.service';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../../services/score/score.service';
import { ScoreCheckResponse } from '../../../models/contest/scoreCheckResponse';

@Component({
  selector: 'app-contests-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contests-quiz.component.html',
  styleUrl: './contests-quiz.component.css'
})
export class ContestsQuizComponent {
  contest!: Contest;
  isRegistered: boolean = false;
  isBetween:boolean=false
  userAnswers: string[] =[];
  submitted:boolean=false
  score:number=0
  constructor(
    private toast: ToastService,
    private contestService: ContestService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService
  ) {}
  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);
      this.contestService.getContestById(id).subscribe({
        next: (data) => {
          this.contest = data;
        },
        error: (err) => console.log(err),
      });
    });
  }
  

  submitQuiz() {
    let score = 0;
    this.contest.quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === this.userAnswers[index]) {
        score++;
      }
    });
    this.submitted=true
    this.score=score
    this.scoreService.setUserScore({"quizId":this.contest.quiz.id,"value":score} as ScoreCheckResponse).subscribe({
      next:(data)=>console.log(data)
    })
    
  }

}
