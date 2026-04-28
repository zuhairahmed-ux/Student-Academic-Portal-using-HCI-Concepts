document.addEventListener('DOMContentLoaded', () => {
  // Start starfield
  resizeStars();
  initStars();
  drawStars();
  window.addEventListener('resize', () => { resizeStars(); initStars(); });

  // Owl eye tracking
  document.addEventListener('mousemove', (e) => { if (lidsOpen) moveEyes(e.clientX, e.clientY); });

  // Password field owl behaviour
  const passInput = document.getElementById('login-pass');
  const pwToggle = document.getElementById('pw-toggle');
  let pwVisible = false;

  passInput.addEventListener('focus', () => { if (!pwVisible) closeLids(); });
  passInput.addEventListener('blur', () => { if (!pwVisible) openLids(); });
  passInput.addEventListener('input', () => { if (document.activeElement === passInput && !pwVisible) closeLids(); });

  pwToggle.addEventListener('click', () => {
    pwVisible = !pwVisible;
    passInput.type = pwVisible ? 'text' : 'password';
    pwToggle.textContent = pwVisible ? '🙈' : '👁';
    pwVisible ? openLids() : (document.activeElement === passInput ? closeLids() : openLids());
  });

  passInput.addEventListener('keydown', () => {
    if (document.activeElement === passInput && !pwVisible && lidsOpen) {
      const c = document.getElementById('owl-container');
      c.style.transform = 'translateY(1px)';
      setTimeout(() => { if (c) c.style.transform = ''; }, 80);
    }
  });

  document.addEventListener('click', (e) => {
    if (document.activeElement !== passInput && !pwVisible && !lidsOpen) openLids();
  });

  const loginCard = document.querySelector('.login-card-owl');
  if (loginCard) {
    loginCard.addEventListener('mouseenter', () => { owlSvg.style.filter = 'drop-shadow(0 0 28px rgba(0,245,255,0.4))'; });
    loginCard.addEventListener('mouseleave', () => { owlSvg.style.filter = 'drop-shadow(0 0 20px rgba(0,245,255,0.25))'; });
  }

  openLids();

  // Login button
  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('login-pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
});