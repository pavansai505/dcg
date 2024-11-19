import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../../services/toast/toast.service';
import { FormBuilder } from '@angular/forms';
import { FaqService } from '../../../../../services/faq/faq.service';
import FAQ from '../../../../../models/faq/FAQ';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-delete-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-delete-faq.component.html',
  styleUrls: ['./admin-delete-faq.component.css'],
})
export class AdminDeleteFaqComponent implements OnInit {
  faqs: FAQ[] | null = null;
  faqIdToDelete: number | null = null;

  constructor(private toast: ToastService, private faqService: FaqService) {}

  ngOnInit() {
    this.faqService.getApplicationFaq().subscribe({
      next: (data) => {
        this.faqs = data;
      },
      error: (err) => {
        this.toast.showToast('Error fetching FAQs', 'danger');
      },
    });
  }

  setFaqToDelete(id: number) {
    this.faqIdToDelete = id;
  }

  deleteFaq() {
    if (this.faqIdToDelete !== null) {
      this.faqService.deleteFaq(this.faqIdToDelete).subscribe({
        next: (data) => {
          this.faqs =
            this.faqs?.filter((faq) => faq.id != this.faqIdToDelete) || null;

          this.toast.showToast(
            'FAQ deleted successfully ',
            'success'
          );
        },
        error: (err) => {
          this.toast.showToast('Error deleting FAQ', 'danger');
        },
        complete: () => {
          this.faqIdToDelete = null;
        },
      });
    }
  }
}
