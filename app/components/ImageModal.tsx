"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    slides: { imageUrl: string; title: string }[];
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageModal({
    isOpen,
    onClose,
    slides,
    currentIndex,
    setCurrentIndex,
}: ImageModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const prev = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const next = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center px-4 sm:px-6">
            {/* 모달 헤더 */}
            <div className="w-full max-w-md sm:max-w-lg flex justify-between items-center bg-white rounded-t-xl px-4 py-3 text-sm text-gray-800">
                <span className="font-semibold">사진 보기</span>
                <button onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* 슬라이드 이미지 영역 */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] bg-white rounded-b-xl overflow-hidden">
                <Image
                    src={slides[currentIndex].imageUrl}
                    alt={slides[currentIndex].title}
                    fill
                    className="object-contain"
                />

                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
