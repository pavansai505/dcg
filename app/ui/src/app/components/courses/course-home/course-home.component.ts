import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CourseCardComponent } from '../../utilities/course-card/course-card.component';

@Component({
  selector: 'app-course-home',
  standalone: true,
  imports: [RouterLink,CommonModule,NavbarComponent,TruncateStringSizePipe,CourseCardComponent],
  templateUrl: './course-home.component.html',
  styleUrl: './course-home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CourseHomeComponent {
  courses:Course[]=[]
  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 20
        }
    }
}
constructor(private router:Router,private courseService:CourseDataService){}
ngOnInit(){
  this.courseService.getCourses().subscribe({
    next: (value) =>this.courses=value,
    error: (err) => console.error('Observable emitted an error: ' + err),
    complete: () =>{}
  });
  
}
changePageToSearch(){
  this.router.navigate(['/courses/search'])
}
 
}
