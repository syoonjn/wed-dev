import React, { useState } from "react";
import {weddingDate} from "../common/wedDate";
import holidays from '../common/holiday';


const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date(weddingDate));

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

    // 웨딩 날짜 정보
    const today = new Date(weddingDate);

    // 날짜 포맷팅 함수 (공휴일 체크용)
    const formatDate = (day: string) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
                <button
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    {currentDate.toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                    })}
                </h2>
                <button
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 font-semibold mb-2">
                <div className="text-red-500">일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div className="text-blue-500">토</div>
            </div>

            {/* 날짜 */}
            <div className="grid grid-cols-7 text-center text-sm">
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
                            className={`p-2 rounded cursor-pointer ${
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
                            {holidayName && (
                                <div className="text-[10px] mt-1">{holidayName}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default Calendar;
