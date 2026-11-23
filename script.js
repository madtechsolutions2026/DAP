/**
 * DJ Arun Productions | Team DAP — Official Core Engine
 * Complete Alignment with Figma Design System
 */

(function () {
  'use strict';

  /* =========================================================================
     1. HERO VIDEO PLAYBACK & SPOTLIGHT GLOW
     ========================================================================= */
  // Autoplay single hero background video seamlessly
  const heroVid = document.getElementById('heroVideo');
  if (heroVid) {
    heroVid.play().catch(() => {
      heroVid.muted = true;
      heroVid.play().catch(() => {});
    });
  }

  // Hero Spotlight Glow coordinates on mouse move
  const heroSection = document.getElementById('top');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroSection.style.setProperty('--mx', `${x.toFixed(1)}%`);
      heroSection.style.setProperty('--my', `${y.toFixed(1)}%`);
    });
  }

  /* =========================================================================
     2. SECTION 03: PROCESS BLUEPRINT
     ========================================================================= */
  window.setProcessStep = function (stepNum, btn) {
    const numEl = document.getElementById('blueprintNumber');
    const steps = document.querySelectorAll('#processSteps button');
    steps.forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (numEl) {
      numEl.style.transform = 'scale(0.8)';
      numEl.style.opacity = '0.5';
      setTimeout(() => {
        numEl.textContent = stepNum;
        numEl.style.transform = 'scale(1)';
        numEl.style.opacity = '1';
      }, 150);
    }
  };

  /* =========================================================================
     3. SECTION 05: SELECTED PRODUCTIONS SHOWCASE
     ========================================================================= */
  const showcaseData = [
    {
      num: '01',
      category: 'Concerts',
      title: 'Live Music Productions',
      tags: 'Audio · Lighting · LED · Stage',
      img: 'images/djarunproductions_1782137934_3925175345106743732_1443149917.jpg'
    },
    {
      num: '02',
      category: 'Corporate Events',
      title: 'Brand Experiences',
      tags: 'Production · AV · Fabrication',
      img: 'images/djarunproductions_1776693317_3879503003523396957_1443149917.jpg'
    },
    {
      num: '03',
      category: 'College Festivals',
      title: 'Festival Scale',
      tags: 'Stage · Sound · Special Effects',
      img: 'images/tarana_theband_1778171118_3891898386656444975_58347999296.jpg'
    },
    {
      num: '04',
      category: 'Weddings',
      title: 'Immersive Celebrations',
      tags: 'Lighting · Structures · Production',
      img: 'images/thundersparkevents_1793894378_4023798828732710975_69442588126.webp'
    },
    {
      num: '05',
      category: 'Special Events',
      title: 'One-of-One Experiences',
      tags: 'Concept · Design · Execution',
      img: 'images/dj-footer-bg.jpg'
    }
  ];

  window.setProjectTab = function (idx, btn) {
    const data = showcaseData[idx];
    if (!data) return;

    // Tabs update
    document.querySelectorAll('#projectTabs button').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const stageImg = document.getElementById('stageImg');
    const stageNum = document.getElementById('stageNumber');
    const stageCat = document.getElementById('stageCategory');
    const stageTitle = document.getElementById('stageTitle');
    const stageTags = document.getElementById('stageTags');

    if (stageImg) {
      stageImg.classList.remove('active');
      setTimeout(() => {
        stageImg.src = data.img;
        stageImg.alt = data.title;
        stageImg.classList.add('active');
      }, 200);
    }

    if (stageNum) stageNum.innerHTML = `${data.num}<span>/ 05</span>`;
    if (stageCat) stageCat.textContent = data.category;
    if (stageTitle) stageTitle.textContent = data.title;
    if (stageTags) stageTags.textContent = data.tags;
  };

  /* =========================================================================
     4. SECTION 07: TECHNICAL ARSENAL
     ========================================================================= */
  const arsenalImages = [
    'images/djarunproductions_1782137934_3925175345106743732_1443149917.jpg',
    'images/djarunproductions_1776693317_3879502990034485871_1443149917.jpg',
    'images/djarunproductions_1776693317_3879503003523396957_1443149917.jpg',
    'images/about-stage-rigging.jpg',
    'images/djarunproductions_1776693317_3879502997265472505_1443149917.jpg'
  ];

  window.setArsenalTab = function (idx, btn) {
    document.querySelectorAll('#arsenalList button').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const img = document.getElementById('arsenalImg');
    const tag = document.getElementById('arsenalIndexTag');

    if (img && arsenalImages[idx]) {
      img.classList.remove('active');
      setTimeout(() => {
        img.src = arsenalImages[idx];
        img.classList.add('active');
      }, 150);
    }

    if (tag) {
      tag.textContent = `TECH / 00${idx + 1}—005`;
    }
  };

  /* =========================================================================
     5. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================= */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* =========================================================================
     6. MOBILE MENU TOGGLE
     ========================================================================= */
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuButton && mobileMenu) {
    const toggleMobileMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', isOpen);
      menuButton.classList.toggle('is-active', isOpen);
      menuButton.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    };

    menuButton.addEventListener('click', () => toggleMobileMenu());

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  /* =========================================================================
     7. SECTION 10: PROJECT ENQUIRY (WHATSAPP DISPATCH)
     ========================================================================= */
  window.handleProjectEnquiry = function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name ? form.name.value.trim() : '';
    const email = form.email ? form.email.value.trim() : '';
    const phone = form.phone ? form.phone.value.trim() : '';
    const eventType = form.eventType ? form.eventType.value : '';
    const date = form.date ? form.date.value : 'TBD';
    const location = form.location ? form.location.value.trim() : '';
    const details = form.details ? form.details.value.trim() : '';

    // Collect checked services
    const checkedServices = [];
    form.querySelectorAll('input[name="services"]:checked').forEach((cb) => {
      checkedServices.push(cb.value);
    });
    const servicesStr = checkedServices.length > 0 ? checkedServices.join(', ') : 'Turnkey Production';

    // Construct formatted WhatsApp message
    const msg = 
      `*NEW ARENA RIGGING & EVENT ENQUIRY*\n` +
      `--------------------------------\n` +
      `*Client:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Event Type:* ${eventType}\n` +
      `*Date:* ${date}\n` +
      `*Location / Venue:* ${location}\n` +
      `*Required Services:* ${servicesStr}\n\n` +
      `*Project Scope & Brief:*\n${details}\n` +
      `--------------------------------\n` +
      `_Sent via DJ Arun Productions (Team DAP) Online Portal_`;

    const encodedMsg = encodeURIComponent(msg);
    // Primary WhatsApp Business line: +91 99805 55333
    const waUrl = `https://wa.me/919980555333?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
  };

})();
