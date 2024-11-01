import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { Course } from '../../../../models/course/course';
import { ToastService } from '../../../../services/toast/toast.service';
import { environment } from '../../../../../environments/environment';
import { Lecture } from '../../../../models/course/lecture';
import { Unit } from '../../../../models/course/unit';

@Component({
  selector: 'app-instructor-add-quiz-lectures',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TruncateStringSizePipe],
  templateUrl: './instructor-add-quiz-lectures.component.html',
  styleUrls: ['./instructor-add-quiz-lectures.component.css'], // Note: changed from styleUrl to styleUrls
})
export class InstructorAddQuizLecturesComponent {
  showForm: boolean = false;
  showLectureDropDown: boolean = false;
  showQuiz: boolean = false;
  selectedCourse: Course | null = null;
  selectedUnit: Unit | null = null;
  selectedLecture: Lecture | null = null;
  courses: any;
  imagePageUrl = environment.apiBaseUrl;
  imageUrl: any;
  quizForm:FormGroup

  constructor(
    private courseService: CourseDataService,
    private toast: ToastService,
    private fb:FormBuilder
  ) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }
  getOptionsControls(questionIndex: number): FormArray {
    return (this.questions.at(questionIndex).get('options') as FormArray);
  }
  addQuestion(): void {
    const questionGroup = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array(['', '', '', ''], Validators.required),
      correctAnswer: ['', Validators.required]
    });

    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }
  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
    this.showLectureDropDown = false;
    this.showQuiz = false;
  }

  setUnit(event: any) {
    const id = event.target.value;
    const selectedUnit =
      this.selectedCourse?.units.find((ele) => {
        return ele.id == id;
      }) || null; // This will now be the unit object
    this.selectedUnit = selectedUnit; // Store the selected unit object
    this.showLectureDropDown = true; // Show the lecture dropdown or perform any other logic
  }

  setLecture(event: any) {
    const id = event.target.value;
    const selectedLecture =
      this.selectedUnit?.lectures.find((ele) => ele.id == id) || null;
    this.selectedLecture = selectedLecture;
    this.showQuiz = true;
  }

  onSubmit() {
    if (this.selectedCourse && this.selectedUnit && this.selectedLecture && this.quizForm.value.questions.length>0) {
      this.courseService.addQUizToLecture(this.selectedLecture.id,this.quizForm.value.questions)
        .subscribe({
          next: (value) => {
            this.toast.showToast("Quiz added succesfully!")
            this.questions.clear()
            this.addQuestion()
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
          complete: () => {},
        });
    }else{ 
    }
    
  }
}
