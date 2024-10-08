import { User } from "../user/user";
import { Question } from "./question"; // Import the Question interface

export interface Quiz {
  id: number;
  title: string; // Title of the quiz
  description: string; // Description or instructions for the quiz
  questions: Question[]; // List of questions in the quiz
  score:Score
}


export interface Score {
  user: User;
  scoreValue: number;
  createdDate:Date
}