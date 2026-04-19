"use client";
/**
 * DemoFlappyBird — marketing fork of LT's FlappyBird.
 * Copy + strip because LT uses Supabase auth + RPCs (`start_game_run`, `submit_game_score`,
 * `get_leaderboard`) and pulls in FlappyLeaderboard. We run just the canvas engine and
 * show a dummy best-score card.
 * Source: luckyturboV2_1/src/components/FlappyBird.tsx
 */
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlappyBirdGame } from "./_FlappyBirdGame";
import { formatPence, type DemoGameProps } from "./_shared";

type GameState = "intro" | "playing" | "revealing";

// Static fake leaderboard so visitors get the full LT experience
const FAKE_LEADERBOARD = [
  { name: "skyhigh_42", score: 47 },
  { name: "flappymaster", score: 38 },
  { name: "You", score: 0, self: true },
  { name: "birdbrain", score: 21 },
  { name: "pipe_dodger", score: 18 },
];

export function DemoFlappyBird({ className, onComplete }: DemoGameProps) {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const handleStart = useCallback(() => {
    setScore(0); setCurrentScore(0);
    setGameState("playing");
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    // Demo reward logic: score >= 5 wins a prize
    setHasWon(finalScore >= 5);
    setTimeout(() => setGameState("revealing"), 400);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState("intro");
  }, []);

  useEffect(() => {
    // Nothing to do — keeps hook order consistent
  }, []);

  const leaderboard = [...FAKE_LEADERBOARD];
  const selfIdx = leaderboard.findIndex(l => l.self);
  if (selfIdx >= 0) leaderboard[selfIdx] = { ...leaderboard[selfIdx], score };
  leaderboard.sort((a, b) => b.score - a.score);

  return (
    <div className={cn("absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col rounded-xl overflow-hidden", className)}>
      <div className="relative z-20 flex items-center justify-between px-2 py-1 bg-black/20 backdrop-blur-sm">
        <span className="text-white text-xs font-bold">Sky Run</span>
        {gameState === "playing" && (
          <span className="text-white font-black text-lg drop-shadow-lg tabular-nums">{currentScore}</span>
        )}
        <button onClick={onComplete} className="text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
      </div>

      <div className="flex-1 relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {gameState === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center px-3 gap-3">
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <svg width="48" height="48" viewBox="0 0 64 64">
                  <ellipse cx="32" cy="32" rx="24" ry="18" fill="#3B82F6" />
                  <ellipse cx="32" cy="32" rx="18" ry="14" fill="#93C5FD" />
                  <circle cx="40" cy="27" r="4" fill="#1e293b" />
                  <path d="M48 30 L58 27 L48 35 Z" fill="#f97316" />
                </svg>
              </motion.div>
              <div className="text-center">
                <h2 className="text-sky-900 font-black text-lg">Ready?</h2>
                <p className="text-sky-700/70 text-[11px]">Score 5+ to win a prize</p>
              </div>
              <Button onClick={handleStart}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-black rounded-xl h-10 px-6 shadow-lg shadow-sky-500/30">
                Tap to Start
              </Button>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 relative">
              <FlappyBirdGame isPlaying onScoreUpdate={setCurrentScore} onGameOver={handleGameOver} />
            </motion.div>
          )}

          {gameState === "revealing" && (
            <motion.div key="reveal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-3 gap-2">
              <div className="text-center">
                <p className="text-sky-800/60 text-[11px]">Score</p>
                <p className="text-sky-900 font-black text-3xl tabular-nums">{score}</p>
              </div>
              {hasWon ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-2 border-amber-400/50 rounded-xl px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <PartyPopper className="h-4 w-4 text-yellow-500" />
                    <span className="text-sky-900 font-black text-sm">YOU WON!</span>
                  </div>
                  <p className="text-sky-900 font-bold text-sm">£10 Credit</p>
                  <p className="text-green-700 text-[11px] font-bold">{formatPence(1000)}</p>
                </motion.div>
              ) : (
                <p className="text-sky-800/60 text-xs">So close — score 5+ next time!</p>
              )}
              <div className="w-full max-w-[240px] bg-white/30 backdrop-blur-sm rounded-lg p-1.5 text-[10px]">
                <p className="text-sky-900 font-bold mb-0.5">Leaderboard</p>
                {leaderboard.slice(0, 4).map((r, i) => (
                  <div key={i} className={`flex justify-between px-1 ${r.self ? "text-sky-900 font-bold" : "text-sky-800/70"}`}>
                    <span>{i + 1}. {r.name}</span><span className="tabular-nums">{r.score}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 w-full max-w-[240px]">
                <Button onClick={handlePlayAgain} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg h-8 text-xs">
                  Play Again
                </Button>
                <Button onClick={onComplete} className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold rounded-lg h-8 text-xs">
                  <Trophy className="h-3 w-3 mr-1" />Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DemoFlappyBird;
