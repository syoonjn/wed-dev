"use client";

import { basePath } from "@/next.config";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const slides = Array.from({ length: 12 }, (_, i) => ({
    imageUrl: `${basePath}/images/wedding${i + 1}.jpg`
}));

export default function CustomSlider() {
    const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadingStates, setLoadingStates] = useState(
        Array(slides.length).fill(true)
    );

    const handleImageLoad = (index: number) => {
        setLoadingStates((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
        });
    };

    // 최대 5개의 점만 표시하고 순환
    const maxDots = 5;
    const activeDot = currentSlide % maxDots;



    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        initial: 0,
        renderMode: "performance",
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
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    if (viewMode === 'grid') {
        return (
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 py-6">
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setViewMode('slider');
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                        }}
                        style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                        className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        간략히 보기
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {slides.map((slide, i) => {
                        return (
                            <div
                                key={`grid-${i}`}
                                className="relative aspect-[3/4] overflow-hidden shadow-lg"
                                style={{
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
                                {loadingStates[i] && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm">
                                        <Loader className="w-10 h-10 animate-spin text-gray-400" />
                                    </div>
                                )}
                                <Image
                                    src={slide.imageUrl}
                                    alt={''}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                    quality={75}
                                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onLoadingComplete={() => handleImageLoad(i)}
                                    style={{ WebkitTouchCallout: "none" }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 py-6"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            <div className="flex justify-end mb-4">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setViewMode('grid');
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                    }}
                    style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    더보기
                </button>
            </div>
            {/* 슬라이더 */}
            <div ref={sliderRef} className="keen-slider">
                {slides.map((slide, i) => (
                    <div
                        key={slide.imageUrl}
                        className="keen-slider__slide relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg w-full max-h-screen flex-shrink-0"
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
                        {loadingStates[i] && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm">
                                <Loader className="w-12 h-12 animate-spin text-gray-400" />
                            </div>
                        )}

                        <Image
                            src={slide.imageUrl}
                            alt={''}
                            fill
                            className="object-cover"
                            loading="eager"
                            priority={i < 3}
                            quality={75}
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onLoadingComplete={() => handleImageLoad(i)}
                            style={{ WebkitTouchCallout: "none", willChange: "transform" }}
                        />
                    </div>
                ))}

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
