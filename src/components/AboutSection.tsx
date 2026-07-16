import { gsap } from "gsap";
import Image from "next/image";
import Marquee from "./Marquee";
import { PortfolioSectionProps } from "./types";
import { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    n: "01",
    label: "Where it started",
    bg: "#e8e3d9",
    heading: "First year, second semester. 2023.",
    body: "The University of The Gambia. I took my first internship at Cayor (Kashma), the place where building stopped being theory and started being real.",
    image: "/images/portfolio/first-year.jpeg",
    focus: "50% 30%",
    tags: ["Cayor (Kashma)", "UTG"],
  },
  {
    n: "02",
    label: "Twice over",
    bg: "#dfe6f0",
    heading: "Then a second internship, at INSIST GLOBAL.",
    body: "One internship was never going to be enough. I wanted more reps, more systems, more problems that actually mattered. I have not stopped building since.",
    image: "/images/portfolio/second-year.jpeg",
    focus: "50% 35%",
    tags: ["INSIST GLOBAL", "UTG"],
  },
  {
    n: "03",
    label: "Lead at UTG",
    bg: "#dbe7e0",
    heading: "Software Team Lead, ITCA Software Club of The UTG.",
    body: "We shipped real things for the school, not exercises. The ITCA Hub and the SoSHSA platform, both built on backends I owned end to end.",
    image: "/images/portfolio/floral-shirt-teaching.jpg",
    focus: "50% 30%",
    tags: ["ITCA Hub", "SoSHSA", "UTG"],
  },
  {
    n: "04",
    label: "The proving ground",
    bg: "#dde4ef",
    heading: "First place. NASA Space Apps.",
    body: "October 2025. A two day hackathon. I co-led team ITCA VETS, and we took first.",
    image: "/images/portfolio/nasa-space-apps-prize.jpg",
    focus: "50% 30%",
    tags: ["NASA Space Apps", "1st Place", "Co-Lead"],
  },
  {
    n: "05",
    label: "Again",
    bg: "#ece0e4",
    heading: "Second place. MRCG AI Hackathon.",
    body: "November 2025. Three days. The finals were announced at Sir Dawda Jawara International Conference Center, where I gave a speech in front of industry leaders and professionals.",
    image: "/images/portfolio/mrc-oic-speech.jpg",
    focus: "50% 30%",
    tags: [
      "MRCG",
      "2nd Place",
      "Sir Dawda Jawara International Conference Center Speech",
    ],
  },
  {
    n: "06",
    label: "Going pro",
    bg: "#e7e3d6",
    heading: "NextGen Agency. The Trygg backend.",
    body: "My first software engineering job. I built the backend for Trygg singlehandedly, a taxi platform for a Sweedish company. I learnt what it means to ship something people actually depend on. I worked on a handful of other company projects too ranging from mobile to web applications.",
    image: "/images/portfolio/office-desk-monitor.jpg",
    focus: "50% 45%",
    tags: ["NextGen Agency", "Trygg"],
  },
  {
    n: "07",
    label: "Real money",
    bg: "#dbe7e0",
    heading: "Modem Pay. No room to be wrong.",
    body: "Then payment systems. I built the Easy mobile app, the Modem Pay merchant mobile app, the Modem Pay admin dashboard and contributed extensively to the payment processing systems of the Modem Pay infrastructure. Real money moving through real code.",
    image: "/images/portfolio/grey-suit-desk.jpg",
    focus: "50% 40%",
    tags: ["Modem Pay", "Easy Financial Services"],
  },
  {
    n: "08",
    label: "On my own terms",
    bg: "#dfe6f0",
    heading: "Then I started my own company.",
    body: "Along the way I built Cribio, GamCraft, KJ Retail, and more on my own. After gathering experience from every side of the table, I founded Jordan In Tech.",
    image: "/images/portfolio/office-feet-up-smile.jpg",
    focus: "60% 40%",
    tags: ["Cribio", "GamCraft", "KJ Retail", "Jordan In Tech"],
  },
];

const AboutSection = forwardRef<HTMLElement, PortfolioSectionProps>(
  (_props, ref) => {
    const rootRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top top",
              end: () => (window.innerWidth < 768 ? "+=70%" : "+=120%"),
              pin: true,
              scrub: 1,
            },
          })
          .from(".title-line", {
            yPercent: 110,
            stagger: 0.25,
            ease: "power3.out",
          });

        gsap.utils.toArray<HTMLElement>(".cue-line").forEach((line) => {
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

        const cards = gsap.utils.toArray<HTMLElement>(".story-card");

        gsap.set(cards, {
          yPercent: 140,
          autoAlpha: 0,
          rotate: (i: number) => (i % 2 === 0 ? 22 : -22),
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: () =>
              `+=${(CARDS.length + 0.5) * (window.innerWidth < 768 ? 70 : 100)}%`,
            pin: true,
            scrub: 1,
          },
        });

        cards.forEach((card, i) => {
          const dir = i % 2 === 0 ? 1 : -1;

          tl.set(card, { autoAlpha: 1 }, i);
          tl.to(card, { yPercent: 0, rotate: 0, duration: 1, ease: "none" }, i);

          if (i < cards.length - 1) {
            tl.to(
              card,
              { yPercent: -140, rotate: -dir * 16, duration: 1, ease: "none" },
              i + 1,
            );
            tl.set(card, { autoAlpha: 0 }, i + 2);
          }
        });

        tl.to({}, { duration: 0.5 });
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="about"
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="relative"
      >
        <div
          ref={titleRef}
          className="relative h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12"
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="font-title pointer-events-none absolute top-[-6vw] right-0 select-none text-[clamp(7rem,20vw,22rem)] leading-none text-(--ink)/6"
            >
              STORY
            </span>
            <div className="relative flex items-center gap-3 border-t-2 border-(--ink)/70 pt-4">
              <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tabular-nums tracking-widest text-(--accent)">
                01
              </span>
              <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tracking-[0.35em] uppercase text-(--ink)/50">
                My Story
              </span>
            </div>
            <h2 className="font-title relative mt-[clamp(1.5rem,4vh,3rem)] text-[clamp(2.5rem,7vw,8.5rem)] leading-[1.35] tracking-[0.01em]">
              <span className="block overflow-hidden">
                <span className="title-line block">
                  From a campus internship
                </span>
              </span>
              <span className="block overflow-hidden md:pl-[12%]">
                <span className="title-line block text-(--accent)">
                  to a founder,
                </span>
              </span>
              <span className="block overflow-hidden md:pl-[24%]">
                <span className="title-line block">in four years.</span>
              </span>
            </h2>
          </div>
        </div>

        <div className="h-[65vh] flex flex-col justify-center px-4 sm:px-6 md:px-12">
          <h3 className="font-title text-[clamp(2.5rem,9vw,11rem)] leading-[1.35] tracking-[0.01em]">
            <span className="block overflow-hidden">
              <span className="cue-line block">Here&apos;s how</span>
            </span>
            <span className="block overflow-hidden md:pl-[22%]">
              <span className="cue-line block text-(--accent)">
                it happened.
              </span>
            </span>
          </h3>
        </div>

        <div ref={stageRef} className="relative h-screen overflow-hidden">
          {CARDS.map((card) => (
            <div
              key={card.n}
              className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12"
            >
              <article
                style={{ backgroundColor: card.bg }}
                className="story-card invisible will-change-transform w-full h-[90vh] rounded-2xl overflow-hidden grid grid-cols-1 grid-rows-[42%_1fr] md:grid-rows-none md:grid-cols-2 text-[#15130f]"
              >
                <div className="flex flex-col justify-between p-[clamp(1.5rem,4vw,3.5rem)]">
                  <div className="flex items-center gap-3">
                    <span className="font-title text-2xl tabular-nums text-[#15130f]/70">
                      {card.n}
                    </span>
                    <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[#15130f]/50">
                      {card.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title text-[clamp(2rem,3.4vw,3.6rem)] leading-[0.98] tracking-[0.01em]">
                      {card.heading}
                    </h3>
                    <p className="mt-6 text-[clamp(1rem,1.3vw,1.3rem)] font-light leading-relaxed text-[#15130f]/75 max-w-136">
                      {card.body}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#15130f]/15 pt-4 text-[0.65rem] tracking-[0.2em] uppercase text-[#15130f]/55">
                    {card.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="relative order-first md:order-0">
                  <Image
                    fill
                    alt={card.label}
                    src={card.image}
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectPosition: card.focus }}
                  />
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="relative mt-[clamp(2rem,5vh,4rem)]">
          <Marquee
            items={[
              "CRIBIO",
              "GAMCRAFT",
              "KJ RETAIL",
              "ITCA HUB",
              "SOSHSA",
              "TRYGG BACKEND",
              "EASY FINANCIAL",
              "MODEM PAY MERCHANT MOBILE",
              "MODEM PAY MERCHANT ADMIN",
            ]}
          />
        </div>
      </section>
    );
  },
);

AboutSection.displayName = "PortfolioAboutSection";

export default AboutSection;
