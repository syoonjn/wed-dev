'use client';

import { getCouple } from "@/app/common/name";
import { basePath } from "@/next.config";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Accordion } from "flowbite-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose } from "react-icons/ai";


interface AttendanceModalProps {
    externalTrigger?: boolean;
    onClose?: () => void;
}
export default function AttendanceModal({ externalTrigger = false, onClose }: AttendanceModalProps) {
    const { groomFullName, brideFullName } = getCouple();
    const [cookies, setCookie] = useCookies(["hide-attendance-modal"]);
    const [ready, setReady] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hideToday, setHideToday] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const hide = cookies["hide-attendance-modal"];
        if (!externalTrigger) {
            setShowModal(!hide);
        } else {
            setShowModal(true);
        }
        setReady(true);
    }, [cookies, externalTrigger]);

    // 공통 닫기 핸들러
    const handleClose = () => {
        if (hideToday) handleHideToday();
        else setShowModal(false);

        // 외부 트리거였으면 부모에 알려줌
        if (externalTrigger && onClose) {
            onClose();
        }
    };

    const handleHideToday = () => {
        const expire = new Date();
        expire.setDate(expire.getDate() + 1);
        expire.setHours(0, 0, 0, 0);

        setCookie("hide-attendance-modal", "true", {
            path: "/",
            expires: expire,
        });

        setHideToday(true);
        setShowModal(false);
    };

    // 모달 열릴 때 body 스크롤 막기
    const modalRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = modalContentRef.current;
        if (!target) return;

        if (showModal || showImageModal) {
            disableBodyScroll(target);
        } else {
            enableBodyScroll(target);
        }

        return () => enableBodyScroll(target); // 언마운트 시 복구
    }, [showModal, showImageModal]);

    if (!ready || !showModal) return null;

    return (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-4 overflow-hidden">
            <div
                ref={modalContentRef}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg max-h-[calc(100vh-2rem)] overflow-y-auto overscroll-contain touch-pan-y"
                style={{
                    maxHeight: "calc(100dvh - 2rem)",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-black">🚧주차 동선 안내</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="text-center">
                    <p className="mb-4 text-sm text-gray-600">
                        예식 당일 KTX 이용객과 함께 사용되어<br />
                        주차가 다소 혼잡할 수 있습니다.<br />
                        CA웨딩컨벤션 안내 주차장 이용을 권장드립니다.
                    </p>

                    <hr className="my-4" />

                    <div className="mb-2 text-sm text-pink-500 font-medium">💗 신랑 {groomFullName} & 신부 {brideFullName}</div>
                    <div className="mb-1 text-sm text-gray-700">📅 2026년 3월 28일 토요일 오후 1시</div>
                    <div className="mb-5 text-sm text-gray-700">📍 CA 웨딩컨벤션 루체홀</div>


                    {/* 아코디언 */}
                    <Accordion>
                        <Accordion.Panel>
                            <Accordion.Title className="text-sm font-medium text-gray-700 py-2 px-3 leading-tight">
                                🗺️ CA웨딩 주차장 안내
                            </Accordion.Title>
                            <Accordion.Content>
                                <Image
                                    src={`${basePath}/images/comming_parking.png`}
                                    alt="주차장 위치"
                                    width={500}
                                    height={300}
                                    className="w-full rounded-md mb-2 cursor-pointer"
                                    onClick={() => setShowImageModal(true)}
                                />
                                <span className="block font-semibold text-[#b85b52]">📌 주차장 위치 안내</span>
                                <div className="mt-1 text-gray-500 leading-relaxed space-y-1">
                                    <span className="block text-sm">
                                        상가협의회 주차장
                                        <span className="text-gray-700 font-semibold"> 주소: "장재리 1770번지"</span>
                                    </span>
                                    <span className="block text-sm">
                                        와이몰 주차장
                                        <span className="text-gray-700 font-semibold"> 주소: "장재리 2023번지"</span>
                                    </span>
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>

                    {showImageModal && (
                        <div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80"
                            onClick={() => setShowImageModal(false)} // 배경 클릭 시 닫힘
                        >
                            <div
                                className="relative max-w-3xl w-[90%] bg-white rounded-lg overflow-hidden shadow-lg"
                                onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫힘 방지
                            >
                                {/* 헤더 영역 */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-700">🚗 주차장 전체 보기</h3>
                                    <button
                                        onClick={() => setShowImageModal(false)}
                                        className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* 이미지 영역 */}
                                <div className="p-4 flex items-center justify-center">
                                    <Image
                                        src={`${basePath}/images/comming_parking.png`}
                                        alt="주차장 확대 이미지"
                                        width={1000}
                                        height={600}
                                        className="rounded-md max-h-[80vh] object-contain"
                                    />
                                </div>

                            </div>
                        </div>
                    )}
                    <div className="mt-2 flex items-center justify-center">
                        <label
                            className="flex cursor-pointer items-center gap-2 text-xs text-gray-400"
                            onClick={handleHideToday}
                        >
                            <input type="checkbox" readOnly checked={hideToday} className="accent-pink-500" />
                            오늘 하루 보지 않기
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
