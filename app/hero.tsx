import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { HeroHeader } from "@/components/hero8-header"
import Image from "next/image"

function DemoHeroGeometric() {
    return (
        <>
            <HeroHeader />
            <HeroGeometric 
                badge="uiastro"
                title1="Transform Your"
                title2="Digital Experience" 
            />
        </>
    )
}

export { DemoHeroGeometric }