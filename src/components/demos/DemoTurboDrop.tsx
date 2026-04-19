"use client";
/**
 * DemoTurboDrop — marketing fork of LT's TurboDrop (plinko game).
 * Copy + strip because LT uses `fixed inset-0`, prizeRepository.listAvailableSummary(),
 * and ChiptuneEngine (audio). We hardcode 3 demo tiers and fetch plinkoRoutes.json
 * lazily from /demos/ so the 334KB asset doesn't bloat the initial JS bundle.
 * Source: luckyturboV2_1/src/components/TurboDrop.tsx
 *
 * TODO(visual-polish): level-up transition colours use LT's `lvlClr()` palette which
 * was tuned against LT's dark-violet chrome — looks fine but not identical on this page.
 */
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, X, ChevronDown, ChevronRight, Zap, Loader2, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoGameProps } from "./_shared";

const REF_W = 420, REF_H = 520, PIN_ROWS = 8, FIRST_ROW_PINS = 3;
const PIN_GAP_X = 38, PIN_GAP_Y = 38, TOP_PAD = 38, POCKET_H = 50, BALL_R = 5, DROP_Y = 16;
const LEVEL_ANIM_MS = 800, MAX_SIM_BALLS = 12;

const LVL_CLR = [
  { pin: "rgba(0,180,255,0.5)", hit: "#00ffff", ball: "#00b4ff", glow: "rgba(0,180,255,0.3)", accent: "#00b4ff", bg: "#030d1e" },
  { pin: "rgba(34,197,94,0.5)", hit: "#4ade80", ball: "#22c55e", glow: "rgba(34,197,94,0.3)", accent: "#22c55e", bg: "#041a0e" },
  { pin: "rgba(245,158,11,0.5)", hit: "#fbbf24", ball: "#f59e0b", glow: "rgba(245,158,11,0.3)", accent: "#fbbf24", bg: "#1a1005" },
];
function lvlClr(l: number) { return LVL_CLR[Math.min(l, LVL_CLR.length - 1)]; }

const PCLR = {
  levelUp: { bg: "rgba(168,85,247,0.2)", border: "#a855f7", label: "#d8b4fe" },
  prize: { bg: "rgba(34,197,94,0.2)", border: "#22c55e", label: "#bbf7d0" },
  noWin: { bg: "rgba(30,41,59,0.45)", border: "#334155", label: "#475569" },
  jackpot: { bg: "rgba(251,191,36,0.25)", border: "#fbbf24", label: "#fef3c7" },
};

interface LvlTier { name: string; value: number }
interface Pocket { type: "level-up" | "prize" | "no-win" | "jackpot"; label: string; value: number; cx: number }
interface Ball { id: number; route: { x: number; y: number }[]; frame: number; tgt: number; ptype: Pocket["type"]; landed: boolean; landT: number; win: boolean; tIdx: number }
interface TDrop { ticketNumber: number; isWinner: boolean; prizeTitle?: string; level: number }
type Phase = "idle" | "dropping" | "settling" | "leveling-up" | "complete";

function makePockets(tierName: string, edgeLabel: string, isFinal: boolean): Pocket[] {
  if (isFinal) {
    const n = 5, tw = (n - 1) * PIN_GAP_X, sx = (REF_W - tw) / 2;
    return [
      { type: "no-win", label: "NO WIN", value: 0, cx: sx },
      { type: "no-win", label: "NO WIN", value: 0, cx: sx + PIN_GAP_X },
      { type: "jackpot", label: tierName, value: 0, cx: sx + 2 * PIN_GAP_X },
      { type: "no-win", label: "NO WIN", value: 0, cx: sx + 3 * PIN_GAP_X },
      { type: "no-win", label: "NO WIN", value: 0, cx: sx + 4 * PIN_GAP_X },
    ];
  }
  const n = 10, tw = (n - 1) * PIN_GAP_X, sx = (REF_W - tw) / 2;
  return [
    { type: "jackpot", label: edgeLabel, value: 0, cx: sx },
    { type: "level-up", label: "LVL UP", value: 0, cx: sx + PIN_GAP_X },
    { type: "no-win", label: "NO WIN", value: 0, cx: sx + 2 * PIN_GAP_X },
    { type: "prize", label: tierName, value: 0, cx: sx + 3 * PIN_GAP_X },
    { type: "no-win", label: "NO WIN", value: 0, cx: sx + 4 * PIN_GAP_X },
    { type: "no-win", label: "NO WIN", value: 0, cx: sx + 5 * PIN_GAP_X },
    { type: "prize", label: tierName, value: 0, cx: sx + 6 * PIN_GAP_X },
    { type: "no-win", label: "NO WIN", value: 0, cx: sx + 7 * PIN_GAP_X },
    { type: "level-up", label: "LVL UP", value: 0, cx: sx + 8 * PIN_GAP_X },
    { type: "jackpot", label: edgeLabel, value: 0, cx: sx + 9 * PIN_GAP_X },
  ];
}

function routeTicket(t: TDrop, lvl: number, isFinal: boolean, drift?: number): { idx: number; ptype: Pocket["type"] } {
  const goRight = drift !== undefined ? drift >= 0 : Math.random() < 0.5;
  if (isFinal) {
    return t.level === lvl ? { idx: 2, ptype: "jackpot" }
      : { idx: goRight ? [3, 4][Math.floor(Math.random() * 2)] : [0, 1][Math.floor(Math.random() * 2)], ptype: "no-win" };
  }
  if (t.level === lvl) return { idx: goRight ? 6 : 3, ptype: "prize" };
  if (t.level > lvl) return { idx: goRight ? 8 : 1, ptype: "level-up" };
  const nw = goRight ? [5, 7] : [2, 4];
  return { idx: nw[Math.floor(Math.random() * nw.length)], ptype: "no-win" };
}

const PINS = (() => {
  const p: { x: number; y: number }[] = [];
  for (let r = 0; r < PIN_ROWS; r++) {
    const n = FIRST_ROW_PINS + r;
    const w = (n - 1) * PIN_GAP_X, sx = (REF_W - w) / 2;
    for (let c = 0; c < n; c++) p.push({ x: sx + c * PIN_GAP_X, y: TOP_PAD + r * PIN_GAP_Y });
  }
  return p;
})();

// Demo fixture: 3 tiers, 2 of 4 tickets win (one at top tier for the jackpot vibe)
const DEMO_TIERS: LvlTier[] = [
  { name: "£1 Credit", value: 100 },
  { name: "£5 Credit", value: 500 },
  { name: "£50 Cash", value: 5000 },
];

export function DemoTurboDrop({ className, onComplete }: DemoGameProps) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const wrRef = useRef<HTMLDivElement>(null);
  const alive = useRef(true);
  const ballsRef = useRef<Ball[]>([]);
  const hitsRef = useRef<Map<number, number>>(new Map());
  const rafId = useRef(0);
  const scRef = useRef(1);
  const phaseRef = useRef<Phase>("idle");
  const lvlRef = useRef(0);
  const lvlAnimRef = useRef(0);
  const routeLibRef = useRef<Record<string, { x: number; y: number }[][]> | null>(null);

  const [currentLvl, setCurrentLvl] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [loading, setLoading] = useState(true);
  const [winCt, setWinCt] = useState(0);
  const [prizeResults, setPrizeResults] = useState<string[]>([]);
  const [showRes, setShowRes] = useState(false);
  const [lastMsg, setLastMsg] = useState("");
  const [idx, setIdx] = useState(0);

  const tiers = DEMO_TIERS;
  const total = 4;
  const left = total - idx;

  // Build a demo queue: tickets 1,3 win at tier 0; ticket 2 wins at tier 2; ticket 4 no-win
  const queue = useMemo<TDrop[]>(() => [
    { ticketNumber: 1, isWinner: true, prizeTitle: "£1 Credit", level: 0 },
    { ticketNumber: 2, isWinner: true, prizeTitle: "£50 Cash", level: 2 },
    { ticketNumber: 3, isWinner: true, prizeTitle: "£1 Credit", level: 0 },
    { ticketNumber: 4, isWinner: false, level: -1 },
  ], []);

  useEffect(() => () => { alive.current = false; }, []);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { lvlRef.current = currentLvl; }, [currentLvl]);

  // Lazy-load plinko routes JSON
  useEffect(() => {
    fetch("/demos/plinkoRoutes.json")
      .then(r => r.json())
      .then((data: Record<string, { x: number; y: number }[][]>) => {
        if (!alive.current) return;
        routeLibRef.current = data;
        setLoading(false);
      })
      .catch(() => { if (alive.current) setLoading(false); });
  }, []);

  const pickRoute = useCallback((pocketIdx: number): { x: number; y: number }[] => {
    const lib = routeLibRef.current;
    if (!lib) return [{ x: REF_W / 2, y: DROP_Y }, { x: REF_W / 2, y: TOP_PAD + PIN_ROWS * PIN_GAP_Y + 14 + POCKET_H / 2 }];
    const routes = lib[String(pocketIdx)];
    if (!routes || routes.length === 0) return [{ x: REF_W / 2, y: DROP_Y }, { x: REF_W / 2, y: TOP_PAD + PIN_ROWS * PIN_GAP_Y + 14 + POCKET_H / 2 }];
    return routes[Math.floor(Math.random() * routes.length)];
  }, []);

  // Canvas sizing
  useEffect(() => {
    const fit = () => {
      const cv = cvRef.current, wr = wrRef.current;
      if (!cv || !wr) return;
      const r = wr.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const maxW = Math.min(r.width, 520);
      const s = Math.min(maxW / REF_W, r.height / REF_H);
      scRef.current = s;
      cv.width = REF_W * s * dpr; cv.height = REF_H * s * dpr;
      cv.style.width = `${REF_W * s}px`; cv.style.height = `${REF_H * s}px`;
    };
    fit();
    const t1 = requestAnimationFrame(fit);
    const t2 = setTimeout(fit, 200);
    window.addEventListener("resize", fit);
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); window.removeEventListener("resize", fit); };
  }, [loading]);

  // Render loop
  useEffect(() => {
    if (loading) return;
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let prev = 0;
    const draw = (ts: number) => {
      if (!alive.current) return;
      const dt = prev ? Math.min(ts - prev, 33) : 16;
      prev = ts;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const s = scRef.current * dpr;
      const clr = lvlClr(lvlRef.current);
      const now = Date.now();
      const lvl = lvlRef.current;
      const eName = lvl === 0 ? tiers[tiers.length - 2].name : tiers[tiers.length - 1].name;
      const pks = makePockets(tiers[Math.min(lvl, tiers.length - 1)].name, eName, lvl >= tiers.length - 1);

      ctx.save(); ctx.scale(s, s);
      const bg = ctx.createLinearGradient(0, 0, 0, REF_H);
      bg.addColorStop(0, clr.bg); bg.addColorStop(1, "#020810");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, REF_W, REF_H);

      ctx.fillStyle = clr.accent; ctx.globalAlpha = 0.7;
      ctx.font = "bold 9px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(`LEVEL ${lvlRef.current + 1}`, REF_W / 2, 10);
      ctx.globalAlpha = 1;

      const pocketY = TOP_PAD + PIN_ROWS * PIN_GAP_Y + 14;
      const pw = PIN_GAP_X - 4;
      for (let i = 0; i < pks.length; i++) {
        const p = pks[i], px = p.cx - pw / 2;
        const pc = p.type === "level-up" ? PCLR.levelUp : p.type === "prize" ? PCLR.prize : p.type === "jackpot" ? PCLR.jackpot : PCLR.noWin;
        ctx.fillStyle = pc.bg; ctx.strokeStyle = pc.border; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(px, pocketY, pw, POCKET_H, 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = pc.label; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        if (p.type === "level-up") {
          ctx.font = "bold 9px system-ui";
          ctx.fillText("LVL UP", p.cx, pocketY + POCKET_H / 2);
        } else if (p.type === "jackpot" || p.type === "prize") {
          const parts = p.label.split(" ");
          if (parts.length >= 2) {
            ctx.font = "bold 9px system-ui"; ctx.fillText(parts[0], p.cx, pocketY + POCKET_H / 2 - 6);
            ctx.font = "bold 8px system-ui"; ctx.fillText(parts.slice(1).join(" "), p.cx, pocketY + POCKET_H / 2 + 6);
          } else {
            ctx.font = "bold 9px system-ui";
            ctx.fillText(p.label.length > 9 ? p.label.slice(0, 8) + "…" : p.label, p.cx, pocketY + POCKET_H / 2);
          }
        } else {
          ctx.globalAlpha = 0.3; ctx.font = "bold 7px system-ui";
          ctx.fillText("NO", p.cx, pocketY + POCKET_H / 2 - 5);
          ctx.fillText("WIN", p.cx, pocketY + POCKET_H / 2 + 6);
          ctx.globalAlpha = 1;
        }
      }

      for (let i = 0; i < PINS.length; i++) {
        const pin = PINS[i];
        const ht = hitsRef.current.get(i);
        const hit = ht !== undefined && now - ht < 160;
        if (hit) {
          ctx.globalAlpha = 0.35;
          const g = ctx.createRadialGradient(pin.x, pin.y, 0, pin.x, pin.y, 10);
          g.addColorStop(0, clr.hit); g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(pin.x, pin.y, 10, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.beginPath(); ctx.arc(pin.x, pin.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = hit ? clr.hit : clr.pin; ctx.fill();
      }

      if (phaseRef.current === "leveling-up") {
        lvlAnimRef.current += dt / LEVEL_ANIM_MS;
        if (lvlAnimRef.current > 1) lvlAnimRef.current = 1;
        const p = lvlAnimRef.current;
        ctx.globalAlpha = (1 - p) * 0.4;
        ctx.strokeStyle = clr.accent; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(REF_W / 2, REF_H * 0.45, p * REF_W * 0.6, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const bl = ballsRef.current;
      const REPLAY_SPEED = 0.055;
      for (const b of bl) {
        if (!b.landed) {
          b.frame += REPLAY_SPEED * dt;
          if (b.frame >= b.route.length - 1) {
            b.frame = b.route.length - 1; b.landed = true; b.landT = now;
          }
        }
        const fi = Math.min(Math.floor(b.frame), b.route.length - 1);
        const pos = b.route[fi];
        if (!b.landed) {
          for (let i = 0; i < PINS.length; i++) {
            const dx = pos.x - PINS[i].x, dy = pos.y - PINS[i].y;
            if (dx * dx + dy * dy < 140) { hitsRef.current.set(i, now); break; }
          }
        }
        const fade = b.landed ? Math.max(0, 1 - (now - b.landT) / 1800) : 1;
        if (fade <= 0) continue;
        ctx.globalAlpha = fade;
        const gr = bl.length > 12 ? BALL_R * 2 : BALL_R * 3;
        const og = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, gr);
        og.addColorStop(0, clr.glow); og.addColorStop(1, "transparent");
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(pos.x, pos.y, gr, 0, Math.PI * 2); ctx.fill();
        const bd = ctx.createRadialGradient(pos.x - 1, pos.y - 1, 0, pos.x, pos.y, BALL_R);
        bd.addColorStop(0, "#ffffff"); bd.addColorStop(1, clr.ball);
        ctx.fillStyle = bd; ctx.beginPath(); ctx.arc(pos.x, pos.y, BALL_R, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      for (const [k, t] of hitsRef.current) if (now - t > 200) hitsRef.current.delete(k);
      ballsRef.current = bl.filter(b => !b.landed || now - b.landT < 2000);
      ctx.restore();
      rafId.current = requestAnimationFrame(draw);
    };
    rafId.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId.current);
  }, [loading, tiers]);

  const dropAtLevel = useCallback((ticketsForLevel: TDrop[], lvl: number) => {
    setPhase("dropping"); phaseRef.current = "dropping";
    setShowRes(false);
    const isFin = lvl >= tiers.length - 1;
    const padded = [...ticketsForLevel];
    if (lvl > 0) {
      const extra = Math.round(ticketsForLevel.length * 0.5);
      for (let e = 0; e < extra; e++) padded.push({ ticketNumber: -1, isWinner: false, level: -1 });
    }
    for (let i = padded.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [padded[i], padded[j]] = [padded[j], padded[i]];
    }
    const spawned: Ball[] = [];
    for (let i = 0; i < padded.length; i++) {
      const tk = padded[i];
      const drift = (Math.random() - 0.5) * 2;
      const { idx: tgt, ptype } = routeTicket(tk, lvl, isFin, drift);
      const route = pickRoute(tgt);
      spawned.push({ id: Date.now() * 1000 + i, route, frame: 0, tgt, ptype, landed: false, landT: 0, win: tk.isWinner, tIdx: i });
    }
    let si = 0;
    const spawnWave = () => {
      if (!alive.current || si >= spawned.length) return;
      const active = ballsRef.current.filter(b => !b.landed).length;
      const slots = Math.max(1, MAX_SIM_BALLS - active);
      const batch = Math.min(slots, spawned.length - si);
      for (let i = 0; i < batch; i++) ballsRef.current.push(spawned[si++]);
      if (si < spawned.length) setTimeout(spawnWave, 120);
    };
    spawnWave();
    const check = () => {
      if (!alive.current) return;
      if (spawned.every(b => b.landed)) {
        const prizes = spawned.filter(b => b.ptype === "prize" || b.ptype === "jackpot").length;
        const lvlUps = spawned.filter(b => b.ptype === "level-up").length;
        setWinCt(p => p + prizes);
        const tierName = tiers[Math.min(lvl, tiers.length - 1)].name;
        if (prizes > 0) setPrizeResults(p => [...p, `${prizes}× ${tierName}`]);
        const lvlUpTickets = padded.filter((tk, i) => spawned[i]?.ptype === "level-up" && tk.ticketNumber !== -1);
        setPhase("settling"); phaseRef.current = "settling";
        setTimeout(() => {
          if (!alive.current) return;
          if (lvlUps > 0 && lvl < tiers.length - 1) {
            setLastMsg(`${lvlUps} ball${lvlUps !== 1 ? "s" : ""} advancing!`);
            setShowRes(true);
            setPhase("leveling-up"); phaseRef.current = "leveling-up";
            lvlAnimRef.current = 0;
            setTimeout(() => {
              if (!alive.current) return;
              const next = lvl + 1;
              setCurrentLvl(next); lvlRef.current = next;
              setShowRes(false);
              setTimeout(() => dropAtLevel(lvlUpTickets, next), 300);
            }, LEVEL_ANIM_MS);
          } else {
            setLastMsg(prizes > 0 ? "Round complete!" : "No wins this round");
            setShowRes(true);
            setPhase("idle"); phaseRef.current = "idle";
          }
        }, 400);
      } else {
        setTimeout(check, 60);
      }
    };
    setTimeout(check, 200);
  }, [tiers, pickRoute]);

  const startRound = useCallback(() => {
    if (phase !== "idle" || idx >= total) return;
    const batch = queue.slice(idx, idx + left);
    setIdx(total);
    setCurrentLvl(0); lvlRef.current = 0;
    dropAtLevel(batch, 0);
  }, [phase, idx, total, left, queue, dropAtLevel]);

  if (loading) return (
    <div className={cn("absolute inset-0 flex items-center justify-center rounded-xl", className)} style={{ background: "#020810" }}>
      <div className="text-center space-y-2">
        <Loader2 className="h-6 w-6 text-cyan-400 animate-spin mx-auto" />
        <p className="text-cyan-200/60 text-xs">Loading Turbo Drop…</p>
      </div>
    </div>
  );

  const busy = phase !== "idle";
  return (
    <div
      className={cn("absolute inset-0 flex flex-col rounded-xl overflow-hidden", className)}
      style={{ background: `linear-gradient(180deg, ${lvlClr(currentLvl).bg} 0%, #020810 100%)` }}
    >
      <div className="flex items-center justify-between px-2 pt-1.5 pb-0.5 shrink-0">
        <h2 className="text-white font-bold text-xs flex items-center gap-1">
          <Zap className="h-3 w-3" style={{ color: lvlClr(currentLvl).accent }} /> TURBO DROP
        </h2>
        <button onClick={onComplete} className="text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex items-center justify-between px-2 pb-1 text-[10px] shrink-0">
        <span className="px-1.5 py-0.5 rounded text-white text-[9px] font-bold" style={{ background: lvlClr(currentLvl).accent + "40" }}>
          LVL {currentLvl + 1}/{tiers.length}
        </span>
        <span className="text-white/50">{idx}/{total}{winCt > 0 && <span className="ml-1 text-green-400">({winCt} won)</span>}</span>
      </div>
      <div ref={wrRef} className="flex-1 flex items-center justify-center overflow-hidden min-h-0 px-1">
        <canvas ref={cvRef} className="block" />
      </div>
      <div className="px-2 pb-2 pt-1 shrink-0 space-y-1.5">
        <AnimatePresence>
          {showRes && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-center">
              {phase === "leveling-up" ? (
                <div className="bg-purple-500/15 border border-purple-500/30 rounded-lg px-2 py-1">
                  <div className="flex items-center justify-center gap-1">
                    <ArrowUp className="h-3 w-3 text-purple-400" />
                    <span className="text-white font-bold text-xs">{lastMsg}</span>
                  </div>
                </div>
              ) : winCt > 0 || prizeResults.length > 0 ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-lg px-2 py-1">
                  <span className="text-white font-bold text-xs">{prizeResults.join(", ") || lastMsg}</span>
                </div>
              ) : (
                <p className="text-white/30 text-[11px]">{lastMsg}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {left > 0 ? (
          <Button onClick={startRound} disabled={busy}
            className="w-full text-white text-sm font-black rounded-lg h-10 shadow-lg disabled:opacity-50 border-0"
            style={{ background: `linear-gradient(135deg, ${lvlClr(currentLvl).accent}, ${lvlClr(Math.min(currentLvl + 1, LVL_CLR.length - 1)).accent})` }}>
            {busy ? (
              <span className="flex items-center gap-1"><Zap className="h-4 w-4" />{phase === "leveling-up" ? "Leveling Up…" : "Dropping…"}</span>
            ) : (
              <span className="flex items-center gap-1"><ChevronDown className="h-4 w-4" />DROP x{left}</span>
            )}
          </Button>
        ) : (
          <Button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg h-10 text-sm border-0">
            <Trophy className="h-4 w-4 mr-1" /> Done
          </Button>
        )}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: lvlClr(currentLvl).accent }}
            animate={{ width: `${(idx / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

export default DemoTurboDrop;
