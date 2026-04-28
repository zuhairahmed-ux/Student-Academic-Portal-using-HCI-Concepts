const owlToastEl = document.getElementById('owl-toast');

function showOwlToast(msg, isError = false) {
  owlToastEl.textContent = msg;
  owlToastEl.style.borderColor = isError ? 'rgba(255,80,80,0.5)' : 'rgba(0,255,136,0.4)';
  owlToastEl.style.color = isError ? '#ff8888' : 'var(--owl-green)';
  owlToastEl.classList.add('show');
  clearTimeout(owlToastEl._tm);
  owlToastEl._tm = setTimeout(() => owlToastEl.classList.remove('show'), 2800);
}

function selectRole(role, el) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function doLogin() {
  const username = document.getElementById('login-user').value.trim();
  const displayName = username.length > 0 ? username.charAt(0).toUpperCase() + username.slice(1) : 'Guardian';
  showOwlToast(`✨ Welcome, ${displayName}! Access granted. Owl remains vigilant. ✨`);
  setTimeout(() => {
    if (!lidsOpen) openLids();
    else { closeLids(); setTimeout(() => openLids(), 300); }
  }, 100);
  setTimeout(() => {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('stars-canvas').style.display = 'none';
    document.querySelectorAll('.orb').forEach(o => o.style.display = 'none');
    document.getElementById('owl-toast').style.display = 'none';
    document.getElementById('portal').classList.add('active');
    setupPortal();
  }, 900);
}

function doLogout() {
  showConfirm('Sign Out', 'Are you sure you want to sign out?', () => {
    document.getElementById('portal').classList.remove('active');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('stars-canvas').style.display = 'block';
    document.querySelectorAll('.orb').forEach(o => o.style.display = 'block');
    document.getElementById('owl-toast').style.display = 'block';
    openLids();
  }, 'Sign Out');
}