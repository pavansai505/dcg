import { User } from "../user/user";
import { Course } from "./course";

export interface Badge {
    id: number; // Assuming BaseEntity has an id field
    badgeName: string;
    badgeDescription: string;
    badgeIcon: string;
    course?: Course; // Optional, as it might be `null` or undefined
    users?: User[]; // Optional, as it might be an empty array or undefined
    acquired: boolean;
  }