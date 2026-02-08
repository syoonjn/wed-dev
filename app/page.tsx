"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { BrideGroomIntro, CountdownTimer } from '@/components';
import BGMPlayer from "./components/BGMPlayer";
import {
  AccountSection,
  DirectionsInfoSection,
  GallerySection,
  GuestBookSection,
  HeroSection,
  LocationSection,
  WeddingInfoSection
} from "./components/sections";
import StickyFooter from "./components/StickyFooter";
import { useFontSize } from "./context/FontSizeContext";

const SlideInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="w-full"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    viewport={{ 
      once: true, 
      amount: 0.2, 
      margin: "0px 0px -100px 0px",
      fallback: "inView" // iOS 카카오톡 호환성
    }}
  >
    {children}
  </motion.div>
);
const Home: React.FC = () => {
  const { fontSize } = useFontSize();
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  return (
    <main
      data-font-size={fontSize}
      className="min-h-screen bg-[#f9f8f6] dark:bg-gray-800 dark:text-white"
    >
      <BGMPlayer />
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col items-center">
          <SlideInSection>
            <HeroSection showStickyFooter={showStickyFooter} />
            <BrideGroomIntro />
          </SlideInSection>

          <SlideInSection>
            <WeddingInfoSection />
          </SlideInSection>

          <SlideInSection>
            <div className="flex flex-col items-center py-6 text-center">
              <CountdownTimer />
            </div>
          </SlideInSection>

          <SlideInSection>
            <LocationSection />
          </SlideInSection>

          <SlideInSection>
            <DirectionsInfoSection />
          </SlideInSection>

          <SlideInSection>
            <GallerySection />
          </SlideInSection>

          <SlideInSection>
            <AccountSection />
          </SlideInSection>

          <SlideInSection>
            <GuestBookSection />
          </SlideInSection>

          <footer className="w-full border-t border-gray-200 px-4 py-2 text-center pb-[100px]">
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">@copyright socaeri</p>
          </footer>
        </div>

        <StickyFooter setShowFooterState={setShowStickyFooter} />
      </div>
    </main>
  );
};

export default Home;
