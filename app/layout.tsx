import pretendard from '@/assets/fonts/font';
import '@/styles/globals.css';
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import getCouple from "./common/name";
import { formatKoreanDate } from "./common/wedDate";
import { AlertProvider } from "./context/AlertContext";
import ClientCookiesProvider from './lib/ClientCookiesProvider';
import ReactQueryProvider from "./lib/ReactQueryProvider";

const weddingDate = formatKoreanDate();
const { groomFullName, groomFirstName, brideFullName, brideFirstName } = getCouple();

const baseUrl = 'https://syoonjn.github.io/wed-dev';
const thumbnail = `${baseUrl}/images/wedding-sample.png`;

export const metadata: Metadata = {
  title: `${groomFirstName} & ${brideFirstName} 모바일 청첩장`, // "청첩장" 키워드 추가!
  description: `${groomFullName} & ${brideFullName} 결혼합니다 - ${weddingDate}`, // 자연스럽게 구성
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: `${groomFullName} & ${brideFullName} 결혼합니다`,
    description: `모바일 청첩장 | ${weddingDate} | ${groomFullName} ♥ ${brideFullName}`,
    images: [
      {
        url: thumbnail,
        width: 800,
        height: 420,
        alt: `${groomFullName} & ${brideFullName} 모바일 청첩장 썸네일`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${groomFullName} & ${brideFullName} 모바일 청첩장`,
    description: `${weddingDate} - ${groomFullName} ♥ ${brideFullName}`,
    images: [thumbnail],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <ThemeModeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={pretendard.className}>
        <AlertProvider>
          <ReactQueryProvider>
            <ClientCookiesProvider>
              {children}
            </ClientCookiesProvider>
          </ReactQueryProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
