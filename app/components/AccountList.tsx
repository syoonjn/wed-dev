"use client";

import { AccountItem, bride, groom } from "@/app/common/bank";
import { basePath } from "@/next.config";
import { Accordion } from "flowbite-react";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import MessageModal from "./MessageModal";


const accounts: { groom: AccountItem[]; bride: AccountItem[] } = {
    groom: [
        { bank: groom.bank, account: groom.account, name: groom.name, key: 'groom', kakaoLink: groom.qrLink },
        { bank: groom.father.bank, account: groom.father.account, name: groom.father.name, key: 'g_father' },
        { bank: groom.mother.bank, account: groom.mother.account, name: groom.mother.name, key: 'g_mather' },
    ],
    bride: [
        { bank: bride.bank, account: bride.account, name: bride.name, key: 'bride', kakaoLink: bride.qrLink },
        { bank: bride.father.bank, account: bride.father.account, name: bride.father.name, key: 'b_father' },
        { bank: bride.mother.bank, account: bride.mother.account, name: bride.mother.name, key: 'b_mather' },
    ],
};

export default function AccountList() {
    const [copied, setCopied] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const [pendingKakaoLink, setPendingKakaoLink] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const isIOS = () => {
        const isKakao = navigator.userAgent.match("KAKAOTALK")
        return /iP(hone|od|ad)/.test(navigator.userAgent) && isKakao;
    };

    const handleClick = (kakaoLink: string) => {
        const link = `https://qr.kakaopay.com/${kakaoLink}`;

        if (isIOS()) {
            window.location.href = link;
        } else {
            setMessage('송금이 완료되면 창을 닫고 \n이 화면으로 돌아와 주세요.');
            setPendingKakaoLink(link);
            setShowModal(true);
        }
    };



    const handleCopy = (accountInfo: string) => {
        navigator.clipboard.writeText(accountInfo);
        setCopied((prev) => ({ ...prev, [accountInfo]: true }));
        setTimeout(() => setCopied((prev) => ({ ...prev, [accountInfo]: false })), 2000);
    };

    const renderAccountItem = (acc: AccountItem, index: number) => (
        <div
            key={index}
            className="mb-2 flex flex-col rounded-lg border border-gray-200 p-4"
        >
            <div className="mb-2">
                <p className="font-semibold">{acc.bank} | {acc.account}</p>
                <p className="text-sm text-gray-500">{acc.name}</p>
            </div>

            <div className="flex gap-2 justify-end">
                {/* 카카오 송금 버튼 */}
                {
                    (acc.key === 'groom' || acc.key === 'bride') && <button onClick={() => handleClick(acc.kakaoLink ?? '')}>
                        <img
                            src={`${basePath}/images/btn_send_small.png`}
                            alt="카카오 송금"
                            className="h-8 w-auto"
                        />
                    </button>

                }
                {/* 복사 버튼 */}
                <button
                    className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm"
                    onClick={() => handleCopy(`${acc.bank} ${acc.account}`)}
                >
                    <Clipboard size={16} />
                    {copied[`${acc.bank} ${acc.account}`] ? "복사됨!" : "복사"}
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Accordion className="w-full" collapseAll>
                <Accordion.Panel>
                    <Accordion.Title className="py-3">신랑측 계좌번호</Accordion.Title>
                    <Accordion.Content>
                        {accounts.groom.map(renderAccountItem)}
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="py-3">신부측 계좌번호</Accordion.Title>
                    <Accordion.Content>
                        {accounts.bride.map(renderAccountItem)}
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <MessageModal
                visible={showModal}
                onClose={() => {
                    setShowModal(false);
                    setPendingKakaoLink(null);
                }}
                onConfirm={() => {
                    setShowModal(false);
                    if (pendingKakaoLink) {
                        const newWindow = window.open(pendingKakaoLink, "_blank");

                        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
                            setMessage('팝업 차단이 되어 있어 카카오 송금 창이 열리지 않았습니다.');
                            setShowModal(true);
                        }

                        setPendingKakaoLink(null);
                    }
                }}
                message={message}
            />

        </>

    );
}
