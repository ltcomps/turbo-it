"use client";
/**
 * DemoSpinTheWheel — marketing fork of LT's SpinTheWheel.
 * Copy + strip because LT wraps in `fixed inset-0` and fetches prizes via
 * prizeRepository.listByCompetition(). We accept a static prize list via prop instead.
 * Source: luckyturboV2_1/src/components/SpinTheWheel.tsx
 */
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, Sparkles, X, ChevronRight, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoFixture, formatPence, type DemoGameProps } from "./_shared";

const NUM_SEGMENTS = 5;
const WHEEL_SIZE = 260;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2 - 6;
const INNER_RADIUS = 36;
const SEG_ANGLE = 360 / NUM_SEGMENTS;

const PRIZE_COLORS = [
  { bg: "#ec4899", text: "#fff" }, { bg: "#3b82f6", text: "#fff" },
  { bg: "#22c55e", text: "#fff" }, { bg: "#f59e0b", text: "#fff" },
  { bg: "#a855f7", text: "#fff" },
];
const NO_PRIZE_COLOR = { bg: "#1a0a3e", text: "#7c6f9b" };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}
function segmentPath(index: number) {
  const start = index * SEG_ANGLE, end = start + SEG_ANGLE;
  const p1 = polarToXY(start, RADIUS), p2 = polarToXY(end, RADIUS);
  const p3 = polarToXY(end, INNER_RADIUS), p4 = polarToXY(start, INNER_RADIUS);
  return [`M ${p4.x} ${p4.y}`, `L ${p1.x} ${p1.y}`, `A ${RADIUS} ${RADIUS} 0 0 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`, `A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p4.x} ${p4.y}`, "Z"].join(" ");
}

interface WheelSegment { label: string; color: string; textColor: string }
interface SpinRound { segments: WheelSegment[]; targetIndex: number }
interface TicketSpin { ticketNumber: number; isWinner: boolean; prizeTitle?: string; creditAmount?: number; autoPayout?: boolean }

function generateRound(spin: TicketSpin, prizeLabels: string[]): SpinRound {
  const segments: WheelSegment[] = [];
  const targetIdx = Math.floor(Math.random() * NUM_SEGMENTS);
  if (spin.isWinner && spin.prizeTitle) {
    const others = shuffle(prizeLabels.filter(p => p !== spin.prizeTitle));
    const fillers: { label: string; isNoPrize: boolean }[] = [];
    for (let i = 0; i < 3 && i < others.length; i++) fillers.push({ label: others[i], isNoPrize: false });
    fillers.push({ label: "No Prize", isNoPrize: true });
    while (fillers.length < NUM_SEGMENTS - 1) fillers.push({ label: "No Prize", isNoPrize: true });
    const f = shuffle(fillers);
    let fi = 0;
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      if (i === targetIdx) segments.push({ label: spin.prizeTitle, color: PRIZE_COLORS[0].bg, textColor: PRIZE_COLORS[0].text });
      else {
        const item = f[fi++];
        if (item.isNoPrize) segments.push({ label: "No Prize", color: NO_PRIZE_COLOR.bg, textColor: NO_PRIZE_COLOR.text });
        else { const ci = (fi % (PRIZE_COLORS.length - 1)) + 1; segments.push({ label: item.label, color: PRIZE_COLORS[ci].bg, textColor: PRIZE_COLORS[ci].text }); }
      }
    }
  } else {
    const others = shuffle(prizeLabels);
    let fi = 0;
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      if (i === targetIdx) segments.push({ label: "No Prize", color: NO_PRIZE_COLOR.bg, textColor: NO_PRIZE_COLOR.text });
      else { const label = others[fi % others.length], ci = fi % PRIZE_COLORS.length;
        segments.push({ label, color: PRIZE_COLORS[ci].bg, textColor: PRIZE_COLORS[ci].text }); fi++; }
    }
  }
  return { segments, targetIndex: targetIdx };
}

interface DemoSpinTheWheelProps extends DemoGameProps {
  prizeLabels?: string[];
}

export function DemoSpinTheWheel({ className, onComplete, prizeLabels }: DemoSpinTheWheelProps) {
  const labels = useMemo(() => prizeLabels && prizeLabels.length > 0 ? prizeLabels : ["£50 Cash", "£25 Cash", "£10 Credit", "Bonus Entry"], [prizeLabels]);
  const { tickets, wins } = useMemo(() => demoFixture({ ticketCount: 2, winnerTicketNumbers: [1] }), []);
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentRound, setCurrentRound] = useState<SpinRound | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  const spinQueue = useMemo<TicketSpin[]>(() => {
    const winMap = new Map(wins.map(w => [w.ticketNumber, w]));
    return tickets.map(t => {
      const w = winMap.get(t.ticketNumber);
      return { ticketNumber: t.ticketNumber, isWinner: !!w, prizeTitle: w?.prizeTitle, creditAmount: w?.creditAmount, autoPayout: w?.autoPayout };
    });
  }, [tickets, wins]);
  const currentSpin = spinQueue[currentIndex] || null;
  const totalTickets = spinQueue.length;

  useEffect(() => {
    if (currentSpin) { setCurrentRound(generateRound(currentSpin, labels)); controls.set({ rotate: 0 }); }
  }, [currentIndex, labels, controls, currentSpin]);

  const calcRotation = useCallback((targetIdx: number) => {
    const segCenter = targetIdx * SEG_ANGLE + SEG_ANGLE / 2;
    const offset = (Math.random() - 0.5) * SEG_ANGLE * 0.4;
    const landingAngle = segCenter + offset;
    const targetMod = ((360 - landingAngle) % 360 + 360) % 360;
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    return fullSpins * 360 + targetMod;
  }, []);

  const doSpin = useCallback(async () => {
    if (!currentSpin || !currentRound || spinning) return;
    setSpinning(true); setShowResult(false);
    controls.set({ rotate: 0 });
    const rotation = calcRotation(currentRound.targetIndex);
    await controls.start({ rotate: rotation, transition: { duration: 4, ease: [0.12, 0.8, 0.2, 1] } });
    if (!mountedRef.current) return;
    setSpinning(false); setShowResult(true);
  }, [currentSpin, currentRound, spinning, controls, calcRotation]);

  const handleNext = useCallback(() => {
    if (currentIndex >= totalTickets - 1) { onComplete?.(); return; }
    setShowResult(false); setCurrentIndex(p => p + 1);
  }, [currentIndex, totalTickets, onComplete]);

  const segments = currentRound?.segments || [];

  return (
    <div
      className={cn("absolute inset-0 flex flex-col overflow-hidden rounded-xl p-2", className)}
      style={{ background: "linear-gradient(135deg, #0c0a2a 0%, #1a0a3e 40%, #0d1b3e 70%, #0a0825 100%)" }}
    >
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-white font-bold text-sm">Spin the Wheel</h2>
        <button onClick={onComplete} className="text-slate-500 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex items-center justify-between text-[11px] pb-1">
        <span className="text-slate-400">Ticket <span className="text-white font-bold">#{currentSpin?.ticketNumber}</span></span>
        <span className="text-slate-400">{currentIndex + 1} / {totalTickets}</span>
      </div>
      <div className="relative flex-1 flex items-center justify-center min-h-0">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="relative" style={{ transform: "scale(0.75)" }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-400 drop-shadow-lg" />
          </div>
          <motion.div animate={controls} className="relative z-10">
            <svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
              <circle cx={CENTER} cy={CENTER} r={RADIUS + 3} fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.6" />
              {segments.map((seg, i) => {
                const midAngle = i * SEG_ANGLE + SEG_ANGLE / 2;
                const textR = (RADIUS + INNER_RADIUS) / 2 + 8;
                const textPos = polarToXY(midAngle, textR);
                return (
                  <g key={i}>
                    <path d={segmentPath(i)} fill={seg.color} stroke="#0a0520" strokeWidth="2" />
                    <text x={textPos.x} y={textPos.y} textAnchor="middle" dominantBaseline="middle"
                      fill={seg.textColor} fontSize="10" fontWeight="bold"
                      transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}>
                      {seg.label.length > 14 ? seg.label.slice(0, 13) + "…" : seg.label}
                    </text>
                  </g>
                );
              })}
              <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS} fill="#0a0520" stroke="#fbbf24" strokeWidth="2.5" />
              {segments.map((_, i) => {
                const pos = polarToXY(i * SEG_ANGLE, RADIUS);
                return <circle key={`d${i}`} cx={pos.x} cy={pos.y} r="3" fill="#fbbf24" />;
              })}
            </svg>
          </motion.div>
        </div>
      </div>
      <div className="pt-1 space-y-1.5">
        {showResult && currentSpin ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-1.5">
            {currentSpin.isWinner ? (
              <div className="bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 rounded-lg px-2 py-1.5">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <PartyPopper className="h-3.5 w-3.5 text-yellow-400" />
                  <h3 className="text-xs font-black text-white">YOU WON!</h3>
                </div>
                <p className="text-white text-sm font-bold">{currentSpin.prizeTitle}</p>
                {currentSpin.autoPayout && currentSpin.creditAmount ? (
                  <div className="flex items-center justify-center gap-1 text-green-400 text-[11px]">
                    <Wallet className="h-3 w-3" />{formatPence(currentSpin.creditAmount)}
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-slate-300 text-xs">No prize this time</p>
            )}
            <Button onClick={handleNext} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg h-9 text-xs">
              {currentIndex < totalTickets - 1 ? (<><ChevronRight className="h-4 w-4 mr-1" />Next</>) : (<><Trophy className="h-4 w-4 mr-1" />Done</>)}
            </Button>
          </motion.div>
        ) : (
          <Button onClick={doSpin} disabled={spinning || !currentRound}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-black rounded-lg h-10 shadow-lg shadow-amber-500/25 disabled:opacity-50">
            <Sparkles className="h-4 w-4 mr-1" />{spinning ? "Spinning..." : "SPIN!"}
          </Button>
        )}
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / totalTickets) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

export default DemoSpinTheWheel;
