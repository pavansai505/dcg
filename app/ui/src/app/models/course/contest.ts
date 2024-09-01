import { User } from "../user/user";
import { Quiz } from "./quiz";

export interface Contest {
    id: number;
    title: string;
    description: string;
    status: string;
    maxParticipants: number;
    startDate: string;  // ISO date string
    endDate: string;    // ISO date string
    createdByUser: User;
    createdDate:string;
    quiz: Quiz;   
    participants:User[]  // Optional, if a quiz is associated
    // List of scores and other related data
}