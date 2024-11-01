import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { Course } from '../../../../models/course/course';
import { ToastService } from '../../../../services/toast/toast.service';
import { environment } from '../../../../../environments/environment';
import { Unit } from '../../../../models/course/unit';
import { Lecture } from '../../../../models/course/lecture';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';

@Component({
  selector: 'app-instructor-delete-lectures',
  standalone: true,
  imports: [CommonModule,TruncateStringSizePipe],
  templateUrl: './instructor-delete-lectures.component.html',
  styleUrls: ['./instructor-delete-lectures.component.css'], // Note: changed from styleUrl to styleUrls
})
export class InstructorDeleteLecturesComponent {
  showForm: boolean = false;
  showLectures:boolean=false;
  selectedCourse: Course | null = null;
  selectedUnit: Unit | null = null;
  courses: any;
  lectures: Lecture[] = [];
  imagePageUrl = environment.apiBaseUrl;
  constructor(
    private courseService: CourseDataService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
  }
  setUnit(event: any) {
    const id = event.target.value;
    this.selectedUnit =this.selectedCourse?.units.find((ele) => ele.id == id) || null; // Get selected unit
    this.lectures = this.selectedUnit?.lectures || []; // Load lectures for selected unit
    this.showLectures=true
  }
  toggleLectureStatus(id:number) {
    const lecture=this.selectedUnit?.lectures.find((ele)=>ele.id==id)
    
    if (lecture) {
      lecture!.disabled=!lecture?.disabled
      this.courseService.toggleLectureStatus(id).subscribe({
        next: (data) => {
          console.log("Sucess");
          this.toast.showToast("Lecture disabled",'info')
        },
        error: (error) => {
          lecture!.disabled=!lecture?.disabled
          this.toast.showToast("Error",'danger')
        }
      });
    }
  }
}
