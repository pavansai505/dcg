import { Component, ElementRef, ViewChild } from '@angular/core';
import { Contest } from '../../../models/contest/contest';
import { ToastService } from '../../../services/toast/toast.service';
import { ContestService } from '../../../services/contest/contest.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  closeTimer:number=10
  constructor(
    private toast: ToastService,
    private contestService: ContestService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService,
    private router:Router
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
    // Calculate the score based on the user's answers
    this.contest.quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === this.userAnswers[index]) {
        score++;
      }
    });
  
    // Mark the quiz as submitted and set the score
    this.submitted = true;
    this.score = score;
  
    // Send the score to the score service
    this.scoreService.setUserScore({
      quizId: this.contest.quiz.id,
      value: score
    } as ScoreCheckResponse).subscribe({
      next: (data) => {
        console.log('Score submitted successfully:', data);
        this.startCountdown()
      },
      error: (err) => {
        console.error('Error submitting score:', err);
      }
    });
  }
  startCountdown() {

    
    document.getElementById("myButton")?.click()
    
    const interval = setInterval(() => {
      if (this.closeTimer > 0) {
        this.closeTimer -= 1;
      } else {
        console.log('done');
        clearInterval(interval); // Stop the interval when the timer reaches 0
        document.getElementById("btnClose")?.click()
        this.router.navigate(['/contests/'+this.contest.id+"/info"])
      }
    }, 1000); // Decrease every second (1000 ms) 
  }
  

}
