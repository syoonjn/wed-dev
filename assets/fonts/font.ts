

import localFont from 'next/font/local';

export const pretendard = localFont({
    src: [
        { path: "./MaruBuri-SemiBold.ttf", weight: "100", style: "normal" },
        { path: "./MaruBuri-Bold.ttf", weight: "400", style: "normal" },
    ],
    variable: "--font-pretendard",
    display: "swap",
});


export default pretendard;