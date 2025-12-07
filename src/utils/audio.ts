// Utility to generate synthesized alert sounds using Web Audio API
// This avoids external file dependencies and ensures low latency

let audioContext: AudioContext | null = null;

const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
        // Cancel any currently playing speech to avoid queue buildup
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.5; // Slightly faster
        utterance.pitch = 50.0;
        utterance.volume = 2.0;
        window.speechSynthesis.speak(utterance);
    }
};

export const stopAudio = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    if (audioContext && audioContext.state === 'running') {
        audioContext.suspend();
    }
};

const playHighPitchBeep = (ctx: AudioContext) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
};

export const playAlertSound = (type: 'drowsiness' | 'rage' | 'no_face') => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Play TTS & Alarm
    if (type === 'drowsiness') {
        playHighPitchBeep(audioContext);
        speakMessage("Wake up");
    } else if (type === 'no_face') {
        playHighPitchBeep(audioContext);
        speakMessage("Driver not found");
    } else {
        // Keep the sharp beep for rage as it's an immediate hazard warning
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
};
