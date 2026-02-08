"use client";

import { basePath } from "@/next.config";
import { useEffect, useRef, useState } from "react";
import { PiSpeakerHighFill, PiSpeakerSlashFill } from 'react-icons/pi';

export default function BGMPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [showNotice, setShowNotice] = useState(true);

    // 알림만 표시 (자동재생 제거)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotice(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <audio
                ref={audioRef}
                src={`${basePath}/bgm/spring-sunshine-piano-solo-ver.mp3`}
                loop
                preload="metadata"
            />

            {/* 🎵 알림 문구 */}
            {showNotice && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-100/90 text-gray-700 text-xs px-3 py-1.5 rounded-full shadow-sm animate-fadeIn">
                    🎵 배경음악이 준비되었어요
                </div>
            )}

            {/* 고정 재생/일시정지 버튼 */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => {
                        const audio = audioRef.current;
                        if (!audio) return;

                        if (playing) {
                            audio.pause();
                            setPlaying(false);
                        } else {
                            audio.play().catch(console.error);
                            setPlaying(true);
                        }
                    }}
                    className="bg-gray-100/90 rounded-full p-2 shadow"
                >
                    {playing ? <PiSpeakerHighFill /> : <PiSpeakerSlashFill />}
                </button>
            </div>
        </>
    );
}
