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

            {/* 공유 드롭업 */}
            {showShareMenu && (
                <div className="w-full max-w-md mx-auto px-2 sm:px-4">
                    <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
                        <div className="rounded-md bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 divide-y divide-gray-200">
                            <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                                📱 카카오톡 공유하기
                            </button>
                            <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                                🔗 링크 복사하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 메뉴 드롭업 */}
            {showMenu && (
                <div className="w-full max-w-md mx-auto px-2 sm:px-4">
                    <div className="fixed bottom-[56px] left-0 z-40 w-full">
                        <div className="mx-auto w-full max-w-md px-2 sm:px-4">
                            <div className="rounded-md bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 divide-y divide-gray-200">
                                <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                                    🏛 예식 안내
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                                    🗺 오시는 길
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                                    📝 방명록 보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* 실제 footer */}
            {showFooter && (
                <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <div className="mx-auto flex max-w-md items-center justify-between px-4 py-5">
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
