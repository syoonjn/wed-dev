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
        const appUrl = `nmap://navigation?dlat=${lat}&dlng=${lng}&dname=${name}&appname=myweb.app`;

        const webUrl = `https://map.naver.com/v5/directions/-/-/${lng},${lat},${name},PLACE_POI/-?c=15.00,0,0,0,dh`;

        // 모바일에서 네이버 지도 앱으로 연결, 실패 시 웹으로 fallback
        window.location.href = appUrl;

        // 앱 미설치 대비 fallback 타이머
        setTimeout(() => {
            window.location.href = webUrl;
        }, 1500);
    };

    const openTmapNavigation = () => {
        const lat = 36.7935047; // 목적지 위도
        const lng = 127.1047214; // 목적지 경도
        const name = encodeURIComponent("CA웨딩컨벤션");

        // T map 앱 네비게이션 실행 URL
        const appUrl = `tmap://route?goalx=${lng}&goaly=${lat}&goalname=${name}&navType=1`;

        // fallback: 앱이 없을 경우
        const webUrl = `https://www.tmap.co.kr/tmap2/mobile/main.do`;

        window.location.href = appUrl;

        setTimeout(() => {
            window.location.href = webUrl;
        }, 1500);
    };


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
                onClick={openTmapNavigation}
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
