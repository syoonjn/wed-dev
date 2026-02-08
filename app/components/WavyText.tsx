"use client";

import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { FC, useEffect, useState } from "react";

interface Props extends HTMLMotionProps<"div"> {
    text: string;
    delay?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
    repeatDelay?: number;
}

const WavyText: FC<Props> = ({
    text,
    delay = 0,
    duration = 0.05,
    className,
    style,
    repeatDelay = 3000,
    ...props
}: Props) => {
    const letters = Array.from(text);
    // 🔍 디버깅용: 반복 애니메이션 비활성화
    const [replay, setReplay] = useState(true);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setReplay(false);
    //         setTimeout(() => setReplay(true), 100);
    //     }, repeatDelay);

    //     return () => clearInterval(interval);
    // }, [repeatDelay]);

    const container: Variants = {
        hidden: {
            opacity: 0
        },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: i * delay }
        })
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
        <motion.div
            style={{ display: "flex", overflow: "hidden", ...style }}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            className={className}
            {...props}
        >
            {letters.map((letter, index) => (
                <motion.span key={index} variants={child}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default WavyText;
