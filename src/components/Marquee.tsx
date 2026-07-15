import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const Marquee = ({ items }: { items: string[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-row", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-2 border-(--ink)/70 py-[clamp(1.5rem,3vh,2.5rem)]"
    >
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((dup) => (
          <div key={dup} className="marquee-row flex shrink-0">
            {items.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="font-title flex items-center text-[clamp(2rem,5vw,5rem)] leading-none tracking-[0.02em] text-(--ink)/85"
              >
                {item}
                <span className="mx-[clamp(1.5rem,4vw,4rem)] text-(--accent)">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
