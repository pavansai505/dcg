import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContestService } from '../../../../services/contest/contest.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-admin-contest',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-contest.component.html',
  styleUrls: ['./admin-contest.component.css']
})
export class AdminContestComponent {
  contestForm: FormGroup;

  constructor(private fb: FormBuilder,private contestService:ContestService,private toast:ToastService) {
    this.contestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['UPCOMING', Validators.required],
      maxParticipants: [200, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.contestForm.get('questions') as FormArray;
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

  onSubmit(): void {
    console.log(this.contestForm.valid);
    
    if (this.contestForm.valid) {
      console.log(this.contestForm.value);
  
      // Sending form data to the backend using the ContestService
      this.contestService.addContest(this.contestForm.value).subscribe(
        response => {
          // Success response handling
          console.log('Contest successfully added', response);
          this.toast.showToast('Contest successfully added!');
          this.contestForm.reset(); // Optionally reset the form after submission
        },
        error => {
          // Error response handling
          console.error('Error adding contest', error);
          alert('There was an error adding the contest. Please try again.');
        }
      );
    } else {
      // If the form is invalid, mark all fields as touched to show validation errors
      this.contestForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
    }
  }
  
}
