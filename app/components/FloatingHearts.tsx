"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface Heart {
    id: number;
    top: number;
    left: number;
    x: number;
    y: number;
    scale: number;
    rotate: number;
    duration: number;
}

export default function FloatingHearts({ isFooterVisible }: { isFooterVisible: boolean }) {
    const [hearts, setHearts] = useState<Heart[]>([]);

    const handleClick = () => {
        const newHearts = Array.from({ length: 50 }).map((_, i) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            return {
                id: Date.now() + i,
                top: Math.random() * vh,
                left: Math.random() * vw,
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                scale: Math.random() * 1.5 + 0.5,
                rotate: Math.random() * 360,
                duration: Math.random() * 1.5 + 0.5,
            };
        });

        setHearts((prev) => [...prev, ...newHearts]);

        setTimeout(() => {
            setHearts((prev) => prev.slice(newHearts.length));
        }, 3000);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`fixed z-50 right-4 bg-white p-3 rounded-full shadow-lg transition-all duration-300 ${isFooterVisible ? "bottom-[120px]" : "bottom-10"
                    }`}
            >
                <FcLike className="w-7 h-7" />
            </button>

            <div className="fixed inset-0 pointer-events-none z-40">
                <AnimatePresence>
                    {hearts.map((heart) => (
                        <motion.div
                            key={heart.id}
                            initial={{
                                top: heart.top,
                                left: heart.left,
                                x: 0,
                                y: 0,
                                opacity: 1,
                                scale: heart.scale,
                                rotate: 0,
                                position: "absolute",
                            }}
                            animate={{
                                x: heart.x,
                                y: heart.y,
                                opacity: 0,
                                rotate: heart.rotate,
                            }}
                            transition={{
                                duration: heart.duration,
                                ease: "easeOut",
                            }}
                        >
                            <FcLikePlaceholder />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
}
