"use client";
/**
 * DemoSugarRush — original playable for the marketing showcase.
 *
 * NOTE: LT's SugarRush.tsx does not exist in /home/ops/repos/luckyturboV2_1/src/components/
 * at the time of this extract (found only CSS classes `sugar-rush-*` and an
 * "animated-card-tags" registry entry). Since the task asked to "ship it as playable",
 * this is a self-contained match-3 mini-game in the LT spirit — pick two adjacent
 * candies, swap them, matches of 3+ clear and score points. 8 moves → prize reveal
 * based on score.
 *
 * If/when LT ships a real SugarRush component, replace the body of this file with
 * a copy+strip of it (same pattern as DemoScratchCard etc).
 */
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, X, Wallet, Candy as CandyIcon, Cookie, Heart, Star, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPence, type DemoGameProps } from "./_shared";

const GRID = 6;
const MOVES = 8;

type Candy = "candy" | "cookie" | "heart" | "star" | "gem";
const CANDIES: Candy[] = ["candy", "cookie", "heart", "star", "gem"];

/* Distinct icon + colour per candy — avoids emoji-font rendering failures */
const CANDY_STYLE: Record<Candy, { Icon: LucideIcon; bg: string; fg: string; ring: string }> = {
  candy:  { Icon: CandyIcon, bg: "#fee2e2", fg: "#dc2626", ring: "#fca5a5" },
  cookie: { Icon: Cookie,    bg: "#fef3c7", fg: "#b45309", ring: "#fcd34d" },
  heart:  { Icon: Heart,     bg: "#fce7f3", fg: "#be185d", ring: "#f9a8d4" },
  star:   { Icon: Star,      bg: "#fef9c3", fg: "#ca8a04", ring: "#fde047" },
  gem:    { Icon: Gem,       bg: "#ede9fe", fg: "#7c3aed", ring: "#c4b5fd" },
};

function randBoard(): Candy[] {
  return Array.from({ length: GRID * GRID }, () => CANDIES[Math.floor(Math.random() * CANDIES.length)]!);
}

function findMatches(board: Candy[]): Set<number> {
  const matches = new Set<number>();
  // Horizontal
  for (let r = 0; r < GRID; r++) {
    let run = 1;
    for (let c = 1; c <= GRID; c++) {
      const cur = c < GRID ? board[r * GRID + c] : null;
      const prev = board[r * GRID + c - 1];
      if (cur && cur === prev) { run++; } else {
        if (run >= 3) for (let k = 0; k < run; k++) matches.add(r * GRID + c - 1 - k);
        run = 1;
      }
    }
  }
  // Vertical
  for (let c = 0; c < GRID; c++) {
    let run = 1;
    for (let r = 1; r <= GRID; r++) {
      const cur = r < GRID ? board[r * GRID + c] : null;
      const prev = board[(r - 1) * GRID + c];
      if (cur && cur === prev) { run++; } else {
        if (run >= 3) for (let k = 0; k < run; k++) matches.add((r - 1 - k) * GRID + c);
        run = 1;
      }
    }
  }
  return matches;
}

function resolveBoard(board: Candy[]): { board: Candy[]; scored: number } {
  let total = 0;
  let b = [...board];
  while (true) {
    const m = findMatches(b);
    if (m.size === 0) break;
    total += m.size;
    // Clear matches, shift down, refill
    for (let c = 0; c < GRID; c++) {
      const col: Candy[] = [];
      for (let r = GRID - 1; r >= 0; r--) {
        const i = r * GRID + c;
        if (!m.has(i)) col.push(b[i]);
      }
      while (col.length < GRID) col.push(CANDIES[Math.floor(Math.random() * CANDIES.length)]!);
      for (let r = GRID - 1; r >= 0; r--) b[r * GRID + c] = col[GRID - 1 - r];
    }
  }
  return { board: b, scored: total };
}

export function DemoSugarRush({ className, onComplete }: DemoGameProps) {
  const initial = useMemo(() => resolveBoard(randBoard()).board, []);
  const [board, setBoard] = useState<Candy[]>(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(MOVES);
  const [done, setDone] = useState(false);

  const trySwap = useCallback((a: number, b: number) => {
    const dr = Math.abs(Math.floor(a / GRID) - Math.floor(b / GRID));
    const dc = Math.abs((a % GRID) - (b % GRID));
    if (dr + dc !== 1) return;
    const next = [...board];
    [next[a], next[b]] = [next[b], next[a]];
    // Only accept if it creates a match
    if (findMatches(next).size === 0) return;
    const { board: resolved, scored } = resolveBoard(next);
    setBoard(resolved);
    setScore(s => s + scored);
    setMovesLeft(m => {
      const n = m - 1;
      if (n === 0) setDone(true);
      return n;
    });
  }, [board]);

  const onCell = (i: number) => {
    if (done) return;
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }
    trySwap(selected, i);
    setSelected(null);
  };

  const won = score >= 12;
  const prize = won ? { title: "£10 Credit", value: 1000 } : null;

  return (
    <div
      className={cn("absolute inset-0 flex flex-col overflow-hidden rounded-xl p-2", className)}
      style={{ background: "linear-gradient(135deg, #ff6ec7 0%, #ff9ed6 40%, #ffb4d8 70%, #ff6ec7 100%)" }}
    >
      <div className="flex items-center justify-between pb-1">
        <h2 className="flex items-center gap-1.5 text-white font-bold text-sm drop-shadow">
          <CandyIcon className="h-4 w-4" /> Sugar Rush
        </h2>
        <button onClick={onComplete} className="text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex items-center justify-between text-[11px] pb-1 text-white">
        <span className="font-bold">Score: {score}</span>
        <span>Moves: {movesLeft}</span>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="grid gap-1 p-1 rounded-lg bg-white/20 backdrop-blur-sm" style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}>
          {board.map((c, i) => {
            const s = CANDY_STYLE[c];
            const isSelected = selected === i;
            return (
              <motion.button
                key={i}
                onClick={() => onCell(i)}
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "aspect-square rounded-md flex items-center justify-center select-none transition-all",
                  isSelected && "ring-2 ring-yellow-400 ring-offset-1 ring-offset-pink-400 scale-110",
                )}
                style={{
                  width: "min(8vw, 36px)",
                  background: isSelected ? "#fde047" : s.bg,
                  border: `1.5px solid ${isSelected ? "#ca8a04" : s.ring}`,
                }}
                disabled={done}
              >
                <s.Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: s.fg }} strokeWidth={2.5} />
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="pt-1.5 space-y-1.5">
        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              {won && prize ? (
                <div className="bg-gradient-to-r from-amber-400/90 to-orange-400/90 rounded-lg px-2 py-1.5 border border-white/50">
                  <div className="flex items-center justify-center gap-1">
                    <PartyPopper className="h-4 w-4 text-yellow-100" />
                    <span className="text-white font-black text-xs">YOU WON!</span>
                  </div>
                  <p className="text-white text-sm font-bold">{prize.title}</p>
                  <div className="flex items-center justify-center gap-1 text-white/90 text-[11px]">
                    <Wallet className="h-3 w-3" />{formatPence(prize.value)}
                  </div>
                </div>
              ) : (
                <p className="text-white text-xs font-semibold bg-black/20 rounded-lg py-1">Final score: {score}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {done ? (
          <Button onClick={onComplete} className="w-full bg-white text-pink-600 font-bold rounded-lg h-9 text-xs hover:bg-pink-50">
            <Trophy className="h-4 w-4 mr-1" />Done
          </Button>
        ) : (
          <p className="text-white/80 text-[11px] text-center">Match 3+ candies in a row. Score 12+ to win!</p>
        )}
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white rounded-full"
            animate={{ width: `${((MOVES - movesLeft) / MOVES) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

export default DemoSugarRush;
