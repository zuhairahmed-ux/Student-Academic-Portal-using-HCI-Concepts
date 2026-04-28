function showToast(msg, type = 'info') {
  const container = document.getElementById('toast');
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.innerHTML = `<span>${icons[type]}</span>${msg}`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function openModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('active');
}

let confirmCallback = null;
function showConfirm(title, msg, cb, btnText = 'Delete') {
  document.getElementById('conf-title').textContent = title;
  document.getElementById('conf-msg').textContent = msg;
  document.getElementById('conf-ok').textContent = btnText;
  document.getElementById('conf-ok').className = btnText === 'Sign Out' ? 'btn btn-primary' : 'btn btn-danger';
  confirmCallback = cb;
  document.getElementById('confirm-overlay').classList.add('active');
  document.getElementById('conf-ok').onclick = () => {
    closeConfirm();
    if (confirmCallback) confirmCallback();
  };
}

function closeConfirm() {
  document.getElementById('confirm-overlay').classList.remove('active');
}

function toggleDark(el) {
  const sw = document.getElementById('dark-sw');
  if (sw.classList.toggle('on')) {
    document.documentElement.style.setProperty('--bg','#f8f9fc');
    document.documentElement.style.setProperty('--bg3','#e8eaf0');
    document.documentElement.style.setProperty('--bg4','#e0e3ec');
    document.documentElement.style.setProperty('--surface','#ffffff');
    document.documentElement.style.setProperty('--surface2','#f4f5fa');
    document.documentElement.style.setProperty('--border','#dde0ee');
    document.documentElement.style.setProperty('--border2','#c8ccdf');
    document.documentElement.style.setProperty('--text','#1a1d2e');
    document.documentElement.style.setProperty('--text2','#4a5068');
    document.documentElement.style.setProperty('--text3','#7880a0');
  } else {
    document.documentElement.style.setProperty('--bg','#0f1117');
    document.documentElement.style.setProperty('--bg3','#1e2130');
    document.documentElement.style.setProperty('--bg4','#252a3a');
    document.documentElement.style.setProperty('--surface','#1a1f2e');
    document.documentElement.style.setProperty('--surface2','#222738');
    document.documentElement.style.setProperty('--border','#2d3450');
    document.documentElement.style.setProperty('--border2','#3a4166');
    document.documentElement.style.setProperty('--text','#e8eaf0');
    document.documentElement.style.setProperty('--text2','#9ba3c0');
    document.documentElement.style.setProperty('--text3','#6b7494');
  }
}

// READING NOTIFICATIONS
function readNotif(id) {
  const el = document.getElementById('notif-' + id);
  if (el) {
    el.classList.remove('unread');
    el.querySelector('span[style]')?.remove();
  }
}
function markAllRead() {
  document.querySelectorAll('.notif-item').forEach(el => {
    el.classList.remove('unread');
    el.querySelector('span[style]')?.remove();
  });
  showToast('All notifications marked as read', 'success');
}

// ASSIGNMENT FILTERS
function filterAssign(filter, el) {
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#assign-list .assign-item').forEach(item => {
    item.style.display = (filter === 'all' || item.dataset.status === filter) ? 'flex' : 'none';
  });
}

function submitAssignment(id) {
  openModal('Submit Assignment',
    `<div class="upload-zone" onclick="document.getElementById('fupload').click()">
       <div class="up-icon">📎</div><p>Drag & drop your file here</p>
       <div class="up-hint">PDF, DOCX, ZIP — max 50MB</div>
     </div>
     <input type="file" id="fupload" onchange="handleFile(this)">
     <div id="upload-preview" style="margin-top:12px"></div>
     <div style="margin-top:16px">
       <label class="form-label-portal">Comments (optional)</label>
       <textarea class="form-input-portal form-textarea" placeholder="Add a note for your teacher..."></textarea>
     </div>
     <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end">
       <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="confirmSubmit('${id}')">Submit Assignment</button>
     </div>`
  );
}

function handleFile(input) {
  if (input.files.length) {
    document.getElementById('upload-preview').innerHTML = `<div class="chip">📄 ${input.files[0].name} <span style="color:var(--green)">✓</span></div>`;
  }
}

function confirmSubmit(id) {
  submittedAssigns.add(id);
  const card = document.getElementById('acard-' + id);
  if (card) {
    card.dataset.status = 'submitted';
    card.querySelector('.badge').className = 'badge badge-blue';
    card.querySelector('.badge').textContent = 'Submitted';
    const btn = card.querySelector('.btn-primary');
    if (btn) btn.replaceWith(Object.assign(document.createElement('span'), {
      style: 'font-size:11px;color:var(--text3)',
      textContent: 'Awaiting grade'
    }));
  }
  closeModal();
  showToast('Assignment submitted successfully!', 'success');
}

function searchMat(val) {
  document.querySelectorAll('#mat-list .assign-item').forEach(item => {
    item.style.display = item.querySelector('.assign-title').textContent.toLowerCase().includes(val.toLowerCase()) ? 'flex' : 'none';
  });
}

function setFilter(el, val) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// TEACHER ATTENDANCE
function setAtt(i, val) {
  ['P','A','L'].forEach(t => {
    const btn = document.getElementById(`att-${t.toLowerCase()}-${i}`);
    if (btn) {
      btn.className = 'btn btn-sm btn-outline att-status-btn';
      if (t === 'A') btn.style.color = 'var(--red)';
      if (t === 'L') btn.style.color = 'var(--amber)';
      if (t === 'P') btn.style.color = '';
    }
  });
  const active = document.getElementById(`att-${val.toLowerCase()}-${i}`);
  if (active) {
    active.className = `btn btn-sm ${val === 'P' ? 'btn-success' : val === 'A' ? 'btn-danger' : 'btn-outline'} att-status-btn`;
    if (val === 'L') {
      active.style.color = 'var(--amber)';
      active.style.background = 'var(--amber-soft)';
    }
  }
}

function markAll(val) {
  for (let i = 0; i < 6; i++) setAtt(i, val);
}

function saveAttendance() {
  showToast('Attendance saved for CS101', 'success');
}

function publishAnnouncement() {
  const title = document.getElementById('ann-title').value;
  const body = document.getElementById('ann-body').value;
  if (!title || !body) { showToast('Please fill in title and message', 'error'); return; }
  const list = document.getElementById('announce-list');
  if (list) {
    const i = Date.now();
    list.insertAdjacentHTML('afterbegin',
      `<div class="announce-card" id="ann-${i}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div>
            <div class="announce-title">${title}</div>
            <div class="announce-body">${body}</div>
            <div class="announce-footer"><span>By Admin Office</span><span>Just now</span><span class="badge badge-green">New</span></div>
          </div>
          <button class="btn btn-danger btn-sm" style="flex-shrink:0;margin-left:12px" onclick="this.closest('.announce-card').remove()">Delete</button>
        </div>
      </div>`
    );
  }
  document.getElementById('ann-title').value = '';
  document.getElementById('ann-body').value = '';
  showToast('Announcement published to all users!', 'success');
}

function deleteAnn(i) {
  showConfirm('Delete Announcement', 'This will remove the announcement from all users.', () => {
    document.getElementById('ann-' + i)?.remove();
    showToast('Announcement deleted', 'error');
  });
}