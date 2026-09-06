"use client";

import { LandingBenefits } from "./partials/landing-benefits";
import { LandingFinalCTA } from "./partials/landing-final-cta";
import { LandingFooter } from "./partials/landing-footer";
import { LandingHero } from "./partials/landing-hero/landing-hero";
import { LandingHowItWorks } from "./partials/landing-how-it-works";
import { LandingNavbar } from "./partials/landing-navbar";
import { LandingPricing } from "./partials/landing-pricing";
import { LandingProblemSolution } from "./partials/landing-problem-solution";
import { LandingTrustStrip } from "./partials/landing-trust-strip";

export default function LandingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingTrustStrip />
        <LandingProblemSolution />
        <LandingHowItWorks />
        <LandingBenefits />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
