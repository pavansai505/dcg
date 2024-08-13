import { Unit } from "./unit"; // Import Unit if needed

export interface Lecture {
  id: number;
  createdDate: string;
  lastModifiedDate: string | null;
  createdBy: number;
  lastModifiedBy: number | null;
  unit: Unit; // Reference to the unit
  lessonId: number;
  lessonTitle: string;
  lessonActivityName: string;
  lessonNotes: string;
  lessonVideo: string;
  lessonObjectives: string;
  enable: boolean;
}