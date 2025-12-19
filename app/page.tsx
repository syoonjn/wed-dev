"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import {
  AccountList,
  AddFont,
  BrideGroomIntro,
  CountdownTimer,
  DirectionsSection,
  GuestBookPage,
  ImageGallery,
  KakaoMarker
} from '@/components';
import { basePath } from '@/next.config';
import { getCouple } from "./common/name";
import BGMPlayer from "./components/BGMPlayer";
import Calendar from "./components/Calander";
import FloatingHearts from "./components/FloatingHearts";
import KakaoNavigation from "./components/KakaoNavigation";
import StickyFooter from "./components/StickyFooter";
import { useFontSize } from "./context/FontSizeContext";

const SlideInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="w-full"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
  >
    {children}
  </motion.div>
);
const Home: React.FC = () => {
  const { fontSize } = useFontSize();
  const { groomFullName, brideFullName } = getCouple();
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


            <div className="border-t border-gray-200 py-10 text-center text-[#3d3d3d]">
              <h1 className="sr-only">모바일 청첩장 보기</h1>

              <div className="mb-1 tracking-widest font-bold text-abs-20">
                26 | 03 | 28
              </div>

              <div className="mb-6 tracking-[0.25em] text-gray-400 text-abs-12">
                SATURDAY
              </div>
              <div className="text-2xl">
                <AddFont isFooterVisible={showStickyFooter} />
                <FloatingHearts isFooterVisible={showStickyFooter} />
              </div>

              <Image
                src={`${basePath}/images/wedding-main.jpg`}
                alt="티맵"
                layout="responsive"
                width={500}
                height={500}
                sizes="(max-width: 768px) 80vw, 300px"
                className="mx-auto mb-6 w-full max-w-[300px] rounded"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />

              <div className="mb-2 font-[500] tracking-wider text-gray-800 text-abs-20">
                {`${groomFullName}  ｜  ${brideFullName}`}
              </div>

              <div className="mb-8 tracking-wide space-y-2 text-abs-14">
                <p>2026년 3월 28일 토요일 오후 1시</p>
                <p>CA웨딩컨벤션 루체홀</p>
              </div>

              <p className="font-semibold text-[#744936] mb-6 text-abs-16">
                소중한 분들을 초대합니다
              </p>


              <div className="mx-auto max-w-sm tracking-wide space-y-3 mb-6 text-abs-14">
                <p><span className="text-[#b85b52] font-semibold">철</span>길처럼 나란히 걸을 인연이</p>
                <p><span className="text-[#b85b52] font-semibold">호</span>수처럼 깊은 사랑이 되었습니다</p>
                <p><span className="text-[#b85b52] font-semibold">윤</span>슬처럼 빛나는 미래를 꿈꾸며</p>
                <p><span className="text-[#b85b52] font-semibold">정</span>들어 이제는 한 사람이 됩니다</p>
              </div>

              <div className="mx-auto max-w-sm tracking-wide space-y-3 text-abs-14">
                <p>그 시작의 순간에 함께</p>
                <p>축복해주시면 감사하겠습니다</p>
              </div>
            </div>
            <BrideGroomIntro />

          </SlideInSection>

          <SlideInSection>
            <div className="flex flex-col items-center py-6 text-center">
              <h1 className="text-xl font-bold text-center mb-2 text-abs-20">예식 안내</h1>
              <Calendar />
            </div>
          </SlideInSection>

          <SlideInSection>
            <div className="flex flex-col items-center py-6 text-center">
              <CountdownTimer />
            </div>
          </SlideInSection>

          <SlideInSection>
            <div className="border-t border-gray-200 py-10">
              <KakaoMarker />
              <KakaoNavigation />
            </div>
          </SlideInSection>

          <SlideInSection>
            <h1 className="text-xl text-center mb-2 text-abs-20 font-bold">오시는길</h1>
            <section className="mb-8">
              <DirectionsSection />
            </section>
          </SlideInSection>

          <SlideInSection>
            <div className="w-full px-2 sm:px-4 mt-5">
              <h1 className="text-xl font-bold text-center mb-2 text-abs-20">갤러리</h1>
              <ImageGallery />
            </div>
          </SlideInSection>

          <SlideInSection>
            <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
              <h1 className="text-xl font-bold text-center mb-8 text-abs-20">마음 전하실 곳</h1>
              <AccountList />
            </div>
          </SlideInSection>


          <SlideInSection>
            <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
              <h1 className="text-xl font-bold text-center mb-8 text-abs-20">방명록</h1>
              <GuestBookPage />
            </div>
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
