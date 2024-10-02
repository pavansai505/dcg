export interface CourseActionHistory {
    id?: number; // Optional, if you want to include the ID
    userId: number; // To represent the user's ID
    courseId: number; // To represent the course's ID
    returned: boolean;
    returnApproved: boolean;
    percentageCompleted: number;
}
