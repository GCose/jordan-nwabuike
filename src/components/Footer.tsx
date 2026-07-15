import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-name", {
        yPercent: 70,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="@container relative overflow-hidden px-4 sm:px-6 md:px-12 pt-[clamp(3rem,8vh,6rem)]"
    >
      <div
        aria-hidden="true"
        className="footer-name font-title pointer-events-none select-none whitespace-nowrap text-center leading-[0.78] tracking-[-0.012em] text-[17.6cqw] translate-y-[20%]"
      >
        JORDAN NWABUIKE<span className="text-(--accent)">.</span>
      </div>
    </footer>
  );
};

export default Footer;
