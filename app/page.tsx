"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

import { Alert, Button, Card, DarkThemeToggle, Toast, ToastToggle } from "flowbite-react";
import { basePath } from '@/next.config';
import { TopButton, KakaoMarker, Calander, GuestBookPage, CountdownTimer, AccountList } from '@/components';
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

  const [showIntroText, setShowIntroText] = useState(true);
  const brideGroomText = `${groomFullName} & ${brideFullName}`;
  const fullText = [brideGroomText, "초대합니다."]; // 배열로 변환

  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0); // 현재 출력 중인 줄

  useEffect(() => {
    let index = 0;
    let currentText = "";

    const typingInterval = setInterval(() => {
      if (index < fullText[lineIndex].length) {
        currentText += fullText[lineIndex][index]; // 한 글자씩 추가
        setTypedText((prev) => lineIndex === 1 ? prev.split("\n")[0] + "\n" + currentText : currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        if (lineIndex === 0) {
          setTimeout(() => {
            setLineIndex(1); // 다음 줄로 넘어가기
            setTypedText((prev) => prev + "\n"); // 줄바꿈 추가
          }, 2500);
        } else {
          setTimeout(() => setShowIntroText(false), 2500);
        }
      }
    }, 300);

    return () => clearInterval(typingInterval);
  }, [lineIndex]);

  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const backgroundVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 5, ease: "easeOut" }, // 5초 동안 유지
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 3, delay: 3 } // 5초 동안 유지, 3초 후 시작
    },
  };

  const fadeOutVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 0, transition: { duration: 5 } } // 5초 동안 서서히 사라짐
  };


  return (
      <main className="relative flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={backgroundVariants}
            className="absolute inset-0 z-[-1] size-full"
        >
          <Image
              src="/images/elegant_wedding_bg.jpg"
              alt="Elegant Wedding Background"
              layout="fill"
              objectFit="cover"
              className="blur-lg brightness-75"
          />
        </motion.div>

        {showIntroText && (
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeOutVariants}
                className={`fixed left-1/2 -translate-x-1/2 whitespace-pre-line text-center transition-all duration-500${
                    isTop ? "top-1/2 -translate-y-1/2" : "top-0"
                }`}
            >
              <h1 className="text-xl font-bold text-gray-900 drop-shadow-lg dark:text-white">
                {typedText}
              </h1>
            </motion.div>
        )}

        <motion.div ref={ref} initial="hidden" animate="visible" variants={textVariants}>
          <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:text-white">
            <DarkThemeToggle />
            <header className="w-full max-w-5xl px-4 py-6 text-center">
              <div className="mb-4 text-2xl text-gray-600 dark:text-white">
                {`${groomFullName} & ${brideFullName}`}
              </div>
            </header>

            <main className="w-full max-w-2xl text-center">
              <div className="border-t border-gray-200 py-10">
                <Card imgAlt="Wedding Sample Image" imgSrc={`${basePath}/images/sample.webp`} className="max-w-xl text-center">
                  <div className="mb-6 text-center leading-loose text-gray-700 dark:text-gray-400">
                    저희 두 사람, 하나가 되어<br />
                    평생을 함께 걸어 가고자 합니다.<br />
                    자리에 오셔서 새로운 시작을 축복해 주세요.
                  </div>
                </Card>
              </div>
              <div className="py-10">
                <h1 className="mb-10 text-2xl font-bold">일정 안내</h1>
                <Calander/>
                <h1 className="mb-10 text-2xl font-bold">Wedding D-DAY</h1>
                <CountdownTimer />
              </div>
              <div className="border-t border-gray-200 py-10">
                <h1 className="mb-10 text-2xl font-bold">오시는길</h1>
                <KakaoMarker />
                <KakaoNavigation />
              </div>
              <div className="border-t border-gray-200 py-10">
                <h1 className="mb-10 text-2xl font-bold">마음 전하실 곳</h1>
                <AccountList />
              </div>
              <div className="border-t border-gray-200 py-10">
                <h1 className="mb-10 text-2xl font-bold">방명록</h1>
                <GuestBookPage />
              </div>
              <TopButton/>
            </main>
            <footer className="w-full max-w-5xl border-t border-gray-200 px-4 py-6 text-center">
              <p className="text-sm text-gray-500">@copyright socaeri</p>
            </footer>
          </div>
        </motion.div>
      </main>
  );
};

export default Home;
