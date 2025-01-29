"use client";

import { useEffect } from "react";

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
            alert("카카오 SDK가 아직 로드되지 않았어요.");
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
        <button onClick={startNavigation} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
            카카오 내비로 길찾기
        </button>
    );
};

export default KakaoNavigation;
