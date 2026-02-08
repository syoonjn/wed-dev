"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { checkGuestId, deleteGuestBookRow, fetchGuestBookEntries } from "../lib/api";
import PasswordValidationModal from "./PasswordValidationModal";

export default function GuestBookList({ showAll }: { showAll: boolean }) {
    const queryClient = useQueryClient();

    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);

    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['guestbookEntries'],
            queryFn: () => fetchGuestBookEntries(),
            retry: 1, // ✅ 재시도 1번으로 제한
            gcTime: 5 * 60 * 1000, // ✅ 5분간 캐시 유지
        }
    );

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await deleteGuestBookRow(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
        },
    });

    const formatDateTime = useCallback((dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }, []);

    if (isLoading) return (
        <div className="relative flex items-center justify-center min-h-[200px] w-full">
            <Loader className="w-8 h-8 animate-spin text-red-400" />
        </div>
    );
    if (error) return <p>에러가 발생했습니다: {(error as Error).message}</p>;
    if (!data || !Array.isArray(data) || data.length === 0) return <p>방명록이 없습니다. 첫 번째로 작성해보세요!</p>;

    const visibleEntries = showAll ? data : data.slice(0, 3);

    return (
        <div>
            <div className="flex flex-col items-center">
                <ul className="w-full max-w-3xl space-y-4">
                    {visibleEntries.map((entry) => (
                        <li key={entry.id} className="w-full mb-4">
                            {/* From. + 삭제버튼 줄 */}
                            <div className="flex justify-between items-center px-1 mb-1">
                                <span className="text-sm text-gray-600 text-abs-14">{`From. ${entry.name}`}</span>
                                <button
                                    onClick={() => {
                                        setSelectedEntryId(entry.id);
                                        setPasswordModalOpen(true);
                                    }}
                                    className="text-sm text-gray-400 hover:text-red-500"
                                >
                                    ✖
                                </button>


                            </div>
                            <div className="relative flex w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto pb-[12px]">
                                <div className="absolute top-3 left-0 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#3f3f3f] z-10" />
                                <div className="ml-3 w-full bg-[#3f3f3f] text-white px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-line break-words text-left text-abs-14">
                                    <span>{entry.contents}</span>
                                    <span className="block mt-2 text-xs text-right text-gray-300 text-abs-12">
                                        {formatDateTime(entry.created_at)}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <PasswordValidationModal
                passwordModalOpen={passwordModalOpen}
                setPasswordModalOpen={setPasswordModalOpen}
                selectedEntryId={selectedEntryId}
                onConfirm={async (id, password) => {

                    if (password === 'admin1006') {
                        deleteMutation.mutate(id);
                        return true;
                    }

                    const isValid = await checkGuestId(id, password);
                    if (!isValid) return false;

                    deleteMutation.mutate(id);
                    return true;
                }}
            />
        </div>


    );
}
