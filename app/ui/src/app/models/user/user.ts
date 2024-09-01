import { Course } from "../course/course";
import { Role } from "./role"; // Assuming this interface exists

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Use ISO 8601 date format string
  email: string;
  password: string; // Consider omitting or handling securely
  roles: Role[]; // Assuming you have a Role interface
  courses: Course[]; // Courses the user is enrolled in
  createdDate: string; // Use ISO 8601 date format string
  lastModifiedDate: string | null; // Use ISO 8601 date format string or null
  fullName:String;
}
