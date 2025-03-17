// Remove the unused Image import
import { DemoHeroGeometric } from "./hero";
import LogoCloudTwo from "@/components/logo-cloud";
import { GlowingEffectDemo } from "./feature";
import { SplineSceneBasic } from "./content";
import { AnimatedTestimonialsDemo } from "./testimonial";
import { Connect } from "./cta";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <DemoHeroGeometric />
      <LogoCloudTwo />
      <GlowingEffectDemo />
      <SplineSceneBasic /> 
      <AnimatedTestimonialsDemo />
      <Connect />
      <FooterSection />
    </main>
  );
}
