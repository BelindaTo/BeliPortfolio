import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './GolfGame.css';

/* ---------- golf: drag back from the ball and let go to putt. Three holes, one scoring sheet ---------- */
const GW = 800;
const GH = 340;
const BALL_R = 7;
const HOLE_R = 15;
const HOLES = [
  { par: 2, tee: [90, 170], hole: [700, 170], rocks: [] },
  { par: 3, tee: [90, 260], hole: [700, 80], rocks: [{ x: 400, y: 170, r: 30 }] },
  { par: 3, tee: [90, 80], hole: [700, 270], rocks: [{ x: 330, y: 120, r: 28 }, { x: 500, y: 230, r: 32 }] }
];

const scoreName = (strokes, par) => {
  if (strokes === 1) return 'HOLE IN ONE!';
  const d = strokes - par;
  if (d <= -2) return 'EAGLE!';
  if (d === -1) return 'BIRDIE!';
  if (d === 0) return 'PAR';
  if (d === 1) return 'BOGEY';
  return `+${d}`;
};

export function GolfGame() {
  const canvasRef = useRef(null);
  const timer = useRef(null);
  const g = useRef({
    hi: 0,
    ball: { x: HOLES[0].tee[0], y: HOLES[0].tee[1], vx: 0, vy: 0 },
    phase: 'aim', // aim | roll | sunk | done
    drag: null,
    strokes: 0,
    scores: [],
    visible: true
  });
  const [view, setView] = useState({ hi: 0, strokes: 0, scores: [], msg: '', done: false });

  const sync = (msg = '') => {
    const s = g.current;
    setView({ hi: s.hi, strokes: s.strokes, scores: [...s.scores], msg, done: s.phase === 'done' });
  };

  const startHole = (hi) => {
    const s = g.current;
    s.hi = hi;
    s.ball = { x: HOLES[hi].tee[0], y: HOLES[hi].tee[1], vx: 0, vy: 0 };
    s.phase = 'aim';
    s.drag = null;
    s.strokes = 0;
  };

  const restart = () => {
    clearTimeout(timer.current);
    g.current.scores = [];
    startHole(0);
    sync();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = GW * dpr;
    canvas.height = GH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const io = new IntersectionObserver(([en]) => { g.current.visible = en.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    let raf;
    const step = () => {
      const s = g.current;
      const h = HOLES[s.hi];
      const b = s.ball;

      if (s.phase === 'roll') {
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.985;
        b.vy *= 0.985;

        // walls
        if (b.x < BALL_R) { b.x = BALL_R; b.vx *= -0.7; }
        if (b.x > GW - BALL_R) { b.x = GW - BALL_R; b.vx *= -0.7; }
        if (b.y < BALL_R) { b.y = BALL_R; b.vy *= -0.7; }
        if (b.y > GH - BALL_R) { b.y = GH - BALL_R; b.vy *= -0.7; }

        // asteroids
        h.rocks.forEach((r) => {
          const dx = b.x - r.x;
          const dy = b.y - r.y;
          const d = Math.hypot(dx, dy) || 1;
          const min = r.r + BALL_R;
          if (d < min) {
            const nx = dx / d;
            const ny = dy / d;
            b.x = r.x + nx * min;
            b.y = r.y + ny * min;
            const dot = b.vx * nx + b.vy * ny;
            b.vx -= 2 * dot * nx * 0.9;
            b.vy -= 2 * dot * ny * 0.9;
          }
        });

        // the hole pulls slow balls in
        const hd = Math.hypot(b.x - h.hole[0], b.y - h.hole[1]);
        const sp = Math.hypot(b.vx, b.vy);
        if (hd < HOLE_R * 2.4 && sp < 5) {
          b.vx += (h.hole[0] - b.x) * 0.012;
          b.vy += (h.hole[1] - b.y) * 0.012;
        }

        if (hd < HOLE_R && sp < 6.5) {
          b.x = h.hole[0];
          b.y = h.hole[1];
          b.vx = 0;
          b.vy = 0;
          s.phase = 'sunk';
          s.scores.push(s.strokes);
          const name = scoreName(s.strokes, h.par);
          const last = s.hi === HOLES.length - 1;
          sync(name);
          timer.current = setTimeout(() => {
            if (last) {
              g.current.phase = 'done';
              sync(name);
            } else {
              startHole(s.hi + 1);
              sync();
            }
          }, 1200);
        } else if (sp < 0.12) {
          b.vx = 0;
          b.vy = 0;
          s.phase = 'aim';
        }
      }

      if (s.visible) draw(s);
      raf = requestAnimationFrame(step);
    };

    const draw = (s) => {
      const h = HOLES[s.hi];
      const b = s.ball;
      ctx.clearRect(0, 0, GW, GH);

      // fairway outline
      ctx.save();
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = 'rgba(248,250,252,0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(14, 14, GW - 28, GH - 28);
      ctx.restore();

      // tee marker
      ctx.beginPath();
      ctx.arc(h.tee[0], h.tee[1], 14, 0, Math.PI * 2);
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = 'rgba(248,250,252,0.35)';
      ctx.stroke();
      ctx.setLineDash([]);

      // asteroids
      h.rocks.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.fillStyle = '#14161b';
        ctx.fill();
        ctx.strokeStyle = 'rgba(248,250,252,0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x - r.r * 0.3, r.y - r.r * 0.2, r.r * 0.22, 0, Math.PI * 2);
        ctx.arc(r.x + r.r * 0.35, r.y + r.r * 0.3, r.r * 0.14, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(248,250,252,0.35)';
        ctx.stroke();
      });

      // hole + flag
      ctx.beginPath();
      ctx.arc(h.hole[0], h.hole[1], HOLE_R, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.strokeStyle = '#f2b705';
      ctx.lineWidth = 2;
      ctx.stroke();
      if (s.phase !== 'sunk' && s.phase !== 'done') {
        ctx.beginPath();
        ctx.moveTo(h.hole[0], h.hole[1]);
        ctx.lineTo(h.hole[0], h.hole[1] - 50);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(h.hole[0], h.hole[1] - 50);
        ctx.lineTo(h.hole[0] + 24, h.hole[1] - 42);
        ctx.lineTo(h.hole[0], h.hole[1] - 34);
        ctx.closePath();
        ctx.fillStyle = '#ff5a52';
        ctx.fill();
      }

      // aim line
      if (s.drag && s.phase === 'aim') {
        const dx = b.x - s.drag.x;
        const dy = b.y - s.drag.y;
        const d = Math.hypot(dx, dy);
        const power = Math.min(d, 130);
        if (d > 2) {
          const ux = dx / d;
          const uy = dy / d;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + ux * power * 1.6, b.y + uy * power * 1.6);
          ctx.setLineDash([2, 7]);
          ctx.lineCap = 'round';
          ctx.lineWidth = 3;
          ctx.strokeStyle = power > 90 ? '#ff5a52' : power > 45 ? '#f2b705' : '#6f94ff';
          ctx.stroke();
          ctx.setLineDash([]);
          // pull-back handle
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x - ux * power, b.y - uy * power);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(248,250,252,0.5)';
          ctx.stroke();
        }
      }

      // ball
      if (s.phase !== 'sunk' && s.phase !== 'done') {
        ctx.beginPath();
        ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.shadowColor = 'rgba(248,250,252,0.8)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * GW) / r.width, y: ((e.clientY - r.top) * GH) / r.height };
  };

  const onDown = (e) => {
    const s = g.current;
    if (s.phase !== 'aim') return;
    const p = pos(e);
    if (Math.hypot(p.x - s.ball.x, p.y - s.ball.y) < 48) {
      s.drag = p;
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  };

  const onMove = (e) => {
    if (g.current.drag) g.current.drag = pos(e);
  };

  const onUp = () => {
    const s = g.current;
    if (!s.drag) return;
    const dx = s.ball.x - s.drag.x;
    const dy = s.ball.y - s.drag.y;
    const d = Math.hypot(dx, dy);
    s.drag = null;
    if (d < 10) return;
    const power = Math.min(d, 130);
    const speed = power * 0.12;
    s.ball.vx = (dx / d) * speed;
    s.ball.vy = (dy / d) * speed;
    s.strokes += 1;
    s.phase = 'roll';
    sync();
  };

  const totalPar = HOLES.reduce((a, h) => a + h.par, 0);
  const totalStrokes = view.scores.reduce((a, n) => a + n, 0);
  const diff = totalStrokes - totalPar;

  return (
    <div className="gg">
      <div className="gg-head">
        <span>TRY A ROUND</span>
        <span>HOLE {view.hi + 1} · PAR {HOLES[view.hi].par}</span>
      </div>

      <div className="gg-stage">
        <canvas
          ref={canvasRef}
          className="gg-canvas"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
        {view.msg && !view.done && <div key={view.msg + view.hi} className="gg-msg">{view.msg}</div>}
        {view.done && (
          <div className="gg-done">
            <p className="gg-done-title">ROUND COMPLETE</p>
            <p className="gg-done-score">
              {totalStrokes} strokes · {diff === 0 ? 'even par' : diff < 0 ? `${Math.abs(diff)} under par` : `${diff} over par`}
            </p>
            <button className="gg-again" onClick={restart}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      {/* the scoring sheet */}
      <div className="gg-sheet">
        <span className="gg-sheet-k">HOLE</span>
        {HOLES.map((_, i) => (
          <span key={i} className={`gg-sheet-c ${i === view.hi && !view.done ? 'now' : ''}`}>{i + 1}</span>
        ))}
        <span className="gg-sheet-c gg-sheet-t">TOT</span>

        <span className="gg-sheet-k">PAR</span>
        {HOLES.map((h, i) => (
          <span key={i} className="gg-sheet-c">{h.par}</span>
        ))}
        <span className="gg-sheet-c gg-sheet-t">{totalPar}</span>

        <span className="gg-sheet-k">STROKES</span>
        {HOLES.map((h, i) => {
          const done = view.scores[i] !== undefined;
          const live = i === view.hi && !done && view.strokes > 0;
          const under = done && view.scores[i] < h.par;
          const over = done && view.scores[i] > h.par;
          return (
            <span key={i} className={`gg-sheet-c gg-sheet-score ${under ? 'under' : ''} ${over ? 'over' : ''} ${live ? 'live' : ''}`}>
              {done ? view.scores[i] : live ? view.strokes : '–'}
            </span>
          );
        })}
        <span className="gg-sheet-c gg-sheet-t">{view.scores.length ? totalStrokes : '–'}</span>
      </div>

      <p className="gg-hint">DRAG BACK FROM THE BALL, THEN LET GO TO PUTT. WATCH FOR ASTEROIDS.</p>
    </div>
  );
}

/* ---------- landing-page launcher: a little button that opens the game in a window ---------- */
export default function GolfLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button className="gg-launch" onClick={() => setOpen(true)} aria-label="Play a quick round of mini-golf">
        <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
          <ellipse cx="20" cy="33" rx="13" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path className="gg-launch-pole" d="M20 33 V7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path className="gg-launch-flag" d="M20 7 L32 12 L20 17 Z" fill="#d4161c" />
          <circle className="gg-launch-ball" cx="9" cy="30" r="3.2" fill="currentColor" />
        </svg>
        <span>PUTT A ROUND</span>
      </button>

      {/* rendered on <body> so it sits above the page, the orbit nav and everything else */}
      {open &&
        createPortal(
          <div className="gg-overlay" data-lenis-prevent onClick={() => setOpen(false)} role="dialog" aria-modal="true">
            <div className="gg-modal" onClick={(e) => e.stopPropagation()}>
              <button className="gg-close" onClick={() => setOpen(false)} aria-label="Close game">×</button>
              <GolfGame />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}