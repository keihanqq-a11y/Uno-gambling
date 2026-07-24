"use client";

type SoundName =
  | "click"
  | "hover"
  | "success"
  | "error"
  | "deposit"
  | "withdraw"
  | "card"
  | "shuffle"
  | "uno"
  | "win"
  | "lose"
  | "notify"
  | "coin";

let ctx: AudioContext | null = null;
let enabled = true;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
}

function tone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.08,
  delay = 0,
) {
  const audio = getCtx();
  if (!audio || !enabled) return;

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(audio.destination);

  const start = audio.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

const SOUND_MAP: Record<SoundName, () => void> = {
  click: () => {
    tone(520, 0.06, "triangle", 0.06);
    tone(780, 0.05, "sine", 0.04, 0.02);
  },
  hover: () => tone(420, 0.04, "sine", 0.02),
  success: () => {
    tone(523, 0.08, "sine", 0.07);
    tone(659, 0.1, "sine", 0.07, 0.07);
    tone(784, 0.14, "sine", 0.08, 0.14);
  },
  error: () => {
    tone(220, 0.12, "sawtooth", 0.05);
    tone(160, 0.16, "square", 0.04, 0.08);
  },
  deposit: () => {
    tone(440, 0.08, "sine", 0.06);
    tone(660, 0.1, "triangle", 0.06, 0.06);
    tone(880, 0.12, "sine", 0.05, 0.12);
  },
  withdraw: () => {
    tone(660, 0.08, "triangle", 0.05);
    tone(440, 0.12, "sine", 0.05, 0.08);
  },
  card: () => {
    tone(310, 0.05, "triangle", 0.04);
    tone(490, 0.04, "sine", 0.03, 0.03);
  },
  shuffle: () => {
    for (let i = 0; i < 6; i++) {
      tone(280 + i * 40, 0.04, "triangle", 0.03, i * 0.03);
    }
  },
  uno: () => {
    tone(600, 0.1, "square", 0.05);
    tone(900, 0.14, "square", 0.05, 0.08);
  },
  win: () => {
    [523, 659, 784, 1046].forEach((f, i) =>
      tone(f, 0.16, "sine", 0.07, i * 0.08),
    );
  },
  lose: () => {
    tone(320, 0.15, "sawtooth", 0.04);
    tone(240, 0.2, "triangle", 0.04, 0.1);
  },
  notify: () => {
    tone(880, 0.08, "sine", 0.05);
    tone(1175, 0.1, "sine", 0.04, 0.06);
  },
  coin: () => {
    tone(980, 0.06, "square", 0.04);
    tone(1310, 0.08, "sine", 0.04, 0.05);
  },
};

export function playSound(name: SoundName) {
  try {
    const audio = getCtx();
    if (audio?.state === "suspended") void audio.resume();
    SOUND_MAP[name]();
  } catch {
    // Ignore audio errors in restricted environments
  }
}
