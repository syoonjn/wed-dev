import { NextResponse } from 'next/server';

export async function GET() {
    const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || '';
    const groomFatherName = process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '';
    const groomMotherName = process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '';
    const groomPhone = process.env.NEXT_PUBLIC_GROOM_PHONE || '';
    const groomFatherPhone = process.env.NEXT_PUBLIC_GROOM_FATHER_PHONE || '';
    const groomMotherPhone = process.env.NEXT_PUBLIC_GROOM_MOTHER_PHONE || '';

    const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';
    const brideFatherName = process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '';
    const brideMotherName = process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '';
    const bridePhone = process.env.NEXT_PUBLIC_BRIDE_PHONE || '';
    const brideFatherPhone = process.env.NEXT_PUBLIC_BRIDE_FATHER_PHONE || '';
    const brideMotherPhone = process.env.NEXT_PUBLIC_BRIDE_MOTHER_PHONE || '';

    const weddingData = {
        address_detail: "CA웨딩컨벤션 루체홀",
        address: "서울특별시 강남구 테헤란로 508",
        receiver: [
            {
                name: groomName,
                tel: groomPhone,
                relationship: "신랑"
            },
            {
                name: groomFatherName,
                tel: groomFatherPhone,
                relationship: "신랑 아버지"
            },
            {
                name: groomMotherName,
                tel: groomMotherPhone,
                relationship: "신랑 어머니"
            },
            {
                name: brideName,
                tel: bridePhone,
                relationship: "신부"
            },
            {
                name: brideFatherName,
                tel: brideFatherPhone,
                relationship: "신부 아버지"
            },
            {
                name: brideMotherName,
                tel: brideMotherPhone,
                relationship: "신부 어머니"
            }
        ],
        idx: 1,
        delivery_datetime: "2026-03-28 13:00",
        url: "https://cheolho-so.com"
    };

    return NextResponse.json(weddingData);
}
