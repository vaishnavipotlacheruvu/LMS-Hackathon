export enum Role {
  STUDENT = 'Student',
  STAFF = 'Staff',
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface PracticeTest {
  id: string;
  questions: Question[];
}

export interface CourseSubTopic {
  id: string;
  title: string;
  videoUrl?: string;
  notes?: string;
  practiceTest?: PracticeTest;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  subTopics?: CourseSubTopic[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  maxGrade: number;
  problemStatement: string;
  dueDate: string;
}

export interface BonusCourse {
  id:string;
  title: string;
  description: string;
  cost: number;
}

export interface StudentCourse {
  courseId: string;
  status: 'locked' | 'in-progress' | 'completed';
  progress: number; // 0-100
  watchedVideos?: string[];
  completedTests?: string[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: number;
  submittedAt: string; // ISO date string
  content: string;
  grade: number | null;
}

export interface Student {
  id: number;
  name: string;
  registerNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  mobileNumber: string;
  avatar: string;
  creditCoins: number;
  enrolledBonusCourses: string[];
  courses: StudentCourse[];
  streak: number;
  lastLogin: string; // ISO date string
}