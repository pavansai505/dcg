import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { Course } from '../../../models/course/course';
import { Router } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../utilities/course-card/course-card.component';
import { CourseNavbarComponent } from '../course-navbar/course-navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { quotes } from '../../../data/quotes';

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
    InfiniteScrollModule,
    FormsModule
  ],
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css'], // Fixed typo here (changed from styleUrl to styleUrls)
})
export class CourseSearchComponent {
  displayedCourses: Course[] = [];
  AllCourses: Course[] = [];
  coursesPerPage = 9; // Number of courses to load per scroll
  currentPage = 1;
  isLoading: boolean = false;
  searchResults: boolean = false;
  maxPrice: number = 100000;
  minPrice: number = 0;
  quote: string = '';

  constructor(private courseService: CourseDataService,private router:Router) {}

  ngOnInit() {
    this.getQuotes();
    this.courseService.getCourses().subscribe({
      next: (value) => {
        this.AllCourses = [...value];
        this.loadMoreCourses();
        this.applyFiltersFromUrl(); // Apply filters from the URL on initialization
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  getQuotes() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[randomIndex];
  }

  searchInputCall(value: string) {
    if (value.trim().length === 0) {
      this.searchResults = false;
      this.reset();
    } else {
      this.searchResults = true;
      const searchWords = value.toLowerCase().split(' ');

      this.displayedCourses = [...this.AllCourses]
        .map((course) => ({
          course,
          relevance: searchWords.reduce((score: number, word: string) => {
            // Check in Title - High Relevance
            if (course.title?.toLowerCase().includes(word)) score += 5;
            // Check in Author Name - Moderate Relevance
            if (course.authorName?.toLowerCase().includes(word)) score += 3;
            // Check in Description - Lower Relevance
            if (course.description?.toLowerCase().includes(word)) score += 2;
            // Check in Synopsis - Lower Relevance
            if (course.synopsis?.toLowerCase().includes(word)) score += 1;
            // Check in Tags - Equal to Description
            if (course.tags?.some((tag: string) => tag.toLowerCase().includes(word))) score += 2;
            return score;
          }, 0),
        }))
        .filter((item) => item.relevance > 0) // Only keep courses with relevance > 0
        .sort((a, b) => {
          // Sort by relevance first, then by number of users (descending)
          if (b.relevance === a.relevance) {
            return (b.course.users?.length || 0) - (a.course.users?.length || 0);
          }
          return b.relevance - a.relevance;
        })
        .map((item) => item.course);
    }
  }

  reset() {
    this.currentPage = 1;
    this.displayedCourses = [];
    this.searchResults = false;
    this.loadMoreCourses();
    this.maxPrice=10000
    this.router.navigate(['/courses/search']); // Reset the URL
  }

  sortByPrice(sortOrder: number) {
    this.displayedCourses.sort((a, b) => {
      if (sortOrder === 1) {
        return a.price - b.price; // Low to High
      } else if (sortOrder === -1) {
        return b.price - a.price; // High to Low
      }
      return 0; // No sorting if sortOrder is neither 1 nor -1
    });

    // Update the URL with the sort parameter
    const sortParam = sortOrder === 1 ? 'low' : 'high';
    this.updateUrl('sort', sortParam);
  }

  filterByCourseLevel(event: any) {
    const level = event.target.value;
    this.displayedCourses = this.AllCourses.filter(course => {
      if (!level) return true; // No filter if no level is selected
      return course.courseLevel === level;
    });

    // Update the URL with the course level parameter
    this.updateUrl('courseLevel', level);
  }

  // Filter by Price Range
  filterByPriceRange() {
    this.displayedCourses = this.AllCourses.filter(course => {
      return course.price >= this.minPrice && course.price <= this.maxPrice;
    });

    // Update the URL with price range parameters
    this.updateUrl('minPrice', this.minPrice.toString());
    this.updateUrl('maxPrice', this.maxPrice.toString());
  }

  loadMoreCourses(): void {
    const startIndex = (this.currentPage - 1) * this.coursesPerPage;
    const endIndex = this.currentPage * this.coursesPerPage;
    this.displayedCourses = this.displayedCourses.concat(
      this.AllCourses.slice(startIndex, endIndex)
    );
    this.currentPage++;
    this.isLoading = false;
  }

  onScroll(): void {
    if (this.currentPage * this.coursesPerPage < this.AllCourses.length && !this.searchResults) {
      this.isLoading = true;
      setTimeout(() => {
        this.loadMoreCourses();
      }, 1200);
    }
  }

  updateUrl(param: string, value: string) {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(param, value); // Set the parameter
    } else {
      url.searchParams.delete(param); // Remove the parameter if value is empty
    }
    window.history.replaceState({}, '', url); // Update the URL without reloading the page
  }

  applyFiltersFromUrl() {
    const url = new URL(window.location.href);
    const sortParam = url.searchParams.get('sort');
    const courseLevelParam = url.searchParams.get('courseLevel');
    const minPriceParam = url.searchParams.get('minPrice');
    const maxPriceParam = url.searchParams.get('maxPrice');

    if (sortParam === 'low') {
      this.sortByPrice(1);
    } else if (sortParam === 'high') {
      this.sortByPrice(-1);
    }

    if (courseLevelParam) {
      this.filterByCourseLevel({ target: { value: courseLevelParam } });
    }

    if (minPriceParam) {
      this.minPrice = +minPriceParam; // Convert string to number
    }

    if (maxPriceParam) {
      this.maxPrice = +maxPriceParam; // Convert string to number
    }

    // Apply price range filtering
    // this.filterByPriceRange();
  }
}
