import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { forwardRef, useEffect, useRef } from "react";
import { PortfolioSectionProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

const PORTRAITS = [
  {
    src: "/images/portfolio/mantra-1.png",
    alt: "Jordan Nwabuike in a green double-breasted suit",
    focus: "50% 30%",
  },
  {
    src: "/images/portfolio/mantra-2.png",
    alt: "Jordan Nwabuike working on a laptop at the office",
    focus: "50% 30%",
  },
  {
    src: "/images/portfolio/mantra-3.png",
    alt: "Jordan Nwabuike in a green kaftan",
    focus: "50% 30%",
  },
];

const SWAPS = [
  { img: 1, at: 3 },
  { img: 2, at: 5 },
];

const RAIL_COUNT = 9;
const RAIL_TRAVEL = 32000;
const RAILS = Array.from({ length: RAIL_COUNT * 2 }, (_, i) => ({
  side: i < RAIL_COUNT ? -1 : 1,
  top: `${3 + (i % RAIL_COUNT) * 11.75}%`,
  length: 10 + ((i * 11) % 3) * 6,
  speed: 0.07 + ((i * 7) % 5) * 0.03,
  phase: (i * 13) % 35,
}));

const MANTRAS = [
  {
    n: "I",
    lines: [
      { text: "You are whoever", accent: false },
      { text: "you think you are.", accent: true },
    ],
  },
  {
    n: "II",
    lines: [
      { text: "Nothing can stop you", accent: false },
      { text: "except you.", accent: true },
    ],
  },
  {
    n: "III",
    lines: [
      { text: "Keep moving forward,", accent: false },
      { text: "no matter how slow.", accent: true },
    ],
  },
  {
    n: "IV",
    lines: [
      { text: "I am not waiting for", accent: false },
      { text: "my life to change;", accent: false },
      { text: "I am building", accent: true },
      { text: "the life I want.", accent: true },
    ],
  },
  {
    n: "V",
    lines: [
      { text: "The person I see", accent: false },
      { text: "in my mind", accent: false },
      { text: "is the person", accent: false },
      { text: "I am becoming.", accent: true },
    ],
  },
  {
    n: "VI",
    lines: [
      { text: "I come from", accent: false },
      { text: "where I started,", accent: false },
      { text: "but I am not limited", accent: true },
      { text: "by where I started.", accent: true },
    ],
  },
  {
    n: "VII",
    lines: [
      { text: "Your direction is", accent: false },
      { text: "more important", accent: false },
      { text: "than your speed;", accent: false },
      { text: "don't move fast", accent: true },
      { text: "to nowhere.", accent: true },
    ],
  },
];

const QuotesSection = forwardRef<HTMLElement, PortfolioSectionProps>(
  (_props, ref) => {
    const rootRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".mantra-line").forEach((line) => {
          gsap.from(line, {
            yPercent: 110,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top bottom",
              end: "top 45%",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".mantra-meta").forEach((meta) => {
          gsap.from(meta, {
            autoAlpha: 0,
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: meta,
              start: "top bottom",
              end: "top 60%",
              scrub: true,
            },
          });
        });

        gsap.from(".mantra-frame", {
          yPercent: 12,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });

        const rails = gsap.utils.toArray<HTMLElement>(".mantra-rail");
        const railSet = rails.map((el) => gsap.quickSetter(el, "x", "px"));
        const railProxy = { t: 0 };

        const applyRails = () => {
          const vw = window.innerWidth / 100;
          RAILS.forEach((rail, i) => {
            const span = (35 + rail.length) * vw;
            const travel = (railProxy.t * rail.speed + rail.phase * vw) % span;
            railSet[i](rail.side < 0 ? 35 * vw - travel : travel - 35 * vw);
          });
        };

        gsap.to(railProxy, {
          t: RAIL_TRAVEL,
          ease: "none",
          onUpdate: applyRails,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        applyRails();

        const blocks = gsap.utils.toArray<HTMLElement>(".mantra-block");

        gsap.fromTo(
          ".mantra-img-0 img",
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top bottom",
              endTrigger: blocks[SWAPS[0].at],
              end: "top 35%",
              scrub: true,
            },
          },
        );

        gsap.set(
          SWAPS.map(({ img }) => `.mantra-img-${img}`),
          { autoAlpha: 0 },
        );

        SWAPS.forEach(({ img, at }) => {
          const swapTl = gsap.timeline({
            scrollTrigger: {
              trigger: blocks[at],
              start: "top 95%",
              end: "top 30%",
              scrub: true,
            },
          });

          swapTl
            .to(`.mantra-img-${img - 1}`, {
              autoAlpha: 0,
              yPercent: -6,
              duration: 0.45,
              ease: "none",
            })
            .fromTo(
              `.mantra-img-${img}`,
              { autoAlpha: 0, yPercent: 8 },
              { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "none" },
              0.55,
            );

          gsap.fromTo(
            `.mantra-img-${img} img`,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: blocks[at],
                start: "top 85%",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="quotes"
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="relative pt-[clamp(6rem,28vh,22rem)]"
      >
        <div className="relative px-4 sm:px-6 md:px-12 pb-[clamp(2rem,6vh,4rem)]">
          <span
            aria-hidden="true"
            className="font-title pointer-events-none absolute top-[-6vw] right-0 select-none text-[clamp(7rem,20vw,22rem)] leading-none text-(--ink)/6"
          >
            MANTRA
          </span>
          <div className="relative flex items-center gap-3 border-t-2 border-(--ink)/70 pt-4">
            <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tabular-nums tracking-widest text-(--accent)">
              02
            </span>
            <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tracking-[0.35em] uppercase text-(--ink)/50">
              Words I live by
            </span>
          </div>
        </div>

        <div ref={wrapRef} className="relative">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
            >
              {RAILS.map((rail, i) => (
                <span
                  key={i}
                  style={{
                    top: rail.top,
                    width: `${rail.length}vw`,
                    ...(rail.side < 0 ? { left: 0 } : { right: 0 }),
                    background:
                      "linear-gradient(90deg, transparent, var(--ink) 50%, transparent)",
                  }}
                  className="mantra-rail will-change-transform absolute h-px"
                />
              ))}
            </div>
            <div className="mantra-frame relative will-change-transform h-svh w-full md:h-[95svh] md:w-[min(32vw,58vh)] md:rounded-2xl overflow-hidden">
              {PORTRAITS.map((portrait, i) => (
                <figure
                  key={portrait.src}
                  className={`mantra-img-${i} absolute inset-0 overflow-hidden`}
                >
                  <Image
                    fill
                    alt={portrait.alt}
                    src={portrait.src}
                    className="object-cover will-change-transform"
                    sizes="(min-width: 768px) 32vw, 100vw"
                    style={{ objectPosition: portrait.focus }}
                  />
                </figure>
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-(--paper)/90 via-(--paper)/35 to-(--paper)/5 md:hidden" />
            </div>
          </div>

          <div className="relative z-10 mt-[-100vh] pb-[8vh]">
            {MANTRAS.map((mantra, i) => (
              <blockquote
                key={mantra.n}
                className="mantra-block min-h-[75vh] md:min-h-[85vh] flex items-end pb-[14vh] md:items-center md:pb-0 px-4 sm:px-6 md:px-12"
              >
                <div
                  className={`flex w-full flex-col gap-[clamp(1rem,2.5vh,1.75rem)] md:w-[calc(50%-min(16vw,29vh)-clamp(1.25rem,2.5vw,3rem))] ${
                    i % 2 === 0
                      ? "items-start text-left md:mr-auto"
                      : "items-end text-right md:ml-auto"
                  }`}
                >
                  <span className="mantra-meta font-title text-[clamp(1.4rem,2.2vw,2.25rem)] text-(--accent)">
                    {mantra.n}
                  </span>
                  <p className="font-title text-[clamp(2.2rem,10vw,3.5rem)] md:text-[clamp(2.2rem,3.4vw,5.25rem)] leading-[1.02] tracking-[0.01em]">
                    {mantra.lines.map((line) => (
                      <span key={line.text} className="block overflow-hidden">
                        <span
                          className={`mantra-line block will-change-transform ${
                            line.accent ? "text-(--accent)" : ""
                          }`}
                        >
                          {line.text}
                        </span>
                      </span>
                    ))}
                  </p>
                  <footer className="mantra-meta text-[clamp(0.6rem,0.9vw,0.8rem)] tracking-[0.3em] uppercase text-(--ink)/50">
                    — Jordan Nwabuike
                  </footer>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

QuotesSection.displayName = "PortfolioQuotesSection";

export default QuotesSection;
