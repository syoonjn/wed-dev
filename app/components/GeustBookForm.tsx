"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertGuestBookEntry } from "../lib/api";
import { useState } from "react";

export default function GuestBookForm() {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");

    const mutation = useMutation({ mutationFn: insertGuestBookEntry,
        onSuccess: () => {
            // 데이터 삽입 후 기존 데이터를 갱신
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
            alert("방명록이 성공적으로 등록되었습니다!");
            setName("");
            setPassword("");
            setContents("");
        },
            onError: (error: any) => {
            alert(`에러가 발생했습니다: ${error.message}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ name, password, contents });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name">이름</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    required
                />
            </div>
            <button type="submit">방명록 작성</button>
        </form>
    );
}
