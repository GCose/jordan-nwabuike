import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { forwardRef, useEffect, useRef } from "react";
import { PortfolioSectionProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    n: "I",
    lines: [
      { text: "You are whoever", accent: false },
      { text: "you think you are.", accent: true },
    ],
    align: "",
  },
  {
    n: "II",
    lines: [
      { text: "Nothing can stop you", accent: false },
      { text: "except you.", accent: true },
    ],
    align: "items-end text-right",
  },
];

const QuotesSection = forwardRef<HTMLElement, PortfolioSectionProps>(
  (_props, ref) => {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".quote-line").forEach((line) => {
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

        gsap.utils.toArray<HTMLElement>(".quote-meta").forEach((meta) => {
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
        className="relative px-4 sm:px-6 md:px-12 pt-[clamp(6rem,28vh,22rem)] pb-[clamp(3rem,10vh,7rem)]"
      >
        <div className="relative">
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

        {QUOTES.map((quote) => (
          <blockquote
            key={quote.n}
            className={`relative min-h-[55vh] md:min-h-[80vh] flex flex-col justify-center gap-6 ${quote.align}`}
          >
            <span className="quote-meta invisible font-title text-[clamp(1.25rem,2vw,2rem)] text-(--accent)">
              {quote.n}
            </span>
            <p className="font-title text-[clamp(2.75rem,8.5vw,10rem)] leading-[1.02] tracking-[0.01em]">
              {quote.lines.map((line) => (
                <span key={line.text} className="block overflow-hidden">
                  <span
                    className={`quote-line block ${line.accent ? "text-(--accent)" : ""}`}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </p>
            <footer className="quote-meta invisible text-[clamp(0.6rem,0.9vw,0.8rem)] tracking-[0.3em] uppercase text-(--ink)/50">
              — Jordan Nwabuike
            </footer>
          </blockquote>
        ))}
      </section>
    );
  },
);

QuotesSection.displayName = "PortfolioQuotesSection";

export default QuotesSection;
