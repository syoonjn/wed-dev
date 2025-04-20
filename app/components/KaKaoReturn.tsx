"use client";

import { useEffect } from "react";

export default function KakaoReturn() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.close();
        }, 3000); // 3초 후 창 닫기
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center px-4">
            <p className="text-lg font-semibold mb-2">송금이 완료되었습니다!</p>
            <p className="text-sm text-gray-600">
                이 창은 자동으로 닫혀요.<br />
                만약 닫히지 않으면 직접 닫아주세요.
            </p>
        </div>
    );
}
