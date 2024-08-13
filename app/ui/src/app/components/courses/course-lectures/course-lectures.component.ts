import { Component, TrackByFunction } from '@angular/core';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { Lecture } from '../../../models/course/lecture';

@Component({
  selector: 'app-course-lectures',
  standalone: true,
  imports: [CommonModule,SafeUrlPipe],
  templateUrl: './course-lectures.component.html',
  styleUrl: './course-lectures.component.css',
})
export class CourseLecturesComponent {
  course!: Course;
  keysArray: string[] = [];
  unitMap: { [key: string]: any[] } = {};
  currentLecture!:Lecture;
  currentLectureVideoUrl!:string;
  trackByFn!: TrackByFunction<Lecture>;
  $: any;
https: any;
  constructor(private courseService: CourseDataService,
    private activatedRouter: ActivatedRoute,
    private router:Router) {}
  ngOnInit() {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe({
      next: (value) => {
        this.setUnitMapping(value)
        this.setLessonSection()
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('LGTM!'),
    });
  }
  setUnitMapping(value:any){
    this.course = value;
        value.lectures.forEach((item: Lecture) => {
          const key = `${item.unitId} - ${item.unitTitle}`;
          if (!this.unitMap[key]) {
            this.unitMap[key] = [];
          }
          this.unitMap[key].push(item);
        });
        this.keysArray = Object.keys(this.unitMap);
        this.keysArray.sort();
        for (const key of this.keysArray) {
          this.unitMap[key].sort((a, b) => a.lessonId - b.lessonId);
        }
  }
  setLessonSection(){
    this.activatedRouter.queryParams.subscribe(params => {
      const lessonId = params['lessonId'];
      if (lessonId) {
        
        this.setCurrentUnit(this.course.lectures.filter((data:Lecture)=>data.id==lessonId)[0])
        
      } else {
        console.log('Nothing');
      }
    });
  }

  setCurrentUnit(lesson:Lecture){
    this.currentLecture=lesson
    this.currentLectureVideoUrl="https://www.youtube.com/embed/"+lesson.lessonVideo
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { lessonId: lesson.id },
      queryParamsHandling: 'merge' // Merge with existing query params
    });
  }


}
