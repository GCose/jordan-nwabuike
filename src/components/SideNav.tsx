import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const toggleTheme = () => {
  const el = document.documentElement;
  const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
  el.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
};

const links = [
  { index: "01", label: "Story", target: "#about" },
  { index: "02", label: "Highlights", target: "#highlights" },
  { index: "03", label: "Mantra", target: "#quotes" },
  { index: "04", label: "Contact", target: "#contact" },
];

const SideNav = () => {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5;
      let current = "";
      for (const link of links) {
        const el = document.querySelector(link.target);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = link.target;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    setOpen(false);
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden md:block fixed left-0 top-0 z-50 h-screen pointer-events-none"
      >
        <div className="relative h-full flex flex-col justify-between px-5 py-10">
          <button
            onClick={() => goTo("#hero")}
            className="pointer-events-auto self-start font-title text-3xl leading-none tracking-[0.2em] text-(--ink) hover:text-(--accent) transition-colors duration-300"
          >
            JN
          </button>

          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => goTo(link.target)}
                  className="group pointer-events-auto flex w-fit items-baseline gap-2.5"
                >
                  <span
                    className={`cursor-pointer font-title text-xl leading-none tracking-[0.12em] transition-colors duration-300 group-hover:text-(--ink) ${
                      active === link.target
                        ? "text-(--accent)"
                        : "text-(--ink)/70"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="pointer-events-auto flex flex-col items-start gap-1.5 text-[0.55rem] tracking-[0.3em] uppercase"
          >
            <span className="theme-light transition-colors duration-300 text-(--ink)/35">
              Light
            </span>
            <span className="theme-dark transition-colors duration-300 text-(--ink)/35">
              Dark
            </span>
          </button>
        </div>
      </nav>

      <div className="md:hidden">
        <button
          onClick={() => goTo("#hero")}
          className="fixed top-5 left-5 z-50 font-title text-xl tracking-[0.2em] text-(--ink)"
        >
          JN
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`fixed top-5 right-5 z-60 text-[0.6rem] tracking-[0.3em] uppercase transition-colors duration-300 ${
            open ? "text-(--paper)" : "text-(--ink)"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>

        <div
          className="fixed inset-0 z-50 bg-(--ink) flex flex-col justify-center px-8 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            clipPath: open
              ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
              : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          }}
        >
          <ul className="flex flex-col gap-6">
            {links.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => goTo(link.target)}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-[0.7rem] tabular-nums tracking-widest text-(--accent)">
                    {link.index}
                  </span>
                  <span
                    className={`font-title text-6xl leading-none tracking-wider ${
                      active === link.target
                        ? "text-(--accent)"
                        : "text-(--paper)"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="absolute bottom-10 left-8 flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase"
          >
            <span className="theme-light-inverse text-(--paper)/40">Light</span>
            <span className="text-(--paper)/30">/</span>
            <span className="theme-dark-inverse text-(--paper)/40">Dark</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNav;
