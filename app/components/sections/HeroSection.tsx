"use client";

import { getCouple } from "@/app/common/name";
import { basePath } from "@/next.config";
import Image from "next/image";
import { memo } from "react";
import AddFont from "../AddFont";
import FloatingHearts from "../FloatingHearts";

interface HeroSectionProps {
    showStickyFooter: boolean;
}

function HeroSection({ showStickyFooter }: HeroSectionProps) {
    const { groomFullName, brideFullName } = getCouple();

    return (
        <div className="border-t border-gray-200 py-10 text-center text-[#3d3d3d]">
            <h1 className="sr-only">모바일 청첩장 보기</h1>

            <div className="mb-1 tracking-widest font-bold text-abs-20">
                26 | 03 | 28
            </div>

            <div className="mb-6 tracking-[0.25em] text-gray-400 text-abs-12">
                SATURDAY
            </div>
            <div className="text-2xl">
                <AddFont isFooterVisible={showStickyFooter} />
                <FloatingHearts isFooterVisible={showStickyFooter} />
            </div>

            <Image
                src={`${basePath}/images/wedding-main.jpg`}
                alt="결혼식 메인 이미지"
                layout="responsive"
                width={500}
                height={500}
                sizes="(max-width: 768px) 80vw, 300px"
                className="mx-auto mb-6 w-full max-w-[300px] rounded"
                priority
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
            />

            <div className="mb-2 font-[500] tracking-wider text-gray-800 text-abs-20">
                {`${groomFullName}  ｜  ${brideFullName}`}
            </div>

            <div className="mb-8 tracking-wide space-y-2 text-abs-14">
                <p>2026년 3월 28일 토요일 오후 1시</p>
                <p>CA웨딩컨벤션 루체홀</p>
            </div>

            <p className="font-semibold text-[#744936] mb-6 text-abs-16">
                소중한 분들을 초대합니다
            </p>

            <div className="mx-auto max-w-sm tracking-wide space-y-3 mb-6 text-abs-14">
                <p><span className="text-[#b85b52] font-semibold">철</span>길처럼 나란히 걸을 인연이</p>
                <p><span className="text-[#b85b52] font-semibold">호</span>수처럼 깊은 사랑이 되었습니다</p>
                <p><span className="text-[#b85b52] font-semibold">윤</span>슬처럼 빛나는 미래를 꿈꾸며</p>
                <p><span className="text-[#b85b52] font-semibold">정</span>들어 이제는 한 사람이 됩니다</p>
            </div>

            <div className="mx-auto max-w-sm tracking-wide space-y-3 text-abs-14">
                <p>그 시작의 순간에 함께</p>
                <p>축복해주시면 감사하겠습니다</p>
            </div>
        </div>
    );
}

export default memo(HeroSection);
