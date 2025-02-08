"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertGuestBookEntry } from "../lib/api";
import { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { Button, Label, Textarea, TextInput } from "flowbite-react";

interface GuestBookFormProps {
    closeModal: () => void;
}

export default function GuestBookForm({ closeModal }: GuestBookFormProps) {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");

    const mutation = useMutation({
        mutationFn: insertGuestBookEntry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
            showAlert("정상적으로 작성되었습니다.", "info");
            setName("");
            setPassword("");
            setContents("");
            closeModal(); // 메시지 작성 후 모달 닫기
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg bg-white p-6">
            <div>
                <Label htmlFor="name" value="성함 *" className="block text-gray-700" />
                <TextInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full"
                    autoFocus={false}
                />
            </div>
            <div>
                <Label htmlFor="password" value="비밀번호 *" className="block text-gray-700" />
                <TextInput
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full"
                    autoFocus={false}
                />
            </div>
            <div>
                <Label htmlFor="contents" value="내용" className="block text-gray-700" />
                <Textarea
                    id="contents"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    placeholder="내용을 입력하세요"
                    required
                    rows={3}
                    className="mt-1 w-full"
                    autoFocus={false}
                />
            </div>
            <Button type="submit" className="w-full bg-[#42382F] text-white">
                축하 메시지 보내기
            </Button>
        </form>
    );
}
