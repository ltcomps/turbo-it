"use client";
/**
 * DemoCoinFlip — marketing-site-safe fork of LT's CoinFlip.
 * Copied (not wrapped) because the LT component uses `fixed inset-0 z-50` full-viewport
 * chrome and pixel tracking that we need to strip for the 400x400 embed.
 * Source: luckyturboV2_1/src/components/CoinFlip.tsx
 */
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, X, ChevronRight, Coins, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoFixture, formatPence, type DemoGameProps } from "./_shared";

interface TicketFlip {
  ticketNumber: number;
  isWinner: boolean;
  prizeTitle?: string;
  prizeValue?: number;
  creditAmount?: number;
  autoPayout?: boolean;
}

export function DemoCoinFlip({ className, onComplete }: DemoGameProps) {
  const controls = useAnimation();
  const { tickets, wins } = useMemo(() => demoFixture({ ticketCount: 3, winnerTicketNumbers: [2] }), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winsRevealed, setWinsRevealed] = useState(0);
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  const flipQueue = useMemo<TicketFlip[]>(() => {
    const winMap = new Map(wins.map(w => [w.ticketNumber, w]));
    return tickets.map(t => {
      const win = winMap.get(t.ticketNumber);
      return {
        ticketNumber: t.ticketNumber,
        isWinner: !!win,
        prizeTitle: win?.prizeTitle,
        prizeValue: win?.prizeValue,
        creditAmount: win?.creditAmount,
        autoPayout: win?.autoPayout,
      };
    });
  }, [tickets, wins]);

  const currentFlip = flipQueue[currentIndex] || null;
  const totalTickets = flipQueue.length;

  useEffect(() => { controls.set({ rotateY: 0 }); }, [currentIndex, controls]);

  const doFlip = useCallback(async () => {
    if (!currentFlip || flipping) return;
    setFlipping(true);
    setShowResult(false);
    controls.set({ rotateY: 0 });
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    // Silver TRY side is now at rotateY(0) (front), Gold WIN at rotateY(180).
    // Winners end on the gold face (+180); losers end back on silver (0).
    const target = currentFlip.isWinner ? fullSpins * 360 + 180 : fullSpins * 360;
    await controls.start({ rotateY: target, transition: { duration: 2.2, ease: [0.12, 0.8, 0.2, 1] } });
    if (!mountedRef.current) return;
    setFlipping(false);
    setShowResult(true);
    if (currentFlip.isWinner) setWinsRevealed(p => p + 1);
  }, [currentFlip, flipping, controls]);

  const handleNext = useCallback(() => {
    if (currentIndex >= totalTickets - 1) { onComplete?.(); return; }
    setShowResult(false);
    setCurrentIndex(p => p + 1);
  }, [currentIndex, totalTickets, onComplete]);

  return (
    <div
      className={cn("absolute inset-0 flex items-center justify-center p-2 overflow-hidden rounded-xl", className)}
      style={{ background: "linear-gradient(135deg, #1a1005 0%, #2a1c04 40%, #1e1508 70%, #0f0a02 100%)" }}
    >
      <div className="w-full max-w-md flex flex-col max-h-full">
        <div className="px-3 pt-2 pb-1 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-amber-400" /> Flip the Coin
          </h2>
          <button onClick={onComplete} className="text-amber-200/30 hover:text-white"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-3 pb-1 flex items-center justify-between text-[11px]">
          <span className="text-amber-200/50">Ticket <span className="text-white font-bold">#{currentFlip?.ticketNumber}</span></span>
          <span className="text-amber-200/50">
            {currentIndex + 1} / {totalTickets}
            {winsRevealed > 0 && <span className="ml-1 text-green-400">({winsRevealed} win{winsRevealed !== 1 ? "s" : ""})</span>}
          </span>
        </div>
        <div className="relative flex-1 flex items-center justify-center py-2 min-h-0">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[140px] h-[140px] rounded-full bg-amber-500/15 blur-3xl" />
          </div>
          <div className="relative" style={{ perspective: "800px" }}>
            {!flipping && !showResult && (
              <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-300/60 text-[10px] font-medium whitespace-nowrap z-20"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                Tap the coin!
              </motion.div>
            )}
            <motion.div
              animate={controls}
              className="relative w-32 h-32 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => !flipping && !showResult && doFlip()}
              whileHover={!flipping && !showResult ? { scale: 1.05 } : {}}
            >
              {/* Silver TRY side — front, shown by default (no pre-reveal of WIN) */}
              <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center select-none"
                style={{
                  backfaceVisibility: "hidden",
                  background: "radial-gradient(ellipse at 35% 35%, #e2e8f0 0%, #94a3b8 30%, #64748b 60%, #334155 100%)",
                  border: "4px solid #94a3b8",
                  boxShadow: "inset 0 -4px 12px rgba(51,65,85,0.4), inset 0 4px 12px rgba(226,232,240,0.3)",
                }}>
                <Coins className="size-8 text-slate-200/80" />
              </div>
              {/* Gold WIN side — back, only revealed after a winning flip */}
              <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center select-none"
                style={{
                  backfaceVisibility: "hidden", transform: "rotateY(180deg)",
                  background: "radial-gradient(ellipse at 35% 35%, #fde68a 0%, #f59e0b 30%, #d97706 60%, #92400e 100%)",
                  border: "4px solid #fbbf24",
                  boxShadow: "inset 0 -4px 12px rgba(146,64,14,0.4), inset 0 4px 12px rgba(253,230,138,0.3), 0 0 30px rgba(245,158,11,0.4)",
                }}>
                <span className="text-xl font-black text-amber-900 tracking-widest drop-shadow-sm">WIN</span>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="px-3 pb-3 pt-1 space-y-2">
          {showResult && currentFlip ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
              {currentFlip.isWinner ? (
                <>
                  <div className="flex items-center justify-center gap-1.5">
                    <PartyPopper className="h-4 w-4 text-yellow-400" />
                    <h3 className="text-sm font-black text-white">YOU WON!</h3>
                    <PartyPopper className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg px-2.5 py-1.5">
                    <p className="text-white text-sm font-bold">{currentFlip.prizeTitle}</p>
                    {currentFlip.autoPayout && currentFlip.creditAmount ? (
                      <div className="flex items-center justify-center gap-1 text-green-400 text-xs"><Wallet className="h-3 w-3" />{formatPence(currentFlip.creditAmount)}</div>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="text-amber-100/70 text-xs font-semibold">No prize this time</p>
              )}
              <Button onClick={handleNext} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg h-9 text-xs">
                {currentIndex < totalTickets - 1 ? (<><ChevronRight className="h-4 w-4 mr-1" />Next</>) : (<><Trophy className="h-4 w-4 mr-1" />Done</>)}
              </Button>
            </motion.div>
          ) : (
            <Button onClick={doFlip} disabled={flipping}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-black rounded-lg h-10 shadow-lg shadow-amber-500/25 disabled:opacity-50">
              <Coins className="h-4 w-4 mr-1" /> {flipping ? "Flipping..." : "FLIP!"}
            </Button>
          )}
          <div className="h-1 bg-amber-900/30 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / totalTickets) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoCoinFlip;
