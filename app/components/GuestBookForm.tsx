"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { insertGuestBookEntry } from "../lib/api";
import MessageModal from "./MessageModal";

interface GuestBookFormProps {
    closeModal: () => void;
}

export default function GuestBookForm({ closeModal }: GuestBookFormProps) {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    // 모바일 줄인 방지를 위한 viewport 복원
    useEffect(() => {
        const resetZoom = () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no');
            }
        };

        return () => resetZoom();
    }, []);

    const mutation = useMutation({
        mutationFn: insertGuestBookEntry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
            setName("");
            setPassword("");
            setContents("");
            setMessage('소중한 방명록 남겨주셔서 감사합니다.');
            setShowModal(true);
        },
        onError: (error: any) => {
            alert(`에러가 발생했습니다: ${error.message}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 포커스 해제
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        
        // viewport 복원
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no');
        }
        
        mutation.mutate({ name, password, contents });
    };

    return (
        <>
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
                        style={{ fontSize: '16px' }}
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
                        style={{ fontSize: '16px' }}
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
                        style={{ fontSize: '16px' }}
                        autoFocus={false}
                    />
                </div>
                <Button type="submit" className="w-full bg-[#42382F] text-white">
                    축하 메시지 보내기
                </Button>
            </form>
            <MessageModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    // 1. 입력 포커스 강제 해제
                    if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                    }

                    // 2. 현재 스크롤 위치 저장
                    const scrollY = window.scrollY;

                    // 3. 모달 닫기
                    setShowModal(false);

                    // 4. 약간의 지연 후 모달 완전히 닫히면 스크롤 복원
                    setTimeout(() => {
                        closeModal();
                        requestAnimationFrame(() => {
                            window.scrollTo({ top: scrollY });
                        });
                    }, 100);
                }}


                message={message}
            />
        </>
    );
}
