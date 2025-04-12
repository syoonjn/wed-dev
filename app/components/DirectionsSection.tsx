'use client';

const DirectionsSection = () => {
    return (
        <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-16">
            <div className="text-[14px] sm:text-[15px] text-[#3d3d3d] tracking-wide space-y-8 max-w-sm">

                {/* 전철 */}
                <div className="space-y-2 text-left">
                    <h3 className="flex items-start font-semibold text-left">
                        🚇 <span className="ml-2 text-left">전철 / 기차</span>
                    </h3>
                    <p><span className="font-semibold">KTX / SRT 이용 시 :</span> KTX천안아산역 역사 내 2층</p>
                    <p><span className="font-semibold">새마을호, 무궁화호 이용 시 :</span> 아산역 하차</p>
                    <p><span className="font-semibold">1호선 :</span> 아산역 하차</p>
                </div>

                {/* 자차 */}
                <div className="space-y-2 text-left">
                    <h3 className="flex items-start font-semibold text-left">
                        🚗 <span className="ml-2 text-left">자차</span>
                    </h3>
                    <p><span className="font-semibold">CA웨딩컨벤션 검색</span></p>
                </div>

                {/* 버스 */}
                <div className="space-y-2 text-left">
                    <h3 className="flex items-start font-semibold text-left">
                        🚌 <span className="ml-2 text-left">버스</span>
                    </h3>
                    <p><span className="font-semibold">20번, 13번 :</span> 단대병원 → 천안아산역</p>
                    <p><span className="font-semibold">90번 :</span> 고속버스터미널 → 천안아산역</p>
                    <p><span className="font-semibold">990번 :</span> 종합터미널 → 천안아산역</p>
                    <p><span className="font-semibold">아산역 :</span> 21번, 80-1번, 81-1번, 777번</p>
                </div>
            </div>
        </section>
    );
};

export default DirectionsSection;
