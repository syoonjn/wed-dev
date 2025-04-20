"use client";
import Image from "next/image";
import React from "react";

import {
  AccountList,
  CountdownTimer,
  DirectionsSection,
  GuestBookPage,
  ImageGallery,
  KakaoMarker,
  ParentInfo
} from '@/components';
import { basePath } from '@/next.config';
import { getCouple } from "./common/name";
import Calendar from "./components/Calander";
import KakaoNavigation from "./components/KakaoNavigation";
import StickyFooter from "./components/StickyFooter";

const Home: React.FC = () => {
  const { groomFullName, brideFullName } = getCouple();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="border-t border-gray-200 py-10 text-center text-[#3d3d3d]">
            <h1 className="sr-only">모바일 청첩장 보기</h1>
            <div className="mb-1 text-[20px] tracking-widest sm:text-[22px] font-light">26 | 03 | 28</div>
            <div className="mb-6 text-xs tracking-[0.25em] text-gray-400 sm:text-sm">SATURDAY</div>

            <Image
              src={`${basePath}/images/wedding-sample.png`}
              alt="티맵"
              layout="responsive"
              width={500}
              height={500}
              sizes="(max-width: 768px) 80vw, 300px"
              className="mx-auto mb-6 w-full max-w-[300px] rounded"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />

            <div className="mb-2 text-lg font-[500] tracking-wider text-gray-800">
              {`${groomFullName}  ｜  ${brideFullName}`}
            </div>

            <div className="mb-8 text-sm sm:text-base text-[#3d3d3d] tracking-wide space-y-2">
              <p>2026년 3월 28일 토요일 오후 1시</p>
              <p>CA웨딩컨벤션 루체홀</p>
            </div>

            <p className="text-base font-semibold text-[#744936] mb-6">
              소중한 분들을 초대합니다
            </p>

            <div className="mx-auto max-w-sm text-[14px] sm:text-[15px] text-[#3d3d3d] tracking-wide space-y-3 mb-6">
              <p><span className="text-[#b85b52] font-semibold">철</span>길처럼 나란히 걸을 인연이</p>
              <p><span className="text-[#b85b52] font-semibold">호</span>수처럼 깊은 사랑이 되었습니다</p>
              <p><span className="text-[#b85b52] font-semibold">윤</span>슬처럼 빛나는 미래를 꿈꾸며</p>
              <p><span className="text-[#b85b52] font-semibold">정</span>들어 이제는 한 사람이 됩니다</p>
            </div>

            <div className="mx-auto max-w-sm text-[14px] sm:text-[15px] text-[#3d3d3d] tracking-wide space-y-3">
              <p>그 시작의 순간에 함께</p>
              <p>축복해주시면 감사하겠습니다</p>
            </div>

            <ParentInfo />
          </div>

          <div className="flex flex-col items-center py-6 text-center">
            <h1 className="text-xl font-bold text-center mb-2">예식 안내</h1>
            <Calendar />
          </div>

          <div className="flex flex-col items-center py-6 text-center">
            <CountdownTimer />
          </div>

          <div className="border-t border-gray-200 py-10">
            <KakaoMarker />
            <KakaoNavigation />
          </div>

          <h1 className="text-xl font-bold text-center mb-2">오시는길</h1>
          <section className="mb-8">
            <DirectionsSection />
          </section>

          <div className="w-full px-2 sm:px-4 mt-5">
            <h1 className="text-xl font-bold text-center mb-2">갤러리</h1>
            <ImageGallery />
          </div>

          <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
            <h1 className="text-xl font-bold text-center mb-8">마음 전하실 곳</h1>
            <AccountList />
          </div>

          <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
            <h1 className="text-xl font-bold text-center mb-8">방명록</h1>
            <GuestBookPage />
          </div>

          <footer className="w-full border-t border-gray-200 px-4 py-2 text-center pb-[100px]">
            <p className="text-sm text-gray-500">@copyright socaeri</p>
          </footer>
        </div>

        <StickyFooter />
      </div>
    </main>
  );
};

export default Home;