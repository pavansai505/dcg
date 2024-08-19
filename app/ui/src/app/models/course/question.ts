export interface Question {
    id: number;
    questionText: string;
    options: string[]; // List of answer options
    correctAnswer: string; // The correct answer from the list of options
  }
  