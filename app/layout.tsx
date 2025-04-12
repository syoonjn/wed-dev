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
const thumbnail = `${baseUrl}/images/sample.webp`;

export const metadata: Metadata = {
  title: `${groomFirstName} & ${brideFirstName} 결혼이야기`,
  description: `${groomFullName} & ${brideFullName} 결혼합니다 - ${weddingDate}`,
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: `${groomFullName} & ${brideFullName} 결혼합니다`,
    description: `${weddingDate}`,
    images: [
      {
        url: thumbnail,
        width: 800,
        height: 420,
        alt: '청첩장 썸네일 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${groomFullName} & ${brideFullName} 결혼합니다`,
    description: `${weddingDate}`,
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
