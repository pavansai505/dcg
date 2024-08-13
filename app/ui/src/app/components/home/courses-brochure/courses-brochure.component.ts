import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-courses-brochure',
  standalone: true,
  imports: [],
  templateUrl: './courses-brochure.component.html',
  styleUrl: './courses-brochure.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesBrochureComponent {
  breakpoints = {
    1100:{
      slidesPerView:3
    },
    1050:{
      slidesPerView:1
    }
  };
}
