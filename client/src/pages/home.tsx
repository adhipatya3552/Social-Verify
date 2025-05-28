import { useState } from "react";
import HeroSection from "@/components/home/hero-section";
import VerificationForm from "@/components/verification/verification-form";
import PlatformIcons from "@/components/verification/platform-icons";
import FeaturesSection from "@/components/home/features-section";
import CtaSection from "@/components/home/cta-section";
import ResultsDisplay from "@/components/verification/results-display";
import { SocialVerificationResponse } from "@/lib/types";

const Home = () => {
  const [verificationResults, setVerificationResults] = useState<SocialVerificationResponse | null>(null);

  const handleResultsReceived = (results: SocialVerificationResponse) => {
    setVerificationResults(results);
    
    // Scroll to results with a slight delay to ensure component renders
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <HeroSection />
      <VerificationForm onResultsReceived={handleResultsReceived} />
      <PlatformIcons />
      {verificationResults && <ResultsDisplay results={verificationResults} />}
      <FeaturesSection />
      <CtaSection />
    </>
  );
};

export default Home;
