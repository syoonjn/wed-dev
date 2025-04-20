"use client";

import { basePath } from "@/next.config";
import { Accordion } from "flowbite-react";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import MessageModal from "./MessageModal";

const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';
const brideMomName = process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '';
const brideFatherName = process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '';
const groomMomName = process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '';
const groomFatherName = process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '';
const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '';
const brideQrLink = process.env.NEXT_PUBLIC_BRIDE_KAKAO_QR_LINK || '';
const groomQrLink = process.env.NEXT_PUBLIC_GROOM_KAKAO_QR_LINK || '';

const accounts: { groom: AccountItem[]; bride: AccountItem[] } = {
    groom: [
        { bank: "신한", account: "111-235-567890", name: groomName, key: 'groom', kakaoLink: groomQrLink },
        { bank: "신한", account: "111-236-567890", name: groomFatherName, key: 'g_father' },
        { bank: "신한", account: "111-237-567890", name: groomMomName, key: 'g_mather' },
    ],
    bride: [
        { bank: "국민", account: "222-341-678901", name: brideName, key: 'bride', kakaoLink: brideQrLink },
        { bank: "국민", account: "222-342-678901", name: brideFatherName, key: 'b_father' },
        { bank: "국민", account: "222-343-678901", name: brideMomName, key: 'b_mather' },
    ],
};

type AccountItem = {
    bank: string;
    account: string;
    name: string;
    key: string;
    kakaoLink?: string;
};

export default function AccountList() {
    const [copied, setCopied] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const isIOS = () => {
        const isKakao = navigator.userAgent.match("KAKAOTALK")
        return /iP(hone|od|ad)/.test(navigator.userAgent) && isKakao;
    };

    // const handleClick = (kakaoLink: string) => {
    //     const link = `https://qr.kakaopay.com/${kakaoLink}`;

    //     if (isIOS()) {
    //         window.location.href = link;
    //     } else {
    //         const newWindow = window.open(link, "_blank");

    //         if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
    //             setMessage('팝업 차단이 되어 있어 카카오 송금 창이 열리지 않았습니다');
    //             setShowModal(true);
    //         }
    //         //  else {
    //         //     setMessage('송금 완료 후 이 창은 닫지 마시고 다시 돌아오세요.');
    //         //     setShowModal(true);
    //         // }
    //     }
    // };

    const handleClick = (kakaoLink: string) => {
        const kakaoPayLink = `https://qr.kakaopay.com/${kakaoLink}`;
        // const returnPage = `${window.location.origin}/kakao-return`;

        // 새 창에 중간 페이지를 먼저 열고 → 카카오페이로 리다이렉트
        const popup = window.open('', '_blank');

        if (!popup || popup.closed || typeof popup.closed === "undefined") {
            setMessage('팝업 차단이 되어 있어 카카오 송금 창이 열리지 않았습니다.');
            setShowModal(true);
            return;
        }

        // 중간 페이지에서 카카오페이 링크로 이동 후, 다시 돌아와 닫기 유도
        popup.document.write(`
            <html>
            <head><title>카카오페이 송금 중...</title></head>
            <body style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;">
                <div>
                    <p>카카오페이 송금 페이지로 이동 중입니다...</p>
                    <script>
                        setTimeout(() => {
                            window.location.href = '${kakaoPayLink}';
                        }, 1000);
                    </script>
                </div>
            </body>
            </html>
        `);

        // 모달로도 안내
        setMessage('송금이 완료되면 새 창이 자동으로 닫힙니다.\n닫히지 않으면 직접 닫아주세요.');
        setShowModal(true);
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
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setShowModal(false);
                }}
                message={message}
            />
        </>

    );
}
