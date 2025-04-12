import { useState } from "react";
import holidays from "../common/holiday";
import { weddingDate } from "../common/wedDate";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(weddingDate));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    const weddingDay = new Date(weddingDate);

    const handleMonthChange = (offset: number) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    const formatDate = (day: string) =>
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const days: string[] = [
        ...Array(startDay).fill(""),
        ...Array.from({ length: totalDays }, (_, i) => (i + 1).toString()),
    ];

    const getDayClass = (day: string, index: number) => {
        const isWeddingDay =
            day === weddingDay.getDate().toString() &&
            month === weddingDay.getMonth() &&
            year === weddingDay.getFullYear();

        const holidayName = holidays[formatDate(day)];
        const isSunday = index % 7 === 0;
        const isSaturday = (index + 1) % 7 === 0;

        return `
      cursor-pointer rounded p-2
      ${isWeddingDay ? "bg-red-500 font-bold text-white" : ""}
      ${!isWeddingDay && holidayName ? "bg-red-100 font-semibold text-red-500" : ""}
      ${!isWeddingDay && !holidayName ? "text-gray-800" : ""}
      ${isSunday ? "text-red-500" : ""}
      ${isSaturday ? "text-blue-500" : ""}
      hover:bg-blue-100
    `;
    };

    return (
        <div className="mx-auto max-w-lg bg-white p-6">
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={() => handleMonthChange(-1)}
                    className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
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
                    onClick={() => handleMonthChange(1)}
                    className="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                >
                    &gt;
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="mb-2 grid grid-cols-7 text-center text-sm font-semibold text-gray-500">
                <div className="text-red-500">일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div className="text-blue-500">토</div>
            </div>

            {/* 날짜 렌더링 */}
            <div className="grid grid-cols-7 text-center text-sm">
                {days.map((day, index) => {
                    const holidayName = holidays[formatDate(day)];
                    return (
                        <div key={index} className={getDayClass(day, index)} title={holidayName || ""}>
                            {day}
                            {holidayName && (
                                <div className="mt-1 text-[10px]">{holidayName}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
