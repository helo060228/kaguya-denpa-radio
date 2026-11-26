/**
 * 月读电波台 Full Interactive & Ambient Engine
 * - Persistent Canvas starfield, lunar bokeh, rotating 8-petal blossoms & constellation
 * - 3-Channel Web Audio Ambient Tuner (CH.01 短波白噪 / CH.02 东京夜雨 / CH.03 月读和弦) + volume
 * - Random Signal Quote Receiver with CRT glitch pulse
 * - Character Form Switcher (月读虚拟形态 ↔ 东京现实日常)
 * - 8000-Year Timeline Spoiler Guard (per-node & global unlock)
 * - 9-Plate Gallery Category Filter + Exhibition Darkroom Lightbox (←/→ + pure-art mode)
 * - Anonymous Signal Guestbook Wall (ECS persistent API with graceful localStorage fallback)
 * - Perpetual countdown, article reading progress, spoiler shield, scroll reveals & back-to-top
 */

const CHANNEL_INFO = {
  static: { label: 'CH.01 短波白噪', toast: '// CH.01 · 8000.00 kHz — 深夜短波底噪已开启' },
  rain: { label: 'CH.02 东京夜雨', toast: '// CH.02 · 101.40 MHz — 东京深夜细雨已开启' },
  pad: { label: 'CH.03 月读和弦', toast: '// CH.03 · 104.80 MHz — 月读空灵和弦已开启' },
};

const audioState = {
  ctx: null,
  masterGain: null,
  activeNodes: [],
  channel: 'static',
  volume: 0.65,
  playing: false,
};

let canvasStarted = false;
let countdownInterval = null;
let toastTimer = null;
let scrollListenerBound = false;
let lightboxKeyHandler = null;
let tunerDocClickBound = false;

export function bootDenpaAtmosphere() {
  if (!canvasStarted) {
    const canvas = document.getElementById('denpa-ambient');
    if (canvas) {
      canvasStarted = true;
      mountAmbientCanvas(canvas);
    }
  }

  const scanlines = document.querySelector('[data-scanlines]');
  if (scanlines) scanlines.classList.remove('is-muted');

  bindAudioTuner();
  bindCountdown();
  bindRandomQuote();
  bindRouteFilters();
  bindSpoilerToggle();
  bindCharacterForms();
  bindTimeline();
  bindGalleryAndLightbox();
  bindGuestbook();
  bindScrollBehaviors();
  bindScrollReveals();
}

function showSignalToast(message) {
  const el = document.querySelector('[data-denpa-toast]');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-shown');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('is-shown');
  }, 2900);
}

/* --------------------------------------------------------------------------
   1. Persistent Ambient Canvas
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   2. 3-Channel Web Audio Ambient Tuner (Static / Tokyo Rain / Lunar Pad)
   -------------------------------------------------------------------------- */
function stopAudioGraph() {
  for (const node of audioState.activeNodes) {
    try {
      if (typeof node.stop === 'function') node.stop();
      if (typeof node.disconnect === 'function') node.disconnect();
    } catch {}
  }
  audioState.activeNodes = [];
}

function buildChannelGraph(channel) {
  const ctx = audioState.ctx;
  const master = audioState.masterGain;
  if (!ctx || !master) return;

  stopAudioGraph();

  if (channel === 'static' || channel === 'rain') {
    const length = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.950 * b2 + white * 0.048;
      if (channel === 'static') {
        const crackle = Math.random() > 0.9994 ? (Math.random() - 0.5) * 0.45 : 0;
        data[i] = (b0 + b1 + b2 + white * 0.015) * 0.36 + crackle;
      } else {
        // Soft steady Tokyo rain with delicate high shimmer
        const drop = Math.random() > 0.9985 ? (Math.random() - 0.5) * 0.20 : 0;
        data[i] = (b0 * 0.65 + b1 * 0.45 + white * 0.08) * 0.45 + drop;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    if (channel === 'static') {
      filter.type = 'bandpass';
      filter.frequency.value = 1120;
      filter.Q.value = 0.65;
    } else {
      filter.type = 'lowpass';
      filter.frequency.value = 2100;
      filter.Q.value = 0.45;
    }

    src.connect(filter);
    filter.connect(master);
    src.start();
    audioState.activeNodes.push(src, filter);
  } else if (channel === 'pad') {
    // Ethereal Dmaj9 ambient lunar chord drone
    const freqs = [146.83, 220.0, 277.18, 329.63, 369.99];
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 640;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.14;
    lfoGain.gain.value = 160;
    lfo.connect(lfoGain);
    lfoGain.connect(lp.frequency);
    lfo.start();

    lp.connect(master);
    audioState.activeNodes.push(lp, lfo, lfoGain);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      osc.detune.value = (i - 2) * 3.5;
      g.gain.value = i === 0 ? 0.16 : 0.085;
      osc.connect(g);
      g.connect(lp);
      osc.start();
      audioState.activeNodes.push(osc, g);
    });
  }
}

function targetGainFor(channel, volume) {
  const base = channel === 'pad' ? 0.18 : channel === 'rain' ? 0.11 : 0.095;
  return Math.max(0.0001, base * volume);
}

function bindAudioTuner() {
  const btn = document.querySelector('[data-denpa-audio]');
  const chev = document.querySelector('[data-tuner-toggle]');
  const pop = document.querySelector('[data-tuner-popover]');
  const volInput = document.querySelector('[data-audio-volume]');
  const chBtns = document.querySelectorAll('[data-audio-channel]');
  if (!btn || btn.dataset.bound === '1') return;
  btn.dataset.bound = '1';

  const labelEl = btn.querySelector('[data-audio-label]');
  const syncVisual = () => {
    btn.setAttribute('aria-pressed', String(audioState.playing));
    if (labelEl) {
      labelEl.textContent = audioState.playing ? '((•)) ON' : '((•)) OFF';
    }
    chBtns.forEach((b) => {
      const active = b.getAttribute('data-audio-channel') === audioState.channel;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-checked', String(active));
    });
  };
  syncVisual();

  const ensureCtx = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    if (!audioState.ctx) {
      audioState.ctx = new AudioCtx();
      audioState.masterGain = audioState.ctx.createGain();
      audioState.masterGain.gain.value = 0.0001;
      audioState.masterGain.connect(audioState.ctx.destination);
    }
    if (audioState.ctx.state === 'suspended') audioState.ctx.resume();
    return true;
  };

  const turnOn = (channel = audioState.channel) => {
    if (!ensureCtx()) {
      showSignalToast('// AUDIO UNAVAILABLE — 当前浏览器不支持 Web Audio');
      return;
    }
    audioState.channel = channel;
    buildChannelGraph(channel);
    const now = audioState.ctx.currentTime;
    audioState.masterGain.gain.cancelScheduledValues(now);
    audioState.masterGain.gain.exponentialRampToValueAtTime(
      targetGainFor(channel, audioState.volume),
      now + 0.35
    );
    audioState.playing = true;
    syncVisual();
    showSignalToast(CHANNEL_INFO[channel]?.toast || '// TUNED — 氛围音频已开启');
  };

  const turnOff = () => {
    if (audioState.ctx && audioState.masterGain) {
      const now = audioState.ctx.currentTime;
      audioState.masterGain.gain.cancelScheduledValues(now);
      audioState.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    }
    audioState.playing = false;
    syncVisual();
    showSignalToast('// STANDBY — 深夜氛围音频已静默');
  };

  btn.addEventListener('click', () => (audioState.playing ? turnOff() : turnOn()));

  if (chev && pop) {
    chev.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = pop.classList.toggle('is-open');
      chev.setAttribute('aria-expanded', String(open));
    });
    pop.addEventListener('click', (e) => e.stopPropagation());

    if (!tunerDocClickBound) {
      tunerDocClickBound = true;
      document.addEventListener('click', () => {
        const p = document.querySelector('[data-tuner-popover]');
        const c = document.querySelector('[data-tuner-toggle]');
        if (p && p.classList.contains('is-open')) {
          p.classList.remove('is-open');
          if (c) c.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  chBtns.forEach((b) => {
    b.addEventListener('click', () => {
      const ch = b.getAttribute('data-audio-channel') || 'static';
      turnOn(ch);
    });
  });

  if (volInput) {
    volInput.addEventListener('input', () => {
      audioState.volume = Number(volInput.value) / 100;
      if (audioState.playing && audioState.ctx && audioState.masterGain) {
        const now = audioState.ctx.currentTime;
        audioState.masterGain.gain.setTargetAtTime(
          targetGainFor(audioState.channel, audioState.volume),
          now,
          0.08
        );
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Perpetual Countdown & Random Signal Quote Receiver
   -------------------------------------------------------------------------- */
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

function bindRandomQuote() {
  const btn = document.querySelector('[data-random-quote-btn]');
  const qEl = document.querySelector('[data-random-quote-text]');
  const sEl = document.querySelector('[data-random-quote-source]');
  if (!btn || !qEl || !sEl) return;

  let quotes = [];
  try {
    quotes = JSON.parse(qEl.getAttribute('data-quotes-json') || '[]');
  } catch {
    return;
  }
  if (quotes.length < 2) return;

  let current = 0;
  btn.addEventListener('click', () => {
    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * quotes.length);
    }
    current = next;
    const item = quotes[current];
    qEl.classList.add('is-glitching');
    setTimeout(() => {
      qEl.innerHTML = `${item.lines[0]}<br />${item.lines[1]}`;
      sEl.textContent = item.source;
      qEl.classList.remove('is-glitching');
    }, 140);
  });
}

/* --------------------------------------------------------------------------
   4. Route Filter & Spoiler Shield
   -------------------------------------------------------------------------- */
function bindRouteFilters() {
  const buttons = document.querySelectorAll('[data-route-filter]');
  const cards = document.querySelectorAll('[data-post-card]');
  const countEl = document.querySelector('[data-filter-count]');
  if (!buttons.length || !cards.length) return;

  const total = cards.length;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-route-filter');
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      let visible = 0;
      cards.forEach((card) => {
        const match = target === 'all' || card.getAttribute('data-route') === target;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (countEl) countEl.textContent = `当前显示 ${visible} / ${total} 条记录`;
    });
  });
}

function bindSpoilerToggle() {
  const toggleBtn = document.querySelector('[data-spoiler-toggle]');
  const bodyEl = document.querySelector('[data-spoiler-body]');
  if (!toggleBtn || !bodyEl) return;

  toggleBtn.addEventListener('click', () => {
    const shielded = bodyEl.classList.toggle('is-shielded');
    toggleBtn.setAttribute('aria-pressed', String(shielded));
    toggleBtn.textContent = shielded ? '展开剧透正文' : '暂遮正文';
    showSignalToast(shielded ? '// SPOILER SHIELD — 已暂遮剧透段落' : '// SPOILER CLEAR — 已展开正文');
  });
}

/* --------------------------------------------------------------------------
   5. Character Dual-Form Switcher (/characters/)
   -------------------------------------------------------------------------- */
function bindCharacterForms() {
  const cards = document.querySelectorAll('[data-char-card]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const sprite = card.querySelector('[data-char-sprite]');
    const cap = card.querySelector('[data-char-caption]');
    const btns = card.querySelectorAll('[data-form-btn]');
    if (!sprite || !btns.length) return;

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) return;
        btns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        const newSrc = btn.getAttribute('data-form-src') || '';
        const newCap = btn.getAttribute('data-form-caption') || '';
        const newAlt = btn.getAttribute('data-form-alt') || '';
        sprite.classList.add('is-swapping');
        setTimeout(() => {
          sprite.src = newSrc;
          sprite.alt = newAlt;
          if (cap) cap.textContent = newCap;
          sprite.classList.remove('is-swapping');
        }, 160);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. 8000-Year Timeline Spoiler Guard (/timeline/)
   -------------------------------------------------------------------------- */
function bindTimeline() {
  const revealAllBtn = document.querySelector('[data-timeline-reveal-all]');
  const items = Array.from(document.querySelectorAll('[data-epoch-item]'));
  if (!items.length) return;

  const spoilerItems = items.filter((el) => el.getAttribute('data-epoch-spoiler') === '1');

  const syncMasterBtn = () => {
    if (!revealAllBtn) return;
    const anyLocked = spoilerItems.some((el) => el.classList.contains('is-spoiler-locked'));
    revealAllBtn.setAttribute('aria-pressed', String(!anyLocked));
    revealAllBtn.textContent = anyLocked ? '展开全部剧透节点' : '重新折叠剧透节点';
  };

  spoilerItems.forEach((item) => {
    const btn = item.querySelector('[data-epoch-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const locked = item.classList.toggle('is-spoiler-locked');
      btn.setAttribute('aria-pressed', String(!locked));
      btn.textContent = locked ? '解锁剧透' : '收起节点';
      syncMasterBtn();
    });
  });

  if (revealAllBtn) {
    revealAllBtn.addEventListener('click', () => {
      const anyLocked = spoilerItems.some((el) => el.classList.contains('is-spoiler-locked'));
      spoilerItems.forEach((item) => {
        item.classList.toggle('is-spoiler-locked', !anyLocked);
        const b = item.querySelector('[data-epoch-toggle]');
        if (b) {
          b.setAttribute('aria-pressed', String(anyLocked));
          b.textContent = anyLocked ? '收起节点' : '解锁剧透';
        }
      });
      syncMasterBtn();
      showSignalToast(anyLocked ? '// TIMELINE UNLOCKED — 已展开全部 8000 年因果节点' : '// TIMELINE SHIELDED — 已重新折叠剧透节点');
    });
  }
}

/* --------------------------------------------------------------------------
   7. 9-Plate Gallery Category Filter + Exhibition Lightbox
   -------------------------------------------------------------------------- */
function bindGalleryAndLightbox() {
  if (lightboxKeyHandler) {
    document.removeEventListener('keydown', lightboxKeyHandler);
    lightboxKeyHandler = null;
  }

  const box = document.getElementById('denpa-lightbox');
  const allTiles = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  if (!box || !allTiles.length) return;

  const filterBtns = document.querySelectorAll('[data-gallery-filter]');
  const countEl = document.querySelector('[data-gallery-count]');

  const img = box.querySelector('[data-lightbox-img]');
  const fig = box.querySelector('[data-lightbox-fig]');
  const caption = box.querySelector('[data-lightbox-caption]');
  const counter = box.querySelector('[data-lightbox-counter]');
  const closeBtn = box.querySelector('[data-lightbox-close]');
  const prevBtn = box.querySelector('[data-lightbox-prev]');
  const nextBtn = box.querySelector('[data-lightbox-next]');
  const crtBtn = box.querySelector('[data-lightbox-crt]');
  const scanlines = document.querySelector('[data-scanlines]');

  let activeTiles = allTiles;
  let currentIdx = 0;
  let pureArt = false;

  const pad2 = (n) => String(n).padStart(2, '0');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-gallery-filter');
      filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      activeTiles = [];
      allTiles.forEach((tile) => {
        const match = cat === 'all' || tile.getAttribute('data-gallery-cat') === cat;
        tile.style.display = match ? '' : 'none';
        if (match) activeTiles.push(tile);
      });
      if (countEl) {
        countEl.textContent = `当前显示 ${activeTiles.length} / ${allTiles.length} 幅官图 · 点击展开暗房预览`;
      }
    });
  });

  const syncCrt = () => {
    if (crtBtn) {
      crtBtn.setAttribute('aria-pressed', String(pureArt));
      crtBtn.textContent = pureArt ? '恢复扫描线' : '纯原画模式';
    }
    if (scanlines) scanlines.classList.toggle('is-muted', pureArt);
  };

  const renderAt = (idx) => {
    if (!activeTiles.length) return;
    currentIdx = (idx + activeTiles.length) % activeTiles.length;
    const tile = activeTiles[currentIdx];
    if (img) {
      img.src = tile.getAttribute('data-lightbox-src') || '';
      img.alt = tile.getAttribute('data-lightbox-title') || '';
    }
    if (fig) fig.textContent = tile.getAttribute('data-lightbox-fig') || '';
    if (caption) caption.textContent = tile.getAttribute('data-lightbox-caption') || '';
    if (counter) counter.textContent = `${pad2(currentIdx + 1)} / ${pad2(activeTiles.length)}`;
  };

  const openTile = (tile) => {
    const idx = activeTiles.indexOf(tile);
    renderAt(idx >= 0 ? idx : 0);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    if (pureArt) {
      pureArt = false;
      syncCrt();
    }
  };

  allTiles.forEach((tile) => tile.addEventListener('click', () => openTile(tile)));
  if (prevBtn) prevBtn.addEventListener('click', () => renderAt(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderAt(currentIdx + 1));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (crtBtn) {
    crtBtn.addEventListener('click', () => {
      pureArt = !pureArt;
      syncCrt();
      showSignalToast(pureArt ? '// PURE ART — 已暂时隐藏 CRT 扫描线' : '// CRT RESTORED — 已恢复复古扫描线');
    });
  }

  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });

  lightboxKeyHandler = (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') renderAt(currentIdx - 1);
    else if (e.key === 'ArrowRight') renderAt(currentIdx + 1);
  };
  document.addEventListener('keydown', lightboxKeyHandler);
}

/* --------------------------------------------------------------------------
   8. Anonymous Signal Guestbook (/guestbook/ — Live ECS API + Local Fallback)
   -------------------------------------------------------------------------- */
const FALLBACK_SIGNALS = [
  {
    id: 'SIG-003',
    author: '月见八千代',
    channel: '5',
    freq: '8000.00 kHz',
    time: '2026.02.20 00:00',
    message: '欢迎来到月读电波台。无论你在哪条时间线上，请收听，请回应，我在这里。',
  },
  {
    id: 'SIG-002',
    author: '彩P',
    channel: '2',
    freq: '102.15 MHz',
    time: '2026.01.28 23:42',
    message: '今晚的编曲轨总算混完了，下一首舞台曲绝对要唱给整个夜空听。',
  },
  {
    id: 'SIG-001',
    author: '电台台长',
    channel: '1',
    freq: '101.40 MHz',
    time: '2026.01.22 22:15',
    message: '深夜建台第一条测试讯号：愿每一位喜欢《超时空辉夜姬！》的旅人，都能在月圆之夜重逢。',
  },
];

const FREQ_BY_CH = {
  '1': '101.40 MHz',
  '2': '102.15 MHz',
  '3': '104.80 MHz',
  '4': '106.20 MHz',
  '5': '8000.00 kHz',
};

function bindGuestbook() {
  const form = document.querySelector('[data-gb-form]');
  const feed = document.querySelector('[data-gb-feed]');
  const statusEl = document.querySelector('[data-gb-status]');
  const countEl = document.querySelector('[data-gb-count]');
  const feedbackEl = document.querySelector('[data-gb-feedback]');
  const charCountEl = document.querySelector('[data-gb-charcount]');
  const submitBtn = document.querySelector('[data-gb-submit]');
  if (!form || !feed) return;

  const textarea = form.querySelector('textarea[name="message"]');
  if (textarea && charCountEl) {
    textarea.addEventListener('input', () => {
      charCountEl.textContent = `${textarea.value.length} / 240`;
    });
  }

  let liveMode = true;
  const LOCAL_KEY = 'kaguya_denpa_signals_v1';

  const renderSignals = (list) => {
    feed.textContent = '';
    if (countEl) countEl.textContent = `共 ${list.length} 条电波`;
    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'denpa-gb-loading';
      empty.textContent = '频段暂时安静，欢迎发出第一条留声。';
      feed.appendChild(empty);
      return;
    }

    list.forEach((sig) => {
      const card = document.createElement('article');
      card.className = 'denpa-signal-item';
      card.setAttribute('data-ch', String(sig.channel || '5'));

      const meta = document.createElement('div');
      meta.className = 'denpa-signal-meta';

      const author = document.createElement('span');
      author.className = 'denpa-signal-author';
      author.textContent = `${sig.id || 'SIG'} // ${sig.author || '匿名收听者'} · ${sig.freq || '8000.00 kHz'}`;

      const time = document.createElement('span');
      time.className = 'denpa-signal-time';
      time.textContent = sig.time || '';

      const msg = document.createElement('p');
      msg.className = 'denpa-signal-msg';
      msg.textContent = sig.message || '';

      meta.appendChild(author);
      meta.appendChild(time);
      card.appendChild(meta);
      card.appendChild(msg);
      feed.appendChild(card);
    });
  };

  const loadLocal = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null');
      return Array.isArray(saved) && saved.length ? saved : FALLBACK_SIGNALS;
    } catch {
      return FALLBACK_SIGNALS;
    }
  };

  const loadSignals = async () => {
    try {
      const res = await fetch('/api/signals', { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('static');
      const data = await res.json();
      if (!Array.isArray(data.signals)) throw new Error('bad-payload');
      liveMode = true;
      if (statusEl) statusEl.textContent = '// LIVE ECS SYNC · 全网实时同步';
      renderSignals(data.signals);
    } catch {
      liveMode = false;
      if (statusEl) statusEl.textContent = '// STATIC PREVIEW · 离线本地模式';
      renderSignals(loadLocal());
    }
  };
  loadSignals();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const author = String(fd.get('author') || '').trim() || '匿名收听者';
    const channel = String(fd.get('channel') || '5');
    const message = String(fd.get('message') || '').trim();
    const website = String(fd.get('website') || '');

    if (feedbackEl) feedbackEl.classList.remove('is-error');
    if (!message) {
      if (feedbackEl) {
        feedbackEl.classList.add('is-error');
        feedbackEl.textContent = '请先输入想发送的电波内容。';
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (feedbackEl) feedbackEl.textContent = '正在向频段发射讯号…';

    try {
      if (liveMode) {
        const res = await fetch('/api/signals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ author, channel, message, website }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || '发送失败，请稍后重试');
        renderSignals(data.signals);
        showSignalToast(`// TRANSMITTED · ${data.created?.id || 'NEW'} 已广播至全网`);
      } else {
        const existing = loadLocal();
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const created = {
          id: `SIG-${String(existing.length + 1).padStart(3, '0')}`,
          author: author.slice(0, 20),
          channel,
          freq: FREQ_BY_CH[channel] || '8000.00 kHz',
          time: `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
          message: message.slice(0, 240),
        };
        const updated = [created, ...existing];
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
        renderSignals(updated);
        showSignalToast('// LOCAL SAVED — 离线预览模式，已保存在当前浏览器');
      }

      form.reset();
      if (charCountEl) charCountEl.textContent = '0 / 240';
      if (feedbackEl) feedbackEl.textContent = '讯号已成功收录。';
    } catch (err) {
      if (feedbackEl) {
        feedbackEl.classList.add('is-error');
        feedbackEl.textContent = err.message || '发射受阻，请稍后再试。';
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

/* --------------------------------------------------------------------------
   9. Scroll UI & Reveal Choreography
   -------------------------------------------------------------------------- */
function updateScrollUI() {
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const cue = document.querySelector('[data-scroll-cue]');
  if (cue) cue.classList.toggle('is-hidden', scrollY > 72);

  const topBtn = document.querySelector('[data-back-to-top]');
  if (topBtn) topBtn.classList.toggle('is-visible', scrollY > 360);

  const progressBar = document.querySelector('[data-reading-progress]');
  if (progressBar) {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
    progressBar.style.transform = `scaleX(${ratio})`;
  }
}

function bindScrollBehaviors() {
  if (!scrollListenerBound) {
    scrollListenerBound = true;
    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI, { passive: true });
  }
  updateScrollUI();

  const topBtn = document.querySelector('[data-back-to-top]');
  if (topBtn && topBtn.dataset.bound !== '1') {
    topBtn.dataset.bound = '1';
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function bindScrollReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('is-visible');
    } else {
      el.classList.add('is-pending');
      io.observe(el);
    }
  });
}
