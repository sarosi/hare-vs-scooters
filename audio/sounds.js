const AudioContextClass = window.AudioContext || window.webkitAudioContext;

let muted = false;

export function setMuted(value) {
  muted = value;
}

function canPlay() {
  return !muted;
}

export const audioCtx = new AudioContextClass();

export async function unlockAudio() {
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
}

function createReverb() {
  const delay = audioCtx.createDelay();
  delay.delayTime.value = 0.12;

  const feedback = audioCtx.createGain();
  feedback.gain.value = 0.25;

  delay.connect(feedback);
  feedback.connect(delay);

  delay.connect(audioCtx.destination);

  return delay;
}

const reverb = createReverb();

export function playJumpSound() {
  if (!canPlay()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";

  osc.frequency.setValueAtTime(360, audioCtx.currentTime);

  osc.frequency.exponentialRampToValueAtTime(
    180,
    audioCtx.currentTime + 0.18
  );

  gain.gain.setValueAtTime(0.18, audioCtx.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.2
  );

  osc.connect(gain);
  gain.connect(reverb);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

export function playCarrotSound() {
  if (!canPlay()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";

  osc.frequency.setValueAtTime(440, audioCtx.currentTime);

  osc.frequency.exponentialRampToValueAtTime(
    880,
    audioCtx.currentTime + 0.3
  );

  gain.gain.setValueAtTime(0.22, audioCtx.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.35
  );

  osc.connect(gain);
  gain.connect(reverb);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
}

export function playMissSound() {
  if (!canPlay()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";

  osc.frequency.setValueAtTime(220, audioCtx.currentTime);

  osc.frequency.exponentialRampToValueAtTime(
    80,
    audioCtx.currentTime + 0.4
  );

  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.45
  );

  osc.connect(gain);
  gain.connect(reverb);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.45);
}

export function playGameOverSound() {
  if (!canPlay()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";

  osc.frequency.setValueAtTime(220, audioCtx.currentTime);

  osc.frequency.exponentialRampToValueAtTime(
    40,
    audioCtx.currentTime + 1.2
  );

  gain.gain.setValueAtTime(0.22, audioCtx.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 1.3
  );

  osc.connect(gain);
  gain.connect(reverb);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.3);
}