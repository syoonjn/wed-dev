"use client";

import { basePath } from "@/next.config";
import Image from "next/image";
import { getCouple, getParent } from "../common/name";

const BrideGroomIntro = () => {
    const { groomFullName, brideFullName } = getCouple();
    const { groomFatherName, groomMatherName, brideFatherName, brideMatherName } = getParent();

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <div className="flex flex-row items-center justify-center gap-4">
                {/* 신랑 */}
                <div>
                    <div className="relative w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden">
                        <Image
                            src={`${basePath}/images/groom_main.jpg`}
                            alt="신랑"
                            fill
                            className="object-cover scale-200"
                        />
                    </div>
                    <p className="text-sm text-blue-500 font-semibold text-abs-14">신랑 {groomFullName}</p>
                    <p className="text-xl my-1 text-abs-20">🏡🎮😝</p>
                    <p className="text-gray-700 mb-2 text-abs-16">INTP</p>
                    <p className="text-sm text-gray-500 text-abs-14">
                        {groomFatherName} · {groomMatherName} <span className="text-blue-600">의 아들</span>
                    </p>
                </div>

                {/* 하트 */}
                <div className="text-pink-400 text-2xl text-abs-20">♥</div>

                {/* 신부 */}
                <div>
                    <div className="relative w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden">
                        <Image
                            src={`${basePath}/images/bride_main.jpg`}
                            alt="신부"
                            fill
                            className="object-cover scale-200"
                        />
                    </div>
                    <p className="text-sm text-pink-500 font-semibold text-abs-14">신부 {brideFullName}</p>
                    <p className="text-xl my-1 text-abs-20">🏡🎮😍</p>
                    <p className="text-gray-700 mb-2 text-abs-16">ISFP</p>
                    <p className="text-sm text-gray-500 text-abs-14">
                        {brideFatherName} · {brideMatherName} <span className="text-pink-600">의 딸</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrideGroomIntro;
