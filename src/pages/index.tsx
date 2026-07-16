import { useRef } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import GalleryWalk from "@/components/Highlights";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import QuotesSection from "@/components/MantraSection";
import ContactSection from "@/components/ContactSection";

interface HomeProps {
  isReady?: boolean;
}

const Home = ({ isReady = false }: HomeProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const quotesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <Layout>
      <SideNav />
      <div className="relative md:pl-(--nav-width) mx-auto max-w-(--max-w)">
        <HeroSection ref={heroRef} isReady={isReady} />
        <AboutSection ref={aboutRef} isReady={isReady} />
        <GalleryWalk ref={galleryRef} isReady={isReady} />
        <QuotesSection ref={quotesRef} isReady={isReady} />
        <ContactSection ref={contactRef} isReady={isReady} />
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
