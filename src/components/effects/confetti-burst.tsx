"use client";

import confetti from "canvas-confetti";

export function fireWinConfetti() {
  const colors = ["#8B5CF6", "#22D3EE", "#3B82F6", "#E879F9", "#FFFFFF"];

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.65 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 180);
}
