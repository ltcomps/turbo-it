"use client";
/**
 * FlappyBirdGame canvas engine — standalone clone of LT's FlappyBirdGame.tsx.
 * No external deps beyond React. Kept as a leading-underscore module so it's obviously
 * a demo-internal helper, not a public export.
 * Source: luckyturboV2_1/src/components/FlappyBirdGame.tsx
 */
import { useEffect, useRef, useCallback, useState } from "react";

interface FlappyBirdGameProps {
  onGameOver: (score: number) => void;
  onScoreUpdate?: (score: number) => void;
  isPlaying: boolean;
}

type GameState = "ready" | "playing" | "dead";

interface Bird { x: number; y: number; velocity: number; rotation: number; wingPhase: number; wingTimer: number }
interface Pipe { x: number; gapY: number; scored: boolean }
interface Cloud { x: number; y: number; width: number; height: number; speed: number; opacity: number }

const REF_H = 600;
const GRAVITY = 0.52;
const FLAP_IMPULSE = -7.5;
const MAX_FALL_SPEED = 12;
const BIRD_R = 15;
const HITBOX_SHRINK = 3;
const PIPE_W = 60;
const PIPE_CAP_W = 66;
const PIPE_CAP_H = 26;
const PIPE_GAP = 130;
const PIPE_SPAWN_DIST = 190;
const BASE_SPEED = 3.0;
const MAX_SPEED = 5.5;
const SPEED_PER_PIPE = 0.15;
const GROUND_PCT = 0.15;
const GRASS_H = 12;
const BIRD_X_PCT = 0.2;
const CLOUD_N = 5;
const BOB_AMP = 6;
const BOB_SPD = 0.04;
const WING_DUR = 6;
const DEATH_MS = 800;

const C = {
  body: "#3B82F6", belly: "#93C5FD", beak: "#F97316",
  eye: "#FFFFFF", pupil: "#1E293B", wing: "#2563EB",
  pipe1: "#059669", pipe2: "#10B981", pipeCap: "#047857",
  skyT: "#7DD3FC", skyB: "#BAE6FD",
  grassT: "#65A30D", grassB: "#4D7C0F",
  dirtT: "#92400E", dirtB: "#78350F",
  cloud: "rgba(255,255,255,0.7)",
  scoreFill: "#FFFFFF", scoreShadow: "rgba(0,0,0,0.4)",
};

function rRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

export function FlappyBirdGame({ onGameOver, onScoreUpdate, isPlaying }: FlappyBirdGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const g = useRef({
    state: "ready" as GameState,
    bird: { x: 0, y: 0, velocity: 0, rotation: 0, wingPhase: 0, wingTimer: 0 } as Bird,
    pipes: [] as Pipe[], clouds: [] as Cloud[],
    score: 0, speed: BASE_SPEED, groundOff: 0, frame: 0,
    flash: 0, pulse: 0, tapPhase: 0,
    lw: 0, lh: 0, dpr: 1, sc: 1,
    deathTimer: null as ReturnType<typeof setTimeout> | null,
    lastTime: 0,
    skyGrad: null as CanvasGradient | null,
    grassGrad: null as CanvasGradient | null,
    dirtGrad: null as CanvasGradient | null,
  });
  const [, setScore] = useState(0);
  const [, setState] = useState<GameState>("ready");
  const cbOver = useRef(onGameOver);
  const cbScore = useRef(onScoreUpdate);
  useEffect(() => { cbOver.current = onGameOver; }, [onGameOver]);
  useEffect(() => { cbScore.current = onScoreUpdate; }, [onScoreUpdate]);

  const initClouds = useCallback((w: number, h: number): Cloud[] => {
    const out: Cloud[] = [];
    for (let i = 0; i < CLOUD_N; i++) {
      out.push({ x: Math.random() * w * 1.5, y: Math.random() * h * 0.4 + h * 0.05,
        width: 60 + Math.random() * 80, height: 20 + Math.random() * 25,
        speed: 0.2 + Math.random() * 0.4, opacity: 0.3 + Math.random() * 0.4 });
    }
    return out;
  }, []);

  const resetBird = useCallback((w: number, h: number): Bird => {
    const gy = h * (1 - GROUND_PCT);
    return { x: w * BIRD_X_PCT, y: gy * 0.45, velocity: 0, rotation: 0, wingPhase: 0, wingTimer: 0 };
  }, []);

  const resetAll = useCallback(() => {
    const s = g.current;
    s.bird = resetBird(s.lw, s.lh);
    s.pipes = []; s.score = 0; s.speed = BASE_SPEED;
    s.groundOff = 0; s.frame = 0; s.flash = 0; s.pulse = 0;
    s.lastTime = 0; s.state = "ready";
    setScore(0); setState("ready");
  }, [resetBird]);

  const flap = useCallback(() => {
    const s = g.current;
    if (s.state === "dead") return;
    if (s.state === "ready") { s.state = "playing"; setState("playing"); }
    s.bird.velocity = FLAP_IMPULSE * s.sc;
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); flap(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [flap]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      const s = g.current;
      s.lw = w; s.lh = h; s.dpr = dpr; s.sc = h / REF_H;
      const ctx2 = canvas.getContext("2d");
      if (ctx2) {
        const gy = h * (1 - GROUND_PCT), grassH = GRASS_H * s.sc;
        s.skyGrad = ctx2.createLinearGradient(0, 0, 0, h);
        s.skyGrad.addColorStop(0, C.skyT); s.skyGrad.addColorStop(1, C.skyB);
        s.grassGrad = ctx2.createLinearGradient(0, gy, 0, gy + grassH);
        s.grassGrad.addColorStop(0, C.grassT); s.grassGrad.addColorStop(1, C.grassB);
        s.dirtGrad = ctx2.createLinearGradient(0, gy + grassH, 0, h);
        s.dirtGrad.addColorStop(0, C.dirtT); s.dirtGrad.addColorStop(1, C.dirtB);
      }
      if (s.state === "ready") { s.bird = resetBird(w, h); s.clouds = initClouds(w, h); }
    };
    resize();
    const s = g.current;
    s.clouds = initClouds(s.lw, s.lh);
    s.bird = resetBird(s.lw, s.lh);
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [initClouds, resetBird]);

  useEffect(() => { if (isPlaying && g.current.state === "dead") resetAll(); }, [isPlaying, resetAll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let alive = true;
    const die = () => {
      const s = g.current;
      if (s.state !== "playing") return;
      s.state = "dead"; setState("dead");
      s.flash = 0.7;
      s.deathTimer = setTimeout(() => cbOver.current(s.score), DEATH_MS);
    };
    const tick = (timestamp: number) => {
      if (!alive) return;
      const s = g.current;
      const { lw: w, lh: h, dpr, sc, bird, pipes, clouds } = s;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(tick); return; }
      if (s.lastTime === 0) s.lastTime = timestamp;
      const rawDt = timestamp - s.lastTime;
      s.lastTime = timestamp;
      const dt = Math.min(rawDt, 33.33) / 16.667;
      const gy = h * (1 - GROUND_PCT);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = s.skyGrad || C.skyT; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = C.cloud;
      for (const cl of clouds) {
        const cw = cl.width * sc, ch = cl.height * sc;
        ctx.globalAlpha = cl.opacity;
        ctx.beginPath();
        ctx.ellipse(cl.x, cl.y, cw * 0.5, ch * 0.5, 0, 0, Math.PI * 2);
        ctx.ellipse(cl.x - cw * 0.3, cl.y + ch * 0.1, cw * 0.35, ch * 0.4, 0, 0, Math.PI * 2);
        ctx.ellipse(cl.x + cw * 0.3, cl.y + ch * 0.05, cw * 0.38, ch * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
        cl.x -= cl.speed * sc * dt;
        if (cl.x + cw < 0) { cl.x = w + cw; cl.y = Math.random() * h * 0.4 + h * 0.05; }
      }
      ctx.globalAlpha = 1;
      if (s.state === "playing") {
        s.frame++;
        s.speed = Math.min(BASE_SPEED + s.score * SPEED_PER_PIPE, MAX_SPEED);
        const spd = s.speed * sc * dt;
        const gap = PIPE_GAP * sc;
        const sdist = PIPE_SPAWN_DIST * sc;
        const last = pipes[pipes.length - 1];
        if (!last || last.x < w - sdist) {
          const minY = gap * 0.65 + 30 * sc;
          const maxY = gy - gap * 0.65 - 15 * sc;
          const range = Math.max(maxY - minY, 10);
          const newY = minY + Math.random() * range;
          pipes.push({ x: last ? Math.max(w + 10, last.x + sdist) : w + 50 * sc,
            gapY: Math.min(Math.max(newY, minY), maxY), scored: false });
        }
        for (const p of pipes) p.x -= spd;
        while (pipes.length > 0 && pipes[0].x + PIPE_W * sc < -10) pipes.shift();
        for (const p of pipes) {
          if (!p.scored && bird.x > p.x + (PIPE_W * sc) / 2) {
            p.scored = true; s.score++; s.pulse = 1;
            setScore(s.score); cbScore.current?.(s.score);
          }
        }
        s.groundOff += spd;
        bird.velocity += GRAVITY * sc * dt;
        bird.velocity = Math.min(bird.velocity, MAX_FALL_SPEED * sc);
        bird.y += bird.velocity * dt;
        const nv = bird.velocity / sc;
        const tr = Math.min(Math.max(nv * 0.08, -0.5), Math.PI / 2.2);
        bird.rotation += (tr - bird.rotation) * Math.min(0.15 * dt, 1);
        bird.wingTimer += dt;
        if (bird.wingTimer >= (bird.velocity < 0 ? 3 : WING_DUR)) {
          bird.wingTimer = 0; bird.wingPhase = (bird.wingPhase + 1) % 3;
        }
        const hr = (BIRD_R - HITBOX_SHRINK) * sc;
        const pw = PIPE_W * sc, cw = PIPE_CAP_W * sc, ch = PIPE_CAP_H * sc;
        const co = (cw - pw) / 2;
        if (bird.y + hr >= gy) { bird.y = gy - hr; die(); }
        if (bird.y - hr <= 0) { bird.y = hr; bird.velocity = 1; }
        if (s.state === "playing") {
          for (const p of pipes) {
            const hg = gap / 2;
            const tB = p.gapY - hg, bT = p.gapY + hg;
            if (bird.x + hr > p.x && bird.x - hr < p.x + pw) {
              if (bird.y - hr < tB || bird.y + hr > bT) { die(); break; }
            }
            if (bird.x + hr > p.x - co && bird.x - hr < p.x - co + cw) {
              if (bird.y + hr > tB - ch && bird.y - hr < tB) { die(); break; }
              if (bird.y + hr > bT && bird.y - hr < bT + ch) { die(); break; }
            }
          }
        }
      } else if (s.state === "ready") {
        s.frame += dt;
        bird.y = gy * 0.45 + Math.sin(s.frame * BOB_SPD) * BOB_AMP * sc;
        bird.wingTimer += dt;
        if (bird.wingTimer >= WING_DUR) { bird.wingTimer = 0; bird.wingPhase = (bird.wingPhase + 1) % 3; }
        bird.rotation = 0;
        s.groundOff += 0.5 * sc * dt;
      } else {
        bird.velocity += GRAVITY * sc * dt;
        bird.velocity = Math.min(bird.velocity, MAX_FALL_SPEED * sc);
        bird.y += bird.velocity * dt;
        bird.rotation = Math.min(bird.rotation + 0.1 * dt, Math.PI / 2);
        if (bird.y + BIRD_R * sc >= gy) { bird.y = gy - BIRD_R * sc; bird.velocity = 0; }
      }
      for (const p of pipes) {
        const pw = PIPE_W * sc, cw2 = PIPE_CAP_W * sc, ch2 = PIPE_CAP_H * sc;
        const co2 = (cw2 - pw) / 2, gap = PIPE_GAP * sc;
        const tB = p.gapY - gap / 2, bT = p.gapY + gap / 2;
        const pg = ctx.createLinearGradient(p.x, 0, p.x + pw, 0);
        pg.addColorStop(0, C.pipe1); pg.addColorStop(0.35, C.pipe2); pg.addColorStop(0.65, C.pipe2); pg.addColorStop(1, C.pipe1);
        ctx.fillStyle = pg; ctx.fillRect(p.x, 0, pw, tB);
        ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(p.x + pw * 0.25, 0, pw * 0.15, tB);
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(p.x + pw - 3 * sc, 0, 3 * sc, tB);
        const tcY = tB - ch2;
        ctx.fillStyle = C.pipeCap;
        ctx.beginPath(); rRect(ctx, p.x - co2, tcY, cw2, ch2, 3 * sc); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fillRect(p.x - co2 + cw2 * 0.15, tcY + 2 * sc, cw2 * 0.15, ch2 - 4 * sc);
        ctx.fillStyle = pg; ctx.fillRect(p.x, bT, pw, gy - bT);
        ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(p.x + pw * 0.25, bT, pw * 0.15, gy - bT);
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(p.x + pw - 3 * sc, bT, 3 * sc, gy - bT);
        ctx.fillStyle = C.pipeCap;
        ctx.beginPath(); rRect(ctx, p.x - co2, bT, cw2, ch2, 3 * sc); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fillRect(p.x - co2 + cw2 * 0.15, bT + 2 * sc, cw2 * 0.15, ch2 - 4 * sc);
      }
      {
        const grassH = GRASS_H * sc;
        ctx.fillStyle = s.grassGrad || C.grassT; ctx.fillRect(0, gy, w, grassH);
        ctx.fillStyle = C.grassT;
        const step = 14 * sc, off = s.groundOff % step;
        ctx.beginPath();
        for (let gx = -off; gx < w + step; gx += step) {
          ctx.moveTo(gx, gy); ctx.lineTo(gx + 4 * sc, gy - 4 * sc); ctx.lineTo(gx + 8 * sc, gy);
        }
        ctx.fill();
        ctx.fillStyle = s.dirtGrad || C.dirtT; ctx.fillRect(0, gy + grassH, w, h - gy - grassH);
      }
      {
        const r = BIRD_R * sc;
        ctx.save(); ctx.translate(bird.x, bird.y); ctx.rotate(bird.rotation);
        ctx.fillStyle = C.body;
        ctx.beginPath(); ctx.ellipse(0, 0, r * 1.15, r, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.belly;
        ctx.beginPath(); ctx.ellipse(r * 0.05, r * 0.25, r * 0.7, r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.wing;
        const wo = [-r * 0.15, -r * 0.5, r * 0.1][bird.wingPhase];
        ctx.beginPath(); ctx.ellipse(-r * 0.3, wo, r * 0.55, r * 0.3, -0.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.eye;
        ctx.beginPath(); ctx.arc(r * 0.45, -r * 0.2, r * 0.32, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.pupil;
        ctx.beginPath(); ctx.arc(r * 0.55, -r * 0.18, r * 0.16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath(); ctx.arc(r * 0.48, -r * 0.3, r * 0.08, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.beak;
        ctx.beginPath(); ctx.moveTo(r * 0.85, -r * 0.05); ctx.lineTo(r * 1.4, r * 0.1); ctx.lineTo(r * 0.85, r * 0.25); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#FDBA74";
        ctx.beginPath(); ctx.moveTo(r * 0.85, -r * 0.02); ctx.lineTo(r * 1.25, r * 0.08); ctx.lineTo(r * 0.85, r * 0.12); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      if (s.flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${s.flash})`;
        ctx.fillRect(0, 0, w, h);
        s.flash = Math.max(0, s.flash - 0.06 * dt);
      }
      if (s.pulse > 0) s.pulse = Math.max(0, s.pulse - 0.08 * dt);
      if (s.state === "playing" || s.state === "dead") {
        const fs = Math.max(24, 40 * sc), sca = 1 + s.pulse * 0.2;
        ctx.save();
        ctx.translate(w / 2, 40 * sc);
        ctx.scale(sca, sca);
        ctx.font = `bold ${fs}px system-ui, sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 4 * sc; ctx.lineJoin = "round";
        ctx.strokeText(String(s.score), 0, 0);
        ctx.fillStyle = C.scoreFill;
        ctx.fillText(String(s.score), 0, 0);
        ctx.restore();
      }
      if (s.state === "ready") {
        s.tapPhase += 0.03 * dt;
        const a = 0.5 + Math.sin(s.tapPhase) * 0.4;
        const fs = Math.max(14, 18 * sc);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = `bold ${fs}px system-ui, sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        const ty = gy * 0.65;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText("Tap to Play", w / 2 + 1.5, ty + 1.5);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Tap to Play", w / 2, ty);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      if (g.current.deathTimer) clearTimeout(g.current.deathTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastTouchRef = useRef(0);
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); lastTouchRef.current = Date.now(); flap();
  }, [flap]);
  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (Date.now() - lastTouchRef.current < 500) return;
    e.preventDefault(); flap();
  }, [flap]);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden"
      style={{ touchAction: "none", WebkitTouchCallout: "none", WebkitUserSelect: "none" } as React.CSSProperties}>
      <canvas ref={canvasRef} onTouchStart={handleTouch} onMouseDown={handleMouse}
        className="block w-full h-full" style={{ touchAction: "none" }} />
    </div>
  );
}
