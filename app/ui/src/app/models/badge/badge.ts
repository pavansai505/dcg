import { User } from "../user/user";
import { Course } from "../course/course";

export interface Badge {
  id:number
  badgeName: string;           // Name of the badge
  badgeDescription: string;    // Description of the badge
  badgeIcon: string;           // URL or path to the badge icon image
  badgeCode: string;           // UUID code for the badge
  course?: Course;           // Reference to the associated course (nullable or optional)
  users?: User[];              // List of users who have earned this badge (optional)
  acquired: boolean;           // Whether the badge has been acquired by the user
}