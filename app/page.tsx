"use client";

import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";

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

const SlideInSection = React.memo(({ children }: { children: React.ReactNode }) => {
  // 🔍 디버깅용: 모션 임시 비활성화
  return (
    <div className="w-full">
      {children}
    </div>
  );
  
  // // transition 및 viewport 객체 메모이제이션
  // const transition = useMemo(() => ({
  //   duration: 1.2,
  //   ease: "easeOut"
  // }), []);

  // const viewport = useMemo(() => ({
  //   once: true,
  //   amount: 0.2,
  //   margin: "0px 0px -100px 0px"
  // }), []);

  // return (
  //   <motion.div
  //     className="w-full"
  //     initial={{ opacity: 0, y: 40 }}
  //     whileInView={{ opacity: 1, y: 0 }}
  //     transition={transition}
  //     viewport={viewport}
  //   >
  //     {children}
  //   </motion.div>
  // );
});

const Home: React.FC = () => {
  const { fontSize } = useFontSize();
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  // useCallback으로 메모이제이션하여 StickyFooter의 useEffect 무한 루프 방지
  const handleSetShowStickyFooter = useCallback((visible: boolean) => {
    setShowStickyFooter(visible);
  }, []);

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

        <StickyFooter setShowFooterState={handleSetShowStickyFooter} />
      </div>
    </main>
  );
};

export default Home;
