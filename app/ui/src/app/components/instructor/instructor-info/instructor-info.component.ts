import { Component } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { UserDetailsService } from '../../../services/user/user-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user/user';
import { error } from 'console';
import { Course } from '../../../models/course/course';
import { CourseDataService } from '../../../services/course/course-data.service';
import { CourseCardComponent } from '../../utilities/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-instructor-info',
  standalone: true,
  imports: [NavbarComponent, CourseCardComponent, CommonModule,InfiniteScrollModule],
  templateUrl: './instructor-info.component.html',
  styleUrl: './instructor-info.component.css',
})
export class InstructorInfoComponent {
  instructor!: User;
  createdCourses!: Course[];
  displayedCourses: Course[] = []; // Subset of courses to display
  coursesPerPage = 8; // Number of courses to load per scroll
  currentPage = 1;
  registeredUsers:number=0
  isLoading:boolean=false
  constructor(
    private userService: UserDetailsService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private courseService: CourseDataService
  ) {}
  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.instructor = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.courseService.getCoursesByUserId(id).subscribe({
      next: (value) => {
        this.createdCourses = value;
        this.registeredUsers=this.createdCourses.reduce((a,b)=>b.users.length+a,0)
        this.loadMoreCourses();
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {
        console.log(this.createdCourses[0].users);
        
      },
    });
  }
  loadMoreCourses(): void {
    const startIndex = (this.currentPage - 1) * this.coursesPerPage;
    const endIndex = this.currentPage * this.coursesPerPage;
    this.displayedCourses = this.displayedCourses.concat(
      this.createdCourses.slice(startIndex, endIndex)
    );
    this.currentPage++;
    this.isLoading=false
  }

  onScroll(): void {
    if (this.currentPage * this.coursesPerPage < this.createdCourses.length) {
      this.isLoading=true
      setTimeout(() => {
        this.loadMoreCourses();
      }, 1400);
    }
  }
}
