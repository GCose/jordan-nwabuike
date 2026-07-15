import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { AppProps } from "next/app";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import LoadingScreen from "@/components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const LenisScrollTriggerSync = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
};

const App = ({ Component, pageProps }: AppProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      <LenisScrollTriggerSync />
      {!isReady && <LoadingScreen onComplete={() => setIsReady(true)} />}
      <Component {...pageProps} isReady={isReady} />
    </ReactLenis>
  );
};

export default App;
