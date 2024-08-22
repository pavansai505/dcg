import { Component, TrackByFunction } from '@angular/core';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { Lecture } from '../../../models/course/lecture';
import { PointsListPipe } from '../../../pipes/points-list.pipe';

@Component({
  selector: 'app-course-lectures',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, PointsListPipe],
  templateUrl: './course-lectures.component.html',
  styleUrl: './course-lectures.component.css',
})
export class CourseLecturesComponent {
  course!: Course | null;
  keysArray: string[] = [];
  unitMap: { [key: string]: any[] } = {};
  currentLecture!: Lecture | null;
  currentLectureVideoUrl!: string;
  trackByFn!: TrackByFunction<Lecture>;
  $: any;
  https: any;
  lectures: Lecture[] = [];
  lectureStatuses: { [key: number]: boolean } = {};
  completePercentage:string="0%"
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
        this.setLessonProgress(value)
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
    });
    
  }
  setUnitMapping(value: Course) {
    this.course = value;

    // Initialize the unitMap
    this.unitMap = {};
    value.units.sort((a, b) => a.id - b.id);
    // Process each unit within the course
    value.units.forEach((unit, idx) => {
      // Generate a unique key for each unit

      const key = `${idx + 1} - ${unit.unitTitle}`;

      // Initialize the array for this unit key if it doesn't already exist
      if (!this.unitMap[key]) {
        this.unitMap[key] = [];
      }

      // Add each lecture to the unit's array in the map
      unit.lectures.forEach((lecture) => {
        this.unitMap[key].push(lecture);
      });
      unit.lectures.sort((a, b) => a.lessonId - b.lessonId);
      this.lectures = [...this.lectures, ...unit.lectures];
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

  setLessonProgress(course:Course | null){
    
    if(course==null) return 
    var total=0;
    var completed=0;
   const lectureIds=course.units.flatMap((unit)=>unit.lectures.map((lecture:any)=>lecture.id))
   lectureIds.forEach(lectureId => {
     this.courseService.isLectureViewed(lectureId).subscribe(
       {
        next:(value)=>{
          this.lectureStatuses[lectureId] = value.resultTrue
          total+=1
          if(value.resultTrue){
            completed+=1
          }
          
          this.completePercentage=Math.round((completed/total)*100)+"%"
        }
        
       }
     );
   });
   
  }

  setLessonSection() {
    this.activatedRouter.queryParams.subscribe((params) => {
      const lessonId = params['lessonId'];
      if (lessonId) {
        const allLectures = this.course?.units.flatMap((unit) => unit.lectures);

        const lecture = allLectures?.find((lecture) => lecture.id == lessonId);
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

  goToNext() {
    if (this.currentLecture) {
      

      this.setCurrentUnitLecture(
        this.lectures[this.lectures.indexOf(this.currentLecture) + 1]
      );
    }
  }
  isLast() {
    if (this.currentLecture) {
      // console.log(this.unitMap);

      return (
        this.lectures.length > this.lectures.indexOf(this.currentLecture) + 1
      );
    }
    return false;
  }

  setCurrentUnitLecture(lesson: Lecture) {
   
    this.currentLecture = lesson;
    this.currentLectureVideoUrl =
      'https://www.youtube.com/embed/' + lesson.lessonVideo + '?rel=0';
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { lessonId: lesson.id },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  isActive(lesson: any): boolean {
    return this.currentLecture == lesson;
  }
  // Method to get option label based on index
  getOptionLabel(index: number): string {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index] || '';
  }
  copyCode() {
    const codeElement = document.getElementById('code-block');
    if (codeElement) {
      const range = document.createRange();
      range.selectNode(codeElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges(); // Deselect the text
      alert('Code copied to clipboard!');
    }
  }

  isLectureViewed(lectureId:number){
    this.courseService.isLectureViewed(lectureId).subscribe({
      next:(data)=>{return data.isTrue}
    })
  }

  markLectureViewed(lectureId:number){
    if(!this.lectureStatuses[lectureId]){
      this.courseService.markLectureViewed(lectureId).subscribe({
        next:(value)=>this.setLessonProgress(this.course)
        
      })
    }
    
  }

}
