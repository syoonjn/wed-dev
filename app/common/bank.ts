export type AccountItem = {
    bank: string;
    account: string;
    name: string;
    key: string;
    kakaoLink?: string;
};


export const BANK_NAMES = {
    SHINHAN: '신한',
    KOOKMIN: '국민',
    WOORI: '우리',
    NONGHYUP: '농협',
} as const;

export const groom = {
    name: process.env.NEXT_PUBLIC_GROOM_NAME || '',
    bank: BANK_NAMES.KOOKMIN,
    account: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER || '',
    qrLink: process.env.NEXT_PUBLIC_GROOM_KAKAO_QR_LINK || '',
    father: {
        name: process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '',
        bank: BANK_NAMES.WOORI,
        account: process.env.NEXT_PUBLIC_GROOM_FATHER_ACCOUNT_NUMBER || '',
    },
    mother: {
        name: process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '',
        bank: BANK_NAMES.NONGHYUP,
        account: process.env.NEXT_PUBLIC_GROOM_MOTHER_ACCOUNT_NUMBER || '',
    },
};

export const bride = {
    name: process.env.NEXT_PUBLIC_BRIDE_NAME || '',
    bank: BANK_NAMES.WOORI,
    account: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER || '',
    qrLink: process.env.NEXT_PUBLIC_BRIDE_KAKAO_QR_LINK || '',
    father: {
        name: process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '',
        bank: BANK_NAMES.NONGHYUP,
        account: process.env.NEXT_PUBLIC_BRIDE_FATHER_ACCOUNT_NUMBER || '',
    },
    mother: {
        name: process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '',
        bank: BANK_NAMES.NONGHYUP,
        account: process.env.NEXT_PUBLIC_BRIDE_MOTHER_ACCOUNT_NUMBER || '',
    },
};
