import { Component } from '@angular/core';
import { FooterComponent } from '../../home/footer/footer.component';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { Course } from '../../../models/course/course';
import { Router } from 'express';
import { CourseDataService } from '../../../services/course/course-data.service';
import { RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../utilities/course-card/course-card.component';
import { CourseNavbarComponent } from '../course-navbar/course-navbar.component';

@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [
    FooterComponent,
    CourseNavbarComponent,
    RouterLink,
    TruncateStringSizePipe,
    CommonModule,
    CourseCardComponent,
  ],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.css',
})
export class CourseSearchComponent {
  courses: Course[] = [];
  AllCourses: Course[] = [];
  constructor(private courseService: CourseDataService) {}
  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (value) => {
        this.courses = value;
        this.AllCourses = [...value];
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  searchInputCall(value: string) {
    
    const searchWords = value.toLowerCase().split(' ');

    this.courses = [...this.AllCourses]
      .map((course) => ({
        course,
        relevance: searchWords.reduce((score: number, word: string) => {
          if (course.title?.toLowerCase().includes(word)) score += 3;
          if (course.authorName?.toLowerCase().includes(word)) score += 2;
          if (course.description?.toLowerCase().includes(word)) score += 1;
          if (course.synopsis?.toLowerCase().includes(word)) score += 1;
          return score;
        }, 0),
      }))
      .filter((item) => item.relevance > 0) // Adjust threshold if needed
      .sort((a, b) => b.relevance - a.relevance)
      .map((item) => item.course);
  }
  reset() {
    console.log('here');

    this.courses = this.AllCourses;
  }

  sortByPrice(sortOrder: number) {
    this.courses = this.courses.sort((a, b) => {
      if (sortOrder === 1) {
        return a.price - b.price; // Low to High
      } else if (sortOrder === -1) {
        return b.price - a.price; // High to Low
      } else {
        return 0; // No sorting if sortOrder is neither 1 nor -1
      }
    });
  }
}
