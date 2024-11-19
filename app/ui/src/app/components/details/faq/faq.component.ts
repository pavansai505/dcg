import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ToastService } from '../../../services/toast/toast.service';
import FAQ from '../../../models/faq/FAQ';
import { FaqService } from '../../../services/faq/faq.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../utilities/navbar/navbar.component";
import { FooterComponent } from "../../utilities/footer/footer.component";
import { CourseNavbarComponent } from "../../courses/course-navbar/course-navbar.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, NavbarComponent, FooterComponent, CourseNavbarComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']  // Fixed property name
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] | null = null;
  data: { [key: string]: FAQ[] } = {};  // Typed 'data' property

  constructor(private toast: ToastService, private faqService: FaqService) {}

  ngOnInit() {
    this.faqService.getApplicationFaq().subscribe({
      next: (data) => {
        this.faqs = data;
        this.data = this.faqs
          ? this.faqs.reduce((accumulator: { [key: string]: FAQ[] }, faq) => {
              if (!accumulator[faq.category]) {
                accumulator[faq.category] = [];
              }
              accumulator[faq.category].push(faq);
              return accumulator;
            }, {})
          : {};
      },
      error: (err) => {
        this.toast.showToast('Error fetching FAQs', 'danger');
      }
    });
  }
}
