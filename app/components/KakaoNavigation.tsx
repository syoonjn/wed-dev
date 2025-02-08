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
                onClick={startNavigation}
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
                onClick={startNavigation}
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
