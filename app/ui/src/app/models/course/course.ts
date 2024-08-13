import { Lecture } from "./lecture";

  
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
    histories: any[]; // Assuming this is an array of any type
    lectures: Lecture[];
    courseProgresses: any[]; // Assuming this is an array of any type
    approvalStatus: string
    price:number
  }
  