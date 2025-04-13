"use client";
import { useEffect, useState } from "react";
import {
    FaArrowUp,
    FaBars,
    FaCalendarCheck,
    FaParking,
    FaShareAlt,
} from "react-icons/fa";
import AttendanceModal from "./AttendanceModal";

const StickyFooter = () => {
    const [showFooter, setShowFooter] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 스크롤 내려갈 때만 footer 보이기
    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 200;
            setShowFooter(shouldShow);

            // footer가 사라질 땐 드롭업 메뉴도 같이 닫아줌
            if (!shouldShow) {
                setShowShareMenu(false);
                setShowMenu(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleShare = () => {
        const shareData = {
            title: "소중한 결혼 소식",
            text: "우리 결혼해요 💍 함께해 주세요!",
            url: window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData).catch((err) => {
                console.error("공유 실패:", err);
            });
        } else {
            // fallback: 카카오톡 공유 or 링크 복사
            console.log("Web Share API 지원 안함. 카카오톡 공유나 링크 복사 fallback");
            // 카카오 SDK가 준비되어 있다면 여기에 Kakao.Link.sendDefault() 호출 가능
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
                    {/* 오버레이 - 배경 클릭 시 메뉴 닫힘 */}
                    <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => {
                            setShowMenu(false);
                        }}
                    />

                    {/* 메뉴 본체 */}
                    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
                        <div
                            className="border pointer-events-auto w-full bg-white/90 backdrop-blur-sm rounded-t-2xl px-6 pt-6 pb-24 space-y-4 overflow-y-auto"
                            style={{
                                maxHeight: "calc(100vh - 72px)",
                                minHeight: "fit-content",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {[
                                "오시는 길",
                                "안내사항",
                            ].map((text) => (
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


            {/* 실제 footer */}
            {showFooter && (
                <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <div className="mx-auto flex max-w-md items-center justify-between px-4 py-6">
                        {/* 참석 */}
                        <button className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition">
                            <FaCalendarCheck className="text-[18px] mb-1" />
                            <span className="text-[11px]">참석</span>
                        </button>

                        {/* 주차 */}
                        <button onClick={() => setShowModal(true)} className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition">
                            <FaParking className="text-[18px] mb-1" />
                            <span className="text-[11px]">주차</span>
                        </button>

                        {/* 메뉴 */}
                        <button
                            onClick={() => {
                                setShowMenu((prev) => !prev);
                                setShowShareMenu(false);
                            }}
                            className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition"
                        >
                            <FaBars className="text-[18px] mb-1" />
                            <span className="text-[11px]">메뉴</span>
                        </button>

                        {/* 공유 */}
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

                        {/* 맨 위로 */}
                        <button
                            onClick={scrollToTop}
                            className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-black transition"
                        >
                            <FaArrowUp className="text-[18px] mb-1" />
                            <span className="text-[11px]">맨 위</span>
                        </button>
                    </div>
                </footer>
            )}

            {showModal && <AttendanceModal externalTrigger={true} onClose={() => setShowModal(false)} />}

        </>
    );
};

export default StickyFooter;
