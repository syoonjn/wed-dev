

import localFont from 'next/font/local';

export const pretendard = localFont({
    src: [
        { path: "./NanumBarunGothicBold.ttf", weight: "400", style: "normal" },
        { path: "./NanumBarunGothicBold.ttf", weight: "700", style: "normal" },
    ],
    variable: "--font-pretendard",
    display: "swap",
});


export default pretendard;