// Remove the unused Image import
import { DemoHeroGeometric } from "./hero";
import LogoCloudTwo from "@/components/logo-cloud";
import { GlowingEffectDemo } from "./feature";
import { SplineSceneBasic } from "./content";
import { AnimatedTestimonialsDemo } from "./testimonial";
import { Connect } from "./cta";
import FooterSection from "@/components/footer";
import Faq02 from "@/components/kokonutui/faq-02";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <DemoHeroGeometric />
      <LogoCloudTwo />
      <GlowingEffectDemo />
      <SplineSceneBasic /> 
      <AnimatedTestimonialsDemo />
      <Faq02 />
      <Connect />
      <FooterSection />
    </main>
  );
}
