import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import TargetAudienceSection from '../components/home/TargetAudienceSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <HowItWorksSection />
            <ShowcaseSection />
            <TargetAudienceSection />
            <CTASection />
        </div>
    );
}