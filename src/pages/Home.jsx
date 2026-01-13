import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <ShowcaseSection />
            <CTASection />
        </div>
    );
}