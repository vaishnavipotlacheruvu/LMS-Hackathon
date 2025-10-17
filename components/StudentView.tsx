import React, { useState, useMemo, useEffect } from 'react';
import { Student, Course, Assignment, BonusCourse, Submission, StudentCourse } from '../types';
import { MOCK_STUDENTS, COURSES, ASSIGNMENTS, BONUS_COURSES, FireIcon, MOCK_SUBMISSIONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

// For this view, we'll hardcode to the first student in the mock data.
const LOGGED_IN_STUDENT_ID = 101;

const isToday = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

const CourseCard: React.FC<{ studentCourse: StudentCourse, courseInfo: Course, onViewDetails: () => void }> = ({ studentCourse, courseInfo, onViewDetails }) => {
    const getStatusChip = () => {
        switch (studentCourse.status) {
            case 'completed': return <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">Completed</span>;
            case 'in-progress': return <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">In Progress</span>;
            case 'locked': return <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">Locked</span>;
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{courseInfo.title}</h3>
                {getStatusChip()}
            </div>
            <p className="text-sm text-gray-500 mb-4 flex-grow">{courseInfo.description}</p>
            {studentCourse.status !== 'locked' && (
                <div className="mt-auto">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-brand-primary">Progress</span>
                        <span className="text-sm font-medium text-brand-primary">{studentCourse.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${studentCourse.progress}%` }}></div>
                    </div>
                    {(courseInfo.subTopics && courseInfo.subTopics.length > 0) &&
                        <button onClick={onViewDetails} className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-dark transition">
                            View Details
                        </button>
                    }
                </div>
            )}
        </div>
    );
};

const CourseDetailView: React.FC<{ course: Course, studentCourse: StudentCourse, onBack: () => void, updateStudent: React.Dispatch<React.SetStateAction<Student | undefined>> }> = ({ course, studentCourse, onBack, updateStudent }) => {
    const handleWatchVideo = (topicId: string) => {
        if (studentCourse.watchedVideos?.includes(topicId)) return;
        updateStudent(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                creditCoins: prev.creditCoins + 10,
                courses: prev.courses.map(sc => sc.courseId === course.id ? { ...sc, watchedVideos: [...(sc.watchedVideos || []), topicId] } : sc)
            }
        });
    };
    const handleTakeTest = (topicId: string) => {
        if (studentCourse.completedTests?.includes(topicId)) return;
        updateStudent(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                creditCoins: prev.creditCoins + 100,
                courses: prev.courses.map(sc => sc.courseId === course.id ? { ...sc, completedTests: [...(sc.completedTests || []), topicId] } : sc)
            }
        });
    };

    return (
        <div>
            <button onClick={onBack} className="mb-6 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition">&larr; Back to My Courses</button>
            <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <div className="space-y-4">
                {course.subTopics?.map(topic => {
                    const hasWatched = studentCourse.watchedVideos?.includes(topic.id);
                    const hasCompletedTest = studentCourse.completedTests?.includes(topic.id);
                    return (
                        <div key={topic.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
                            <p className="font-semibold">{topic.title}</p>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleWatchVideo(topic.id)} disabled={hasWatched} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full disabled:bg-green-100 disabled:text-green-800">{hasWatched ? '✓ Watched' : 'Watch Video (+10)'}</button>
                                <button onClick={() => handleTakeTest(topic.id)} disabled={hasCompletedTest} className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full disabled:bg-green-100 disabled:text-green-800">{hasCompletedTest ? '✓ Completed' : 'Take Test (+100)'}</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const MyCoursesView: React.FC<{ student: Student, updateStudent: React.Dispatch<React.SetStateAction<Student | undefined>> }> = ({ student, updateStudent }) => {
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    const selectedCourseInfo = COURSES.find(c => c.id === selectedCourseId);
    const selectedStudentCourse = student.courses.find(sc => sc.courseId === selectedCourseId);

    if (selectedCourseId && selectedCourseInfo && selectedStudentCourse) {
        return <CourseDetailView course={selectedCourseInfo} studentCourse={selectedStudentCourse} onBack={() => setSelectedCourseId(null)} updateStudent={updateStudent} />
    }
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.courses.map(sc => {
                    const courseInfo = COURSES.find(c => c.id === sc.courseId);
                    if (!courseInfo) return null;
                    return <CourseCard key={sc.courseId} studentCourse={sc} courseInfo={courseInfo} onViewDetails={() => setSelectedCourseId(sc.courseId)} />;
                })}
            </div>
        </div>
    );
};

const CourseCatalogView: React.FC<{ student: Student, onEnroll: (courseId: string) => void }> = ({ student, onEnroll }) => {
    const availableCourses = COURSES.filter(c => !student.courses.some(sc => sc.courseId === c.id));
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Course Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">Year {course.year} &middot; {course.duration}</p>
                        <p className="text-sm text-gray-600 my-4 flex-grow">{course.description}</p>
                        <button onClick={() => onEnroll(course.id)} className="mt-auto w-full bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                            Enroll
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyGradesView: React.FC<{ student: Student, submissions: Submission[] }> = ({ student, submissions }) => {
    const gradesData = useMemo(() => {
        return student.courses
            .filter(sc => sc.status !== 'locked')
            .map(sc => {
                const courseInfo = COURSES.find(c => c.id === sc.courseId);
                const courseAssignments = ASSIGNMENTS.filter(a => a.courseId === sc.courseId);
                const courseSubmissions = submissions.filter(sub => sub.studentId === student.id && courseAssignments.some(a => a.id === sub.assignmentId));
                
                let totalGrade = 0;
                let totalMaxGrade = 0;
                courseSubmissions.forEach(sub => {
                    const assignmentInfo = courseAssignments.find(a => a.id === sub.assignmentId);
                    if (sub.grade !== null && assignmentInfo) {
                        totalGrade += sub.grade;
                        totalMaxGrade += assignmentInfo.maxGrade;
                    }
                });

                const overallGrade = totalMaxGrade > 0 ? ((totalGrade / totalMaxGrade) * 100).toFixed(1) : 'N/A';
                
                return {
                    courseTitle: courseInfo?.title || 'Unknown Course',
                    assignments: courseAssignments,
                    submissions: courseSubmissions,
                    overallGrade,
                };
            });
    }, [student, submissions]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">My Grades</h2>
            <div className="space-y-6">
                {gradesData.map(courseData => (
                    <div key={courseData.courseTitle} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">{courseData.courseTitle}</h3>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Overall Grade</p>
                                <p className="text-2xl font-bold text-brand-primary">{courseData.overallGrade}{courseData.overallGrade !== 'N/A' && '%'}</p>
                            </div>
                        </div>
                        {courseData.assignments.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {courseData.assignments.map(asm => {
                                    const submission = courseData.submissions.find(s => s.assignmentId === asm.id);
                                    return (
                                     <li key={asm.id} className="py-3 flex justify-between items-center">
                                        <p className="text-gray-700">{asm.title}</p>
                                        <p className={`font-semibold ${submission?.grade === null || submission?.grade === undefined ? 'text-gray-400' : 'text-gray-800'}`}>
                                            {submission?.grade !== null && submission?.grade !== undefined ? `${submission.grade} / ${asm.maxGrade}` : (submission ? 'Submitted' : 'Not Submitted')}
                                        </p>
                                    </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No assignments for this course.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AssignmentsView: React.FC<{ student: Student, submissions: Submission[], setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>> }> = ({ student, submissions, setSubmissions }) => {
    const [submissionContent, setSubmissionContent] = useState<{ [key: string]: string }>({});
    
    const allStudentAssignments = useMemo(() => {
        const assignments: (Assignment & { courseTitle: string })[] = [];
        student.courses
            .filter(sc => sc.status === 'in-progress')
            .forEach(sc => {
                const courseInfo = COURSES.find(c => c.id === sc.courseId);
                ASSIGNMENTS.filter(a => a.courseId === sc.courseId).forEach(a => {
                    assignments.push({ ...a, courseTitle: courseInfo?.title || 'Unknown Course' });
                });
            });
        return assignments;
    }, [student]);
    
    const handleSubmit = (assignmentId: string) => {
        const content = submissionContent[assignmentId];
        if (!content || !content.trim()) {
            alert("Please enter your submission content.");
            return;
        }
        const newSubmission: Submission = {
            id: `sub-${Date.now()}`,
            assignmentId,
            studentId: student.id,
            submittedAt: new Date().toISOString(),
            content,
            grade: null
        };
        setSubmissions(prev => [...prev, newSubmission]);
        alert("Assignment submitted successfully!");
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Assignments</h2>
            {allStudentAssignments.length > 0 ? (
                 <div className="bg-white p-6 rounded-xl shadow-md">
                     <ul className="divide-y divide-gray-200">
                        {allStudentAssignments.map(assignment => {
                            const submission = submissions.find(s => s.assignmentId === assignment.id && s.studentId === student.id);
                            return (
                                <li key={assignment.id} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">{assignment.title}</h4>
                                            <p className="text-sm text-gray-500">{assignment.courseTitle} | Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        {submission ? (
                                            <span className="font-semibold text-green-600">Submitted</span>
                                        ) : (
                                            <button onClick={() => handleSubmit(assignment.id)} className="bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-dark transition">
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-gray-600">{assignment.problemStatement}</p>
                                    {!submission && (
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">Your Submission</label>
                                            <textarea 
                                                rows={3}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                                value={submissionContent[assignment.id] || ''}
                                                onChange={e => setSubmissionContent(prev => ({...prev, [assignment.id]: e.target.value}))}
                                            ></textarea>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                 </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold">No assignments available.</h3>
                    <p className="text-gray-500 mt-2">Enroll in courses to see assignments.</p>
                </div>
            )}
        </div>
    );
};

const PlaygroundView: React.FC = () => {
    const [html, setHtml] = useState('<h1>Hello, World!</h1>');
    const [css, setCss] = useState('h1 { color: #4f46e5; }');
    const [js, setJs] = useState('console.log("Ready to code!");');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Coding Playground</h2>
            <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex h-[60vh]">
                    <div className="flex-1 flex flex-col p-2">
                        <Editor language="HTML" value={html} onChange={setHtml} />
                        <Editor language="CSS" value={css} onChange={setCss} />
                        <Editor language="JavaScript" value={js} onChange={setJs} />
                    </div>
                    <div className="flex-1 p-2">
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            className="bg-white border border-gray-200 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Editor = ({ language, value, onChange }) => (
    <div className="flex-1 flex flex-col mb-2 last:mb-0">
        <div className="bg-gray-200 text-gray-700 px-3 py-1 font-mono text-sm rounded-t-lg">{language}</div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full flex-1 p-2 border border-gray-200 rounded-b-lg font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
    </div>
);


const BonusCoursesView: React.FC<{ student: Student; onPurchase: (courseId: string) => void; }> = ({ student, onPurchase }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Bonus Courses Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BONUS_COURSES.map(course => {
                    const isEnrolled = student.enrolledBonusCourses.includes(course.id);
                    const canAfford = student.creditCoins >= course.cost;
                    
                    return (
                        <div key={course.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-4 flex-grow">{course.description}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <p className="text-lg font-bold text-yellow-600">{course.cost} Coins</p>
                                {isEnrolled ? (
                                    <span className="font-semibold text-green-600">Enrolled</span>
                                ) : (
                                    <button 
                                        onClick={() => onPurchase(course.id)}
                                        disabled={!canAfford}
                                        className="bg-brand-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {canAfford ? 'Purchase' : 'Not Enough Coins'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface StudentViewProps {
    activeView: string;
}

const StudentView: React.FC<StudentViewProps> = ({ activeView }) => {
    const [student, setStudent] = useState<Student | undefined>(
        MOCK_STUDENTS.find(s => s.id === LOGGED_IN_STUDENT_ID)
    );
    const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
    
    useEffect(() => {
        if (student && !isToday(student.lastLogin)) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const lastLoginDate = new Date(student.lastLogin);

            if (lastLoginDate.toDateString() === yesterday.toDateString()) {
                setStudent(s => s ? { ...s, streak: s.streak + 1, lastLogin: new Date().toISOString() } : s);
            } else {
                setStudent(s => s ? { ...s, streak: 1, lastLogin: new Date().toISOString() } : s);
            }
        }
    }, []);

    if (!student) {
        return <div>Error: Student not found.</div>;
    }
    
    const handleEnroll = (courseId: string) => {
        if (student.courses.some(c => c.courseId === courseId)) return;
        const newStudentCourse: StudentCourse = {
            courseId,
            status: 'in-progress',
            progress: 0,
        };
        setStudent(prev => prev ? { ...prev, courses: [...prev.courses, newStudentCourse] } : undefined);
        alert(`Successfully enrolled in ${COURSES.find(c=>c.id === courseId)?.title}!`);
    };

    const handlePurchaseBonusCourse = (courseId: string) => {
        const course = BONUS_COURSES.find(c => c.id === courseId);
        if (course && student.creditCoins >= course.cost && !student.enrolledBonusCourses.includes(courseId)) {
            setStudent({
                ...student,
                creditCoins: student.creditCoins - course.cost,
                enrolledBonusCourses: [...student.enrolledBonusCourses, courseId],
            });
            alert(`Successfully purchased ${course.title}!`);
        } else {
            alert('Could not complete purchase. Check your coin balance or if you already own this course.');
        }
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'My Courses':
                return <MyCoursesView student={student} updateStudent={setStudent} />;
            case 'Course Catalog':
                return <CourseCatalogView student={student} onEnroll={handleEnroll} />;
            case 'My Grades':
                return <MyGradesView student={student} submissions={submissions} />;
            case 'Assignments':
                return <AssignmentsView student={student} submissions={submissions} setSubmissions={setSubmissions} />;
            case 'Playground':
                return <PlaygroundView />;
            case 'Bonus Courses':
                return <BonusCoursesView student={student} onPurchase={handlePurchaseBonusCourse} />;
            default:
                return <MyCoursesView student={student} updateStudent={setStudent} />;
        }
    };

    return (
        <div>
            <div className="flex items-start justify-between mb-8">
                 <div className="flex items-center">
                    <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">{student.name}</h2>
                        <p className="text-gray-500">Reg No: {student.registerNumber}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 rounded-lg flex items-center">
                        <FireIcon className="w-6 h-6 mr-2 text-orange-500"/>
                        <p className="font-bold">{student.streak} Day Streak</p>
                    </div>
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-lg">
                        <p className="font-bold">Credit Coins: {student.creditCoins}</p>
                    </div>
                </div>
            </div>
            {renderActiveView()}
        </div>
    );
};

export default StudentView;