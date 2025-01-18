"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertGuestBookEntry } from "../lib/api";
import { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
export default function GuestBookForm() {

    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");

    const mutation = useMutation({ mutationFn: insertGuestBookEntry,
        onSuccess: () => {
            // 데이터 삽입 후 기존 데이터를 갱신
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
            showAlert("정상적으로 작성되었습니다.", "info");
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label htmlFor="name" className="block text-gray-700">이름</label>
                    <TextInput
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">비밀번호</label>
                    <TextInput
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-gray-700">내용</label>
                    <Textarea
                        id="content"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        placeholder="내용을 입력하세요"
                        required
                        rows={4}
                        className="mt-1 w-full"
                    />
                </div>
                <Button type="submit">
                    축하 글 전달하기
                </Button>
            </form>
    );
}
