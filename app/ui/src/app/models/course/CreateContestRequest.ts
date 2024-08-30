import { Question } from "./question";

export interface CreateContestRequest {
    title: string;
    description: string;
    status: string;
    maxParticipants: number;
    createdByUserId: number;
    questions: Question[];
    startDate: string;  // ISO date string
    endDate: string;    // ISO date string
  }