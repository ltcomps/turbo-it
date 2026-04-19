/**
 * Shared helpers + types for the turbo-it game-mode demo wrappers.
 *
 * These demos are forks of the Lucky Turbo game components
 * (luckyturboV2_1/src/components/*.tsx), stripped of:
 *   - Supabase auth + RPCs
 *   - Pixel tracking
 *   - Repository fetches
 *   - Next-raffle router hooks
 * so they can play standalone inside the marketing site at turboit.uk.
 *
 * Outer chrome is `absolute inset-0` rather than LT's `fixed inset-0`
 * so the demos sit inside a parent container (e.g. a 400x400 card)
 * instead of hijacking the whole viewport.
 */

export interface DemoGameProps {
  className?: string;
  /** Called when the demo completes (shows outcome). Not required. */
  onComplete?: () => void;
}

/** Pence → "£X.XX" (mirrors LT's formatPrice). */
export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

/** Ticket shape expected by the LT game components. */
export interface DemoTicket {
  id: number;
  ticketNumber: number;
}

export interface DemoWin {
  prizeTitle: string;
  prizeValue: number;
  creditAmount: number;
  autoPayout: boolean;
  ticketNumber: number;
}

/**
 * Build a small, opinionated demo fixture: N tickets with a few winners.
 * Winners are always a fixed set so the demo is predictable-ish.
 */
export function demoFixture(opts?: {
  ticketCount?: number;
  winnerTicketNumbers?: number[];
}): { tickets: DemoTicket[]; wins: DemoWin[] } {
  const count = opts?.ticketCount ?? 4;
  const winners = opts?.winnerTicketNumbers ?? [2, 4];

  const tickets: DemoTicket[] = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ticketNumber: i + 1,
  }));

  const prizePool: DemoWin[] = [
    { prizeTitle: "£50 Cash", prizeValue: 5000, creditAmount: 5000, autoPayout: true, ticketNumber: 0 },
    { prizeTitle: "£10 Credit", prizeValue: 1000, creditAmount: 1000, autoPayout: true, ticketNumber: 0 },
    { prizeTitle: "Bonus Entry", prizeValue: 500, creditAmount: 0, autoPayout: false, ticketNumber: 0 },
    { prizeTitle: "£25 Cash", prizeValue: 2500, creditAmount: 2500, autoPayout: true, ticketNumber: 0 },
  ];

  const wins: DemoWin[] = winners.map((tn, i) => ({
    ...prizePool[i % prizePool.length],
    ticketNumber: tn,
  }));

  return { tickets, wins };
}
