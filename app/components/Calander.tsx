import React, { useState } from "react";

const holidays = {
    "2025-01-01": "신정",
    "2025-01-27": "임시공휴일",
    "2025-01-28": "설날연휴",
    "2025-01-29": "설날",
    "2025-01-30": "설날연휴",
    "2025-03-01": "삼일절",
    "2025-03-03": "대체공휴일",
    "2025-05-05": "어린이날",
    "2025-05-06": "대체공휴일",
    "2025-06-06": "현충일",
    "2025-08-15": "광복절",
    "2025-10-03": "개천절",
    "2025-10-05": "추석연휴",
    "2025-10-06": "추석",
    "2025-10-07": "추석연휴",
    "2025-10-08": "대체공휴일",
    "2025-10-09": "한글날",
    "2025-12-25": "성탄절",
    "2026-01-01": "신정",
    "2026-02-16": "설날연휴",
    "2026-02-17": "설날",
    "2026-02-18": "설날연휴",
    "2026-05-05": "어린이날",
    "2026-06-06": "현충일",
    "2026-08-15": "광복절",
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // 현재 연도와 월
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 월의 첫 번째와 마지막 날 계산
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 요일과 총 일수 계산
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // 이전/다음 월로 이동
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // 날짜 배열 생성
    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(""); // 첫 주의 빈 칸
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push(i.toString());
    }

    // 오늘 날짜 정보
    const today = new Date();

    // 날짜 포맷팅 함수 (공휴일 체크용)
    const formatDate = (day: string) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
                <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <h2 className="text-3xl font-bold text-gray-800">
                    {currentDate.toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                    })}
                </h2>
                <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center text-lg text-gray-500 font-semibold mb-3">
                <div className="text-red-500">일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div className="text-blue-500">토</div>
            </div>

            {/* 날짜 */}
            <div className="grid grid-cols-7 text-center text-lg">
                {days.map((day, index) => {
                    const isToday =
                        day === today.getDate().toString() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();
                    // @ts-ignore
                    const holidayName = holidays[formatDate(day)];
                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg cursor-pointer ${
                                isToday
                                    ? "bg-red-500 text-white font-bold"
                                    : holidayName
                                        ? "bg-red-100 text-red-500 font-semibold"
                                        : "text-gray-800"
                            } ${
                                index % 7 === 0 ? "text-red-500" : "" /* 일요일 색상 */
                            } ${
                                (index + 1) % 7 === 0 ? "text-blue-500" : "" /* 토요일 색상 */
                            } hover:bg-blue-100`}
                            title={holidayName || ""}
                        >
                            {day}
                            {holidayName && <div className="text-xs mt-1">{holidayName}</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
