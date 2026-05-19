"use client";

class SoundEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    private init() {
        if (typeof window === "undefined") return;
        if (!this.ctx) {
            const AudioCtx =
                window.AudioContext ??
                (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.5; // Master volume
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public playHover() {
        try {
            this.init();
            if (!this.ctx || !this.masterGain) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        } catch { }
    }

    public playClick() {
        try {
            this.init();
            if (!this.ctx || !this.masterGain) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "square";
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        } catch { }
    }

    /** Short “rev” stinger when the intro preloader completes (Web Audio, no asset file). */
    public playPreloaderDismiss() {
        try {
            this.init();
            if (!this.ctx || !this.masterGain) return;

            const t0 = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(55, t0);
            osc.frequency.exponentialRampToValueAtTime(220, t0 + 0.12);
            osc.frequency.exponentialRampToValueAtTime(90, t0 + 0.28);

            gain.gain.setValueAtTime(0, t0);
            gain.gain.linearRampToValueAtTime(0.06, t0 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.32);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t0);
            osc.stop(t0 + 0.34);
        } catch { }
    }
}

export const sounds = new SoundEngine();
