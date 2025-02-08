"use client";

import { Accordion } from "flowbite-react";
import { Clipboard } from "lucide-react";
import { useState } from "react";

const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';
const brideMomName = process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '';
const brideFatherName = process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '';
const groomMomName = process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '';
const groomFatherName = process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '';
const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '';

const accounts = {
    groom: [
        { bank: "신한", account: "111-235-567890", name: groomName },
        { bank: "신한", account: "111-236-567890", name: groomFatherName },
        { bank: "신한", account: "111-237-567890", name: groomMomName },
    ],
    bride: [
        { bank: "국민", account: "222-341-678901", name: brideName },
        { bank: "국민", account: "222-342-678901", name: brideFatherName },
        { bank: "국민", account: "222-343-678901", name: brideMomName },
    ],
};

export default function AccountList() {
    const [copied, setCopied] = useState<Record<string, boolean>>({});

    const handleCopy = (account: string) => {
        navigator.clipboard.writeText(account);
        setCopied((prev) => ({ ...prev, [account]: true }));
        setTimeout(() => setCopied((prev) => ({ ...prev, [account]: false })), 2000);
    };

    return (
        <Accordion className="mx-auto w-full max-w-[400px]">
            <Accordion.Panel>
                <Accordion.Title>신랑측 계좌번호</Accordion.Title>
                <Accordion.Content>
                    {accounts.groom.map((acc, index) => (
                        <div
                            key={index}
                            className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 p-4"
                        >
                            <div>
                                <p className="font-semibold">
                                    {acc.bank} | {acc.account}
                                </p>
                                <p className="text-sm text-gray-500">{acc.name}</p>
                            </div>
                            <button
                                className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm"
                                onClick={() => handleCopy(acc.account)}
                            >
                                <Clipboard size={16} />
                                {copied[acc.account] ? "복사됨!" : "복사"}
                            </button>
                        </div>
                    ))}
                </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
                <Accordion.Title>신부측 계좌번호</Accordion.Title>
                <Accordion.Content>
                    {accounts.bride.map((acc, index) => (
                        <div
                            key={index}
                            className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 p-4"
                        >
                            <div>
                                <p className="font-semibold">
                                    {acc.bank} | {acc.account}
                                </p>
                                <p className="text-sm text-gray-500">{acc.name}</p>
                            </div>
                            <button
                                className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm"
                                onClick={() => handleCopy(acc.account)}
                            >
                                <Clipboard size={16} />
                                {copied[acc.account] ? "복사됨!" : "복사"}
                            </button>
                        </div>
                    ))}
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}