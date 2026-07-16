import { gsap } from "gsap";
import Image from "next/image";
import { PortfolioSectionProps } from "./types";
import { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEAD_IN = 500;
const SPACING = 1200;
const FINAL_Z = 0;
const FINAL_HOLD = 600;
const Z_FLOOR = -3600;
const FADE_IN_START = -2400;
const FADE_IN_END = -600;
const FADE_OUT_START = 260;
const FADE_OUT_END = 560;
const VH_PER_ITEM = 36;
const PERSPECTIVE = 1100;

interface ChapterImage {
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
}

interface Chapter {
  title: string;
  sub: string;
  images: ChapterImage[];
}

const CHAPTERS: Chapter[] = [
  {
    title: "The Entrance",
    sub: "Banjul — where it all starts",
    images: [
      {
        src: "/images/portfolio/green-suit-car-lean.jpg",
        caption: "Dressed for the job I wanted",
        alt: "Jordan in a green double-breasted suit leaning against a car",
      },
      {
        src: "/images/portfolio/entrance-2.jpeg",
        caption: "Same suit, same energy",
        alt: "Jordan seated on the hood of a car in a green suit",
      },
    ],
  },
  {
    title: "ITCA Week",
    sub: "University of The Gambia",
    images: [
      {
        src: "/images/portfolio/itca-week-mic.jpg",
        caption: "On the mic — ITCA Week",
        alt: "Jordan speaking on the mic at UTG ITCA Week",
        ratio: "4 / 3",
      },
      {
        src: "/images/portfolio/itca-week-hall.jpg",
        caption: "Presenting Cribio at the ITCA Week",
        alt: "The hall at UTG ITCA Week",
        ratio: "4 / 3",
      },
    ],
  },
  {
    title: "BSC. Presentations",
    sub: "ITCA Software Club — Team Lead",
    images: [
      {
        src: "/images/portfolio/floral-shirt-whiteboard.jpg",
        caption: "Data Communications Presentation",
        alt: "Jordan presenting beside a whiteboard",
      },
      {
        src: "/images/portfolio/classroom-teaching-board.jpg",
        caption: "AI Presentation",
        alt: "Jordan presenting in front of a classroom board",
        ratio: "9 / 16",
      },
      {
        src: "/images/portfolio/classroom-teaching-gesture.jpg",
        caption: "Making a point",
        alt: "Jordan mid-gesture defending a project",
        ratio: "9 / 16",
      },
    ],
  },
  {
    title: "Project Defense",
    sub: "2026 June FInal Year Project Defense",
    images: [
      {
        src: "/images/portfolio/pd-1.jpeg",
        caption: "Lights off, defense on",
        alt: "Jordan defending his final year CS project",
      },
      {
        src: "/images/portfolio/pd-3.jpeg",
        caption: "Defending KJ Retail with uptmost passion",
        alt: "Jordan takes on presentation mode.",
      },
    ],
  },
  {
    title: "NASA Space Apps",
    sub: "First place — October 2025",
    images: [
      {
        src: "/images/portfolio/nasa-space-apps-lanyard.jpg",
        caption: "Game day credentials",
        alt: "Jordan looking down at his NASA Space Apps badge",
      },
      {
        src: "/images/portfolio/nasa-space-apps-badge.jpg",
        caption: "Learn. Launch. Lead.",
        alt: "Close-up of the NASA Space Apps Challenge badge",
        ratio: "9 / 16",
      },
    ],
  },
  {
    title: "MRCG AI Hackathon",
    sub: "Second place — Sir Dawda Jawara International Conference Center, November 2025",
    images: [
      {
        src: "/images/portfolio/mrc-finals-livestream.jpg",
        caption: "Live from the finals",
        alt: "Livestream still of Jordan presenting at the MRCG AI finals",
        ratio: "3 / 2",
      },
      {
        src: "/images/portfolio/mrc-oic-speech.jpg",
        caption: "The Sir Dawda Jawara International Conference Center speech",
        alt: "Jordan giving a speech at the podium at the MRCG AI finals, Sir Dawda Jawara International Conference Center",
      },
    ],
  },
  {
    title: "NextGen Agency",
    sub: "Where going pro started",
    images: [
      {
        src: "/images/portfolio/office-whiteboard-smile.jpg",
        caption: "NextGen days",
        alt: "Jordan smiling at a desk in front of a full whiteboard",
      },
      {
        src: "/images/portfolio/office-whiteboard-laptop.jpg",
        caption: "Heads down at NextGen",
        alt: "Jordan working on a laptop in front of a whiteboard",
      },
    ],
  },
  {
    title: "Modem Pay",
    sub: "Real money, real code",
    images: [
      {
        src: "/images/portfolio/grey-suit-perch.jpg",
        caption: "Corner office energy",
        alt: "Jordan in a grey suit perched on an office desk",
      },
      {
        src: "/images/portfolio/grey-suit-desk-gesture.jpg",
        caption: "Committed to the vision.",
        alt: "Jordan in a grey suit gesturing at his desk",
      },
      {
        src: "/images/portfolio/office-feet-up-wide.jpg",
        caption: "Shipped it",
        alt: "Wide shot of Jordan with his feet up in the office",
      },
      {
        src: "/images/portfolio/office-feet-up.jpg",
        caption: "...and it passed review",
        alt: "Jordan relaxing with his feet up on the desk",
      },
    ],
  },
  {
    title: "Dakar",
    sub: "Senegal — beyond the border",
    images: [
      {
        src: "/images/portfolio/dakar-renaissance-monument.jpg",
        caption: "Dakar, Senegal",
        alt: "Jordan at the African Renaissance Monument in Dakar",
      },
      {
        src: "/images/portfolio/dakar-bench.jpg",
        caption: "Thinking bigger",
        alt: "Jordan sitting on a hillside bench in Dakar",
      },
    ],
  },
  {
    title: "Home",
    sub: "The Gambia, always",
    images: [
      {
        src: "/images/portfolio/kaftan-home.jpg",
        caption: "Home, always",
        alt: "Jordan in a green kaftan",
      },
      {
        src: "/images/portfolio/peace-building-vest.jpg",
        caption: "Peace Building, UTG",
        alt: "Jordan in a vest outside the Peace Building",
      },
    ],
  },
  {
    title: "Jordan",
    sub: "Nice to meet you",
    images: [
      {
        src: "/images/portfolio/jordan-portrait.jpg",
        caption: "Hello — it's me, Jordan.",
        alt: "Jordan smiling, hands in pockets",
      },
    ],
  },
];

const LEFTS = ["50%", "22%", "72%", "38%", "82%", "45%", "18%", "63%"];
const TOPS = [
  "50%",
  "calc(50% - 10px)",
  "calc(50% + 10px)",
  "50%",
  "calc(50% + 8px)",
  "calc(50% - 8px)",
];
const TILTS = [0, -5, 4, -2, 6, -4, 3, -6];
const PORTRAIT_WIDTHS = [
  "clamp(13rem,34vw,34rem)",
  "clamp(11rem,27vw,27rem)",
  "clamp(15rem,40vw,38rem)",
];
const WIDTHS: Record<string, string> = {
  "9 / 16": "clamp(9rem,22vw,22rem)",
  "4 / 3": "clamp(16rem,46vw,44rem)",
  "3 / 2": "clamp(16rem,46vw,44rem)",
};

type TunnelItem = {
  depth: number;
  chapter: number;
  final: boolean;
} & (
  | { kind: "title"; n: string; title: string; sub: string }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
      ratio: string;
      left: string;
      top: string;
      width: string;
      tilt: number;
    }
);

const ITEMS: TunnelItem[] = [];
CHAPTERS.forEach((chapter, ci) => {
  const isLastChapter = ci === CHAPTERS.length - 1;
  ITEMS.push({
    kind: "title",
    n: String(ci + 1).padStart(2, "0"),
    title: chapter.title,
    sub: chapter.sub,
    depth: LEAD_IN + ITEMS.length * SPACING,
    chapter: ci,
    final: false,
  });
  chapter.images.forEach((img, ii) => {
    const p = ITEMS.length;
    const ratio = img.ratio ?? "3 / 4";
    const final = isLastChapter && ii === chapter.images.length - 1;
    ITEMS.push({
      kind: "image",
      src: img.src,
      alt: img.alt,
      caption: img.caption,
      ratio,
      left: final
        ? "50%"
        : `clamp(9rem, ${LEFTS[p % LEFTS.length]}, calc(100% - 9rem))`,
      top: final ? "50%" : TOPS[p % TOPS.length],
      width: final
        ? "clamp(14rem,36vw,36rem)"
        : (WIDTHS[ratio] ?? PORTRAIT_WIDTHS[p % PORTRAIT_WIDTHS.length]),
      tilt: final ? 0 : TILTS[p % TILTS.length],
      depth: LEAD_IN + p * SPACING,
      chapter: ci,
      final,
    });
  });
});

const TOTAL_TRAVEL =
  LEAD_IN + (ITEMS.length - 1) * SPACING + FINAL_Z + FINAL_HOLD;

const clamp01 = gsap.utils.clamp(0, 1);

const STREAK_NEAR = 900;
const STREAK_DEEP = -2800;
const STREAK_SPAN = STREAK_NEAR - STREAK_DEEP;

const STREAKS = Array.from({ length: 30 }, (_, i) => {
  const angle = (i * 137.5) % 360;
  const radius = 10 + ((i * 53) % 22);
  const rad = (angle * Math.PI) / 180;
  return {
    angle,
    left: `${50 + Math.cos(rad) * radius}%`,
    top: `${50 + Math.sin(rad) * radius}%`,
    length: 90 + ((i * 37) % 140),
    speed: 1.6 + ((i * 7) % 5) * 0.35,
    phase: (i * 977) % STREAK_SPAN,
  };
});

const RAIL_COUNT = 7;
const RAILS = Array.from({ length: RAIL_COUNT * 2 }, (_, i) => ({
  side: i < RAIL_COUNT ? -1 : 1,
  top: `${12 + (i % RAIL_COUNT) * 12.5}%`,
  length: 10 + ((i * 11) % 3) * 6,
  speed: 0.05 + ((i * 7) % 5) * 0.02,
  phase: (i * 13) % 35,
}));

const GalleryWalk = forwardRef<HTMLElement, PortfolioSectionProps>(
  (_props, ref) => {
    const rootRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".tunnel-item");
        const setters = items.map((el) => gsap.quickSetter(el, "css"));
        const streaks = gsap.utils.toArray<HTMLElement>(".gallery-streak");
        const streakSet = streaks.map((el) => gsap.quickSetter(el, "css"));
        const rails = gsap.utils.toArray<HTMLElement>(".gallery-rail");
        const railSet = rails.map((el) => gsap.quickSetter(el, "x", "px"));
        const lastAlpha = new Array<number>(ITEMS.length).fill(-1);
        const lastStreakAlpha = new Array<number>(STREAKS.length).fill(-1);
        const proxy = { t: 0 };
        let counterAt = -1;

        items.forEach((el, i) =>
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            rotate: ITEMS[i].kind === "image" ? ITEMS[i].tilt : 0,
            force3D: true,
          }),
        );

        streaks.forEach((el, i) =>
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            rotate: STREAKS[i].angle,
            force3D: true,
          }),
        );

        const apply = () => {
          ITEMS.forEach((item, i) => {
            const z = proxy.t - item.depth;
            let alpha = clamp01(
              (z - FADE_IN_START) / (FADE_IN_END - FADE_IN_START),
            );
            if (!item.final) {
              const out = clamp01(
                (z - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START),
              );
              alpha = Math.min(alpha, 1 - out);
            }
            if (alpha === 0 && z > Z_FLOOR && z < 0) alpha = 0.003;
            if (alpha === 0 && lastAlpha[i] === 0) return;
            lastAlpha[i] = alpha;
            setters[i]({
              z: Math.max(item.final ? Math.min(z, FINAL_Z) : z, Z_FLOOR),
              autoAlpha: alpha,
            });
          });

          STREAKS.forEach((streak, i) => {
            const z =
              STREAK_NEAR -
              ((proxy.t * streak.speed + streak.phase) % STREAK_SPAN);
            const alpha =
              clamp01((STREAK_NEAR - z) / 500) *
              clamp01((z - STREAK_DEEP) / 700) *
              0.65;
            if (alpha === 0 && lastStreakAlpha[i] === 0) return;
            lastStreakAlpha[i] = alpha;
            streakSet[i]({ z, autoAlpha: alpha });
          });

          const vw = window.innerWidth / 100;
          RAILS.forEach((rail, i) => {
            const span = (35 + rail.length) * vw;
            const travel = (proxy.t * rail.speed + rail.phase * vw) % span;
            railSet[i](rail.side < 0 ? 35 * vw - travel : travel - 35 * vw);
          });

          const at = gsap.utils.clamp(
            0,
            ITEMS.length - 1,
            Math.round((proxy.t - LEAD_IN) / SPACING),
          );
          const chapter = ITEMS[at].chapter;
          if (chapter !== counterAt && counterRef.current) {
            counterAt = chapter;
            counterRef.current.textContent = String(chapter + 1).padStart(
              2,
              "0",
            );
          }
        };

        gsap.to(proxy, {
          t: TOTAL_TRAVEL,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${ITEMS.length * VH_PER_ITEM}%`,
            pin: true,
            scrub: 1,
          },
        });

        apply();

        const swayX = gsap.quickTo(stage, "x", {
          duration: 1.4,
          ease: "power3.out",
        });
        const swayY = gsap.quickTo(stage, "y", {
          duration: 1.4,
          ease: "power3.out",
        });
        const onMove = (e: MouseEvent) => {
          swayX((e.clientX / window.innerWidth - 0.5) * 40);
          swayY((e.clientY / window.innerHeight - 0.5) * 26);
        };

        root.addEventListener("mousemove", onMove);
        return () => root.removeEventListener("mousemove", onMove);
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="highlights"
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="relative h-screen overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="font-title pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none leading-none whitespace-nowrap text-[clamp(6rem,17vw,19rem)] text-(--ink)/5"
        >
          HIGHLIGHTS
        </span>

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
              className="gallery-rail will-change-transform absolute h-px"
            />
          ))}
        </div>

        <div
          ref={stageRef}
          className="absolute inset-0 z-10"
          style={{
            perspective: `${PERSPECTIVE}px`,
            perspectiveOrigin: "50% 50%",
          }}
        >
          {STREAKS.map((streak, i) => (
            <span
              key={i}
              style={{
                left: streak.left,
                top: streak.top,
                width: `${streak.length}px`,
                background:
                  "linear-gradient(90deg, transparent, var(--ink) 50%, transparent)",
              }}
              aria-hidden="true"
              className="gallery-streak will-change-transform pointer-events-none invisible absolute h-0.5"
            />
          ))}

          {ITEMS.map((item) => {
            const zIndex = Math.round((60000 - item.depth) / 50);

            if (item.kind === "title") {
              return (
                <div
                  key={`title-${item.n}`}
                  style={{ left: "50%", top: "50%", zIndex }}
                  className="tunnel-item invisible will-change-transform absolute w-max max-w-[92vw] text-center"
                >
                  <span className="text-[clamp(0.7rem,1.1vw,1rem)] tracking-[0.45em] uppercase text-(--accent)">
                    {item.n}
                  </span>
                  <h3 className="font-title mt-3 text-[clamp(2.75rem,11.5vw,14rem)] leading-[0.9] tracking-[0.02em] whitespace-nowrap">
                    {item.title}
                  </h3>
                </div>
              );
            }

            return (
              <figure
                key={item.src}
                style={{
                  left: item.left,
                  top: item.top,
                  width: item.width,
                  aspectRatio: item.ratio,
                  zIndex,
                }}
                className="tunnel-item invisible will-change-transform absolute shadow-2xl"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    fill
                    src={item.src}
                    alt={item.alt}
                    sizes="46vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute top-full left-0 mt-2 text-[clamp(0.55rem,0.8vw,0.75rem)] tracking-[0.3em] uppercase whitespace-nowrap text-(--ink)/60">
                  {item.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, transparent 55%, var(--paper) 125%)",
          }}
        />

        <span className="absolute bottom-6 left-4 z-30 sm:left-6 md:left-8 text-[clamp(0.6rem,0.9vw,0.75rem)] tracking-[0.25em] uppercase tabular-nums text-(--ink)/40">
          <span ref={counterRef} className="text-(--accent)">
            01
          </span>
          {" / "}
          {String(CHAPTERS.length).padStart(2, "0")}
        </span>
      </section>
    );
  },
);

GalleryWalk.displayName = "PortfolioGalleryWalk";

export default GalleryWalk;
