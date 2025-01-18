"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGuestBookEntries } from "../lib/api";

export default function GuestBookList() {
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

    return (
        <ul>
            {data?.map((entry: any) => (
                <li key={entry.id} className="border-b py-2">
                    <p className="font-medium">{entry.name}</p>
                    <p>{entry.contents}</p> {/* contents로 출력 */}
                </li>
            ))}
        </ul>
    );
}
