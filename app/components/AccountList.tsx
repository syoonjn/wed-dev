"use client";

import { basePath } from "@/next.config";
import { Accordion } from "flowbite-react";
import { Clipboard } from "lucide-react";
import { useState } from "react";

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

    const handleClick = (kakaoLink: string) => {
        const link = `https://qr.kakaopay.com/${kakaoLink}`;
        window.location.href = link;
    };

    const handleCopy = (account: string) => {
        navigator.clipboard.writeText(account);
        setCopied((prev) => ({ ...prev, [account]: true }));
        setTimeout(() => setCopied((prev) => ({ ...prev, [account]: false })), 2000);
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
                    onClick={() => handleCopy(acc.account)}
                >
                    <Clipboard size={16} />
                    {copied[acc.account] ? "복사됨!" : "복사"}
                </button>
            </div>
        </div>
    );

    return (
        <Accordion className="w-full">
            <Accordion.Panel>
                <Accordion.Title>신랑측 계좌번호</Accordion.Title>
                <Accordion.Content>
                    {accounts.groom.map(renderAccountItem)}
                </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
                <Accordion.Title>신부측 계좌번호</Accordion.Title>
                <Accordion.Content>
                    {accounts.bride.map(renderAccountItem)}
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
