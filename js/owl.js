const owlSvg = document.getElementById('owl-svg');
const eyeCenters = { l: { x: 86, y: 98 }, r: { x: 114, y: 98 } };
let lidsOpen = true;

function moveEyes(mouseX, mouseY) {
  if (!lidsOpen) return;
  const rect = owlSvg.getBoundingClientRect();
  if (!rect.width) return;
  const svgX = (mouseX - rect.left) * (200 / rect.width);
  const svgY = (mouseY - rect.top) * (200 / rect.height);
  ['l', 'r'].forEach(id => {
    const ec = eyeCenters[id];
    const dx = svgX - ec.x, dy = svgY - ec.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const moveDist = Math.min(5.5, dist * 0.13);
    const px = ec.x + (dx / dist) * moveDist,
          py = ec.y + (dy / dist) * moveDist;
    const iris = document.getElementById('iris-' + id);
    const pupil = document.getElementById('pupil-' + id);
    const shine = document.getElementById('shine-' + id);
    if (iris) iris.setAttribute('cx', px);
    if (pupil) {
      pupil.setAttribute('cx', px);
      pupil.setAttribute('cy', py);
    }
    if (shine) {
      shine.setAttribute('cx', px + 2.2);
      shine.setAttribute('cy', py - 2.2);
    }
  });
}

function closeLids() {
  lidsOpen = false;
  ['l', 'r'].forEach(id => {
    const eye = document.getElementById('eye-' + id);
    const eyelid = document.getElementById('eyelid-' + id);
    if (eye) eye.setAttribute('display', 'none');
    if (eyelid) eyelid.setAttribute('display', 'inline');
  });
}

function openLids() {
  lidsOpen = true;
  ['l', 'r'].forEach(id => {
    const eye = document.getElementById('eye-' + id);
    const eyelid = document.getElementById('eyelid-' + id);
    if (eye) eye.setAttribute('display', 'inline');
    if (eyelid) eyelid.setAttribute('display', 'none');
  });
}