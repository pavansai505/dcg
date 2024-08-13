import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseCardComponent } from '../../../utilities/course-card/course-card.component';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { Course } from '../../../../models/course/course';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { UserDetailsService } from '../../../../services/user/user-details.service';

@Component({
  selector: 'app-user-courses-view',
  standalone: true,
  imports: [CommonModule,RouterLink,CourseCardComponent,TruncateStringSizePipe],
  templateUrl: './user-courses-view.component.html',
  styleUrl: './user-courses-view.component.css'
})
export class UserCoursesViewComponent {
  courses: Course[] = [];
  constructor(
    private router: Router,
    private courseService: CourseDataService,
    private userService:UserDetailsService
  ) {}
  ngOnInit() {
    this.getCourses()
  }
  getCourses(){
    this.userService.getRegisteredCourses().subscribe({
      next: (value) => {
        this.courses=value
        console.log(value);
        
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

}
