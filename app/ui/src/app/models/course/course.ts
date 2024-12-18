import { User } from "../user/user";
import { Badge } from "../badge/badge";
import { CourseActionHistory } from "./courseActionHistory";
import { Lecture } from "./lecture";
import { Quiz } from "./quiz";
import { Unit } from "./unit";

export interface Course {
  id: number;
  createdDate: string;
  lastModifiedDate: string | null;
  createdBy: number;
  lastModifiedBy: number | null;
  title: string;
  authorName: string;
  description: string;
  synopsis: string;
  courseCover: string | null;
  units: Unit[]; // Units in the course
  courseProgresses: any[]; // Assuming this interface exists
  approvalStatus: string;
  price: number;
  users:User[];
  badge?:Badge | null;
  courseLevel:string;
  tags:string[];
  endGoals:string[];
  courseCode:string;
  histories:CourseActionHistory[],
  quiz:Quiz
  imageUrl:string
  disabled:boolean
}
