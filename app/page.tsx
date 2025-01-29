"use client";
import Image from "next/image";
import React, { useState } from "react";
import Script from 'next/script'
import { Map } from 'react-kakao-maps-sdk';

import { Alert, Button, Card, DarkThemeToggle, Toast, ToastToggle } from "flowbite-react";
import { basePath } from '@/next.config';
import { TopButton, KakaoMarker, Calander, GuestBookPage, CountdownTimer } from '@/components';
import { HiFire } from "react-icons/hi";
import { motion } from 'framer-motion';
import useObserver from "./hook/useObserver";
import getCouple from "./common/name";
import { formatKoreanDate } from "./common/wedDate";
import KakaoNavigation from "./components/KakaoNavigation";


const Home: React.FC = () => {

  const { groomFullName, brideFullName } = getCouple();
  const { ref, animation } = useObserver();

  const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';
  const brideMomName = process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '';
  const brideFatherName = process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '';
  const groomMomName = process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '';
  const groomFatherName = process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '';
  const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '';

  const [showToast, setShowToast] = useState(false);
  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
    <motion.div
        ref={ref}
        initial="hidden"
        animate={animation}
        variants={opacityVariants}
    >
    <div className="min-h-screen bg-white dark:text-white flex flex-col items-center justify-center">
      <DarkThemeToggle />
      <header className="w-full max-w-5xl px-4 py-6 dark:text-white text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">You're Invited</h1>
        <p className="text-2xl dark:text-white text-gray-600 mb-4">
          {`${groomFullName} & ${brideFullName}`}
        </p>
      </header>

      <main className="w-full max-w-2xl text-center">
        <div className="py-10 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center mb-4">
            <Card
                imgAlt="Wedding Sample Image"
                imgSrc={`${basePath}/images/sample.webp`}
                className="max-w-xl text-center"> {/* text-center로 가운데 정렬 유지 */}
              <p
                  className="text-gray-700 dark:text-gray-400 text-justify leading-loose mb-6"
                  style={{ textAlignLast: 'center', lineHeight: '2.5' }}>
                저희 두 사람, 하나가 되어<br />
                평생을 함께 걸어 가고자 합니다.<br />
                자리에 오셔서 새로운 시작을<br />
                축복해 주세요.
              </p>


              <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-between w-full max-w-[14rem]">
                  <span className="font-bold text-gray-900 dark:text-gray-100">{`${groomFatherName} · ${groomMomName} 의`}</span>
                  <span className="font-normal text-gray-700 dark:text-gray-400">아들</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{groomName}</span>
                </div>

                <div className="flex justify-between w-full max-w-[14rem]">
                  <span className="font-bold text-gray-900 dark:text-gray-100">{`${brideFatherName} · ${brideMomName} 의`}</span>
                  <span className="font-normal text-gray-700 dark:text-gray-400">딸</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{brideName}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-2xl font-bold">일정 안내</h1>
          </div>
          <div className="py-10 border-t border-gray-200">
            <Calander/>
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Wedding D-DAY</h1>
              <CountdownTimer />
            </div>

          </div>
        </div>

        <div className="py-10 flex flex-col items-center justify-center">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">오시는길</h1>
            <div className="py-10 border-t border-gray-200">
              <h1 className="font-bold">KTX천안아산역 역사 내 2층 루체홀</h1>
              <h1 className="py-3">충청남도 아산시 배방읍 희망로 100</h1>
              <KakaoMarker />
              <KakaoNavigation/>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">방명록</h1>
          <div className="py-10 border-t border-gray-200">
             <GuestBookPage/>
          </div>
        </div>
        <TopButton/>
      </main>

      <footer className="w-full max-w-5xl px-4 py-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">@copyright socaeri</p>
      </footer>
    </div>
      </motion.div>
  </main>
  );
};

export default Home;

