export interface Lecture {
    id: number;
    createdDate: string;
    lastModifiedDate: string | null;
    createdBy: number;
    lastModifiedBy: number | null;
    unitId: number;
    unitTitle: string;
    lessonId: number;
    lessonTitle: string;
    lessonActivityName: string;
    lessonNotes: string;
    lessonVideo: string;
    lessonObjectives: string;
    enable: boolean;
  }