// Two distinct tones generated on the fly with the Web Audio API — no
// audio asset files needed, and it works the first time the page loads.
let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function beep(frequency: number, durationMs: number, type: OscillatorType = "sine") {
  try {
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.15;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
    oscillator.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // Audio isn't available (e.g. autoplay policy before any user gesture) — fail silently.
  }
}

export function useScanSound() {
  return {
    playSuccess: () => beep(1200, 90, "sine"),
    playError: () => {
      beep(220, 160, "square");
    }
  };
}
