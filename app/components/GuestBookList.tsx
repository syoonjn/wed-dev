"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteGuestBookRow, fetchGuestBookEntries } from "../lib/api";

export default function GuestBookList() {
    const queryClient = useQueryClient();
    const [showAll, setShowAll] = useState(false);

    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['guestbookEntries'],
            queryFn: () => fetchGuestBookEntries()
        }
    );

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await deleteGuestBookRow(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
            console.log("삭제 성공!");
        },
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다: {(error as Error).message}</p>;
    if (!data || data.length === 0) return <p>방명록이 없습니다. 첫 번째로 작성해보세요!</p>;

    const visibleEntries = showAll ? data : data.slice(0, 5);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center">
            <ul className="w-full max-w-3xl space-y-4">
                {visibleEntries.map((entry) => (
                    <li key={entry.id} className="w-full mb-4">
                        {/* From. + 삭제버튼 줄 */}
                        <div className="flex justify-between items-center px-1 mb-1">
                            <span className="text-sm text-gray-600">{`From. ${entry.name}`}</span>
                            <button
                                onClick={() => deleteMutation.mutate(entry.id)}
                                className="text-sm text-gray-400 hover:text-red-500"
                            >
                                ✖
                            </button>
                        </div>
                        <div className="relative flex w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto pb-[12px]">
                            <div className="absolute top-3 left-0 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#3f3f3f] z-10" />
                            <div className="ml-3 w-full bg-[#3f3f3f] text-white px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-line break-words text-left">
                                <span>{entry.contents}</span>
                                <span className="block mt-2 text-xs text-right text-gray-300">
                                    {formatDateTime(entry.created_at)}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {data.length > 5 && (
                <div className="mt-4">
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
