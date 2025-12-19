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
        if (window.Kakao) {
            initKakao();
        } else {
            const script = document.querySelector('script[src*="kakao"]');
            if (script) {
                script.addEventListener('load', initKakao);
            }
        }
    }, []);

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
