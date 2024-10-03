import { Component } from '@angular/core';
import { Course } from '../../../models/course/course';
import { ToastService } from '../../../services/toast/toast.service';
import { CourseDataService } from '../../../services/course/course-data.service';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from '../../../services/score/score.service';
import { ScoreCheckResponse } from '../../../models/contest/scoreCheckResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-quiz',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './course-quiz.component.html',
  styleUrl: './course-quiz.component.css'
})
export class CourseQuizComponent {
  course!:Course;
  isBetween:boolean=false
  userAnswers: string[] =[];
  submitted:boolean=false
  score:number=0
  constructor(
    private toast: ToastService,
    private courseService:CourseDataService,
    private activatedRoute: ActivatedRoute,
    private scoreService:ScoreService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);
      this.courseService.getCourseById(id).subscribe({
        next: (data) => {
          this.course = data;
        },
        error: (err) => console.log(err),
      });
    });
  }
  

  submitQuiz() {
    let score = 0;
    let total=0;
    this.course.quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === this.userAnswers[index]) {
        score++;
      }
      total++;
    });
    this.submitted=true
    this.score=score
    this.scoreService.setUserScore({"quizId":this.course.quiz.id,"value":score} as ScoreCheckResponse).subscribe({
      next:(data)=>console.log(data)
    })
    if(total>0){
      this.courseService.awardCourseBadge(this.course.id).subscribe()
    }
    
  }

}
