"use client";

import { basePath } from "@/next.config";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const slides = Array.from({ length: 12 }, (_, i) => ({
    imageUrl: `${basePath}/images/wedding${i + 1}.jpg`,
    id: i // 고유 ID 추가
}));

export default function CustomSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // 최대 5개의 점만 표시하고 순환
    const maxDots = 5;
    const activeDot = currentSlide % maxDots;

    // ✅ slideChanged 콜백을 useCallback으로 메모이제이션
    const handleSlideChanged = useMemo(() => {
        let lastSlide = 0;
        return (slider: any) => {
            const newSlide = slider.track.details.rel;
            // 실제로 슬라이드가 변경됐을 때만 상태 업데이트
            if (lastSlide !== newSlide) {
                lastSlide = newSlide;
                setCurrentSlide(newSlide);
            }
        };
    }, []);

    // keen-slider 설정 메모이제이션
    const sliderOptions = useMemo(() => ({
        loop: true,
        initial: 0,
        renderMode: "performance" as const,
        drag: true,
        rubberband: false,
        defaultAnimation: {
            duration: 200
        },
        slides: {
            perView: 1.1,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 320px)": {
                slides: {
                    perView: 1.2,
                    spacing: 16,
                },
            },
            "(min-width: 640px)": {
                slides: {
                    perView: 2,
                    spacing: 20,
                },
            },
        },
        slideChanged: handleSlideChanged,
    }), [handleSlideChanged]);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderOptions);

    return (
        <div
            className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 py-6"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            {/* 슬라이더 */}
            <div ref={sliderRef} className="keen-slider">
                {slides.map((slide, i) => {
                    return (
                        <div
                            key={slide.id}
                            className="keen-slider__slide relative aspect-square overflow-hidden rounded-xl shadow-lg w-full max-h-screen flex-shrink-0 bg-gray-100"
                            style={{
                                willChange: "transform",
                                transform: "translateZ(0)",
                                touchAction: "pan-y",
                                userSelect: "none",
                                WebkitUserSelect: "none"
                            }}
                            onTouchStart={(e) => {
                                if (e.touches.length > 1) {
                                    e.preventDefault();
                                }
                            }}
                            onTouchMove={(e) => {
                                if (e.touches.length > 1) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <Image
                                src={slide.imageUrl}
                                alt={''}
                                fill
                                className="object-cover"
                                loading={i < 2 ? "eager" : "lazy"}
                                priority={i === 0}
                                quality={70}
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{ WebkitTouchCallout: "none", willChange: "transform" }}
                            />
                        </div>
                    );
                })}

            </div>

            {/* 좌우 버튼 */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    instanceRef.current?.prev();
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    instanceRef.current?.next();
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: maxDots }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeDot ? "bg-gray-800" : "bg-gray-300"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
