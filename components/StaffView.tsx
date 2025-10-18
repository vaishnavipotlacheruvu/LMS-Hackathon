import React, { useState, useMemo } from 'react';
import { Student, Course, Assignment, Submission, CourseSubTopic, PracticeTest } from '../types';
import { MOCK_STUDENTS, COURSES, ASSIGNMENTS, MOCK_SUBMISSIONS, FireIcon, PlusCircleIcon } from '../constants';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

interface StaffViewProps {
    activeView: string;
}

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
        <div className="bg-brand-light p-3 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const CourseDetailManagementView: React.FC<{
    course: Course;
    students: Student[];
    onBack: () => void;
    onUpdateCourse: (updatedCourse: Course) => void;
}> = ({ course, students, onBack, onUpdateCourse }) => {
    const [activeTab, setActiveTab] = useState<'content' | 'students'>('content');
    const [newTopicTitle, setNewTopicTitle] = useState('');

    const handleTopicChange = (topicId: string, field: keyof Omit<CourseSubTopic, 'id' | 'practiceTest'>, value: string) => {
        const updatedSubTopics = course.subTopics?.map(topic =>
            topic.id === topicId ? { ...topic, [field]: value } : topic
        );
        onUpdateCourse({ ...course, subTopics: updatedSubTopics });
    };

    const handleAddTopic = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTopicTitle.trim()) return;

        const newTopic: CourseSubTopic = {
            id: `topic-${Date.now()}`,
            title: newTopicTitle,
            videoUrl: '',
            notes: '',
        };

        const updatedSubTopics = [...(course.subTopics || []), newTopic];
        onUpdateCourse({ ...course, subTopics: updatedSubTopics });
        setNewTopicTitle('');
    };
    
    const renderPracticeTestInfo = (test?: PracticeTest) => {
        if (!test) {
            return <button className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full hover:bg-purple-200">Create Test</button>;
        }
        return (
            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">{test.questions.length} question(s)</p>
                <button className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full hover:bg-purple-200">Edit Test</button>
            </div>
        );
    };

    const enrolledStudents = useMemo(() => students.filter(s => s.courses.some(sc => sc.courseId === course.id)), [students, course.id]);

    const renderContent = () => (
        <div>
            <div className="space-y-4">
                {course.subTopics?.map(topic => (
                    <div key={topic.id} className="bg-white p-6 rounded-xl shadow-md">
                        <input
                            type="text"
                            value={topic.title}
                            onChange={(e) => handleTopicChange(topic.id, 'title', e.target.value)}
                            className="text-xl font-semibold w-full border-b-2 border-transparent focus:border-brand-primary outline-none mb-4"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                                <input
                                    type="text"
                                    placeholder="e.g., https://youtube.com/embed/..."
                                    value={topic.videoUrl || ''}
                                    onChange={(e) => handleTopicChange(topic.id, 'videoUrl', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Practice Test</label>
                                {renderPracticeTestInfo(topic.practiceTest)}
                            </div>
                        </div>
                        <div className="mt-4">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Markdown supported)</label>
                             <textarea
                                rows={5}
                                placeholder="Add concepts, explanations, code snippets..."
                                value={topic.notes || ''}
                                onChange={(e) => handleTopicChange(topic.id, 'notes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                             />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">Add New Topic</h3>
                <form onSubmit={handleAddTopic} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                        placeholder="Enter title for the new topic"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button type="submit" className="flex items-center bg-brand-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition">
                        <PlusCircleIcon className="w-5 h-5 mr-2"/>
                        Add Topic
                    </button>
                </form>
            </div>
        </div>
    );

    const renderEnrolledStudents = () => (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">{enrolledStudents.length} student(s) enrolled.</h3>
            {enrolledStudents.length > 0 ? (
                 <ul className="divide-y divide-gray-200">
                    {enrolledStudents.map(s => <li key={s.id} className="py-3 font-medium">{s.name} ({s.registerNumber})</li>)}
                </ul>
            ) : <p className="text-gray-500">No students are currently enrolled in this course.</p>}
        </div>
    );

    const TabButton = ({ tab, label }) => (
        <button
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === tab ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
    );

    return (
        <div>
            <button onClick={onBack} className="mb-6 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition">&larr; Back to Courses</button>
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                 <h2 className="text-3xl font-bold">{course.title}</h2>
                 <p className="text-gray-600 mt-2">{course.description}</p>
            </div>

            <div className="mb-6 flex items-center gap-2 border-b pb-2">
                <TabButton tab="content" label="Course Content" />
                <TabButton tab="students" label="Enrolled Students" />
            </div>

            {activeTab === 'content' && renderContent()}
            {activeTab === 'students' && renderEnrolledStudents()}
        </div>
    );
};


const StaffDashboard: React.FC<{ students: Student[], submissions: Submission[] }> = ({ students, submissions }) => {
    const { totalStudents, averageProgress, pendingAssignments, progressDistribution } = useMemo(() => {
        const totalStudents = students.length;
        let totalProgress = 0, totalCourses = 0;
        const progressBrackets = [0, 0, 0, 0];
        students.forEach(student => {
            let studentTotalProgress = 0;
            student.courses.forEach(course => {
                totalProgress += course.progress;
                studentTotalProgress += course.progress;
                totalCourses++;
            });
            const studentAverageProgress = student.courses.length > 0 ? studentTotalProgress / student.courses.length : 0;
            if (studentAverageProgress <= 25) progressBrackets[0]++;
            else if (studentAverageProgress <= 50) progressBrackets[1]++;
            else if (studentAverageProgress <= 75) progressBrackets[2]++;
            else progressBrackets[3]++;
        });
        const averageProgress = totalCourses > 0 ? (totalProgress / totalCourses).toFixed(1) : 0;
        const progressDistribution = [
            { name: '0-25%', students: progressBrackets[0] }, { name: '26-50%', students: progressBrackets[1] },
            { name: '51-75%', students: progressBrackets[2] }, { name: '76-100%', students: progressBrackets[3] },
        ];
        return { totalStudents, averageProgress, pendingAssignments: submissions.filter(s => s.grade === null).length, progressDistribution };
    }, [students, submissions]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Staff Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Students" value={totalStudents} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                <StatCard title="Avg. Course Progress" value={`${averageProgress}%`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
                <StatCard title="Submissions to Grade" value={pendingAssignments} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Student Progress Distribution</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={progressDistribution} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill="#4f46e5" name="Number of Students" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Student Streaks</h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {students.sort((a,b) => b.streak - a.streak).map(student => (
                            <div key={student.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-3" />
                                    <span className="font-medium">{student.name}</span>
                                </div>
                                <div className="flex items-center font-bold text-orange-500">
                                    <FireIcon className="w-5 h-5 mr-1" />
                                    <span>{student.streak} days</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CourseManagementView: React.FC<{ courses: Course[], setCourses: React.Dispatch<React.SetStateAction<Course[]>>, students: Student[], onSelectCourse: (course: Course) => void }> = ({ courses, setCourses, students, onSelectCourse }) => {
    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newCourse: Course = {
            id: `new-${Date.now()}`,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            year: parseInt(formData.get('year') as string, 10),
            duration: formData.get('duration') as string,
        };
        setCourses(prev => [...prev, newCourse]);
        (e.target as HTMLFormElement).reset();
        alert(`Course "${newCourse.title}" created successfully!`);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Course Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">All Courses</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {courses.map(course => (
                            <div key={course.id} onClick={() => onSelectCourse(course)} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-brand-light">
                                <p className="font-semibold">{course.title} (Year {course.year})</p>
                                <p className="text-sm text-gray-600">{course.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"></textarea>
                        </div>
                         <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                <input type="number" name="year" min="1" max="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                                <input type="text" name="duration" required placeholder="e.g. 8 Weeks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-dark transition">Add Course</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AssignmentManagementView: React.FC<{ assignments: Assignment[], setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>, courses: Course[], onSelectAssignment: (assignment: Assignment) => void }> = ({ assignments, setAssignments, courses, onSelectAssignment }) => {
    const handleAddAssignment = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newAssignment: Assignment = {
            id: `new-asg-${Date.now()}`,
            courseId: formData.get('courseId') as string,
            title: formData.get('title') as string,
            problemStatement: formData.get('problemStatement') as string,
            maxGrade: parseInt(formData.get('maxGrade') as string, 10),
            dueDate: new Date(formData.get('dueDate') as string).toISOString(),
        };
        setAssignments(prev => [...prev, newAssignment]);
        (e.target as HTMLFormElement).reset();
        alert(`Assignment "${newAssignment.title}" created successfully!`);
    };

     return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Assignment Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">All Assignments</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {assignments.map(assignment => (
                            <div key={assignment.id} onClick={() => onSelectAssignment(assignment)} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-brand-light">
                                <p className="font-semibold">{assignment.title}</p>
                                <p className="text-sm text-gray-600">Course: {courses.find(c=>c.id === assignment.courseId)?.title || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Assignment</h3>
                    <form onSubmit={handleAddAssignment} className="space-y-4">
                        <div>
                            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Course</label>
                            <select name="courseId" required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm">
                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                            <textarea name="problemStatement" required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"></textarea>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="maxGrade" className="block text-sm font-medium text-gray-700">Max Grade</label>
                                <input type="number" name="maxGrade" min="1" defaultValue="100" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input type="date" name="dueDate" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-dark transition">Add Assignment</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const StaffView: React.FC<StaffViewProps> = ({ activeView }) => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [assignments, setAssignments] = useState<Assignment[]>(ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [giftAmount, setGiftAmount] = useState<string>('');
  
  const handleUpdateGrade = (submissionId: string, grade: number | null) => {
      setSubmissions(prev => prev.map(sub => sub.id === submissionId ? { ...sub, grade } : sub));
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prevCourses => prevCourses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
  };

  const handleGiftCoins = (studentId: number) => {
    const amount = parseInt(giftAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive number of coins.");
      return;
    }
    setStudents(prevStudents =>
      prevStudents.map(student => student.id === studentId ? { ...student, creditCoins: student.creditCoins + amount } : student)
    );
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(prev => prev ? { ...prev, creditCoins: prev.creditCoins + amount } : null);
    }
    setGiftAmount('');
    alert(`Successfully gifted ${amount} coins to ${selectedStudent?.name}!`);
  };
  
  const renderActiveView = () => {
    if (selectedCourse) {
        return (
            <CourseDetailManagementView
                course={selectedCourse}
                students={students}
                onBack={() => setSelectedCourse(null)}
                onUpdateCourse={handleUpdateCourse}
            />
        );
    }
    
    if (selectedAssignment) {
        const assignmentSubmissions = submissions.filter(s => s.assignmentId === selectedAssignment.id);
        return (
             <div>
                <button onClick={() => setSelectedAssignment(null)} className="mb-6 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition">&larr; Back to Assignments</button>
                <h2 className="text-3xl font-bold mb-2">{selectedAssignment.title}</h2>
                <p className="text-gray-600 mb-6">{assignmentSubmissions.length} submission(s) received.</p>
                <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    {assignmentSubmissions.map(sub => {
                        const student = students.find(s => s.id === sub.studentId);
                        return (
                            <div key={sub.id} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">{student?.name}</p>
                                        <p className="text-sm text-gray-500">Submitted: {new Date(sub.submittedAt).toLocaleString()}</p>
                                        <p className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">{sub.content}</p>
                                    </div>
                                    <div className="w-40">
                                        <label className="block text-sm font-medium text-gray-700 text-right">Grade / {selectedAssignment.maxGrade}</label>
                                        <input type="number" max={selectedAssignment.maxGrade} min={0} defaultValue={sub.grade ?? ''} onBlur={(e) => handleUpdateGrade(sub.id, e.target.value ? parseInt(e.target.value) : null)} className="mt-1 w-full p-2 border rounded-md text-center" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    switch(activeView) {
        case 'Dashboard': return <StaffDashboard students={students} submissions={submissions} />;
        case 'Courses': return <CourseManagementView courses={courses} setCourses={setCourses} students={students} onSelectCourse={setSelectedCourse} />;
        case 'Assignments': return <AssignmentManagementView assignments={assignments} setAssignments={setAssignments} courses={courses} onSelectAssignment={setSelectedAssignment} />;
        case 'Students':
        default:
            if (selectedStudent) {
                return (
                  <div>
                    <button onClick={() => setSelectedStudent(null)} className="mb-6 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition">&larr; Back to Student List</button>
                    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <div className="flex items-start justify-between">
                             <div className="flex items-center">
                                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-24 h-24 rounded-full mr-6" />
                                <div>
                                    <h2 className="text-3xl font-bold">{selectedStudent.name}</h2>
                                    <p className="text-gray-500">Reg No: {selectedStudent.registerNumber}</p>
                                    <div className="text-sm text-gray-600 mt-2">
                                        <p>{selectedStudent.department}</p>
                                        <p>{selectedStudent.gender} | {selectedStudent.mobileNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => alert(`Message feature coming soon!`)} className="bg-brand-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">Send Message</button>
                        </div>
                    </div>
                     <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Credit Coin Management</h3>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-600 mb-4">Current Balance: <span className="font-bold text-yellow-600">{selectedStudent.creditCoins} Coins</span></p>
                            <div className="flex items-center gap-2">
                                <input type="number" value={giftAmount} onChange={(e) => setGiftAmount(e.target.value)} placeholder="Amount" className="w-full p-2 border rounded-md" min="1" />
                                <button onClick={() => handleGiftCoins(selectedStudent.id)} className="bg-brand-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition whitespace-nowrap">Gift Coins</button>
                            </div>
                        </div>
                    </div>
                     <h3 className="text-lg font-semibold mb-2">Assignment Submissions & Grades</h3>
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <ul className="space-y-2">
                           {assignments.map(assignment => {
                               const submission = submissions.find(s => s.assignmentId === assignment.id && s.studentId === selectedStudent.id);
                               const course = courses.find(c => c.id === assignment.courseId);
                               return (
                                   <li key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                       <div>
                                            <p>{assignment.title} <span className="text-xs text-gray-500">({course?.title})</span></p>
                                            <p className={`text-xs ${submission ? 'text-green-600' : 'text-red-600'}`}>
                                                {submission ? `Submitted` : 'Awaiting Submission'}
                                            </p>
                                       </div>
                                       <p className={`font-semibold ${submission?.grade === null ? 'text-gray-400' : 'text-gray-800'}`}>
                                            {submission?.grade !== null && submission?.grade !== undefined ? `${submission.grade} / ${assignment.maxGrade}` : 'Not Graded'}
                                       </p>
                                   </li>
                               )
                           })}
                       </ul>
                     </div>
                  </div>
                );
            }
            return (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Student Roster</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                      <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white p-5 rounded-xl shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
                        <div className="flex items-center">
                          <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full mr-4" />
                          <div>
                            <h3 className="text-lg font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-500">{student.registerNumber}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
    }
  }

  return <div>{renderActiveView()}</div>;
};

export default StaffView;