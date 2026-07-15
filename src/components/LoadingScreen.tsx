import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const progress = { v: 0 };

      gsap
        .timeline({ onComplete: () => onCompleteRef.current() })
        .from(".loader-meta", {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        })
        .to(
          progress,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(progress.v));
              }
            },
          },
          "-=0.2",
        )
        .to(
          ".loader-bar",
          { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
          "<",
        )
        .to(
          dotRef.current,
          { rotate: 450, scale: 1.6, duration: 1.8, ease: "power2.inOut" },
          "<",
        )
        .to(
          paperRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "+=0.25",
        )
        .to(
          accentRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "<0.12",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-100">
      <div ref={accentRef} className="absolute inset-0 bg-(--accent)" />
      <div
        ref={paperRef}
        className="absolute inset-0 bg-(--paper) flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 pt-6 pb-8 md:pt-8"
      >
        <div className="loader-meta flex items-center justify-between border-t-2 border-(--ink)/70 pt-3 text-[clamp(0.55rem,0.9vw,0.75rem)] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-(--ink)/50">
          <span>Jordan Nwabuike</span>
          <span>Portfolio — 2026</span>
        </div>

        <div className="loader-meta pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            ref={dotRef}
            className="block size-[clamp(1.5rem,3vw,3rem)] bg-(--accent)"
          />
        </div>

        <div className="loader-meta relative flex items-end justify-between border-b-2 border-(--ink)/15 pb-2">
          <span className="loader-bar absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-(--accent)" />
          <span className="pb-4 text-[clamp(0.55rem,0.9vw,0.75rem)] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-(--ink)/40">
            Banjul · The Gambia
          </span>
          <span className="font-title leading-[0.8] text-[clamp(6rem,22vw,24rem)] text-(--ink)">
            <span ref={counterRef}>0</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
