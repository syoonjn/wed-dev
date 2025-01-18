"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchGuestBookEntries } from "../lib/api";

export default function GuestBookList() {
    const [showAll, setShowAll] = useState(false);
    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['guestbookEntries'],
            queryFn: () => fetchGuestBookEntries() // Fetch Function
        }
    );

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>에러가 발생했습니다: {(error as Error).message}</p>;
    }

    if (!data || data.length === 0) {
        return <p>방명록이 없습니다. 첫 번째로 작성해보세요!</p>;
    }


    // 최대 5개의 항목만 표시
    const visibleEntries = showAll ? data : data.slice(0, 5);

    function formatDateTime(dateString: string): string {
        const date = new Date(dateString);

        const year = date.getFullYear(); // 년도
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 +1)
        const day = date.getDate().toString().padStart(2, "0"); // 일
        const hours = date.getHours().toString().padStart(2, "0"); // 시간
        const minutes = date.getMinutes().toString().padStart(2, "0"); // 분

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return (
        <div>
            <ul className="space-y-6">
                {visibleEntries.map((entry) => (
                    <li
                        key={entry.id}
                        className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
                    >
                        {/* 상단: 이름과 날짜 */}
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-800">{`From. ${entry.name}`}</span>
                            <span className="text-sm text-gray-500">{formatDateTime(entry.created_at)}</span>
                        </div>

                        {/* 중간: 내용 */}
                        <p className="text-gray-700 mt-2 text-left">{entry.contents}</p>

                        {/* 하단: 삭제 버튼 */}
                        <div className="flex justify-end mt-4">
                            <button
                                // onClick={() => handleDelete(entry.id)} // 삭제 이벤트 연결
                                className="text-sm text-red-500 hover:underline"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 전체보기 버튼 */}
            {data.length > 5 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="text-blue-500 hover:underline"
                    >
                        {showAll ? "간략히 보기" : "전체보기"}
                    </button>
                </div>
            )}
        </div>
    );
}
