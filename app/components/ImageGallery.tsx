// components/CustomGallerySlider.tsx
"use client";

import { basePath } from "@/next.config";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const slides = [
    {
        title: "Apple Intelligence 및 macOS",
        description: "쉽게 사용하고.\n쉽게 빠져들고.",
        imageUrl: `${basePath}/images/wedding1.jpg`
    },
    {
        title: "성능 및 배터리 사용 시간",
        description: "더 빠르게. 더 오래.",
        imageUrl: `${basePath}/images/wedding2.jpg`
    },
    {
        title: "성능 및 배터리 사용 시간",
        description: "더 빠르게. 더 오래.",
        imageUrl: `${basePath}/images/wedding3.jpg`
    },
    {
        title: "성능 및 배터리 사용 시간",
        description: "더 빠르게. 더 오래.",
        imageUrl: `${basePath}/images/wedding4.jpg`
    },
    {
        title: "성능 및 배터리 사용 시간",
        description: "더 빠르게. 더 오래.",
        imageUrl: `${basePath}/images/wedding5.jpg`
    },
];

export default function CustomSlider() {
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



    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        initial: 0,
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

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 py-6">
            {/* 슬라이더 */}
            <div ref={sliderRef} className="keen-slider">
                {slides.map((slide, i) => (
                    <div
                        key={slide.imageUrl}
                        className="keen-slider__slide relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg w-full max-h-screen flex-shrink-0"
                    >
                        {/* 스피너 */}
                        {loadingStates[i] && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                                <Loader className="w-8 h-8 animate-spin text-red-400" />
                            </div>
                        )}

                        {/* 이미지 */}
                        <Image
                            src={slide.imageUrl}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            loading="lazy"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onLoadingComplete={() => handleImageLoad(i)}
                            style={{ WebkitTouchCallout: "none" }}
                        />
                    </div>
                ))}

            </div>

            {/* 좌우 버튼 */}
            < button
                onClick={() => instanceRef.current?.prev()}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={() => instanceRef.current?.next()}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* 인디케이터 */}
            <div className="flex justify-center mt-4 gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-gray-800" : "bg-gray-300"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
