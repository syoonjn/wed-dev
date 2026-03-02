"use client";
import { shareKakao } from "@/app/lib/kakaoShare";
import { useEffect, useState } from "react";
import {
    FaArrowUp,
    FaParking,
    FaShareAlt
} from "react-icons/fa";
import { getCouple } from "../common/name";
import AttendanceModal from "./AttendanceModal";

declare global {
    interface Window {
        Kakao: any;
    }
}

const StickyFooter = ({
    setShowFooterState,
}: {
    setShowFooterState: (visible: boolean) => void;
}) => {
    const [showFooter, setShowFooter] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { brideFirstName, groomFirstName } = getCouple();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 200;

            // ✅ 로컬 상태와 부모 상태를 독립적으로 업데이트
            setShowFooter((prev) => {
                if (prev !== shouldShow) {
                    // 상태 업데이트를 다음 틱으로 연기
                    setTimeout(() => setShowFooterState(shouldShow), 0);
                    return shouldShow;
                }
                return prev;
            });

            if (!shouldShow) {
                setShowShareMenu(false);
                setShowMenu(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setShowFooterState]);

    const handleShare = () => {
        const shared = shareKakao();

        // 카카오톡 공유가 실패하면 Web Share API 사용
        if (!shared) {
            const shareData = {
                title: `${groomFirstName} & ${brideFirstName} 모바일 청첩장`,
                text: `💍${groomFirstName} & ${brideFirstName} 결혼합니다`,
                url: window.location.href,
            };

            if (navigator.share) {
                navigator.share(shareData).catch(() => {
                    // 공유 실패 시 조용히 처리
                });
            }
        }
    };

    return (
        <>
            {(showMenu || showShareMenu) && (
                <div
                    onClick={() => {
                        setShowMenu(false);
                        setShowShareMenu(false);
                    }}
                    className="fixed inset-0 z-30 bg-black/0"
                />
            )}

            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
                        <div
                            className="border pointer-events-auto w-full bg-white/90 backdrop-blur-sm rounded-t-2xl px-6 pt-6 pb-24 space-y-4 overflow-y-auto"
                            style={{
                                maxHeight: "calc(100vh - 72px)",
                                minHeight: "fit-content",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {["오시는 길", "안내사항"].map((text) => (
                                <button
                                    key={text}
                                    className="block w-full text-center text-gray-800 text-[15px] font-medium"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {showFooter && (
                <footer
                    id="sticky-footer"
                    className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
                >
                    <div className="mx-auto flex max-w-md flex-col px-4 py-4">
                        <div className="flex items-center justify-between mb-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition"
                            >
                                <FaParking className="text-[18px] mb-1" />
                                <span className="text-[11px]">주차</span>
                            </button>
                            <button
                                onClick={() => {
                                    setShowShareMenu((prev) => !prev);
                                    setShowMenu(false);
                                    handleShare();
                                }}
                                className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition"
                            >
                                <FaShareAlt className="text-[18px] mb-1" />
                                <span className="text-[11px]">공유</span>
                            </button>
                            <button
                                onClick={scrollToTop}
                                className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition"
                            >
                                <FaArrowUp className="text-[18px] mb-1" />
                                <span className="text-[11px]">맨 위</span>
                            </button>
                        </div>

                    </div>
                </footer>
            )}
            <AttendanceModal />
            {showModal && <AttendanceModal externalTrigger={true} onClose={() => setShowModal(false)} />}
        </>
    );
};

export default StickyFooter;
