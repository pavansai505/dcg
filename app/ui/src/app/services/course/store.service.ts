import { Injectable } from '@angular/core';
import { Course } from '../../models/course/course';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  course!:Course
  constructor() { }
  setCourse(course:Course){this.course=course}
  getCourse(){return this.course}
  reset(){this.course={} as Course}
}
