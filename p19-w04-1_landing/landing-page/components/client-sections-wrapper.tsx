"use client";

import dynamic from 'next/dynamic';

// Dynamically import client components that use framer-motion with ssr: false
const HowItWorksSection = dynamic(() => import("@/components/how-it-works-section"), { ssr: false });
const LiveDemoSection = dynamic(() => import("@/components/live-demo-section"), { ssr: false });
const ComparisonTableSection = dynamic(() => import("@/components/comparison-table-section"), { ssr: false });
const SuccessStoriesSection = dynamic(() => import("@/components/success-stories-section"), { ssr: false });
const CommunityPreviewSection = dynamic(() => import("@/components/community-preview-section"), { ssr: false });

export default function ClientSectionsWrapper() {
  return (
    <>
      <HowItWorksSection />
      <LiveDemoSection />
      <ComparisonTableSection />
      <SuccessStoriesSection />
      <CommunityPreviewSection />
    </>
  );
}
