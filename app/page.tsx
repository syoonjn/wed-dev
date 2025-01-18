"use client";
import Image from "next/image";
import React, { useState } from "react";
import Script from 'next/script'
import { Map } from 'react-kakao-maps-sdk';

import { Alert, Button, Card, DarkThemeToggle, Toast, ToastToggle } from "flowbite-react";
import { basePath } from '@/next.config';
import { TopButton, KakaoMarker, Calander, GuestBookPage, CountdownTimer } from '@/components';
import { HiFire } from "react-icons/hi";
const Home: React.FC = () => {

  const [showToast, setShowToast] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
    <div className="min-h-screen bg-white dark:text-white flex flex-col items-center justify-center">
      <DarkThemeToggle />
      <header className="w-full max-w-5xl px-4 py-6 dark:text-white text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">You're Invited</h1>
        <p className="text-2xl dark:text-white text-gray-600 mb-4">
          황00 & 소00
        </p>
      </header>

      <main className="w-full max-w-3xl text-center">
        <div className="py-10 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center mb-4">
            <Card
                imgAlt="Wedding Sample Image"
                imgSrc={`${basePath}/images/sample.webp`}
                className="max-w-xl">
              <p className="font-normal text-gray-700 dark:text-gray-400">저희 두 사람, 하나가 되어</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">평생을 함께 걸어 가고자 합니다.</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">자리에 오셔서 새로운 시작을</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">축복해 주세요.</p>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-2xl font-bold">Wedding Day</h1>
          </div>
          <div className="py-10 border-t border-gray-200">
            <Calander/>
            <div className="space-y-6">
              <h1 className="text-xl font-bold">Wedding Countdown</h1>
              <CountdownTimer />
            </div>

          </div>
        </div>

        <div className="py-10 flex flex-col items-center justify-center">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">오시는길</h1>
            <div className="py-10 border-t border-gray-200">
              <KakaoMarker />
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
  </main>
  );
};

export default Home;

