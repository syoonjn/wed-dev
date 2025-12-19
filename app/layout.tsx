import pretendard from '@/assets/fonts/font';
import '@/styles/globals.css';
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { getCouple } from "./common/name";
import { formatKoreanDate } from "./common/wedDate";
import { AlertProvider } from "./context/AlertContext";
import { FontSizeProvider } from './context/FontSizeContext';
import ClientCookiesProvider from './lib/ClientCookiesProvider';
import ReactQueryProvider from "./lib/ReactQueryProvider";

const weddingDate = formatKoreanDate();
const { groomFullName, groomFirstName, brideFullName, brideFirstName } = getCouple();

// const baseUrl = 'https://syoonjn.github.io/wed-dev';
const baseUrl = `https://cheolho-so.com?v=${new Date().getTime()}`;
const thumbnail = `${baseUrl}/images/wedding-main.jpg`;

export const metadata: Metadata = {
  title: `${groomFirstName} & ${brideFirstName} 모바일 청첩장`, // "청첩장" 키워드 추가!
  description: `${groomFullName} & ${brideFullName} 결혼합니다 - ${weddingDate}`, // 자연스럽게 구성
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: `${groomFullName} & ${brideFullName} 결혼합니다`,
    description: `${weddingDate} | ${groomFullName} ♥ ${brideFullName}`,
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
  other: {
    'event:start_time': '2026-03-28T13:00:00+09:00',
    'event:end_time': '2026-03-28T15:00:00+09:00',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `${groomFullName} ♥ ${brideFullName} 결혼식`,
    "description": `${groomFullName}과 ${brideFullName}의 결혼식에 초대합니다`,
    "startDate": "2026-03-28T13:00:00+09:00",
    "endDate": "2026-03-28T15:00:00+09:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "CA웨딩컨벤션 루체홀",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KR",
        "addressLocality": "서울"
      }
    },
    "image": [thumbnail],
    "organizer": {
      "@type": "Person",
      "name": `${groomFullName} & ${brideFullName}`
    }
  };

  return (
    <html lang="ko">
      <head>
        <ThemeModeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
      </head>
      <body className={pretendard.className}>
        <FontSizeProvider>
          <AlertProvider>
            <ReactQueryProvider>
              <ClientCookiesProvider>
                {children}
              </ClientCookiesProvider>
            </ReactQueryProvider>
          </AlertProvider>
        </FontSizeProvider>
      </body>
    </html>
  );
}
