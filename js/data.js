const DATA = {
  students: [
    { id: 'STU001', name: 'Sarah Ahmed', email: 's.ahmed@edu.com', courses: ['CS101','MATH201','PHY101','ENG301'], gpa: 3.7, avatar: 'SA', attendance: 92 },
    { id: 'STU002', name: 'Bilal Khan', email: 'b.khan@edu.com', courses: ['CS101','MATH201','CHEM101'], gpa: 3.2, avatar: 'BK', attendance: 78 },
    { id: 'STU003', name: 'Fatima Malik', email: 'f.malik@edu.com', courses: ['ENG301','HIST101','PHY101'], gpa: 3.9, avatar: 'FM', attendance: 96 },
    { id: 'STU004', name: 'Usman Raza', email: 'u.raza@edu.com', courses: ['CS101','CHEM101','HIST101'], gpa: 2.8, avatar: 'UR', attendance: 65 },
    { id: 'STU005', name: 'Ayesha Siddiqui', email: 'a.siddiqui@edu.com', courses: ['MATH201','ENG301','PHY101'], gpa: 3.5, avatar: 'AS', attendance: 88 },
    { id: 'STU006', name: 'Hassan Ali', email: 'h.ali@edu.com', courses: ['CS101','HIST101','CHEM101'], gpa: 3.1, avatar: 'HA', attendance: 74 },
    { id: 'STU007', name: 'Zara Hussain', email: 'z.hussain@edu.com', courses: ['MATH201','PHY101','ENG301'], gpa: 3.8, avatar: 'ZH', attendance: 90 },
    { id: 'STU008', name: 'Omar Sheikh', email: 'o.sheikh@edu.com', courses: ['CS101','CHEM101','MATH201'], gpa: 2.5, avatar: 'OS', attendance: 60 },
  ],
  teachers: [
    { id: 'TCH001', name: 'Dr. Nadia Iqbal', email: 'n.iqbal@edu.com', courses: ['CS101','MATH201'], avatar: 'NI', dept: 'Computer Science' },
    { id: 'TCH002', name: 'Prof. Kamran Baig', email: 'k.baig@edu.com', courses: ['PHY101','CHEM101'], avatar: 'KB', dept: 'Natural Sciences' },
    { id: 'TCH003', name: 'Ms. Lubna Farooq', email: 'l.farooq@edu.com', courses: ['ENG301','HIST101'], avatar: 'LF', dept: 'Humanities' },
  ],
  courses: [
    { id: 'CS101', name: 'Intro to CS', icon: '💻', teacher: 'Dr. Nadia Iqbal', enrolled: 6, credits: 3, color: 'blue' },
    { id: 'MATH201', name: 'Calculus II', icon: '📐', teacher: 'Dr. Nadia Iqbal', enrolled: 5, credits: 4, color: 'purple' },
    { id: 'PHY101', name: 'Physics I', icon: '⚗️', teacher: 'Prof. Kamran Baig', enrolled: 4, credits: 3, color: 'cyan' },
    { id: 'CHEM101', name: 'Chemistry', icon: '🧪', teacher: 'Prof. Kamran Baig', enrolled: 4, credits: 3, color: 'green' },
    { id: 'ENG301', name: 'English Lit', icon: '📚', teacher: 'Ms. Lubna Farooq', enrolled: 4, credits: 3, color: 'amber' },
    { id: 'HIST101', name: 'World History', icon: '🌍', teacher: 'Ms. Lubna Farooq', enrolled: 3, credits: 2, color: 'red' },
  ],
  assignments: [
    { id: 'A001', title: 'Binary Search Trees Lab', course: 'CS101', due: '2025-05-15', status: 'pending', maxScore: 100, submissions: 4 },
    { id: 'A002', title: 'Integration Techniques', course: 'MATH201', due: '2025-05-12', status: 'submitted', maxScore: 50, submissions: 3 },
    { id: 'A003', title: "Newton's Laws Problem Set", course: 'PHY101', due: '2025-05-20', status: 'pending', maxScore: 80, submissions: 2 },
    { id: 'A004', title: 'Organic Chemistry Report', course: 'CHEM101', due: '2025-05-10', status: 'graded', grade: 88, maxScore: 100, submissions: 4 },
    { id: 'A005', title: 'Shakespeare Analysis Essay', course: 'ENG301', due: '2025-05-18', status: 'pending', maxScore: 100, submissions: 1 },
    { id: 'A006', title: 'Industrial Revolution Timeline', course: 'HIST101', due: '2025-05-08', status: 'graded', grade: 72, maxScore: 100, submissions: 3 },
    { id: 'A007', title: 'Sorting Algorithms Quiz', course: 'CS101', due: '2025-05-22', status: 'pending', maxScore: 30, submissions: 0 },
    { id: 'A008', title: 'Differential Equations', course: 'MATH201', due: '2025-05-25', status: 'pending', maxScore: 60, submissions: 0 },
  ],
  grades: {
    'STU001': { CS101: 92, MATH201: 87, PHY101: 91, ENG301: 95 },
    'STU002': { CS101: 78, MATH201: 82, CHEM101: 71 },
    'STU003': { ENG301: 98, HIST101: 94, PHY101: 96 },
    'STU004': { CS101: 65, CHEM101: 70, HIST101: 68 },
    'STU005': { MATH201: 88, ENG301: 85, PHY101: 90 },
    'STU006': { CS101: 76, HIST101: 80, CHEM101: 72 },
    'STU007': { MATH201: 93, PHY101: 89, ENG301: 91 },
    'STU008': { CS101: 58, CHEM101: 62, MATH201: 60 },
  },
  notifications: [
    { id: 1, type: 'assignment', text: 'Assignment "Binary Search Trees Lab" is due in 3 days', time: '2 hours ago', unread: true, color: 'amber' },
    { id: 2, type: 'grade', text: 'Your Chemistry Report has been graded: 88/100', time: 'Yesterday', unread: true, color: 'green' },
    { id: 3, type: 'announce', text: 'Mid-term exams scheduled for May 28-June 3', time: '2 days ago', unread: true, color: 'blue' },
    { id: 4, type: 'assign', text: 'New assignment posted: "Shakespeare Analysis Essay"', time: '3 days ago', unread: false, color: 'purple' },
    { id: 5, type: 'attend', text: 'Your attendance is below 75% in HIST101', time: '4 days ago', unread: false, color: 'red' },
  ],
  announcements: [
    { title: 'Mid-Term Examination Schedule', body: 'Mid-term exams are scheduled from May 28 to June 3. Please check the academic calendar for your individual exam times.', author: 'Admin Office', date: 'May 5, 2025', tag: 'Important' },
    { title: 'Library Extended Hours', body: 'The library will remain open 24 hours during exam week.', author: 'Library Dept', date: 'May 4, 2025', tag: 'Info' },
    { title: 'New Online Resources Available', body: 'Access to IEEE Xplore and JSTOR has been extended.', author: 'IT Department', date: 'May 2, 2025', tag: 'Resource' },
  ]
};

let currentRole = 'student';
let state = {
  users: [...DATA.students, ...DATA.teachers],
  courses: [...DATA.courses],
  assignments: [...DATA.assignments]
};
let submittedAssigns = new Set(['A002', 'A004', 'A006']);
let notifCount = 3;