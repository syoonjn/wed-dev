'use client';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MessageModalProps {
    visible: boolean;
    onConfirm: () => void;
    onClose: () => void;
    message: string;
}

const MessageModal = ({ visible, onConfirm, onClose, message }: MessageModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = modalRef.current;
        if (!target) return;

        if (visible) {
            disableBodyScroll(target);
        } else {
            enableBodyScroll(target);
        }

        return () => enableBodyScroll(target);
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
        >
            <div className="relative w-full max-w-xs rounded-xl bg-white p-6 pt-10 text-center shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    aria-label="닫기"
                >
                    <X className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-700 font-medium whitespace-pre-line">
                    {message || ''}
                </p>

                <button
                    onClick={onConfirm}
                    className="mt-4 w-full rounded-md bg-red-400 px-4 py-2 text-sm text-white hover:bg-slate-400"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
