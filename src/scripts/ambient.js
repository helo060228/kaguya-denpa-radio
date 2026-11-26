/**
 * 月读电波台 Ambient Engine
 * - Canvas floating lunar bokeh, twinkling 4-point stars, rotating 8-petal lunar emblems & dashed Earth-Moon constellation
 * - Web Audio API synthesized shortwave radio static (((•)) OFF / ON)
 * - Perpetual midnight countdown timer
 */

let audioState = {
  ctx: null,
  gain: null,
  playing: false,
};

let canvasStarted = false;

export function bootDenpaAtmosphere() {
  if (!canvasStarted) {
    const canvas = document.getElementById('denpa-ambient');
    if (canvas) {
      canvasStarted = true;
      mountAmbientCanvas(canvas);
    }
  }

  bindAudioButton();
  bindCountdown();
  bindRouteFilters();
  bindGalleryLightbox();
}

function mountAmbientCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const accentRgb = '218, 184, 92';
  let width = 0;
  let height = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 28 }, (_, idx) => {
    const kind = idx % 5 === 0 ? 'motif' : idx % 3 === 0 ? 'bokeh' : 'sparkle';
    return {
      kind,
      x: Math.random() * width,
      y: Math.random() * height,
      r: kind === 'bokeh' ? 4 + Math.random() * 6 : kind === 'motif' ? 5 + Math.random() * 4 : 1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -0.08 - Math.random() * 0.16,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.007,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.24 + Math.random() * 0.52,
    };
  });

  // Lunar orbital triangle constellation anchors
  const stars = [
    { x: 0.08, y: 0.44, r: 5.5 },
    { x: 0.18, y: 0.21, r: 4.2 },
    { x: 0.37, y: 0.35, r: 2.8 },
  ];

  const drawLunarBlossom = (x, y, r, rot, alpha) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.62, r * 0.22, r * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 242, 204, ${Math.min(1, alpha + 0.15)})`;
    ctx.fill();
    ctx.restore();
  };

  const drawSparkle = (x, y, r, alpha) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.8);
    ctx.quadraticCurveTo(r * 0.2, -r * 0.2, r * 1.8, 0);
    ctx.quadraticCurveTo(r * 0.2, r * 0.2, 0, r * 1.8);
    ctx.quadraticCurveTo(-r * 0.2, r * 0.2, -r * 1.8, 0);
    ctx.quadraticCurveTo(-r * 0.2, -r * 0.2, 0, -r * 1.8);
    ctx.fill();
    ctx.restore();
  };

  const drawBokeh = (x, y, r, alpha) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
    grad.addColorStop(0, `rgba(255, 244, 205, ${alpha})`);
    grad.addColorStop(0.45, `rgba(${accentRgb}, ${alpha * 0.45})`);
    grad.addColorStop(1, `rgba(${accentRgb}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
    ctx.fill();
  };

  const render = (now) => {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = 'rgba(235, 227, 218, 0.13)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    stars.forEach((s, i) => {
      const sx = s.x * width;
      const sy = s.y * height;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);
    stars.forEach((s) => drawBokeh(s.x * width, s.y * height, s.r, 0.56));
    ctx.restore();

    for (const p of particles) {
      const pulse = 0.65 + 0.35 * Math.sin(now * 0.0012 + p.phase);
      const a = p.alpha * pulse;
      if (p.kind === 'motif') drawLunarBlossom(p.x, p.y, p.r, p.rot, a);
      else if (p.kind === 'bokeh') drawBokeh(p.x, p.y, p.r, a * 0.85);
      else drawSparkle(p.x, p.y, p.r, a);

      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }
    }

    if (!reducedMotion) requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

function bindAudioButton() {
  const btn = document.querySelector('[data-denpa-audio]');
  if (!btn || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  const syncVisual = () => {
    btn.setAttribute('aria-pressed', String(audioState.playing));
    btn.textContent = audioState.playing ? '((•)) ON' : '((•)) OFF';
  };
  syncVisual();

  btn.addEventListener('click', () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioState.playing) {
      if (!audioState.ctx) {
        const ctx = new AudioCtx();
        const length = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.997 * b0 + white * 0.029;
          b1 = 0.985 * b1 + white * 0.032;
          b2 = 0.950 * b2 + white * 0.048;
          const crackle = Math.random() > 0.9994 ? (Math.random() - 0.5) * 0.45 : 0;
          data[i] = (b0 + b1 + b2 + white * 0.015) * 0.35 + crackle;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1120;
        bandpass.Q.value = 0.65;

        const gain = ctx.createGain();
        gain.gain.value = 0.0001;

        source.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(ctx.destination);
        source.start();

        audioState.ctx = ctx;
        audioState.gain = gain;
      }
      if (audioState.ctx.state === 'suspended') audioState.ctx.resume();
      const now = audioState.ctx.currentTime;
      audioState.gain.gain.cancelScheduledValues(now);
      audioState.gain.gain.exponentialRampToValueAtTime(0.065, now + 0.35);
      audioState.playing = true;
    } else {
      if (audioState.ctx && audioState.gain) {
        const now = audioState.ctx.currentTime;
        audioState.gain.gain.cancelScheduledValues(now);
        audioState.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      }
      audioState.playing = false;
    }
    syncVisual();
  });
}

let countdownInterval = null;
function bindCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  const el = document.querySelector('[data-denpa-countdown]');
  if (!el) return;

  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(24, 0, 0, 0);
    let diff = Math.max(1, Math.floor((target.getTime() - now.getTime()) / 1000));
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  };
  tick();
  countdownInterval = setInterval(tick, 1000);
}

function bindRouteFilters() {
  const buttons = document.querySelectorAll('[data-route-filter]');
  const cards = document.querySelectorAll('[data-post-card]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-route-filter');
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      cards.forEach((card) => {
        const route = card.getAttribute('data-route');
        card.style.display = target === 'all' || route === target ? '' : 'none';
      });
    });
  });
}

function bindGalleryLightbox() {
  const box = document.getElementById('denpa-lightbox');
  const tiles = document.querySelectorAll('[data-lightbox-src]');
  if (!box || !tiles.length) return;

  const img = box.querySelector('[data-lightbox-img]');
  const fig = box.querySelector('[data-lightbox-fig]');
  const caption = box.querySelector('[data-lightbox-caption]');
  const closeBtn = box.querySelector('[data-lightbox-close]');

  const close = () => box.classList.remove('is-open');

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      if (img) img.src = tile.getAttribute('data-lightbox-src') || '';
      if (img) img.alt = tile.getAttribute('data-lightbox-title') || '';
      if (fig) fig.textContent = tile.getAttribute('data-lightbox-fig') || '';
      if (caption) caption.textContent = tile.getAttribute('data-lightbox-caption') || '';
      box.classList.add('is-open');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
