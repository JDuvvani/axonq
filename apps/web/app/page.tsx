import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/cta-section";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="relative w-full">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
