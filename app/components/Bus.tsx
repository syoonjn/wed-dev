"use client";

import { DETAIL_LOCATION, REGION } from "../common/constant";

const Bus = () => {
    const handleMapClick = () => {
        // 실제 지도로 연결할 URL로 바꿔줘 (예: 네이버지도 or 카카오맵)
        window.open("https://map.kakao.com/link/search/광양 중마동", "_blank");
    };

    return (
        <div className="mt-6 text-sm sm:text-[17px] text-[#3d3d3d] text-center leading-[2.2] text-abs-14">
            <p className="mb-2 font-semibold">{REGION.GWANGYANG} 발 셔틀버스를 운행할 예정입니다.</p>
            <p>출발 위치 : <strong>{DETAIL_LOCATION.GWANGYANG}</strong></p>
            <p>탑승 시간 : <strong>오전 8시</strong></p>
            <button
                onClick={handleMapClick}
                className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
            >
                탑승 위치 지도 ({DETAIL_LOCATION.GWANGYANG})
            </button>
        </div>
    );
};

export default Bus;