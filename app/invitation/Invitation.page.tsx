import React from "react";

// Next.js PageProps 확장 가능하도록 설정
type PageProps = {
    [key: string]: unknown; // 확장 가능하도록 제한 완화
};

// InvitationProps 정의
type InvitationProps = {
    name?: string;
    date?: string;
    location?: string;
} & PageProps; // PageProps와 병합

// InvitationPage 컴포넌트
const InvitationPage: React.FC<InvitationProps> = ({
                                                       name = "Guest",
                                                       date = "January 17, 2025",
                                                       location = "Seoul, Korea",
                                                   }) => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                <h1 className="text-4xl font-bold text-pink-600">
                    You're Invited, {name}!
                </h1>
                <p className="mt-4 text-gray-700">
                    We are thrilled to invite you to our special day.
                </p>
                <div className="mt-6">
                    <p className="text-lg text-gray-500">Date: {date}</p>
                    <p className="text-lg text-gray-500">Location: {location}</p>
                </div>
            </div>
        </main>
    );
};

export default InvitationPage;