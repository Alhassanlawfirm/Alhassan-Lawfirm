// Loads editable content from the /content JSON files and injects it into the page.
// Written defensively: every element is checked before use, so a missing element
// on one page never stops the rest of the content from loading.

async function loadCMSContent() {
  // Resolve the site root so paths work whether the page is at the root
  // (index.html) or inside a subfolder (pages/..., en/...).
  const root = location.pathname.includes('/pages/') || location.pathname.includes('/en/')
    ? '../'
    : './';

  const fetchJSON = async (path) => {
    try {
      const res = await fetch(root + path);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  const setTextAll = (selector, value) => {
    if (value == null) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  const setHref = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.href = value;
  };

  const setHrefAll = (selector, value) => {
    if (value == null) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.href = value;
    });
  };

  // Normalize a content path (stored values sometimes start with "/").
  const fixPath = (p) => (p && p.startsWith('/') ? root + p.slice(1) : p);

  // 1. Logo
  const logo = await fetchJSON('content/logo.json');
  if (logo) {
    document.querySelectorAll('#site-logo').forEach((img) => {
      img.src = fixPath(logo.logo);
    });
  }

  // 2. Clients section
  const clients = await fetchJSON('content/clients.json');
  if (clients) {
    setText('clients-title', clients.clients_title);
    setText('clients-subtitle', clients.clients_subtitle);

    const logosContainer = document.getElementById('clients-logos');
    if (logosContainer && Array.isArray(clients.clients_logos)) {
      logosContainer.innerHTML = '';
      clients.clients_logos.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'client-item';
        const img = document.createElement('img');
        img.src = fixPath(item.logo);
        img.alt = item.alt || 'عميل';
        img.loading = 'lazy';
        div.appendChild(img);
        logosContainer.appendChild(div);
      });
      if (window.initClientsMarquee) window.initClientsMarquee();
    }
  }

  // 3. Contact info (classes so both the contact section and footer update)
  const contact = await fetchJSON('content/contact.json');
  if (contact) {
    setTextAll('.contact-phone', contact.contact_phone);
    setTextAll('.contact-email', contact.contact_email);
    setTextAll('.contact-address', contact.contact_address);
    setHrefAll('.contact-whatsapp', contact.contact_whatsapp);
  }

  // 4. Social links
  const social = await fetchJSON('content/social.json');
  if (social) {
    setHrefAll('.social-twitter', social.social_twitter);
    setHrefAll('.social-linkedin', social.social_linkedin);
    setHrefAll('.social-facebook', social.social_facebook);
    setHrefAll('.social-instagram', social.social_instagram);
  }
}

// run after DOM is ready
document.addEventListener('DOMContentLoaded', loadCMSContent);
