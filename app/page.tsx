"use client";
import Image from "next/image";
import React from "react";
import Script from 'next/script'
import { Map } from 'react-kakao-maps-sdk';

import { basePath } from '../next.config';
import { Button, Card, DarkThemeToggle } from "flowbite-react";
import Calendar from "./components/calander";
import KaKaoMarker from "./components/kakaoMarker"

const Home: React.FC = () => {
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

      <main className="w-full max-w-3xl px-4 text-center">
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

        <Calendar/>

        <div className="py-10">
          <KaKaoMarker />
        </div>
      </main>

      <footer className="w-full max-w-5xl px-4 py-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">@copyright socaeri</p>
      </footer>
    </div>
  </main>
  );
};

export default Home;

