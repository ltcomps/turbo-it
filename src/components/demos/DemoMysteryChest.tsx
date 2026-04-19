"use client";
/**
 * DemoMysteryChest — marketing fork of LT's MysteryChest.
 * Copy + strip (not wrap) because LT component is a full-viewport modal (`fixed inset-0`).
 * Stripped: pixel tracking, prize repository, auto-open auto-advance, full-screen confetti.
 * Source: luckyturboV2_1/src/components/MysteryChest.tsx
 */
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Wallet, PartyPopper, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoFixture, formatPence, type DemoGameProps } from "./_shared";

function Chest3D({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const lidControls = useAnimation();
  useEffect(() => {
    if (isOpen) lidControls.start({ rotateX: -135, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } });
    else lidControls.set({ rotateX: 0 });
  }, [isOpen, lidControls]);
  return (
    <div className="relative cursor-pointer select-none" style={{ perspective: "800px", width: 160, height: 140 }} onClick={!isOpen ? onClick : undefined}>
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] bg-black/40 blur-xl" style={{ width: "80%", height: 14 }} />
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg)" }}>
        <div className="absolute bottom-0 left-0 right-0 rounded-b-xl overflow-hidden"
          style={{
            height: "55%",
            background: "linear-gradient(180deg, #8B5E34, #6B4423 30%, #5A3A1C 60%, #4A2E13)",
            border: "3px solid #a0722c", borderTop: "4px solid #b8862d",
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)",
          }}>
          <div className="absolute top-[35%] left-0 right-0 h-[12%]" style={{ background: "linear-gradient(180deg, #c9a24e, #a0722c 40%, #8b6520 60%, #c9a24e)" }} />
          <AnimatePresence>
            {isOpen && <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,200,50,0.5), rgba(255,150,0,0.2) 40%, transparent 70%)" }} />}
          </AnimatePresence>
        </div>
        <motion.div animate={lidControls} className="absolute left-0 right-0 rounded-t-xl overflow-hidden"
          style={{
            height: "50%", bottom: "45%", transformOrigin: "center top", transformStyle: "preserve-3d",
            background: "linear-gradient(180deg, #9B6E3E, #8B5E34 40%, #7A5028 70%, #6B4423)",
            border: "3px solid #a0722c", borderBottom: "4px solid #b8862d",
          }}>
          <div className="absolute bottom-[15%] left-0 right-0 h-[12%]" style={{ background: "linear-gradient(180deg, #c9a24e, #a0722c 40%, #8b6520 60%, #c9a24e)" }} />
        </motion.div>
      </div>
    </div>
  );
}

export function DemoMysteryChest({ className, onComplete }: DemoGameProps) {
  const { tickets, wins } = useMemo(() => demoFixture({ ticketCount: 3, winnerTicketNumbers: [1, 3] }), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winsRevealed, setWinsRevealed] = useState(0);
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  const queue = useMemo(() => {
    const wm = new Map(wins.map(w => [w.ticketNumber, w]));
    return tickets.map(t => {
      const w = wm.get(t.ticketNumber);
      return {
        ticketNumber: t.ticketNumber,
        isWinner: !!w && ((w.prizeValue ?? 0) > 0 || (w.creditAmount ?? 0) > 0),
        prizeTitle: w?.prizeTitle,
        creditAmount: w?.creditAmount,
        autoPayout: w?.autoPayout,
      };
    });
  }, [tickets, wins]);

  const current = queue[currentIndex] || null;
  const totalTickets = queue.length;
  const allDone = currentIndex >= totalTickets;

  useEffect(() => { setIsOpen(false); setShowResult(false); }, [currentIndex]);

  const doOpen = useCallback(() => {
    if (!current || isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      if (!mountedRef.current) return;
      setShowResult(true);
      if (current.isWinner) setWinsRevealed(p => p + 1);
    }, 900);
  }, [current, isOpen]);

  const handleNext = useCallback(() => {
    if (currentIndex >= totalTickets - 1) { setCurrentIndex(totalTickets); return; }
    setCurrentIndex(p => p + 1);
  }, [currentIndex, totalTickets]);

  return (
    <div
      className={cn("absolute inset-0 flex flex-col overflow-hidden rounded-xl", className)}
      style={{ background: "radial-gradient(ellipse at 50% 30%, #1e0e3a 0%, #120826 50%, #0a0412 100%)" }}
    >
      <div className="relative z-10 flex items-center justify-between px-3 pt-2 pb-1">
        <h2 className="text-white font-bold text-sm flex items-center gap-1.5"><span>🏴‍☠️</span>Mystery Chest</h2>
        <button onClick={onComplete} className="text-purple-300/30 hover:text-white p-1"><X className="h-4 w-4" /></button>
      </div>
      {allDone ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col items-center justify-center px-4 pb-4 relative z-10">
          <PartyPopper className="h-10 w-10 text-amber-400 mb-2" />
          <h3 className="text-white font-bold text-lg">{winsRevealed} treasure{winsRevealed !== 1 ? "s" : ""} found!</h3>
          <p className="text-purple-300/60 text-xs mt-1">{totalTickets} chest{totalTickets !== 1 ? "s" : ""} opened</p>
          <Button onClick={onComplete} className="mt-4 w-full max-w-xs bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-xl h-10 text-sm">Done</Button>
        </motion.div>
      ) : current && (
        <>
          <div className="relative z-10 flex items-center justify-between px-3 pb-1 text-[11px]">
            <span className="text-purple-300/50">Ticket <span className="text-white font-bold">#{current.ticketNumber}</span></span>
            <span className="text-purple-300/50">{currentIndex + 1} / {totalTickets}</span>
          </div>
          <div className="flex-1 relative z-10 flex flex-col items-center justify-center min-h-0">
            {!isOpen && !showResult && (
              <motion.p className="absolute top-2 text-purple-300/50 text-xs z-20"
                animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                Tap the chest
              </motion.p>
            )}
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }} className="relative z-10">
                <Chest3D isOpen={isOpen} onClick={doOpen} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              {showResult && (
                <motion.div className="absolute z-20 text-center px-4" style={{ bottom: "48%" }}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: -50, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}>
                  {current.isWinner ? (
                    <div className="bg-gradient-to-b from-amber-500/20 to-amber-900/30 backdrop-blur-md border border-amber-500/30 rounded-xl px-3 py-2 shadow-2xl">
                      <p className="text-white text-sm font-bold">{current.prizeTitle}</p>
                      {current.autoPayout && current.creditAmount ? (
                        <div className="flex items-center justify-center gap-1 mt-1 text-green-400 text-xs"><Wallet className="h-3 w-3" />{formatPence(current.creditAmount)}</div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="bg-purple-950/60 backdrop-blur-md border border-purple-700/30 rounded-xl px-3 py-2">
                      <p className="text-purple-100/70 text-xs font-semibold">Empty</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative z-10 px-3 pb-3 pt-1 space-y-2">
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={handleNext} className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg h-9 text-xs">
                  {currentIndex < totalTickets - 1 ? (<><ChevronRight className="h-4 w-4 mr-1" />Next</>) : (<><Trophy className="h-4 w-4 mr-1" />Results</>)}
                </Button>
              </motion.div>
            )}
            <div className="h-1 bg-purple-950/50 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full"
                animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / totalTickets) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DemoMysteryChest;
