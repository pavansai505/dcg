import { Course } from "./course";
import { Lecture } from "./lecture";

export interface Unit {
  id: number;
  createdDate: string;
  lastModifiedDate: string | null;
  createdBy: number;
  lastModifiedBy: number | null;
  course: Course; // Reference to the course
  unitTitle: string;
  description:string;
  lectures: Lecture[]; // List of lectures in the unit
}
