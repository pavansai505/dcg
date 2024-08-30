import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CourseCardComponent } from '../../utilities/course-card/course-card.component';
import { CrewComponent } from '../../utilities/crew/crew.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { ContestService } from '../../../services/contest/contest.service';
import { Contest } from '../../../models/course/contest';

@Component({
  selector: 'app-course-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NavbarComponent,
    TruncateStringSizePipe,
    CourseCardComponent,
    CrewComponent,
    FooterComponent,
  ],
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseHomeComponent implements OnInit {
  courses: Course[] = [];
  paginatedCourses: Course[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  pages: number[] = [];
  contest:Contest[]=[]

  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      992: {
        spaceBetween: 20,
      },
    },
  };
  @ViewChild('courses') coursesSection!: ElementRef;

  // Function to scroll to the specified section
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor(
    private router: Router,
    private courseService: CourseDataService,
    private contestService:ContestService
  ) {}

  ngOnInit() {
    this.contestService.getValidContests().subscribe({
      next: (value) => {
        this.contest = value;
        
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    })
    this.courseService.getCourses().subscribe({
      next: (value) => {
        this.courses = value;
        this.updatePagination();
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
    this.paginateCourses();
  }

  paginateCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCourses();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCourses();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateCourses();
    }
  }

  changePageToSearch() {
    this.router.navigate(['/courses/search']);
  }
}
