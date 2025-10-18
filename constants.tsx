import React from 'react';
import { Student, Course, Assignment, BonusCourse, Submission } from './types';

// Icons - HeroIcons paths
const iconProps: React.SVGProps<SVGSVGElement> = {
  strokeWidth: 1.5,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};

export const GraduationCapIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.036A48.627 48.627 0 0112 10.147a48.627 48.627 0 018.232-4.41l-2.072 1.036m-12.156 0c.646.317 1.273.618 1.902.904a50.57 50.57 0 01-2.658-.813z" /></svg>;
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.313.25-.624.386-.934m-3.417-3.417a3.375 3.375 0 00-5.942.923l-3.375-3.375a3.375 3.375 0 005.942-.923z" /></svg>;
export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
export const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 .75l-3-3m0 0l3-3m-3 3H3" /></svg>;
export const ClipboardListIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
export const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 15.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 20l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 23.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 20l1.036-.259a3.375 3.375 0 002.455-2.456L18 15.75z" /></svg>;
export const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const FireIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.983 8.983 0 013.362-3.797z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214C16.318 6.57 17 8.235 17 10c0 1.765-.682 3.43-1.638 4.786A8.287 8.287 0 0015.362 5.214z" /></svg>;
export const CollectionIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...iconProps} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2" /></svg>;


// Mock Data
export const COURSES: Course[] = [
    {
        id: 'gc-1',
        title: 'HTML',
        description: 'The backbone of the web. Learn to structure content.',
        year: 1,
        duration: '4 Weeks',
        subTopics: [
            {
                id: 'html-1',
                title: 'HTML Structure',
                videoUrl: 'https://www.youtube.com/embed/y3UH2gAbh3c',
                notes: '### Document Structure\n\n- `<!DOCTYPE html>`: Defines the document type.\n- `<html>`: The root element.\n- `<head>`: Contains meta-information.\n- `<body>`: Contains the visible page content.',
                practiceTest: {
                    id: 'html-test-1',
                    questions: [
                        { id: 'q1', text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correctAnswerIndex: 0 },
                        { id: 'q2', text: 'Which tag is the root element of an HTML page?', options: ['<body>', '<html>', '<head>'], correctAnswerIndex: 1 },
                    ]
                }
            },
            { id: 'html-2', title: 'Headings & Paragraphs', videoUrl: '', notes: '' },
            { id: 'html-3', title: 'Links', videoUrl: '', notes: '' },
            { id: 'html-4', title: 'Images', videoUrl: '', notes: '' },
        ]
    },
    { id: 'gc-2', title: 'CSS', description: 'Style your web content to make it look great.', year: 1, duration: '4 Weeks' },
    { id: 'gc-3', title: 'Bootstrap', description: 'Build responsive, mobile-first projects on the web.', year: 1, duration: '3 Weeks' },
    { id: 'gc-4', title: 'JavaScript', description: 'Add interactivity and logic to your websites.', year: 2, duration: '8 Weeks' },
    { id: 'gc-5', title: 'SQL', description: 'Learn to manage and query relational databases.', year: 2, duration: '6 Weeks' },
    { id: 'gc-6', title: 'Python', description: 'A versatile language for web dev, data science, and more.', year: 3, duration: '10 Weeks' },
    { id: 'gc-7', title: 'Data Structures & Algorithms', description: 'Understand the fundamentals of organizing and processing data.', year: 3, duration: '12 Weeks' },
    { id: 'gc-8', title: 'Advanced DS & Algo', description: 'Dive deeper into complex data structures and algorithms.', year: 3, duration: '12 Weeks' },
    { id: 'pt-1', title: 'Placement Training', description: 'Prepare for technical interviews and career readiness.', year: 4, duration: '1 Year' },
];

export const ASSIGNMENTS: Assignment[] = [
    { id: 'gc-1-a1', courseId: 'gc-1', title: 'Basic Page Structure', maxGrade: 100, problemStatement: 'Create an HTML file with the correct doctype, html, head, and body tags.', dueDate: '2024-09-15' },
    { id: 'gc-1-a2', courseId: 'gc-1', title: 'Build a Recipe Page', maxGrade: 100, problemStatement: 'Use headings, paragraphs, lists, and images to create a recipe page.', dueDate: '2024-09-22' },
    { id: 'gc-4-a1', courseId: 'gc-4', title: 'Variable Practice', maxGrade: 100, problemStatement: 'Declare variables and perform basic arithmetic.', dueDate: '2024-10-01' },
];

export const BONUS_COURSES: BonusCourse[] = [
    { id: 'bc-os', title: 'Operating Systems', description: 'Understand the core principles of OS design.', cost: 150 },
    { id: 'bc-dld', title: 'Digital Logic Designs', description: 'Explore the fundamentals of digital circuits.', cost: 120 },
    { id: 'bc-dt', title: 'Design Thinking', description: 'A human-centered approach to innovation.', cost: 80 },
    { id: 'bc-ss', title: 'Soft Skills', description: 'Enhance your communication and teamwork abilities.', cost: 75 },
    { id: 'bc-ep', title: 'English for Professionals', description: 'Improve your professional English communication.', cost: 75 },
    { id: 'bc-pd', title: 'Personality Development', description: 'Build confidence and interpersonal skills.', cost: 90 },
    { id: 'bc-c', title: 'C Language', description: 'Learn the foundational C programming language.', cost: 100 },
    { id: 'bc-cpp', title: 'C++', description: 'Master object-oriented programming with C++.', cost: 120 },
];

export const MOCK_SUBMISSIONS: Submission[] = [
    { id: 'sub-1', studentId: 101, assignmentId: 'gc-1-a1', submittedAt: '2024-09-14T10:00:00Z', content: 'Here is my HTML file structure.', grade: 95 },
    { id: 'sub-2', studentId: 103, assignmentId: 'gc-1-a1', submittedAt: '2024-09-15T11:00:00Z', content: 'Submitted the basic structure as requested.', grade: 100 },
    { id: 'sub-3', studentId: 103, assignmentId: 'gc-1-a2', submittedAt: '2024-09-21T14:00:00Z', content: 'My recipe page includes an image and an unordered list.', grade: 98 },
    { id: 'sub-4', studentId: 101, assignmentId: 'gc-1-a2', submittedAt: '2024-09-20T18:00:00Z', content: 'Here is my recipe page submission.', grade: null },
];

export const MOCK_STUDENTS: Student[] = [
    {
        id: 101,
        name: 'Alice Johnson',
        registerNumber: 'BTECH-0101',
        gender: 'Female',
        department: 'Computer Science',
        mobileNumber: '123-456-7890',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=Alice`,
        creditCoins: 120,
        enrolledBonusCourses: ['bc-c'],
        streak: 5,
        lastLogin: new Date().toISOString(), // Logged in today
        courses: [
            { courseId: 'gc-1', status: 'in-progress', progress: 50, watchedVideos: ['html-1', 'html-2'], completedTests: ['html-1'] },
            { courseId: 'gc-2', status: 'locked', progress: 0 },
        ]
    },
    {
        id: 102,
        name: 'Bob Williams',
        registerNumber: 'BTECH-0102',
        gender: 'Male',
        department: 'Electrical Engineering',
        mobileNumber: '234-567-8901',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=Bob`,
        creditCoins: 50,
        enrolledBonusCourses: [],
        streak: 0,
        lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        courses: [
            { courseId: 'gc-1', status: 'in-progress', progress: 10, },
            { courseId: 'gc-2', status: 'locked', progress: 0, },
        ]
    },
    {
        id: 103,
        name: 'Charlie Brown',
        registerNumber: 'BTECH-0103',
        gender: 'Male',
        department: 'Computer Science',
        mobileNumber: '345-678-9012',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie`,
        creditCoins: 200,
        enrolledBonusCourses: ['bc-c', 'bc-ss'],
        streak: 12,
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        courses: [
            { courseId: 'gc-1', status: 'completed', progress: 100 },
            { courseId: 'gc-2', status: 'in-progress', progress: 25 },
            { courseId: 'gc-3', status: 'locked', progress: 0 },
        ]
    }
];