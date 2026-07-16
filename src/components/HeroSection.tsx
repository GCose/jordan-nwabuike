import { gsap } from "gsap";
import Image from "next/image";
import { PortfolioSectionProps } from "./types";
import { forwardRef, useEffect, useRef } from "react";

const HeroSection = forwardRef<HTMLElement, PortfolioSectionProps>(
  ({ isReady = false }, ref) => {
    const rootRef = useRef<HTMLElement>(null);
    const trailRef = useRef<SVGPolylineElement>(null);

    useEffect(() => {
      const root = rootRef.current;
      if (!isReady || !root) return;

      const ctx = gsap.context(() => {
        gsap
          .timeline({ delay: 0.4 })
          .from(".char", {
            autoAlpha: 0,
            x: 80,
            duration: 0.7,
            ease: "power2.out",
            stagger: { each: 0.12, from: "end" },
          })
          .from(
            ".hero-meta",
            {
              autoAlpha: 0,
              y: 20,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.12,
            },
            "-=0.2",
          );

        const nameX = gsap.quickTo(".name-drift", "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const nameY = gsap.quickTo(".name-drift", "y", {
          duration: 0.9,
          ease: "power3.out",
        });

        const points: { x: number; y: number }[] = [];
        const mouse = { x: 0, y: 0, moved: false };

        const onMove = (e: MouseEvent) => {
          const r = root.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          nameX(px * 90);
          nameY(py * 55);
          mouse.x = e.clientX - r.left;
          mouse.y = e.clientY - r.top;
          mouse.moved = true;
        };

        const tick = () => {
          if (mouse.moved) {
            points.push({ x: mouse.x, y: mouse.y });
            mouse.moved = false;
          } else if (points.length) {
            points.shift();
          }
          if (points.length > 60) points.shift();
          trailRef.current?.setAttribute(
            "points",
            points.map((p) => `${p.x},${p.y}`).join(" "),
          );
        };

        gsap.ticker.add(tick);
        root.addEventListener("mousemove", onMove);
        return () => {
          root.removeEventListener("mousemove", onMove);
          gsap.ticker.remove(tick);
        };
      }, rootRef);

      return () => ctx.revert();
    }, [isReady]);

    return (
      <section
        id="hero"
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="relative min-h-dvh flex flex-col overflow-hidden px-4 sm:px-6 md:px-8 pt-20 pb-6 md:pt-10 md:pb-10"
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          <polyline
            fill="none"
            ref={trailRef}
            strokeWidth="5"
            strokeOpacity="0.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-(--ink)"
          />
        </svg>

        <div className="hero-meta invisible absolute bottom-0 right-0 md:right-[6%] h-[72vh] md:h-[85vh] z-0 aspect-2/3">
          <Image
            fill
            priority
            alt="Jordan Nwabuike Image"
            src="/images/portfolio/hero.png"
            sizes="(min-width: 768px) 35vw, 70vw"
            className="object-contain object-bottom opacity-40 grayscale transition-[filter] duration-700 hover:grayscale-0"
          />
        </div>

        <div className="hero-meta invisible relative z-10 flex items-center justify-between border-t-2 border-(--ink)/70 pt-3 pb-5 md:pt-4 text-[clamp(0.55rem,0.9vw,0.75rem)] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-(--ink)/50">
          <span> 2026</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
            Available for work
          </span>
        </div>

        <div className="pointer-events-none relative z-10 flex-1 flex flex-col justify-center">
          <div className="relative">
            <h1 className="name-drift font-title text-[clamp(4rem,19vw,22rem)] leading-[0.8] tracking-[0.02em]">
              <span className="block overflow-hidden text-left">
                {[..."JORDAN"].map((char, i) => (
                  <span key={i} className="char invisible inline-block">
                    {char}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden text-right mt-[clamp(2.25rem,7vw,8rem)]">
                {[..."NWABUIKE"].map((char, i) => (
                  <span key={i} className="char invisible inline-block">
                    {char}
                  </span>
                ))}
                <span className="char invisible inline-block text-(--accent)">
                  .
                </span>
              </span>
            </h1>

            <div className="hero-meta invisible pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center gap-4 text-[clamp(0.55rem,0.9vw,0.75rem)] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-(--ink)/40">
              <span className="whitespace-nowrap">Relentless builder</span>
              <span className="h-px flex-1 bg-(--ink)/20" />
              <span className="whitespace-nowrap">
                Founder of Jordan In Tech
              </span>
            </div>
          </div>

          <p className="hero-meta invisible mt-4 md:mt-6 text-right text-[clamp(0.6rem,1vw,0.875rem)] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-(--ink)/60">
            Founder · Software Engineer · Entertainer
          </p>
        </div>
      </section>
    );
  },
);

HeroSection.displayName = "PortfolioHeroSection";

export default HeroSection;
