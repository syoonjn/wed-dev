export {}; // 모듈로 인식하게 하기 위해 필요

declare global {
    interface Window {
        Kakao: any;
    }
}