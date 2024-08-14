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
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './course-lectures.component.html',
  styleUrl: './course-lectures.component.css',
})
export class CourseLecturesComponent {
  course!: Course;
  keysArray: string[] = [];
  unitMap: { [key: string]: any[] } = {};
  currentLecture!: Lecture;
  currentLectureVideoUrl!: string;
  trackByFn!: TrackByFunction<Lecture>;
  $: any;
  https: any;
  constructor(
    private courseService: CourseDataService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe({
      next: (value) => {
        this.setUnitMapping(value);
        this.setLessonSection();
      },
      error: (err) => console.error('Observable emitted an error: ' + err)
    });
  }
  setUnitMapping(value: Course) {
    this.course = value;
  
    // Initialize the unitMap
    this.unitMap = {};
    value.units.sort((a,b)=>a.id-b.id)
    // Process each unit within the course
    value.units.forEach((unit,idx) => {
      // Generate a unique key for each unit
      
      const key = `${idx+1} - ${unit.unitTitle}`;
  
      // Initialize the array for this unit key if it doesn't already exist
      if (!this.unitMap[key]) {
        this.unitMap[key] = [];
      }
  
      // Add each lecture to the unit's array in the map
      unit.lectures.forEach((lecture) => {
        this.unitMap[key].push(lecture);
      });
    });
  
    // Create an array of unit keys and sort them based on unitId
    this.keysArray = Object.keys(this.unitMap);
    this.keysArray.sort((a, b) => {
      const unitIdA = parseInt(a.split(' - ')[0], 10);
      const unitIdB = parseInt(b.split(' - ')[0], 10);
      return unitIdA - unitIdB;
    });
  
    // Sort each unit's lectures by lessonId
    for (const key of this.keysArray) {
      this.unitMap[key].sort((a, b) => a.lessonId - b.lessonId);
    }

  }
  
  

  setLessonSection() {
    this.activatedRouter.queryParams.subscribe((params) => {
      const lessonId = params['lessonId'];
      if (lessonId) {
        const allLectures = this.course.units.flatMap((unit) => unit.lectures);
        
        const lecture = allLectures.find(
          (lecture) => lecture.id == lessonId
        );
        // Handle the case where lecture is undefined
        
        if (lecture) {
          this.setCurrentUnitLecture(lecture);
        } else {
          console.warn(`Lecture with lessonId ${lessonId} not found.`);
        }
      } else {
        console.log('Nothing');
      }
    });
  }

  setCurrentUnitLecture(lesson: Lecture) { 
    this.currentLecture = lesson;
    this.currentLectureVideoUrl =
      'https://www.youtube.com/embed/' + lesson.lessonVideo;
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { lessonId: lesson.id },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }
}
