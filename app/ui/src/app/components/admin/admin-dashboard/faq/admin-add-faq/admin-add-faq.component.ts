import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../services/toast/toast.service';
import { FaqService } from '../../../../../services/faq/faq.service'; // Adjust this import based on your actual service path

@Component({
  selector: 'app-admin-add-faq',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-faq.component.html',
  styleUrls: ['./admin-add-faq.component.css'],
})
export class AdminAddFaqComponent {
  faqForm: FormGroup;
  categories!: string[];

  constructor(
    private toast: ToastService,
    private fb: FormBuilder,
    private faqService: FaqService
  ) {
    this.faqForm = this.fb.group({
      faqs: this.fb.array([this.createFaqFormGroup()]),
    });
  }
  ngOnInit() {
    this.faqService.getCatgories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
      },
      error: (err) => {
        console.log('Error getting categories.');
      },
    });
  }
  get faqs() {
    return this.faqForm.get('faqs') as FormArray;
  }

  createFaqFormGroup(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      category: ['MISC', Validators.required],
    });
  }

  addFaq() {
    this.faqs.push(this.createFaqFormGroup());
  }

  removeFaq(index: number) {
    this.faqs.removeAt(index);
  }

  onSubmit() {
    if (this.faqForm.valid) {
      this.faqService.addFaq(this.faqForm.value.faqs).subscribe({
        next: (response) => {
          this.toast.showToast('FAQs added successfully', 'success');
          this.faqForm.reset();
          this.faqs.clear();
          this.addFaq(); // Add one initial empty FAQ
        },
        error: (err) => {
          this.toast.showToast('Error adding FAQs', 'danger');
        },
      });
    } else {
      this.toast.showToast('Please fill out all required fields', 'warning');
    }
  }
}
