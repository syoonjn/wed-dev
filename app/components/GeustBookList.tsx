"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { checkGuestId, deleteGuestBookRow, fetchGuestBookEntries } from "../lib/api";
import { FaUserCircle } from "react-icons/fa";

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
        <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
            <ul className="w-full max-w-3xl space-y-4">
                {visibleEntries.map((entry) => (
                    <li key={entry.id} className="flex items-start justify-start space-x-3">
                        <FaUserCircle className="text-5xl text-gray-400" />
                        <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-gray-300 bg-white p-4 shadow-md">
                            <div className="mb-1 text-left text-base font-bold text-gray-700">{entry.name}</div>
                            <p className="max-h-[90px] min-h-[30px] w-full overflow-y-auto whitespace-pre-line rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-800">{entry.contents}</p>
                            <div className="mt-2 text-right text-xs text-gray-400">{formatDateTime(entry.created_at)}</div>
                            <button onClick={() => deleteMutation.mutate(entry.id)} className="absolute right-4 top-2 text-lg text-gray-400 hover:text-red-500">✖</button>
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
