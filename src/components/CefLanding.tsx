import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Quote } from "@/components/Quote";
import { Journey } from "@/components/Journey";
import { Proof } from "@/components/Proof";
import { Faculty } from "@/components/Faculty";
import { Pricing } from "@/components/Pricing";
import { Venue } from "@/components/Venue";
import { CtaStrip } from "@/components/CtaStrip";
import { Footer } from "@/components/Footer";

export function CefLanding() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Quote />
        <Journey />
        <Proof />
        <Faculty />
        <Pricing />
        <Venue />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
