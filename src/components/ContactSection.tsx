import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { forwardRef, useEffect, useRef } from "react";
import { PortfolioSectionProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Jordanlopez546/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jordan-c-nwabuike" },
  { label: "Jordan In Tech", href: "https://jordanintech.com" },
];

const EMAIL = "jordannwabuike@gmail.com";

const ContactSection = forwardRef<HTMLElement, PortfolioSectionProps>(
  (_props, ref) => {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".contact-line").forEach((line) => {
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

        gsap.utils.toArray<HTMLElement>(".contact-meta").forEach((meta) => {
          gsap.from(meta, {
            autoAlpha: 0,
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: meta,
              start: "top bottom",
              end: "top 70%",
              scrub: true,
            },
          });
        });
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="contact"
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="relative px-4 sm:px-6 md:px-12 pt-[clamp(5rem,15vh,10rem)]"
      >
        <div className="relative">
          <span
            aria-hidden="true"
            className="font-title pointer-events-none absolute top-[-6vw] right-0 select-none text-[clamp(7rem,20vw,22rem)] leading-none text-(--ink)/6"
          >
            CONTACT
          </span>
          <div className="relative flex items-center gap-3 border-t-2 border-(--ink)/70 pt-4">
            <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tabular-nums tracking-widest text-(--accent)">
              03
            </span>
            <span className="text-[clamp(0.6rem,0.9vw,0.8rem)] tracking-[0.35em] uppercase text-(--ink)/50">
              Get in touch
            </span>
          </div>
        </div>

        <div className="min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center py-[clamp(3rem,8vh,6rem)]">
          <h2 className="font-title text-[clamp(3.5rem,12vw,14rem)] leading-[0.95] tracking-[0.01em]">
            <span className="block overflow-hidden">
              <span className="contact-line block">Let&apos;s build</span>
            </span>
            <span className="block overflow-hidden md:pl-[18%]">
              <span className="contact-line block text-(--accent)">
                something.
              </span>
            </span>
          </h2>

          <a
            href={`mailto:${EMAIL}`}
            className="contact-meta invisible group mt-[clamp(2.5rem,7vh,5rem)] w-fit border-b-2 border-(--ink)/25 pb-2 text-[clamp(1.25rem,3vw,2.75rem)] font-light tracking-wide transition-colors duration-300 hover:border-(--accent) hover:text-(--accent)"
          >
            {EMAIL}
            <span className="ml-3 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>

          <ul className="contact-meta invisible mt-[clamp(2.5rem,7vh,5rem)] flex flex-wrap gap-x-10 gap-y-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[clamp(0.65rem,0.95vw,0.85rem)] tracking-[0.25em] uppercase text-(--ink)/60 transition-colors duration-300 hover:text-(--ink)"
                >
                  {social.label}
                  <span className="text-(--accent) opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  },
);

ContactSection.displayName = "PortfolioContactSection";

export default ContactSection;
