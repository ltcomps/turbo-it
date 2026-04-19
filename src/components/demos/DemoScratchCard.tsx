"use client";
/**
 * DemoScratchCard — marketing fork of LT's ScratchCard (single-card, 2×3 grid).
 * Copy + strip because LT chrome is `fixed inset-0 z-50` and the multi-card/auto-scratch/
 * pixel-tracking flows aren't relevant in a 400x400 showcase.
 * Source: luckyturboV2_1/src/components/ScratchCard.tsx
 */
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, X, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoFixture, formatPence, type DemoGameProps } from "./_shared";

const REVEAL_THRESHOLD = 0.55;
const BRUSH_R = 20;
const SAMPLE_STEP = 8;

interface Slot {
  ticketNumber: number;
  isWinner: boolean;
  prizeTitle?: string;
  creditAmount?: number;
  autoPayout?: boolean;
}

function ScratchSlot({ slot, isScratched, onScratch }: { slot: Slot; isScratched: boolean; onScratch: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPt = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });

  const paintFoil = useCallback(() => {
    const c = canvasRef.current, container = containerRef.current;
    if (!c || !container) return;
    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width), h = Math.round(rect.height);
    if (w === 0 || h === 0) return;
    sizeRef.current = { w, h };
    const dpr = window.devicePixelRatio || 1;
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = `${w}px`; c.style.height = `${h}px`;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#64748b"); g.addColorStop(0.3, "#cbd5e1");
    g.addColorStop(0.55, "#e2e8f0"); g.addColorStop(0.85, "#64748b"); g.addColorStop(1, "#94a3b8");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.font = `bold ${Math.max(9, Math.round(w * 0.09))}px system-ui, sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillText("SCRATCH", w / 2, h / 2);
    ctx.restore();
    ctx.globalCompositeOperation = "destination-out";
    revealedRef.current = false;
  }, []);

  useEffect(() => {
    if (isScratched) return;
    revealedRef.current = false;
    const t = setTimeout(paintFoil, 50);
    return () => clearTimeout(t);
  }, [paintFoil, isScratched]);

  const toCanvas = useCallback((e: React.PointerEvent) => {
    const c = canvasRef.current;
    if (!c) return null;
    const r = c.getBoundingClientRect();
    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) return null;
    return { x: (e.clientX - r.left) * (w / r.width), y: (e.clientY - r.top) * (h / r.height) };
  }, []);

  const stroke = useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = ctxRef.current; if (!ctx) return;
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(dist / 3));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = from.x + (to.x - from.x) * t, y = from.y + (to.y - from.y) * t;
      const gr = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_R);
      gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(0.6, "rgba(0,0,0,0.8)"); gr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.arc(x, y, BRUSH_R, 0, Math.PI * 2); ctx.fill();
    }
  }, []);

  const getProgress = useCallback(() => {
    const c = canvasRef.current, ctx = ctxRef.current;
    if (!c || !ctx) return 0;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let total = 0, cleared = 0;
    for (let x = 0; x < c.width; x += SAMPLE_STEP) {
      for (let y = 0; y < c.height; y += SAMPLE_STEP) {
        total++;
        if (data[(y * c.width + x) * 4 + 3] < 128) cleared++;
      }
    }
    return total > 0 ? cleared / total : 0;
  }, []);

  const doReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    drawingRef.current = false;
    const c = canvasRef.current;
    if (c) { c.style.transition = "opacity 0.4s ease-out"; c.style.opacity = "0"; }
    setTimeout(() => onScratch(), 450);
  }, [onScratch]);

  const onDown = (e: React.PointerEvent) => {
    if (isScratched || revealedRef.current) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pt = toCanvas(e); if (pt) { lastPt.current = pt; stroke(pt, pt); }
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || isScratched || revealedRef.current) return;
    e.preventDefault();
    const pt = toCanvas(e); if (!pt) return;
    if (lastPt.current) stroke(lastPt.current, pt);
    lastPt.current = pt;
    if (getProgress() >= REVEAL_THRESHOLD) doReveal();
  };
  const onUp = () => { drawingRef.current = false; lastPt.current = null; };

  return (
    <div ref={containerRef} className="relative aspect-[3/2] rounded-md overflow-hidden select-none">
      <div className={`absolute inset-0 rounded-md flex flex-col items-center justify-center p-1 ${
        isScratched && slot.isWinner
          ? "bg-gradient-to-br from-amber-900/60 via-yellow-900/40 to-amber-900/60 border border-amber-500/40"
          : "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/30"
      }`}>
        {slot.isWinner ? (
          <>
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <p className="text-amber-300 text-[8px] font-bold text-center truncate px-0.5">{slot.prizeTitle}</p>
          </>
        ) : (
          <>
            <X className="h-3.5 w-3.5 text-slate-500" />
            <p className="text-slate-500 text-[8px] font-semibold">No Prize</p>
          </>
        )}
      </div>
      {!isScratched && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 touch-none rounded-md"
          style={{ cursor: "grab" }}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onPointerCancel={onUp} />
      )}
    </div>
  );
}

export function DemoScratchCard({ className, onComplete }: DemoGameProps) {
  const { tickets, wins } = useMemo(() => demoFixture({ ticketCount: 6, winnerTicketNumbers: [2, 5] }), []);
  const slots: Slot[] = useMemo(() => {
    const wm = new Map(wins.map(w => [w.ticketNumber, w]));
    return tickets.map(t => {
      const w = wm.get(t.ticketNumber);
      return { ticketNumber: t.ticketNumber, isWinner: !!w, prizeTitle: w?.prizeTitle, creditAmount: w?.creditAmount, autoPayout: w?.autoPayout };
    });
  }, [tickets, wins]);
  const [scratched, setScratched] = useState<Set<number>>(new Set());
  const allDone = scratched.size === slots.length;
  const winCount = useMemo(() => slots.filter((s, i) => scratched.has(i) && s.isWinner).length, [slots, scratched]);

  return (
    <div
      className={cn("absolute inset-0 flex flex-col overflow-hidden rounded-xl p-2", className)}
      style={{ background: "linear-gradient(160deg, #1a1d2e 0%, #222638 40%, #2a2f45 70%, #1a1d2e 100%)" }}
    >
      <div className="flex items-center justify-between px-1 pb-1">
        <h2 className="text-white font-bold text-sm">🎟️ Scratch to Win</h2>
        <button onClick={onComplete} className="text-slate-400/50 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="rounded-xl p-2 w-full" style={{ background: "linear-gradient(135deg, #2a2f45 0%, #353b55 30%, #2d3248 60%, #222638 100%)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map((s, i) => (
              <ScratchSlot key={i} slot={s} isScratched={scratched.has(i)}
                onScratch={() => setScratched(prev => { const n = new Set(prev); n.add(i); return n; })} />
            ))}
          </div>
        </div>
      </div>
      <div className="px-1 pt-2 space-y-1.5">
        {allDone ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            {winCount > 0 ? (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1 mb-1.5">
                <div className="flex items-center justify-center gap-1">
                  <PartyPopper className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold">You won {winCount}!</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400/60 text-xs mb-1.5">No wins this round</p>
            )}
            <Button onClick={onComplete} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold rounded-lg h-9 text-xs">
              <Trophy className="h-4 w-4 mr-1" />Done
            </Button>
          </motion.div>
        ) : (
          <p className="text-slate-400/40 text-[10px] text-center">Drag to scratch off the silver foil</p>
        )}
        <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
            animate={{ width: `${(scratched.size / slots.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-500/50">
          <span>{scratched.size} / {slots.length}</span>
          {winCount > 0 && <span className="text-green-400/60 flex items-center gap-0.5"><Wallet className="h-2.5 w-2.5" />{winCount} won</span>}
        </div>
      </div>
    </div>
  );
}

export default DemoScratchCard;
