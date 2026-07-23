// Duplicates the logo set once so the CSS marquee animation (translateX 0 -> -50%)
// loops seamlessly. Must run on a track holding exactly one copy of the logos —
// cms-content.js resets #clients-logos to a single set before calling this again.
function initClientsMarquee() {
  const track = document.getElementById('clients-logos');
  if (!track || track.children.length === 0) return;

  Array.from(track.children).forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

window.initClientsMarquee = initClientsMarquee;
document.addEventListener('DOMContentLoaded', initClientsMarquee);
