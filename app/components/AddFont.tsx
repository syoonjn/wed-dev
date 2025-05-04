"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFontSize } from "../context/FontSizeContext";

export default function AddFont({ isFooterVisible }: { isFooterVisible: boolean }) {
    const { setFontSize, fontSize } = useFontSize();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isFooterVisible ? "up" : "down"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`fixed z-50 left-4 ${isFooterVisible ? "bottom-[120px]" : "bottom-10"
                    }`}
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
        </AnimatePresence>
    );
}
