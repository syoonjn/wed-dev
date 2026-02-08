"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useFontSize } from "../context/FontSizeContext";

export default function AddFont({ isFooterVisible }: { isFooterVisible: boolean }) {
    const { setFontSize, fontSize } = useFontSize();

    // animate 객체 메모이제이션
    const animate = useMemo(() => ({
        y: 0,
        bottom: isFooterVisible ? 120 : 40
    }), [isFooterVisible]);

    // transition 객체 메모이제이션
    const transition = useMemo(() => ({
        duration: 0.3,
        ease: "easeInOut"
    }), []);

    return (
        <motion.div
            initial={{ bottom: 40 }}
            animate={animate}
            transition={transition}
            className="fixed z-50 left-4"
        >
            <button
                onClick={() => setFontSize(fontSize === "xl" ? "base" : "xl")}
                className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium text-gray-700 shadow-sm bg-white hover:bg-gray-100"
            >
                <span className="text-[13px] font-bold">가</span>
                <span className="text-[10px] font-normal">
                    {fontSize === "xl" ? "－ 작게" : "＋ 큰 글씨"}
                </span>
            </button>
        </motion.div>
    );
}
