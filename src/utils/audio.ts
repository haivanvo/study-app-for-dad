/**
 * Web Audio API synthesizer for the Stroke Rehabilitation App.
 * Synthesizes senior-friendly, non-threatening feedback tones.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a beautiful, gentle success chime (A major arpeggio / Pentatonic ascent).
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // We play two sweet ascending notes (E5, A5) with a moderate, non-startling volume
    _playTone(ctx, 659.25, 'triangle', now, 0.15, 0.18); // E5 (Reduced from 0.4 based on user feedback)
    _playTone(ctx, 880.00, 'triangle', now + 0.12, 0.25, 0.18); // A5 (higher) (Reduced from 0.4)
  } catch (e) {
    console.error('Audio synthesizer error:', e);
  }
}

/**
 * Play a low-distraction, mild corrective buzzy chime (G natural, lower pitch, short duration).
 */
export function playErrorChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Friendly soft hum
    _playTone(ctx, 220.00, 'sine', now, 0.25, 0.45); // A3 (Boosted from 0.15)
    _playTone(ctx, 215.00, 'sine', now + 0.05, 0.25, 0.45); // slightly detuned (Boosted from 0.15)
  } catch (e) {
    console.error('Audio synthesizer error:', e);
  }
}

/**
 * Play a grand sparkling victory sound for finishing the rehabilitation course.
 */
export function playVictoryChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Descending / Ascending playful scale (Arpeggio)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      _playTone(ctx, freq, 'sine', now + (idx * 0.15), 0.3, 0.2); // Reduced from 0.35 based on user feedback
    });
  } catch (e) {
    console.error('Audio synthesizer error:', e);
  }
}

/**
 * Play a soft bubble click sound for tapping general elements.
 */
export function playTapChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    _playTone(ctx, 440.00, 'sine', now, 0.08, 0.25); // A4 (Boosted from 0.05)
  } catch (e) {
    // Fail silently for general UI events
  }
}

function _playTone(
  ctx: AudioContext,
  frequency: number,
  type: OscillatorType,
  startTime: number,
  duration: number,
  volume: number
) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(volume, startTime);
  // Smoothly damp the sound to zero to avoid popping artifact
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}
