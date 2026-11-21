/**
 * TEAM DAP - COMPLETE CINEMATIC & LUXURY PRODUCTION ENGINE
 * Features:
 * 1. Lenis Smooth Momentum Inertia Engine
 * 2. GSAP ScrollTrigger & Reveal Transitions
 * 3. Dynamic Typewriter Headline
 * 4. Hero Video Reel Switcher (4 Concert Videos)
 * 5. Hero Audio Mute / Unmute Toggle
 * 6. Works Filter Tabs & Fullscreen Lightbox
 * 7. Live Concert Video Reels Player with Sound Isolation
 * 8. DJ Arun Headliner Role Typewriter
 * 9. Interactive Hardware & Scale Chips
 * 10. WhatsApp Fast Quote Dispatch
 */

(function () {
  'use strict';

  // Production Archive Photos for Lightbox
  const archiveWorks = [
    {
      src: "images/tarana_theband_1778171118_3891898379870073979_58347999296.jpg",
      tag: "STADIUM CONCERT",
      title: "Monumental Stage Roof & LED Wings — Tarana Live Arena Tour"
    },
    {
      src: "images/thundersparkevents_1793894378_4023798828732710975_69442588126.webp",
      tag: "KINETIC LIGHTING",
      title: "Geometric Ceiling Truss & Kinetic Winch Spheres — Grand Ballroom"
    },
    {
      src: "images/tarana_theband_1778171118_3891898385230340351_58347999296.jpg",
      tag: "LIVE STAGE ENERGY",
      title: "Frontman Crowd Command & Overhead Concert Truss"
    },
    {
      src: "images/djarunproductions_1782137934_3925175345106743732_1443149917.jpg",
      tag: "COLLEGE FEST",
      title: "AAROH'26 Grand Stage Rig & High-Definition P3 LED Wall"
    },
    {
      src: "images/djarunproductions_1776693317_3879502990034485871_1443149917.jpg",
      tag: "SPECIAL EFFECTS",
      title: "Stadium Confetti Cannon Blast Drop — DJ Arun Live Arena Set"
    },
    {
      src: "images/thundersparkevents_1793894378_4023798823179282793_69442588126.webp",
      tag: "TIME-CODED DMX",
      title: "Multi-Beam Volumetric Laser & Moving Head Matrix Show"
    },
    {
      src: "images/tarana_theband_1778171118_3891898381925264286_58347999296.jpg",
      tag: "AUDIENCE EUPHORIA",
      title: "15,000+ Crowd Experience & Warm Beam Atmospheric Array"
    },
    {
      src: "images/djarunproductions_1776693317_3879502992827908298_1443149917.jpg",
      tag: "FESTIVAL NIGHT",
      title: "Night Arena Vista with Time-Coded Intelligent Beams & Atmosphere"
    }
  ];

  // Hero Video Catalog
  const heroReels = [
    {
      src: "images/djarunproductions_1792674572_4013565974667328085_1443149917.mp4",
      poster: "images/thundersparkevents_1793894378_4023798828732710975_69442588126.webp"
    },
    {
      src: "images/tarana_theband_1780499041_3911415151148495653_58347999296.mp4",
      poster: "images/tarana_theband_1778171118_3891898386656444975_58347999296.jpg"
    },
    {
      src: "images/djarunproductions_1791419327_4003034579574222838_1443149917.mp4",
      poster: "images/djarunproductions_1776693317_3879502990034485871_1443149917.jpg"
    },
    {
      src: "images/djarunproductions_1740754623_3578026603404046534_1443149917.mp4",
      poster: "images/djarunproductions_1776693317_3879502982543455121_1443149917.jpg"
    }
  ];

  let isHeroAudioActive = false;

  window.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initScrollReveals();
    initCardTilt();
    initTypewriterHeadline();
    initArunRoleTypewriter();
    initMobileNav();
  });

  /* =========================================================================
     1. LENIS SMOOTH MOMENTUM INERTIA ENGINE
     ========================================================================= */
  let lenisInstance = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false
    });

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  /* =========================================================================
     2. GSAP SCROLLTRIGGER TRANSFORMATIONS & REVEALS
     ========================================================================= */
  function initScrollReveals() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Smooth reveals for all scroll items
      const revealEls = document.querySelectorAll('.reveal-on-scroll');
      revealEls.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Smooth subtle parallax on image cards
      const parallaxImages = document.querySelectorAll('.work-tile img, .about-image-card img, .service-card-media img');
      parallaxImages.forEach((img) => {
        const parent = img.parentElement;
        gsap.to(img, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    } else {
      // Fallback
      const revealEls = document.querySelectorAll('.reveal-on-scroll');
      if (!revealEls.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => observer.observe(el));
    }
  }

  /* =========================================================================
     2B. INTERACTIVE 3D TILT TRANSFORMATIONS
     ========================================================================= */
  function initCardTilt() {
    const cards = document.querySelectorAll('.work-tile, .service-card, .reel-cinema-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / (rect.height / 2)) * 3;
        const rotateY = (x / (rect.width / 2)) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =========================================================================
     3. DYNAMIC TYPEWRITER HEADLINE
     ========================================================================= */
  function initTypewriterHeadline() {
    const target = document.getElementById('heroTypeTarget');
    if (!target) return;

    const words = ['EXPERIENCE.', 'MOMENT.', 'SPECTACLE.', 'HEADLINE.'];
    let wIdx = 0;
    let cIdx = 0;
    let isDeleting = false;

    function tick() {
      const current = words[wIdx];
      if (!isDeleting) {
        target.textContent = current.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === current.length) {
          isDeleting = true;
          setTimeout(tick, 2200);
          return;
        }
      } else {
        target.textContent = current.substring(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) {
          isDeleting = false;
          wIdx = (wIdx + 1) % words.length;
          setTimeout(tick, 400);
          return;
        }
      }
      setTimeout(tick, isDeleting ? 45 : 100);
    }
    setTimeout(tick, 600);
  }

  /* =========================================================================
     4. HERO VIDEO SWITCHER & AUDIO TOGGLE
     ========================================================================= */
  window.switchHeroVideo = function (idx, btn) {
    const video = document.getElementById('heroVideo');
    const source = document.getElementById('heroVideoSource');
    if (!video || !source || !heroReels[idx]) return;

    // Update active button
    document.querySelectorAll('.reel-pill').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    video.style.opacity = '0.3';

    setTimeout(() => {
      source.src = heroReels[idx].src;
      video.poster = heroReels[idx].poster;
      video.load();
      video.play().catch(() => {});
      video.style.opacity = '1';
    }, 250);
  };

  window.toggleHeroAudio = function () {
    const video = document.getElementById('heroVideo');
    const btn = document.getElementById('heroSoundBtn');
    const icon = document.getElementById('heroSoundIcon');
    const txt = document.getElementById('heroSoundTxt');
    if (!video || !btn) return;

    if (video.muted) {
      video.muted = false;
      isHeroAudioActive = true;
      btn.classList.add('active');
      if (icon) icon.textContent = '🔊';
      if (txt) txt.textContent = 'SOUND ON';
    } else {
      video.muted = true;
      isHeroAudioActive = false;
      btn.classList.remove('active');
      if (icon) icon.textContent = '🔇';
      if (txt) txt.textContent = 'SOUND OFF';
    }
  };

  /* =========================================================================
     5. WORKS FILTER TABS & LIGHTBOX MODAL
     ========================================================================= */
  window.filterWorks = function (category, btn) {
    document.querySelectorAll('.works-filter-btn').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const tiles = document.querySelectorAll('#worksGrid .work-tile');
    tiles.forEach((tile) => {
      const cat = tile.getAttribute('data-cat');
      if (category === 'all' || cat === category) {
        tile.classList.remove('is-filtered-out');
      } else {
        tile.classList.add('is-filtered-out');
      }
    });
  };

  window.openLightbox = function (index) {
    const modal = document.getElementById('photoLightboxModal');
    const img = document.getElementById('modalFullImg');
    const tag = document.getElementById('modalFullTag');
    const title = document.getElementById('modalFullTitle');

    if (!modal || !img || !archiveWorks[index]) return;

    const item = archiveWorks[index];
    img.src = item.src;
    if (tag) tag.textContent = item.tag;
    if (title) title.textContent = item.title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    const modal = document.getElementById('photoLightboxModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* =========================================================================
     6. LIVE CONCERT VIDEO REELS WITH SOUND ISOLATION
     ========================================================================= */
  window.toggleReelAudio = function (btn) {
    const card = btn.closest('.reel-cinema-card');
    if (!card) return;
    const video = card.querySelector('video');
    const playTxt = btn.querySelector('.play-txt');
    const playIcon = btn.querySelector('.play-icon');

    if (!video) return;

    // Pause all other videos
    document.querySelectorAll('.reel-cinema-card video').forEach((v) => {
      if (v !== video) {
        v.pause();
        v.muted = true;
        const otherBtn = v.closest('.reel-cinema-card')?.querySelector('.reel-play-btn');
        if (otherBtn) {
          const otherTxt = otherBtn.querySelector('.play-txt');
          const otherIcon = otherBtn.querySelector('.play-icon');
          if (otherTxt) otherTxt.textContent = 'PLAY WITH SOUND';
          if (otherIcon) otherIcon.textContent = '▶';
          otherBtn.classList.remove('playing');
        }
      }
    });

    if (video.paused || video.muted) {
      video.muted = false;
      video.play().then(() => {
        btn.classList.add('playing');
        if (playTxt) playTxt.textContent = 'PAUSE AUDIO';
        if (playIcon) playIcon.textContent = '❚❚';
      }).catch(() => {
        video.muted = true;
        video.play();
      });
    } else {
      video.muted = true;
      video.pause();
      btn.classList.remove('playing');
      if (playTxt) playTxt.textContent = 'PLAY WITH SOUND';
      if (playIcon) playIcon.textContent = '▶';
    }
  };

  /* =========================================================================
     7. DJ ARUN HEADLINER ROLE TYPEWRITER
     ========================================================================= */
  function initArunRoleTypewriter() {
    const target = document.getElementById('arunRoleTyped');
    if (!target) return;

    const roles = [
      'SOUND ENGINEER. EVENT PRODUCER. ARENA HEADLINER.',
      '140dB+ DSP CALIBRATION ARCHITECT.',
      'MAINSTAGE RESIDENT & STADIUM HEADLINER.'
    ];
    let rIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function typeRole() {
      const cur = roles[rIdx];
      if (!deleting) {
        target.textContent = cur.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === cur.length) {
          deleting = true;
          setTimeout(typeRole, 2500);
          return;
        }
      } else {
        target.textContent = cur.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
          setTimeout(typeRole, 400);
          return;
        }
      }
      setTimeout(typeRole, deleting ? 40 : 80);
    }
    setTimeout(typeRole, 1000);
  }

  /* =========================================================================
     8. INTERACTIVE HARDWARE & SCALE CHIPS & LIVE HUD
     ========================================================================= */
  function updateRigHud() {
    const hud = document.getElementById('hudSummaryText');
    if (!hud) return;
    const activeValues = Array.from(document.querySelectorAll('#hardwareChipsGrid .spec-chip.active'))
      .map((b) => b.getAttribute('data-val') || b.textContent.trim());
    const scale = document.getElementById('selectedScale')?.value || '2,000 – 5,000 Attendees';
    const packagesStr = activeValues.length > 0 
      ? activeValues.slice(0, 2).join(' + ') + (activeValues.length > 2 ? ` + ${activeValues.length - 2} more` : '') 
      : 'Custom Rig';
    hud.textContent = `${packagesStr} • ${scale}`;
  }

  window.toggleSpecChip = function (btn) {
    btn.classList.toggle('active');
    const activeValues = Array.from(document.querySelectorAll('#hardwareChipsGrid .spec-chip.active'))
      .map((b) => b.getAttribute('data-val') || b.textContent.trim());
    const hidden = document.getElementById('selectedHardware');
    if (hidden) hidden.value = activeValues.join(', ') || 'Standard Turnkey Package';
    updateRigHud();
  };

  window.selectScaleChip = function (btn) {
    document.querySelectorAll('.scale-chip').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const hidden = document.getElementById('selectedScale');
    if (hidden) hidden.value = btn.getAttribute('data-val') || btn.textContent.trim();
    updateRigHud();
  };

  /* =========================================================================
     9. FAST QUOTE WHATSAPP DISPATCH
     ========================================================================= */
  window.handleSendWhatsApp = function (e) {
    e.preventDefault();
    const name = document.getElementById('qName')?.value.trim();
    const phone = document.getElementById('qPhone')?.value.trim();
    const date = document.getElementById('qDate')?.value;
    const venue = document.getElementById('qLocation')?.value.trim() || 'Not Specified';
    const hardware = document.getElementById('selectedHardware')?.value || 'Full Turnkey Arena Package';
    const scale = document.getElementById('selectedScale')?.value || '2,000 – 5,000 Attendees';
    const notes = document.getElementById('qDetails')?.value.trim() || 'Standard tour setup';

    if (!name || !phone || !date) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const msg = 
`⚡ *PRODUCTION & RIGGING DISPATCH | TEAM DAP* ⚡
━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client / Org:* ${name}
📞 *WhatsApp:* ${phone}
📅 *Event Date:* ${date}
📍 *City & Venue:* ${venue}
👥 *Expected Scale:* ${scale}
🛠️ *Hardware Required:*
${hardware}
📝 *Stage & Rig Notes:*
${notes}
━━━━━━━━━━━━━━━━━━━━━━━
_Dispatched via official teamdap.in quote desk_`;

    const url = `https://api.whatsapp.com/send?phone=919980555333&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  /* =========================================================================
     10. MOBILE NAV TOGGLE
     ========================================================================= */
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
        navToggle.classList.toggle('is-active');
      });

      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('is-open');
          navToggle.classList.remove('is-active');
        });
      });
    }
  }

})();
