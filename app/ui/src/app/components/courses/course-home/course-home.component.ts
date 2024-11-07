import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  TrackByFunction,
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
import { Contest } from '../../../models/contest/contest';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { forkJoin } from 'rxjs';
import { courseConstants } from '../../../constants/CourseConstants';

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
  contests: Contest[] = [];
  trackByFn!: TrackByFunction<Contest>;
  swiperEl:any=null
  constants=courseConstants

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
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
    private contestService: ContestService
  ) {}

  ngOnInit() {
    forkJoin({
      contests: this.contestService.getContests(),
      courses: this.courseService.getCourses()
    }).subscribe({
      next: ({ contests, courses }) => {
        this.contests = contests;  // Set contests from the response
        this.courses = courses;    // Set courses from the response
        this.contests=this.contests.filter((ele)=>ele.status==="ONGOING")
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
  // ngAfterViewInit() {
  //   const swiperEl = this.swiperContainer.nativeElement;

  //   // Initialize Swiper with configuration
  //   // const swiper = new Swiper(swiperEl, );
  //   // console.log(swiperEl);

  //   // console.log(swiper);
  //   Object.assign(swiperEl,{
  //     slidesPerView: 4,
  //     spaceBetween: 10,
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //     breakpoints: {
  //       640: {
  //         slidesPerView: 2,
  //         spaceBetween: 20,
  //       },
  //       768: {
  //         slidesPerView: 4,
  //         spaceBetween: 40,
  //       },
  //       1024: {
  //         slidesPerView: 5,
  //         spaceBetween: 50,
  //       },
  //     },
  //   })
  //   swiperEl.Initialize()
  // }
  ngAfterViewInit() {
    this.callCardSwiper();
  }

  callCardSwiper() {
     this.swiperEl = this.swiperContainer.nativeElement;

    // Initialize Swiper with configuration
    Object.assign(this.swiperEl, {
      slidesPerView: 4,
      spaceBetween: 10,
    
      
      autoplay: {
        delay: 3000, // Adjust the delay as needed
        disableOnInteraction: false,
      },

     
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView:4,
          spaceBetween: 50,
        },
      },
    
      
    });
    
  }

  changePageToSearch() {
    this.router.navigate(['/courses/search']);
  }
}
