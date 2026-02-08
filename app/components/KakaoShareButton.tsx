"use client";

import { initKakao, shareKakao } from "@/app/lib/kakaoShare";
import { Share2 } from "lucide-react";
import { useEffect } from "react";

declare global {
    interface Window {
        Kakao: any;
    }
}

const KakaoShareButton = () => {
    useEffect(() => {
        // 이미 초기화되었으면 스킵
        if (window.Kakao?.isInitialized()) return;
        
        if (window.Kakao) {
            initKakao();
        } else {
            const script = document.querySelector('script[src*="kakao"]');
            if (script) {
                const handleLoad = () => {
                    initKakao();
                    script.removeEventListener('load', handleLoad);
                };
                script.addEventListener('load', handleLoad);
                
                return () => {
                    script.removeEventListener('load', handleLoad);
                };
            }
        }
    }, []); // 빈 의존성 배열로 한 번만 실행

    const handleShare = () => {
        const shared = shareKakao();
        if (!shared) {
            alert('카카오톡 공유 기능을 불러올 수 없습니다.');
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-[#FEE500] text-[#3C1E1E] rounded-lg font-semibold hover:bg-[#FFD700] transition-colors"
        >
            <Share2 size={20} />
            카카오톡 공유하기
        </button>
    );
};

export default KakaoShareButton;
