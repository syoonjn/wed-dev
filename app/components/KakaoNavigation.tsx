'use client';

import { basePath } from '@/next.config';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InstallRedirectModal from './InstallRedirectModal';

const DESTINATION = {
    name: 'CA웨딩컨벤션',
    lat: 36.7935047,
    lng: 127.1047214,
};

const KakaoNavigation = () => {
    const [showModal, setShowModal] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
        script.integrity =
            'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
        script.crossOrigin = 'anonymous';
        script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized?.()) {
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!);
            }
        };
        document.body.appendChild(script);
    }, []);

    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const startNavigationApp = ({
        key,
        tryAppLaunch,
        storeUrl,
    }: {
        key: string;
        tryAppLaunch: () => void;
        storeUrl: string;
    }) => {
        if (localStorage.getItem(key) === 'true') {
            localStorage.removeItem(key);
            return;
        }

        tryAppLaunch();

        setTimeout(() => {
            if (document.visibilityState === 'visible') {
                localStorage.setItem(key, 'true');
                setRedirectUrl(storeUrl);
                setShowModal(true);
            }
        }, 1500);
    };

    const startKakaoNavi = () => {
        if (!window.Kakao?.Navi) return;

        const storeUrl = isIOS()
            ? 'https://apps.apple.com/app/id417698849'
            : 'https://play.google.com/store/apps/details?id=com.locnall.KimGiSa';

        startNavigationApp({
            key: 'kakao-navi-installing',
            tryAppLaunch: () => {
                window.Kakao.Navi.start({
                    name: DESTINATION.name,
                    x: DESTINATION.lng,
                    y: DESTINATION.lat,
                    coordType: 'wgs84',
                });
            },
            storeUrl,
        });
    };

    const openNaverMap = () => {
        const name = encodeURIComponent(DESTINATION.name);
        const appUrl = `nmap://navigation?dlat=${DESTINATION.lat}&dlng=${DESTINATION.lng}&dname=${name}&appname=myweb.app`;
        const storeUrl = isIOS()
            ? 'https://apps.apple.com/app/id311867728'
            : 'https://play.google.com/store/apps/details?id=com.nhn.android.nmap';

        startNavigationApp({
            key: 'naver-map-installing',
            tryAppLaunch: () => {
                window.location.href = appUrl;
            },
            storeUrl,
        });
    };

    const openTmap = () => {
        const name = encodeURIComponent(DESTINATION.name);
        const appUrl = `tmap://route?goalx=${DESTINATION.lng}&goaly=${DESTINATION.lat}&goalname=${name}&navType=1`;
        const storeUrl = isIOS()
            ? 'https://apps.apple.com/app/id431589174'
            : 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku';

        startNavigationApp({
            key: 'tmap-installing',
            tryAppLaunch: () => {
                window.location.href = appUrl;
            },
            storeUrl,
        });
    };

    const maps = [
        {
            label: '카카오 내비',
            onClick: startKakaoNavi,
            icon: `${basePath}/images/kakaomap_basic.png`,
            alt: '카카오 지도',
        },
        {
            label: '네이버 지도',
            onClick: openNaverMap,
            icon: `${basePath}/images/navermap.webp`,
            alt: '네이버 지도',
        },
        {
            label: '티맵',
            onClick: openTmap,
            icon: `${basePath}/images/tmap.svg`,
            alt: '티맵',
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center border-t p-4">
            <div className="flex items-center justify-center border-t p-4">
                {maps.map((map, index) => (
                    <div key={map.label} className="flex items-center">
                        <div
                            onClick={map.onClick}
                            className="flex flex-1 cursor-pointer items-center justify-center hover:opacity-80"
                        >
                            <Image src={map.icon} alt={map.alt} width={18} height={18} />
                            <span className="ml-2 text-sm font-medium text-gray-800">
                                {map.label}
                            </span>
                        </div>
                        {index < maps.length - 1 && (
                            <div className="h-5 w-px bg-gray-300 mx-2" />
                        )}
                    </div>
                ))}
            </div>
            <p className="mt-2 text-[12px] text-gray-400">
                * 위의 각 항목을 누르면 웨딩홀 길안내가 시작됩니다
            </p>
            <InstallRedirectModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setShowModal(false);
                    window.location.href = redirectUrl;
                }}
            />
        </div>
    );
};

export default KakaoNavigation;
