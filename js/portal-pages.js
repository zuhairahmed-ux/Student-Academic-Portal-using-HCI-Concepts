function setupPortal() {
  const navs = {
    student: [
      { icon: '🏠', label: 'Dashboard', page: 's-dashboard' },
      { icon: '📋', label: 'Assignments', page: 's-assignments', badge: notifCount },
      { icon: '📊', label: 'My Grades', page: 's-grades' },
      { icon: '📅', label: 'Attendance', page: 's-attendance' },
      { icon: '📁', label: 'Materials', page: 's-materials' },
      { icon: '🔔', label: 'Notifications', page: 's-notifications', badge: 3 },
    ],
    teacher: [
      { icon: '🏠', label: 'Dashboard', page: 't-dashboard' },
      { icon: '📝', label: 'Assignments', page: 't-assignments' },
      { icon: '✅', label: 'Grade Students', page: 't-grade' },
      { icon: '📅', label: 'Attendance', page: 't-attendance' },
      { icon: '📊', label: 'Class Performance', page: 't-performance' },
    ],
    admin: [
      { icon: '🏠', label: 'Dashboard', page: 'a-dashboard' },
      { icon: '👥', label: 'Manage Users', page: 'a-users' },
      { icon: '📚', label: 'Manage Courses', page: 'a-courses' },
      { icon: '📊', label: 'Analytics', page: 'a-analytics' },
      { icon: '📢', label: 'Announcements', page: 'a-announce' },
    ]
  };
  const userInfo = {
    student: { name: 'Sarah Ahmed', role: 'Student', avatar: 'SA', cls: '' },
    teacher: { name: 'Dr. Nadia Iqbal', role: 'Teacher', avatar: 'NI', cls: 'green' },
    admin: { name: 'Admin Office', role: 'Administrator', avatar: 'AO', cls: 'amber' },
  };
  const u = userInfo[currentRole];
  document.getElementById('sb-name').textContent = u.name;
  document.getElementById('sb-role').textContent = u.role;
  const av = document.getElementById('sb-avatar');
  av.textContent = u.avatar;
  av.className = 'avatar' + (u.cls ? ' ' + u.cls : '');
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '<div class="nav-section">Navigation</div>' +
    navs[currentRole].map(n => 
      `<div class="nav-item" onclick="showPage('${n.page}')" id="nav-${n.page}">
        <span class="nav-icon">${n.icon}</span>${n.label}${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
      </div>`
    ).join('');
  document.getElementById('main-content').innerHTML = buildPages();
  showPage(navs[currentRole][0].page);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');
  document.getElementById('nav-' + id)?.classList.add('active');
}

function buildPages() {
  return [
    buildStudentDashboard(), buildStudentAssignments(), buildStudentGrades(),
    buildStudentAttendance(), buildStudentMaterials(), buildStudentNotifications(),
    buildTeacherDashboard(), buildTeacherAssignments(), buildTeacherGrade(),
    buildTeacherAttendance(), buildTeacherPerformance(),
    buildAdminDashboard(), buildAdminUsers(), buildAdminCourses(), buildAdminAnalytics(),
    buildAdminAnnouncements()
  ].join('');
}

// ===== STUDENT PAGES =====
function buildStudentDashboard() {
  const grades = DATA.grades['STU001'];
  const avgGrade = Math.round(Object.values(grades).reduce((a,b) => a+b, 0) / Object.values(grades).length);
  const upcoming = DATA.assignments.filter(a => a.status === 'pending').slice(0,3);
  return `<div class="page" id="page-s-dashboard">
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div><div class="page-title">Good morning, Sarah 👋</div><div class="page-sub">Here's your academic overview for today</div></div>
        <div class="dark-toggle" onclick="toggleDark(this)"><div class="toggle-switch" id="dark-sw"><div class="toggle-knob"></div></div><span>Dark</span></div>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">GPA</div><div class="stat-value blue">3.7</div><div class="stat-delta up">↑ 0.2 this semester</div></div>
      <div class="stat-card green"><div class="stat-label">Attendance</div><div class="stat-value green">92%</div><div class="stat-delta up">↑ On track</div></div>
      <div class="stat-card amber"><div class="stat-label">Pending</div><div class="stat-value amber">5</div><div class="stat-delta">assignments due</div></div>
      <div class="stat-card purple"><div class="stat-label">Avg Grade</div><div class="stat-value purple">${avgGrade}%</div><div class="stat-delta up">↑ Great standing</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><div class="section-title">Upcoming Deadlines</div><span class="section-action" onclick="showPage('s-assignments')">View all →</span></div>
        ${upcoming.map(a => {
          const d = Math.round((new Date(a.due) - new Date()) / 86400000);
          const u = d <= 3 ? 'urgent' : d <= 7 ? 'soon' : 'ok';
          return `<div class="assign-item"><div class="assign-icon" style="background:var(--bg4)">${DATA.courses.find(c=>c.id===a.course)?.icon||'📄'}</div><div><div class="assign-title">${a.title}</div><div class="assign-meta"><span>${a.course}</span><span>${a.maxScore} pts</span></div></div><div class="assign-right"><div class="deadline ${u}">${d<=0?'Overdue':d+'d left'}</div></div></div>`;
        }).join('')}
      </div>
      <div class="card">
        <div class="section-header"><div class="section-title">Grade Overview</div><span class="section-action" onclick="showPage('s-grades')">Details →</span></div>
        ${Object.entries(grades).map(([cid, g]) => {
          const course = DATA.courses.find(c => c.id === cid);
          const bc = g >= 90 ? 'pb-green' : g >= 75 ? 'pb-blue' : 'pb-amber';
          return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><span style="font-size:13px">${course?.icon||'📚'} ${course?.name||cid}</span><span style="font-size:13px;font-weight:600;color:${g>=90?'var(--green)':g>=75?'var(--accent)':'var(--amber)'}">${g}%</span></div><div class="progress-wrap"><div class="progress-bar ${bc}" style="width:${g}%"></div></div></div>`;
        }).join('')}
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="section-header"><div class="section-title">Latest Announcements</div></div>
      ${DATA.announcements.slice(0,2).map(a => `<div class="announce-card"><div class="announce-title">${a.title}</div><div class="announce-body">${a.body}</div><div class="announce-footer"><span>By ${a.author}</span><span>${a.date}</span><span class="badge badge-blue">${a.tag}</span></div></div>`).join('')}
    </div>
  </div>`;
}

function buildStudentAssignments() {
  return `<div class="page" id="page-s-assignments">
    <div class="page-header"><div class="page-title">My Assignments</div><div class="page-sub">Track and submit your coursework</div></div>
    <div class="tabs">
      <div class="tab active" onclick="filterAssign('all',this)">All</div>
      <div class="tab" onclick="filterAssign('pending',this)">Pending</div>
      <div class="tab" onclick="filterAssign('submitted',this)">Submitted</div>
      <div class="tab" onclick="filterAssign('graded',this)">Graded</div>
    </div>
    <div class="card"><div id="assign-list">${DATA.assignments.map(a => buildAssignCard(a)).join('')}</div></div>
  </div>`;
}

function buildAssignCard(a) {
  const course = DATA.courses.find(c => c.id === a.course);
  const daysLeft = Math.round((new Date(a.due) - new Date()) / 86400000);
  const status = submittedAssigns.has(a.id) ? 'submitted' : a.status;
  const statusBadge = status === 'graded' ? 'badge-green' : status === 'submitted' ? 'badge-blue' : 'badge-amber';
  const statusText = status === 'graded' ? 'Graded' : status === 'submitted' ? 'Submitted' : 'Pending';
  return `<div class="assign-item" id="acard-${a.id}" data-status="${status}">
    <div class="assign-icon" style="background:var(--bg4)">${course?.icon||'📄'}</div>
    <div style="flex:1"><div class="assign-title">${a.title}</div><div class="assign-meta"><span>${a.course}</span><span>Max: ${a.maxScore} pts</span>${status==='graded'?`<span style="color:var(--green)">Score: ${a.grade}/${a.maxScore}</span>`:''}</div><div style="margin-top:4px"><span class="badge ${statusBadge}">${statusText}</span></div></div>
    <div class="assign-right"><div class="deadline ${daysLeft<=3&&status==='pending'?'urgent':daysLeft<=7?'soon':'ok'}" style="margin-bottom:8px">${daysLeft<0?'Overdue':daysLeft===0?'Due today':daysLeft+'d left'}</div>${status==='pending'?`<button class="btn btn-primary btn-sm" onclick="submitAssignment('${a.id}')">Submit</button>`:status==='submitted'?`<span style="font-size:11px;color:var(--text3)">Awaiting grade</span>`:`<span class="badge badge-green">${a.grade}%</span>`}</div>
  </div>`;
}

function buildStudentGrades() {
  const grades = DATA.grades['STU001'];
  return `<div class="page" id="page-s-grades">
    <div class="page-header"><div class="page-title">My Grades</div><div class="page-sub">Academic performance overview</div></div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">Current GPA</div><div class="stat-value blue">3.7</div></div>
      <div class="stat-card green"><div class="stat-label">Highest Grade</div><div class="stat-value green">95%</div><div class="stat-delta">English Lit</div></div>
      <div class="stat-card purple"><div class="stat-label">Credits Earned</div><div class="stat-value purple">42</div></div>
    </div>
    <div class="card">
      <div class="section-header"><div class="section-title">Course Grades</div></div>
      <div class="table-wrap"><table><thead><tr><th>Course</th><th>Code</th><th>Grade</th><th>Credits</th><th>Status</th><th>Letter</th></tr></thead><tbody>
      ${Object.entries(grades).map(([cid,g]) => {
        const course = DATA.courses.find(c=>c.id===cid);
        const letter = g>=93?'A':g>=90?'A-':g>=87?'B+':g>=83?'B':g>=80?'B-':g>=75?'C+':'C';
        const bc = g>=90?'badge-green':g>=75?'badge-blue':'badge-amber';
        return `<tr><td>${course?.icon||'📚'} ${course?.name||cid}</td><td><span class="chip">${cid}</span></td><td><div style="display:flex;align-items:center;gap:8px"><div class="progress-wrap" style="width:80px"><div class="progress-bar ${g>=90?'pb-green':g>=75?'pb-blue':'pb-amber'}" style="width:${g}%"></div></div><span style="font-size:13px;font-weight:600">${g}%</span></div></td><td>${course?.credits||3}</td><td><span class="badge badge-green">In Progress</span></td><td><span class="badge ${bc}">${letter}</span></td></tr>`;
      }).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function buildStudentAttendance() {
  let records = [];
  for (let w = 0; w < 10; w++) {
    for (let d = 0; d < 5; d++) {
      const r = Math.random();
      records.push(r > 0.1 ? 'present' : r > 0.05 ? 'late' : 'absent');
    }
  }
  const pc = records.filter(r => r === 'present').length;
  const pct = Math.round(pc / records.length * 100);
  return `<div class="page" id="page-s-attendance">
    <div class="page-header"><div class="page-title">Attendance Record</div><div class="page-sub">Track your class attendance</div></div>
    <div class="stats-row">
      <div class="stat-card green"><div class="stat-label">Overall</div><div class="stat-value green">${pct}%</div></div>
      <div class="stat-card blue"><div class="stat-label">Present</div><div class="stat-value blue">${pc}</div><div class="stat-delta">days</div></div>
      <div class="stat-card red"><div class="stat-label">Absent</div><div class="stat-value" style="color:var(--red)">${records.filter(r=>r==='absent').length}</div></div>
      <div class="stat-card amber"><div class="stat-label">Late</div><div class="stat-value amber">${records.filter(r=>r==='late').length}</div></div>
    </div>
    <div class="card">
      <div class="section-header"><div class="section-title">Attendance Heatmap — Last 10 Weeks</div></div>
      <div class="att-row">${records.map(r => `<div class="att-day ${r}" title="${r}"></div>`).join('')}</div>
      <div style="display:flex;gap:14px;margin-top:10px">
        <div style="display:flex;align-items:center;gap:4px"><div class="att-day present"></div><span style="font-size:11px;color:var(--text3)">Present</span></div>
        <div style="display:flex;align-items:center;gap:4px"><div class="att-day absent"></div><span style="font-size:11px;color:var(--text3)">Absent</span></div>
        <div style="display:flex;align-items:center;gap:4px"><div class="att-day late"></div><span style="font-size:11px;color:var(--text3)">Late</span></div>
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="section-header"><div class="section-title">By Course</div></div>
      <table><thead><tr><th>Course</th><th>Attended</th><th>Total</th><th>Percentage</th></tr></thead><tbody>
      ${DATA.courses.slice(0,4).map(c => {
        const att = Math.round(60 + Math.random()*35);
        const tot = 70;
        const p2 = Math.round(att/tot*100);
        return `<tr><td>${c.icon} ${c.name}</td><td>${att}</td><td>${tot}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="progress-wrap" style="width:80px"><div class="progress-bar ${p2>=75?'pb-green':'pb-amber'}" style="width:${p2}%"></div></div><span style="font-size:12px;font-weight:600;color:${p2>=75?'var(--green)':'var(--amber)'}">${p2}%</span></div></td></tr>`;
      }).join('')}
      </tbody></table>
    </div>
  </div>`;
}

function buildStudentMaterials() {
  const materials = [
    { title:'Data Structures Lecture Notes', course:'CS101', type:'PDF', size:'2.4 MB', date:'May 3' },
    { title:'Integration Techniques Slides', course:'MATH201', type:'PPTX', size:'5.1 MB', date:'May 1' },
    { title:"Newton's Laws Worksheet", course:'PHY101', type:'PDF', size:'1.2 MB', date:'Apr 29' },
    { title:'Organic Chemistry Reference', course:'CHEM101', type:'PDF', size:'3.8 MB', date:'Apr 28' },
    { title:'Shakespeare: A Study Guide', course:'ENG301', type:'DOCX', size:'800 KB', date:'Apr 25' },
    { title:'Industrial Revolution Notes', course:'HIST101', type:'PDF', size:'1.9 MB', date:'Apr 22' },
  ];
  return `<div class="page" id="page-s-materials">
    <div class="page-header"><div class="page-title">Course Materials</div><div class="page-sub">Download resources shared by your teachers</div></div>
    <div class="search-bar"><span class="s-icon">🔍</span><input placeholder="Search materials..." oninput="searchMat(this.value)"></div>
    <div class="filter-row">
      <div class="filter-btn active" onclick="setFilter(this,'all')">All Courses</div>
      ${DATA.courses.slice(0,4).map(c => `<div class="filter-btn" onclick="setFilter(this,'${c.id}')">${c.icon} ${c.id}</div>`).join('')}
    </div>
    <div class="card" id="mat-list">
      ${materials.map(m => {
        const course = DATA.courses.find(c => c.id === m.course);
        const tc = {'PDF':'red','PPTX':'amber','DOCX':'blue'}[m.type] || 'purple';
        return `<div class="assign-item"><div class="assign-icon" style="background:var(--bg4)">📄</div><div style="flex:1"><div class="assign-title">${m.title}</div><div class="assign-meta"><span>${course?.icon||''} ${m.course}</span><span>${m.size}</span><span>${m.date}</span></div></div><div style="display:flex;align-items:center;gap:8px"><span class="badge badge-${tc}">${m.type}</span><button class="btn btn-outline btn-sm" onclick="showToast('Downloading...','info')">⬇ Download</button></div></div>`;
      }).join('')}
    </div>
  </div>`;
}

function buildStudentNotifications() {
  return `<div class="page" id="page-s-notifications">
    <div class="page-header"><div class="page-title">Notifications</div><div class="page-sub">Stay updated with latest activity</div></div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:14px"><button class="btn btn-outline btn-sm" onclick="markAllRead()">Mark all read</button></div>
    <div id="notif-list">${DATA.notifications.map(n => `<div class="notif-item ${n.unread?'unread':''}" id="notif-${n.id}" onclick="readNotif(${n.id})"><div class="notif-dot ${n.color}"></div><div style="flex:1"><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>${n.unread?'<span style="font-size:10px;color:var(--accent)">NEW</span>':''}</div>`).join('')}</div>
  </div>`;
}

// ===== TEACHER PAGES =====
function buildTeacherDashboard() {
  return `<div class="page" id="page-t-dashboard">
    <div class="page-header"><div class="page-title">Teacher Dashboard</div><div class="page-sub">Dr. Nadia Iqbal — Computer Science & Mathematics</div></div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">My Courses</div><div class="stat-value blue">2</div></div>
      <div class="stat-card green"><div class="stat-label">Total Students</div><div class="stat-value green">11</div></div>
      <div class="stat-card amber"><div class="stat-label">Pending Reviews</div><div class="stat-value amber">4</div><div class="stat-delta">submissions</div></div>
      <div class="stat-card purple"><div class="stat-label">Avg Class Score</div><div class="stat-value purple">79%</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><div class="section-title">My Courses</div></div>
        ${DATA.courses.slice(0,2).map(c => `<div class="course-card" style="margin-bottom:10px" onclick="showPage('t-assignments')"><div style="display:flex;align-items:center;gap:10px"><div class="assign-icon" style="background:var(--bg4);width:40px;height:40px">${c.icon}</div><div style="flex:1"><div class="course-name">${c.name}</div><div class="course-meta">${c.enrolled} students · ${c.credits} credits</div></div><span class="badge badge-green">${c.credits} cr</span></div><div class="progress-wrap" style="margin-top:10px"><div class="progress-bar pb-blue" style="width:70%"></div></div><div style="font-size:11px;color:var(--text3);margin-top:4px">Semester progress: 70%</div></div>`).join('')}
      </div>
      <div class="card">
        <div class="section-header"><div class="section-title">Recent Submissions</div></div>
        ${DATA.assignments.filter(a => a.submissions>0).slice(0,4).map(a => `<div class="assign-item"><div style="flex:1"><div class="assign-title" style="font-size:13px">${a.title}</div><div class="assign-meta">${a.course} · ${a.submissions} submission${a.submissions>1?'s':''}</div></div><button class="btn btn-primary btn-sm" onclick="showPage('t-grade')">Grade</button></div>`).join('')}
      </div>
    </div>
  </div>`;
}

function buildTeacherAssignments() {
  return `<div class="page" id="page-t-assignments">
    <div class="page-header"><div class="page-title">Assignments</div><div class="page-sub">Manage and publish assignments</div></div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:16px"><button class="btn btn-primary" onclick="openNewAssignment()">+ New Assignment</button></div>
    <div class="card"><table><thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>Max Score</th><th>Submissions</th><th>Actions</th></tr></thead><tbody id="assign-table">
    ${state.assignments.map(a => buildAssignRow(a)).join('')}
    </tbody></table></div>
  </div>`;
}

function buildAssignRow(a) {
  return `<tr id="arow-${a.id}"><td><span style="font-weight:500">${a.title}</span></td><td><span class="chip">${a.course}</span></td><td>${a.due}</td><td>${a.maxScore}</td><td><span class="badge badge-blue">${a.submissions}</span></td><td><div style="display:flex;gap:6px"><button class="btn btn-outline btn-sm" onclick="showToast('Edit mode','info')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteAssign('${a.id}')">Delete</button></div></td></tr>`;
}

function openNewAssignment() {
  openModal('New Assignment',
    `<div class="form-group-portal"><label class="form-label-portal">Title</label><input class="form-input-portal" id="na-title" placeholder="Assignment title..."></div>
     <div class="form-row">
       <div class="form-group-portal"><label class="form-label-portal">Course</label><select class="form-input-portal form-select" id="na-course">${DATA.courses.slice(0,2).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
       <div class="form-group-portal"><label class="form-label-portal">Due Date</label><input type="date" class="form-input-portal" id="na-due"></div>
     </div>
     <div class="form-row">
       <div class="form-group-portal"><label class="form-label-portal">Max Score</label><input type="number" class="form-input-portal" id="na-score" placeholder="100"></div>
       <div class="form-group-portal"><label class="form-label-portal">Type</label><select class="form-input-portal form-select"><option>Assignment</option><option>Quiz</option><option>Project</option></select></div>
     </div>
     <div class="form-group-portal"><label class="form-label-portal">Instructions</label><textarea class="form-input-portal form-textarea" placeholder="Describe the assignment..."></textarea></div>
     <div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveAssignment()">Publish Assignment</button></div>`
  );
}

function saveAssignment() {
  const title = document.getElementById('na-title').value;
  if (!title) { showToast('Please enter a title', 'error'); return; }
  const newA = {
    id: 'A' + Date.now(),
    title,
    course: document.getElementById('na-course').value,
    due: document.getElementById('na-due').value || '2025-06-01',
    status: 'pending',
    maxScore: parseInt(document.getElementById('na-score').value) || 100,
    submissions: 0
  };
  state.assignments.push(newA);
  const tbody = document.getElementById('assign-table');
  if (tbody) tbody.insertAdjacentHTML('beforeend', buildAssignRow(newA));
  closeModal();
  showToast('Assignment published!', 'success');
}

function deleteAssign(id) {
  showConfirm('Delete Assignment', 'This will permanently remove the assignment and all submissions.', () => {
    document.getElementById('arow-' + id)?.remove();
    showToast('Assignment deleted', 'error');
  });
}

function buildTeacherGrade() {
  const subs = [
    { student: 'Bilal Khan', assign: 'Integration Techniques', course: 'MATH201', submitted: 'May 10', file: 'calculus_bilal.pdf' },
    { student: 'Ayesha Siddiqui', assign: 'Integration Techniques', course: 'MATH201', submitted: 'May 11', file: 'integration_ayesha.pdf' },
    { student: 'Zara Hussain', assign: 'Integration Techniques', course: 'MATH201', submitted: 'May 11', file: 'math_zara.pdf' },
    { student: 'Omar Sheikh', assign: 'Binary Search Trees Lab', course: 'CS101', submitted: 'May 9', file: 'bst_omar.zip' },
  ];
  return `<div class="page" id="page-t-grade">
    <div class="page-header"><div class="page-title">Grade Submissions</div><div class="page-sub">Review and grade student work</div></div>
    <div class="card">
      ${subs.map((s,i) => `<div class="assign-item" id="sub-${i}"><div class="avatar" style="background:linear-gradient(135deg,var(--accent),var(--purple));width:36px;height:36px;font-size:12px">${s.student.split(' ').map(n=>n[0]).join('')}</div><div style="flex:1"><div class="assign-title">${s.student}</div><div class="assign-meta"><span>${s.assign}</span><span>${s.course}</span><span>Submitted: ${s.submitted}</span></div><div style="margin-top:4px"><span class="chip">📄 ${s.file}</span></div></div><div style="display:flex;gap:8px;align-items:center"><input type="number" class="form-input-portal" style="width:70px" placeholder="Score" id="score-${i}" min="0" max="100"><button class="btn btn-success btn-sm" onclick="submitGrade(${i})">Save Grade</button></div></div>`).join('')}
    </div>
  </div>`;
}

function submitGrade(i) {
  const score = document.getElementById('score-' + i).value;
  if (!score) { showToast('Please enter a score', 'error'); return; }
  const row = document.getElementById('sub-' + i);
  if (row) row.style.opacity = '0.4';
  showToast(`Grade ${score}/100 saved!`, 'success');
}

function buildTeacherAttendance() {
  const students = DATA.students.slice(0,6);
  return `<div class="page" id="page-t-attendance">
    <div class="page-header"><div class="page-title">Mark Attendance</div><div class="page-sub">CS101 — Today, May 11, 2025</div></div>
    <div style="display:flex;gap:8px;margin-bottom:16px">
      <select class="form-input-portal form-select" style="width:200px"><option>CS101 — Intro to CS</option><option>MATH201 — Calculus II</option></select>
      <input type="date" class="form-input-portal" style="width:160px" value="2025-05-11">
      <button class="btn btn-outline" onclick="markAll('P')">Mark All Present</button>
    </div>
    <div class="card"><table><thead><tr><th>Student</th><th>ID</th><th>Status</th><th>Note</th></tr></thead><tbody>
    ${students.map((s,i) => `<tr><td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:28px;height:28px;font-size:10px">${s.avatar}</div>${s.name}</div></td><td><span class="chip">${s.id}</span></td><td><div style="display:flex;gap:4px"><button class="btn btn-sm btn-success att-status-btn" id="att-p-${i}" onclick="setAtt(${i},'P')" style="padding:4px 10px">P</button><button class="btn btn-sm btn-outline att-status-btn" id="att-a-${i}" onclick="setAtt(${i},'A')">A</button><button class="btn btn-sm btn-outline att-status-btn" id="att-l-${i}" onclick="setAtt(${i},'L')" style="color:var(--amber)">L</button></div></td><td><input class="form-input-portal" style="height:28px;font-size:12px" placeholder="Optional note..."></td></tr>`).join('')}
    </tbody></table><div style="margin-top:14px;display:flex;justify-content:flex-end"><button class="btn btn-primary" onclick="saveAttendance()">Save Attendance</button></div></div>
  </div>`;
}

function buildTeacherPerformance() {
  const perf = DATA.students.slice(0,6).map(s => {
    const g = DATA.grades[s.id];
    const avg = g ? Math.round(Object.values(g).reduce((a,b) => a+b, 0) / Object.values(g).length) : 0;
    return { name: s.name, avg, attendance: s.attendance };
  }).sort((a,b) => b.avg - a.avg);
  return `<div class="page" id="page-t-performance">
    <div class="page-header"><div class="page-title">Class Performance</div><div class="page-sub">Overview of student performance in your courses</div></div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">Class Average</div><div class="stat-value blue">79%</div></div>
      <div class="stat-card green"><div class="stat-label">Passing Students</div><div class="stat-value green">5/6</div></div>
      <div class="stat-card red"><div class="stat-label">At Risk</div><div class="stat-value" style="color:var(--red)">1</div><div class="stat-delta">below 70%</div></div>
    </div>
    <div class="card"><div class="section-header"><div class="section-title">Student Rankings</div></div>
    ${perf.map((s,i) => `<div class="perf-row"><span style="font-size:13px;color:var(--text3);font-weight:600;width:24px">#${i+1}</span><span class="perf-name">${s.name}</span><div style="flex:1;margin:0 12px"><div class="progress-wrap"><div class="progress-bar ${s.avg>=85?'pb-green':s.avg>=70?'pb-blue':'pb-red'}" style="width:${s.avg}%"></div></div></div><span class="perf-score" style="color:${s.avg>=85?'var(--green)':s.avg>=70?'var(--accent)':'var(--red)'}">${s.avg}%</span><span style="font-size:11px;color:var(--text3);width:60px;text-align:right">${s.attendance}% att</span></div>`).join('')}
    </div>
  </div>`;
}

// ===== ADMIN PAGES =====
function buildAdminDashboard() {
  return `<div class="page" id="page-a-dashboard">
    <div class="page-header"><div class="page-title">Admin Dashboard</div><div class="page-sub">System overview and quick actions</div></div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">Total Students</div><div class="stat-value blue">${DATA.students.length}</div><div class="stat-delta up">↑ 2 this week</div></div>
      <div class="stat-card green"><div class="stat-label">Teachers</div><div class="stat-value green">${DATA.teachers.length}</div></div>
      <div class="stat-card purple"><div class="stat-label">Courses</div><div class="stat-value purple">${DATA.courses.length}</div></div>
      <div class="stat-card amber"><div class="stat-label">Assignments</div><div class="stat-value amber">${DATA.assignments.length}</div></div>
      <div class="stat-card cyan"><div class="stat-label">Avg GPA</div><div class="stat-value cyan">3.2</div></div>
    </div>
    <div class="grid-2">
      <div class="card"><div class="section-header"><div class="section-title">Quick Actions</div></div><div class="grid-2" style="gap:8px"><button class="btn btn-primary" style="justify-content:center" onclick="showPage('a-users')">+ Add User</button><button class="btn btn-outline" style="justify-content:center" onclick="showPage('a-courses')">+ Add Course</button><button class="btn btn-outline" style="justify-content:center" onclick="showPage('a-announce')">📢 Announce</button><button class="btn btn-outline" style="justify-content:center" onclick="showPage('a-analytics')">📊 Analytics</button></div></div>
      <div class="card"><div class="section-header"><div class="section-title">System Alerts</div></div>
        <div class="notif-item unread"><div class="notif-dot red"></div><div><div class="notif-text">4 students have attendance below 70%</div><div class="notif-time">Today</div></div></div>
        <div class="notif-item unread"><div class="notif-dot amber"></div><div><div class="notif-text">Mid-term grades pending for 3 courses</div><div class="notif-time">2 days ago</div></div></div>
        <div class="notif-item"><div class="notif-dot green"></div><div><div class="notif-text">Course enrollment closed successfully</div><div class="notif-time">3 days ago</div></div></div>
      </div>
    </div>
  </div>`;
}

function buildAdminUsers() {
  const allUsers = [...DATA.students.map(s => ({...s, type:'Student'})), ...DATA.teachers.map(t => ({...t, type:'Teacher'}))];
  return `<div class="page" id="page-a-users">
    <div class="page-header"><div class="page-title">Manage Users</div><div class="page-sub">Students and teachers enrolled in the system</div></div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div class="tabs" style="flex:1;margin-right:12px;margin-bottom:0"><div class="tab active" onclick="filterUsers('all',this)">All</div><div class="tab" onclick="filterUsers('Student',this)">Students</div><div class="tab" onclick="filterUsers('Teacher',this)">Teachers</div></div>
      <button class="btn btn-primary" onclick="openAddUser()">+ Add User</button>
    </div>
    <div class="search-bar"><span class="s-icon">🔍</span><input placeholder="Search by name or ID..." oninput="searchUsers(this.value)"></div>
    <div class="card"><div class="table-wrap"><table><thead><tr><th>Name</th><th>ID</th><th>Email</th><th>Type</th><th>Courses</th><th>Actions</th></tr></thead><tbody id="users-table">
    ${allUsers.map(u => `<tr class="user-row" data-type="${u.type}"><td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:28px;height:28px;font-size:10px">${u.avatar}</div>${u.name}</div></td><td><span class="chip">${u.id}</span></td><td style="font-size:12px;color:var(--text2)">${u.email}</td><td><span class="badge ${u.type==='Teacher'?'badge-purple':'badge-blue'}">${u.type}</span></td><td>${(u.courses||[]).length} courses</td><td><div style="display:flex;gap:6px"><button class="btn btn-outline btn-sm" onclick="showToast('Edit user','info')">Edit</button><button class="btn btn-danger btn-sm" onclick="showConfirm('Remove User','This will remove the user from the system.',()=>showToast('User removed','error'))">Remove</button></div></td></tr>`).join('')}
    </tbody></table></div></div>
  </div>`;
}

function filterUsers(type, el) {
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.user-row').forEach(r => {
    r.style.display = (type === 'all' || r.dataset.type === type) ? 'table-row' : 'none';
  });
}

function searchUsers(val) {
  document.querySelectorAll('.user-row').forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(val.toLowerCase()) ? 'table-row' : 'none';
  });
}

function openAddUser() {
  openModal('Add New User',
    `<div class="form-row">
      <div class="form-group-portal"><label class="form-label-portal">First Name</label><input class="form-input-portal" placeholder="First name"></div>
      <div class="form-group-portal"><label class="form-label-portal">Last Name</label><input class="form-input-portal" placeholder="Last name"></div>
     </div>
     <div class="form-group-portal"><label class="form-label-portal">Email</label><input type="email" class="form-input-portal" placeholder="user@edu.com"></div>
     <div class="form-row">
       <div class="form-group-portal"><label class="form-label-portal">Role</label><select class="form-input-portal form-select"><option>Student</option><option>Teacher</option></select></div>
       <div class="form-group-portal"><label class="form-label-portal">Department</label><select class="form-input-portal form-select"><option>Computer Science</option><option>Mathematics</option><option>Sciences</option><option>Humanities</option></select></div>
     </div>
     <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="closeModal();showToast('User added successfully!','success')">Add User</button></div>`
  );
}

function buildAdminCourses() {
  return `<div class="page" id="page-a-courses">
    <div class="page-header"><div class="page-title">Course Management</div><div class="page-sub">Manage courses and enrollments</div></div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:14px"><button class="btn btn-primary" onclick="openAddCourse()">+ New Course</button></div>
    <div class="grid-auto">
    ${DATA.courses.map(c => `<div class="course-card"><div class="course-icon" style="background:var(--bg4)">${c.icon}</div><div class="course-name">${c.name}</div><div class="course-meta">${c.id} · ${c.credits} credits</div><div style="font-size:12px;color:var(--text2);margin-bottom:10px">👩‍🏫 ${c.teacher}</div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><span style="font-size:12px;color:var(--text3)">Enrolled</span><span class="badge badge-blue">${c.enrolled} students</span></div><div class="progress-wrap"><div class="progress-bar pb-blue" style="width:${Math.round(c.enrolled/10*100)}%"></div></div><div style="display:flex;gap:6px;margin-top:12px"><button class="btn btn-outline btn-sm" style="flex:1" onclick="showToast('View enrollments','info')">Enrollments</button><button class="btn btn-danger btn-sm" onclick="showConfirm('Archive Course','Archive this course?',()=>showToast('Course archived','info'))">Archive</button></div></div>`).join('')}
    </div>
  </div>`;
}

function openAddCourse() {
  openModal('Add New Course',
    `<div class="form-group-portal"><label class="form-label-portal">Course Name</label><input class="form-input-portal" placeholder="e.g., Advanced Algorithms"></div>
     <div class="form-row">
       <div class="form-group-portal"><label class="form-label-portal">Course Code</label><input class="form-input-portal" placeholder="CS301"></div>
       <div class="form-group-portal"><label class="form-label-portal">Credits</label><select class="form-input-portal form-select"><option>2</option><option>3</option><option>4</option></select></div>
     </div>
     <div class="form-group-portal"><label class="form-label-portal">Assign Teacher</label><select class="form-input-portal form-select">${DATA.teachers.map(t => `<option>${t.name}</option>`).join('')}</select></div>
     <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="closeModal();showToast('Course created!','success')">Create Course</button></div>`
  );
}

function buildAdminAnalytics() {
  const scores = [65,78,82,88,74,91,85,69,95,77];
  const avgAll = Math.round(scores.reduce((a,b) => a+b, 0) / scores.length);
  const bars = scores.map((s,i) => {
    const h = Math.round(s * 0.8);
    const color = s >= 85 ? 'var(--green)' : s >= 70 ? 'var(--accent)' : 'var(--amber)';
    return `<div class="bar-col"><span class="bar-val" style="color:${color};font-size:9px">${s}%</span><div class="bar" style="height:${h}px;background:${color}"></div><span class="bar-label">S${i+1}</span></div>`;
  }).join('');
  const attBars = DATA.students.map(s => {
    const h = Math.round(s.attendance * 0.8);
    const color = s.attendance >= 85 ? 'var(--green)' : s.attendance >= 70 ? 'var(--accent)' : 'var(--red)';
    return `<div class="bar-col"><span class="bar-val" style="color:${color};font-size:9px">${s.attendance}%</span><div class="bar" style="height:${h}px;background:${color}"></div><span class="bar-label">${s.avatar}</span></div>`;
  }).join('');
  return `<div class="page" id="page-a-analytics">
    <div class="page-header"><div class="page-title">Analytics Dashboard</div><div class="page-sub">System-wide performance metrics</div></div>
    <div class="stats-row">
      <div class="stat-card blue"><div class="stat-label">Avg GPA</div><div class="stat-value blue">3.2</div></div>
      <div class="stat-card green"><div class="stat-label">Pass Rate</div><div class="stat-value green">87%</div></div>
      <div class="stat-card purple"><div class="stat-label">Avg Attendance</div><div class="stat-value purple">80%</div></div>
      <div class="stat-card amber"><div class="stat-label">Graded</div><div class="stat-value amber">142</div><div class="stat-delta">this semester</div></div>
    </div>
    <div class="grid-2">
      <div class="card"><div class="section-header"><div class="section-title">Grade Distribution</div></div><div class="bar-chart">${bars}</div><div style="text-align:center;font-size:12px;color:var(--text3);margin-top:8px">Class average: ${avgAll}%</div></div>
      <div class="card"><div class="section-header"><div class="section-title">Attendance Overview</div></div><div class="bar-chart">${attBars}</div><div style="text-align:center;font-size:12px;color:var(--text3);margin-top:8px">System average: 80%</div></div>
    </div>
    <div class="card" style="margin-top:16px"><div class="section-header"><div class="section-title">Course Enrollment Summary</div></div>
    <table><thead><tr><th>Course</th><th>Teacher</th><th>Enrolled</th><th>Avg Grade</th><th>Status</th></tr></thead><tbody>
    ${DATA.courses.map(c => {
      const avg = Math.round(70 + Math.random()*25);
      return `<tr><td>${c.icon} ${c.name}</td><td style="font-size:12px;color:var(--text2)">${c.teacher}</td><td><div style="display:flex;align-items:center;gap:6px"><div class="progress-wrap" style="width:60px"><div class="progress-bar pb-blue" style="width:${c.enrolled*10}%"></div></div><span style="font-size:12px">${c.enrolled}/10</span></div></td><td><span style="font-weight:600;color:${avg>=85?'var(--green)':avg>=70?'var(--accent)':'var(--amber)'}">${avg}%</span></td><td><span class="badge badge-green">Active</span></td></tr>`;
    }).join('')}
    </tbody></table></div>
  </div>`;
}

function buildAdminAnnouncements() {
  return `<div class="page" id="page-a-announce">
    <div class="page-header"><div class="page-title">Announcements</div><div class="page-sub">Publish system-wide announcements</div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="section-header"><div class="section-title">New Announcement</div></div>
      <div class="form-group-portal"><label class="form-label-portal">Title</label><input class="form-input-portal" id="ann-title" placeholder="Announcement title..."></div>
      <div class="form-row"><div class="form-group-portal"><label class="form-label-portal">Audience</label><select class="form-input-portal form-select"><option>All Users</option><option>Students Only</option><option>Teachers Only</option></select></div><div class="form-group-portal"><label class="form-label-portal">Tag</label><select class="form-input-portal form-select"><option>Important</option><option>Info</option><option>Resource</option><option>Event</option></select></div></div>
      <div class="form-group-portal"><label class="form-label-portal">Message</label><textarea class="form-input-portal form-textarea" id="ann-body" placeholder="Write your announcement..."></textarea></div>
      <div style="display:flex;justify-content:flex-end"><button class="btn btn-primary" onclick="publishAnnouncement()">📢 Publish</button></div>
    </div>
    <div class="section-header"><div class="section-title">Published Announcements</div></div>
    <div id="announce-list">
      ${DATA.announcements.map((a,i) => `<div class="announce-card" id="ann-${i}"><div style="display:flex;align-items:flex-start;justify-content:space-between"><div><div class="announce-title">${a.title}</div><div class="announce-body">${a.body}</div><div class="announce-footer"><span>By ${a.author}</span><span>${a.date}</span><span class="badge badge-blue">${a.tag}</span></div></div><button class="btn btn-danger btn-sm" style="flex-shrink:0;margin-left:12px" onclick="deleteAnn(${i})">Delete</button></div></div>`).join('')}
    </div>
  </div>`;
}