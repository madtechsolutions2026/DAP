/**
 * TEAM DAP - LUXURY 3D & MOTION ARCHITECTURE
 * Stack: Three.js + GSAP ScrollTrigger + Lenis Smooth Scroll
 * 
 * Features:
 * 1. Lenis Smooth Momentum Inertia Engine
 * 2. Hero: 3D Holographic Turntable & Concert Laser Beams (Three.js)
 * 3. About: 3D Aluminium Box Truss Scrollytelling (Three.js)
 * 4. Works: Pinned Horizontal 3D IMAX Filmstrip with Tilt Physics (GSAP Scrub)
 * 5. DJ Arun: Interactive Draggable 3D Scratch Platter with Real-Time RPM Telemetry (Three.js)
 * 6. Fleet: High-Tech Radar Canvas with Route Vectors & Pulse Arcs
 */

(function () {
  'use strict';

  // Wait for DOM & libraries to be ready
  window.addEventListener('DOMContentLoaded', () => {
    initLenisScroll();
    initHero3D();
    initTruss3D();
    initHorizontalWorks();
    initArunScratch3D();
    initFleetRadar();
    initTypewriters();
    initInteractiveChips();
    initMobileNav();
  });

  /* =========================================================================
     1. LENIS SMOOTH MOMENTUM INERTIA ENGINE
     ========================================================================= */
  let lenisInstance = null;

  function initLenisScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis not loaded, falling back to standard scroll.');
      return;
    }

    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
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
     2. HERO: 3D HOLOGRAPHIC TURNTABLE & STAGE LIGHTING (THREE.JS)
     ========================================================================= */
  function initHero3D() {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060609, 0.038);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 8.8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Ambient & Accent Lights
    const ambientLight = new THREE.AmbientLight(0x181822, 1.5);
    scene.add(ambientLight);

    // Amber Mainstage Spotlights
    const spotAmber = new THREE.SpotLight(0xD97724, 7, 24, Math.PI / 4, 0.45, 1.2);
    spotAmber.position.set(3.5, 7.5, 4);
    spotAmber.target.position.set(0, 0, 0);
    scene.add(spotAmber);
    scene.add(spotAmber.target);

    // Cyan Atmospheric Rim Light
    const spotCyan = new THREE.SpotLight(0x38bdf8, 4, 20, Math.PI / 3.5, 0.5, 1.5);
    spotCyan.position.set(-4.5, 6, -1);
    spotCyan.target.position.set(0, 0, 0);
    scene.add(spotCyan);
    scene.add(spotCyan.target);

    // -----------------------------------------------------------------------
    // BUILD 3D PIONEER CDJ / TURNTABLE CONSOLE
    // -----------------------------------------------------------------------
    const deckGroup = new THREE.Group();
    scene.add(deckGroup);

    // Base Console Chassis
    const chassisGeo = new THREE.BoxGeometry(4.8, 0.35, 4.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c11,
      roughness: 0.35,
      metalness: 0.85
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = -0.18;
    deckGroup.add(chassis);

    // Outer Jog Ring (Metallic Brushed Bezel)
    const ringGeo = new THREE.CylinderGeometry(1.68, 1.72, 0.16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f28,
      metalness: 0.95,
      roughness: 0.2
    });
    const jogRing = new THREE.Mesh(ringGeo, ringMat);
    jogRing.position.y = 0.08;
    deckGroup.add(jogRing);

    // Vinyl Platter (Grooved Surface)
    const platterGeo = new THREE.CylinderGeometry(1.52, 1.52, 0.12, 64);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x060608,
      roughness: 0.25,
      metalness: 0.9
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.y = 0.14;
    deckGroup.add(platter);

    // Concentric Vinyl Grooves
    const groovesGroup = new THREE.Group();
    for (let r = 0.65; r < 1.45; r += 0.11) {
      const grooveGeo = new THREE.RingGeometry(r, r + 0.018, 48);
      const grooveMat = new THREE.MeshBasicMaterial({
        color: 0x222230,
        side: THREE.DoubleSide
      });
      const groove = new THREE.Mesh(grooveGeo, grooveMat);
      groove.rotation.x = -Math.PI / 2;
      groove.position.y = 0.205;
      groovesGroup.add(groove);
    }
    deckGroup.add(groovesGroup);

    // Central Glowing Display Badge (DAP Crest)
    const centerDisplayGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.14, 48);
    const centerDisplayMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      emissive: 0xD97724,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.95
    });
    const centerDisplay = new THREE.Mesh(centerDisplayGeo, centerDisplayMat);
    centerDisplay.position.y = 0.21;
    deckGroup.add(centerDisplay);

    // Glowing Amber LED Arc Around Platter
    const ledRingGeo = new THREE.RingGeometry(1.58, 1.63, 64);
    const ledRingMat = new THREE.MeshBasicMaterial({
      color: 0xD97724,
      side: THREE.DoubleSide
    });
    const ledRing = new THREE.Mesh(ledRingGeo, ledRingMat);
    ledRing.rotation.x = -Math.PI / 2;
    ledRing.position.y = 0.17;
    deckGroup.add(ledRing);

    // Tonearm Base & Arm
    const armPivotGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 24);
    const armPivotMat = new THREE.MeshStandardMaterial({ color: 0x333340, metalness: 0.9 });
    const armPivot = new THREE.Mesh(armPivotGeo, armPivotMat);
    armPivot.position.set(1.85, 0.22, -1.25);
    deckGroup.add(armPivot);

    const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.2, 16);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xc8c8d4, metalness: 0.95, roughness: 0.15 });
    const tonearm = new THREE.Mesh(armGeo, armMat);
    tonearm.rotation.z = Math.PI / 2.3;
    tonearm.rotation.y = -0.35;
    tonearm.position.set(1.15, 0.35, -0.65);
    deckGroup.add(tonearm);

    // -----------------------------------------------------------------------
    // VOLUMETRIC STAGE PARTICLES & LASER BEAMS
    // -----------------------------------------------------------------------
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = Math.random() * 9;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      particleSpeeds[i] = 0.003 + Math.random() * 0.008;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD97724,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Laser Beam Cylinders (Stage Light Sweeps)
    const laserGroup = new THREE.Group();
    const laserMat1 = new THREE.MeshBasicMaterial({
      color: 0xD97724,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const laserMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    for (let b = 0; b < 4; b++) {
      const beamGeo = new THREE.ConeGeometry(0.35, 12, 16, 1, true);
      const beam = new THREE.Mesh(beamGeo, b % 2 === 0 ? laserMat1 : laserMat2);
      beam.position.set(-3.5 + b * 2.3, 6.5, -4.5);
      beam.rotation.x = Math.PI / 1.75;
      beam.rotation.z = (b - 1.5) * 0.22;
      laserGroup.add(beam);
    }
    scene.add(laserGroup);

    // Initial position & slight forward tilt
    deckGroup.position.set(0, -0.6, 0);
    deckGroup.rotation.x = 0.42;

    // -----------------------------------------------------------------------
    // INTERACTIVE MOUSE PARALLAX & TICKER
    // -----------------------------------------------------------------------
    let targetRotY = 0;
    let targetRotX = 0.42;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
      targetRotY = mouseX * 0.55;
      targetRotX = 0.42 + mouseY * 0.28;
    }, { passive: true });

    // GSAP ScrollTrigger: Push Camera into Stage Deck as user scrolls
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.to(camera.position, {
        z: 5.2,
        y: 2.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(deckGroup.rotation, {
        x: 0.15,
        y: -0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Platter continuous spin
      platter.rotation.y += 0.016;
      groovesGroup.rotation.z -= 0.016;

      // Smooth mouse follow
      deckGroup.rotation.y += (targetRotY - deckGroup.rotation.y) * 0.05;
      deckGroup.rotation.x += (targetRotX - deckGroup.rotation.x) * 0.05;

      // Laser beam oscillation
      laserGroup.children.forEach((beam, idx) => {
        beam.rotation.z = (idx - 1.5) * 0.22 + Math.sin(elapsedTime * 1.4 + idx) * 0.12;
      });

      // Particle floating
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= particleSpeeds[i];
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 8.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  /* =========================================================================
     3. ABOUT: 3D MODULAR ALUMINIUM BOX TRUSS (THREE.JS SCROLLYTELLING)
     ========================================================================= */
  function initTruss3D() {
    const canvas = document.getElementById('truss3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || 480;
    let height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xD97724, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // -----------------------------------------------------------------------
    // CONSTRUCT REALISTIC 3D QUAD ALUMINIUM TRUSS SEGMENT
    // -----------------------------------------------------------------------
    const trussGroup = new THREE.Group();
    scene.add(trussGroup);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x9fa4b0,
      metalness: 0.92,
      roughness: 0.22,
      wireframe: false
    });

    const halfW = 0.72;
    const halfH = 0.72;
    const len = 4.2;

    // 4 Main Chords (Longitudinal Tubes)
    const chordGeo = new THREE.CylinderGeometry(0.065, 0.065, len, 24);
    const cornerPositions = [
      [-halfW, -halfH],
      [halfW, -halfH],
      [halfW, halfH],
      [-halfW, halfH]
    ];

    cornerPositions.forEach(([x, y]) => {
      const chord = new THREE.Mesh(chordGeo, metalMat);
      chord.position.set(x, y, 0);
      chord.rotation.z = Math.PI / 2;
      trussGroup.add(chord);
    });

    // Cross-Webbing & Diagonal Bracing Brackets
    const subTubeGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.05, 16);
    const numBays = 6;
    const baySpacing = len / numBays;

    for (let i = 0; i <= numBays; i++) {
      const xPos = -len / 2 + i * baySpacing;

      // Vertical Strut Left
      const vLeft = new THREE.Mesh(subTubeGeo, metalMat);
      vLeft.position.set(-halfW, 0, xPos);
      vLeft.rotation.x = Math.PI / 2;
      trussGroup.add(vLeft);

      // Horizontal Strut Bottom
      const hBottom = new THREE.Mesh(subTubeGeo, metalMat);
      hBottom.position.set(0, -halfH, xPos);
      hBottom.rotation.z = Math.PI / 2;
      trussGroup.add(hBottom);
    }

    // Glowing EN 1090-3 Safety Node Marker (Amber Beacon)
    const nodeBeaconGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const nodeBeaconMat = new THREE.MeshBasicMaterial({ color: 0xD97724 });
    const beacon = new THREE.Mesh(nodeBeaconGeo, nodeBeaconMat);
    beacon.position.set(halfW, halfH, 1.2);
    trussGroup.add(beacon);

    trussGroup.rotation.x = 0.55;
    trussGroup.rotation.y = 0.75;

    // GSAP Scroll Scrollytelling
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.to(trussGroup.rotation, {
        y: Math.PI * 2 + 0.75,
        x: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    function animateTruss() {
      requestAnimationFrame(animateTruss);
      trussGroup.rotation.z += 0.003;
      renderer.render(scene, camera);
    }
    animateTruss();

    window.addEventListener('resize', () => {
      width = container.clientWidth || 480;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  /* =========================================================================
     4. WORKS: PINNED 3D HORIZONTAL FILMSTRIP (GSAP SCRUB & 3D TILT)
     ========================================================================= */
  function initHorizontalWorks() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const worksSection = document.getElementById('works');
    const track = document.getElementById('worksHorizontalTrack');
    if (!worksSection || !track) return;

    // Only apply horizontal scroll on Desktop/Tablet (> 900px)
    if (window.innerWidth <= 900) return;

    // Wait for layout calculation
    setTimeout(() => {
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: worksSection,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Apply 3D perspective tilt to cards depending on velocity
            const cards = track.querySelectorAll('.imax-cinema-card');
            const velocity = self.getVelocity() / 350;
            const tilt = Math.max(-12, Math.min(12, velocity));

            cards.forEach((card) => {
              card.style.transform = `perspective(1000px) rotateY(${tilt}deg) scale(${1 - Math.abs(tilt) * 0.008})`;
            });
          }
        }
      });
    }, 200);

    // Hover Video Preview Mechanics
    const cards = track.querySelectorAll('.imax-cinema-card');
    cards.forEach((card) => {
      const video = card.querySelector('video');
      if (!video) return;

      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
        card.classList.add('is-previewing');
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        card.classList.remove('is-previewing');
      });
    });
  }

  /* =========================================================================
     5. DJ ARUN: INTERACTIVE DRAGGABLE 3D TURNTABLE (THREE.JS)
     ========================================================================= */
  function initArunScratch3D() {
    const canvas = document.getElementById('arunScratchCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || 460;
    let height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 4.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0x222230, 2);
    scene.add(amb);

    const amberLight = new THREE.PointLight(0xD97724, 5, 12);
    amberLight.position.set(0, 3.5, 1);
    scene.add(amberLight);

    // Scratch Vinyl Platter
    const platterGroup = new THREE.Group();
    scene.add(platterGroup);

    const baseDiscGeo = new THREE.CylinderGeometry(1.85, 1.88, 0.14, 64);
    const baseDiscMat = new THREE.MeshStandardMaterial({
      color: 0x08080c,
      roughness: 0.28,
      metalness: 0.92
    });
    const disc = new THREE.Mesh(baseDiscGeo, baseDiscMat);
    platterGroup.add(disc);

    // Center Label: ARUN DJ
    const labelGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.16, 48);
    const labelMat = new THREE.MeshStandardMaterial({
      color: 0xD97724,
      roughness: 0.4,
      metalness: 0.8
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.y = 0.04;
    platterGroup.add(label);

    // Concentric Grooves
    for (let r = 0.85; r < 1.78; r += 0.08) {
      const gGeo = new THREE.RingGeometry(r, r + 0.015, 64);
      const gMat = new THREE.MeshBasicMaterial({ color: 0x181822, side: THREE.DoubleSide });
      const g = new THREE.Mesh(gGeo, gMat);
      g.rotation.x = -Math.PI / 2;
      g.position.y = 0.09;
      platterGroup.add(g);
    }

    platterGroup.rotation.x = 0.32;

    // -----------------------------------------------------------------------
    // DRAGGABLE SCRATCH INTERACTION & RPM TELEMETRY
    // -----------------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let angularVelocity = 0.022; // default 33.3 RPM speed
    const rpmDisplay = document.getElementById('arunLiveRpm');

    function onPointerDown(e) {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      canvas.style.cursor = 'grabbing';
      if (rpmDisplay) rpmDisplay.textContent = 'SCRATCH // ACTIVE';
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - prevMouseX;
      prevMouseX = clientX;

      angularVelocity = deltaX * 0.015;
      platterGroup.rotation.y += angularVelocity;

      const calcRpm = Math.abs(Math.round(angularVelocity * 1400));
      if (rpmDisplay) {
        rpmDisplay.textContent = `${calcRpm || 45} RPM // LIVE SCRATCH`;
      }
    }

    function onPointerUp() {
      isDragging = false;
      canvas.style.cursor = 'grab';
      setTimeout(() => {
        if (rpmDisplay) rpmDisplay.textContent = '33.3 RPM // AUDIO MASTER';
      }, 800);
    }

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    function animateArun() {
      requestAnimationFrame(animateArun);

      if (!isDragging) {
        // Smooth deceleration back to normal rotation
        angularVelocity += (0.018 - angularVelocity) * 0.04;
        platterGroup.rotation.y += angularVelocity;
      }

      renderer.render(scene, camera);
    }
    animateArun();

    window.addEventListener('resize', () => {
      width = container.clientWidth || 460;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  /* =========================================================================
     6. FLEET: HIGH-TECH OPERATIONS RADAR CANVAS (BLR ↔ HYD ↔ MAA)
     ========================================================================= */
  function initFleetRadar() {
    const canvas = document.getElementById('fleetRadarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 440;
    const height = 440;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = height / 2;
    let sweepAngle = 0;

    // Hub Coordinates on radar
    const hubs = [
      { code: 'BLR', name: 'Bengaluru Central', x: centerX, y: centerY + 25 },
      { code: 'HYD', name: 'Hyderabad North Base', x: centerX - 25, y: centerY - 95 },
      { code: 'MAA', name: 'Chennai Coastal Depot', x: centerX + 95, y: centerY + 50 }
    ];

    function drawRadar() {
      ctx.clearRect(0, 0, width, height);

      // Radar Background Rings
      ctx.strokeStyle = 'rgba(217, 119, 36, 0.12)';
      ctx.lineWidth = 1;

      for (let r = 50; r <= 190; r += 45) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - 195, centerY);
      ctx.lineTo(centerX + 195, centerY);
      ctx.moveTo(centerX, centerY - 195);
      ctx.lineTo(centerX, centerY + 195);
      ctx.stroke();

      // Transit Arcs Connecting Hubs
      ctx.strokeStyle = 'rgba(217, 119, 36, 0.45)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(hubs[0].x, hubs[0].y);
      ctx.lineTo(hubs[1].x, hubs[1].y);
      ctx.lineTo(hubs[2].x, hubs[2].y);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating Sweep Beam
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 190);
      gradient.addColorStop(0, 'rgba(217, 119, 36, 0.2)');
      gradient.addColorStop(1, 'rgba(217, 119, 36, 0.0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, 190, sweepAngle, sweepAngle + 0.35);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      sweepAngle += 0.025;

      // Draw Hub Nodes & Pulsing Dots
      hubs.forEach((hub) => {
        // Outer pulse
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 119, 36, 0.25)';
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#D97724';
        ctx.fill();

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillText(hub.code, hub.x + 12, hub.y + 4);
      });

      requestAnimationFrame(drawRadar);
    }
    drawRadar();
  }

  /* =========================================================================
     7. DYNAMIC TYPEWRITERS & HUD EQUALIZERS
     ========================================================================= */
  function initTypewriters() {
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
     8. INTERACTIVE HARDWARE CHIPS & FAST QUOTE WHATSAPP DISPATCH
     ========================================================================= */
  function initInteractiveChips() {
    window.toggleSpecChip = function (btn) {
      btn.classList.toggle('active');
      const activeValues = Array.from(document.querySelectorAll('.spec-chip.active'))
        .map((b) => b.getAttribute('data-val') || b.textContent.trim());
      const hidden = document.getElementById('selectedHardware');
      if (hidden) hidden.value = activeValues.join(', ') || 'Standard Turnkey Package';
    };

    window.selectScaleChip = function (btn) {
      document.querySelectorAll('.scale-chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const hidden = document.getElementById('selectedScale');
      if (hidden) hidden.value = btn.getAttribute('data-val') || btn.textContent.trim();
    };

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
  }

  /* =========================================================================
     9. MOBILE NAVIGATION & MODAL CONTROLS
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
