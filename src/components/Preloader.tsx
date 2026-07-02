"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { sounds } from "@/utils/sounds";
import { SITE } from "@/lib/site";

const BRAND = SITE.name.toUpperCase();
const STORAGE_KEY = "aero_intro_done";
/** Legacy key from previous preloader — honor it so repeat visitors are not interrupted */
const LEGACY_STORAGE_KEY = "kara_loaded";

const VIN_CHARS = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomVinBody(): string {
  const block = () =>
    Array.from({ length: 4 }, () => VIN_CHARS[Math.floor(Math.random() * VIN_CHARS.length)]).join("");
  return `${block()}-${block()}`;
}

function scrambleVin(target: string, progress: number): string {
  const letters = target.replace(/-/g, "");
  const lockCount = Math.min(letters.length, Math.floor((progress / 100) * letters.length));
  let li = 0;
  return target
    .split("")
    .map((ch) => {
      if (ch === "-") return "-";
      const shouldLock = li < lockCount;
      const idx = li;
      li += 1;
      if (shouldLock) return ch;
      const noise = Math.sin(idx * 12.9898 + progress * 0.31) * 43758.5453;
      const pick = VIN_CHARS[Math.floor(Math.abs(noise) % VIN_CHARS.length)];
      return pick;
    })
    .join("");
}

const statusForProgress = (p: number) => {
  if (p < 28) return "Calibrating aero profile";
  if (p < 62) return "Priming dynamics stack";
  if (p < 92) return "Syncing telemetry mesh";
  return "Clear for launch";
};

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [vinCode, setVinCode] = useState(`${BRAND}-0000-0000`);

  const vinLine = useMemo(() => scrambleVin(vinCode, progress), [vinCode, progress]);

  useEffect(() => {
    const done =
      sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(LEGACY_STORAGE_KEY);
    if (done) {
      setLoading(false);
      return;
    }

    setVinCode(`${BRAND}-${randomVinBody()}`);

    const reduced = !!prefersReducedMotion;
    const minMs = reduced ? 280 : 800;
    const idealMs = reduced ? 650 : 2400;
    const maxMs = reduced ? 2000 : 10000;
    const finishRampMs = reduced ? 0 : 220;

    const start = performance.now();
    let frame = 0;
    let cancelled = false;
    let released = false;
    let releaseAt: number | null = null;
    let finished = false;

    const persistAndDismiss = () => {
      if (finished || cancelled) return;
      finished = true;
      if (!reduced) {
        sounds.playPreloaderDismiss();
      }
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(LEGACY_STORAGE_KEY, "true");
      setProgress(100);
      setLoading(false);
    };

    const tick = (now: number) => {
      if (cancelled || finished) return;

      const elapsed = now - start;

      if (!released) {
        if (elapsed >= minMs && (document.readyState === "complete" || elapsed >= maxMs)) {
          released = true;
          releaseAt = now;
        }
        const t = Math.min(1, elapsed / idealMs);
        const eased = 1 - (1 - t) ** 2;
        setProgress(Math.min(99, Math.round(eased * 100)));
        frame = requestAnimationFrame(tick);
        return;
      }

      if (releaseAt === null) releaseAt = now;

      if (finishRampMs <= 0) {
        persistAndDismiss();
        return;
      }

      const u = Math.min(1, (now - releaseAt) / finishRampMs);
      setProgress(Math.round(99 + u));
      if (u >= 1) {
        persistAndDismiss();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  const reduced = !!prefersReducedMotion;

  const needleDeg = -135 + (progress / 100) * 270;
  const circumference = 2 * Math.PI * 52;
  const arcLen = circumference * 0.75;
  const arcDashOffset = arcLen * (1 - progress / 100);

  const exitTransition = reduced
    ? { duration: 0.2, ease: "easeOut" as const }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)" }}
          transition={exitTransition}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-[#030303] pointer-events-auto"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(230, 255, 0, 0.09) 0%, transparent 55%), linear-gradient(180deg, #080808 0%, #030303 100%)",
            }}
          />

          {!reduced && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 h-px w-[45%] bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ top: `${8 + i * 6.5}%` }}
                  initial={{ x: "-20%" }}
                  animate={{ x: "220%" }}
                  transition={{
                    duration: 1.6 + (i % 4) * 0.15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center px-6">
            <motion.p
              initial={reduced ? false : { opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 0.55, letterSpacing: "0.35em" }}
              transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-[10px] font-semibold uppercase text-primary"
            >
              {SITE.fullName}
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }
              }
              className="mb-6 text-center text-5xl font-black tracking-tight text-foreground sm:text-6xl"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              {BRAND}
            </motion.h1>

            <p
              className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 sm:text-[11px]"
              aria-label="Build identifier"
            >
              {vinLine}
            </p>

            <div className="relative mb-4 flex flex-col items-center">
              <div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
                <svg className="h-full w-full" viewBox="0 0 120 120" aria-hidden>
                  <g transform="rotate(135 60 60)">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${arcLen} ${circumference}`}
                      strokeDashoffset={0}
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#E6FF00"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${arcLen} ${circumference}`}
                      strokeDashoffset={arcDashOffset}
                      className="transition-[stroke-dashoffset] duration-75 ease-linear"
                    />
                  </g>
                </svg>
                <div
                  className="absolute left-1/2 top-1/2 h-[46%] w-0.5 origin-bottom rounded-full bg-primary shadow-[0_0_12px_rgba(230,255,0,0.45)]"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${needleDeg}deg)`,
                    transformOrigin: "50% 100%",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 z-[1] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-[#0a0a0a]" />
              </div>
              <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                {progress}
                <span className="text-sm font-medium text-white/35">%</span>
              </p>
            </div>

            <p className="mb-8 max-w-xs text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
              {statusForProgress(progress)}
            </p>

            <div className="h-px w-[min(280px,70vw)] overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
