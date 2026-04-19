import type { Metadata } from "next";
import { DemoContent } from "./demo-content";

export const metadata: Metadata = {
  title: "Play the platform | Turbo IT",
  description:
    "Every instant-win game on the Turbo IT platform — scratch cards, spin wheels, plinko, Flappy Bird, Sugar Rush, Mystery Chest, Coin Flip. Play them all right here, no signup.",
  alternates: { canonical: "https://turboit.uk/demo" },
};

export default function DemoPage() {
  return <DemoContent />;
}
