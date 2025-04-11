"use client";

import { useEffect } from "react";
import Image from "next/image";
import { basePath } from "@/next.config";

const KakaoNavigation = () => {
    useEffect(() => {
        // 카카오 SDK 로드 및 초기화
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
        script.integrity =
            "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            if (window.Kakao) {
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!);
            }
        };
        document.body.appendChild(script);
    }, []);

    const startNavigation = () => {
        if (!window.Kakao || !window.Kakao.Navi) {
            return;
        }

        window.Kakao.Navi.start({
            name: "CA웨딩컨벤션",
            x: 127.1045231,
            y: 36.7933843,
            coordType: "wgs84",
        });
    };

    const handleClick = () => {
        const lat = 36.7935047; // 목적지 위도
        const lng = 127.1047214; // 목적지 경도
        const name = encodeURIComponent("CA웨딩컨벤션");
        // const appUrl = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${name}`;
        const appUrl = `nmap://route/walk?dlat=${lat}&dlng=${lng}&dname=${name}&appname=myweb.app`;

        const webUrl = `https://map.naver.com/v5/directions/-/-/${lng},${lat},${name},PLACE_POI/-?c=15.00,0,0,0,dh`;

        // 모바일에서 네이버 지도 앱으로 연결, 실패 시 웹으로 fallback
        window.location.href = appUrl;

        // 앱 미설치 대비 fallback 타이머
        setTimeout(() => {
            window.location.href = webUrl;
        }, 1500);
    };

    const handleClick2 = () => {
        const naverApp = 'nmap://route/car?slat=37.4640070&slng=126.9522394&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=37.5209436&dlng=127.1230074&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=https://syoonjn.github.io/wed-dev/';
        window.location.href = naverApp;
    }


    return (
        <div className="flex items-center justify-center border-t p-4">
            {/* 네이버 지도 */}
            <div
                onClick={startNavigation}
                className="flex flex-1 cursor-pointer items-center justify-center hover:opacity-80"
            >
                <Image
                    src={`${basePath}/images/kakaomap_basic.png`}
                    alt="카카오 지도"
                    width={18}
                    height={18}
                />
                <span className="ml-2 text-sm font-medium text-gray-800">카카오 내비</span>
            </div>

            {/* 구분선 */}
            <div className="h-5 w-px bg-gray-300"></div>

            {/* 카카오 내비 */}
            <div
                onClick={handleClick}
                className="flex flex-1 cursor-pointer items-center justify-center hover:opacity-80"
            >
                <Image
                    src={`${basePath}/images/navermap.webp`}
                    alt="티맵"
                    width={18}
                    height={18}
                />
                <span className="ml-2 text-sm font-medium text-gray-800">네이버 지도</span>
            </div>

            {/* 구분선 */}
            <div className="h-5 w-px bg-gray-300"></div>

            {/* 티맵 */}
            <div
                onClick={handleClick2}
                className="flex flex-1 cursor-pointer items-center justify-center hover:opacity-80"
            >
                <Image
                    src={`${basePath}/images/tmap.svg`}
                    alt="네이버 지도"
                    width={18}
                    height={18}
                />
                <span className="ml-2 text-sm font-medium text-gray-800">티맵</span>
            </div>
        </div>
    );
};

export default KakaoNavigation;
