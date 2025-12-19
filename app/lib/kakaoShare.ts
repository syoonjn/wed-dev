export const initKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY);
    }
};

export const shareKakao = () => {
    if (typeof window === 'undefined' || !window.Kakao) {
        return false;
    }

    initKakao();

    window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '철호 ♥ 윤정 결혼합니다',
            description: '2026년 3월 28일 토요일 오후 1시\nCA웨딩컨벤션 루체홀',
            imageUrl: 'https://cheolho-so.com/images/wedding-main.jpg',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        ],
    });

    return true;
};
