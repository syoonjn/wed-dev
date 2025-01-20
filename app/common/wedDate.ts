
const weddingDate = new Date('2026-03-28 13:00:00');

const targetTime = new Date(weddingDate).getTime();

const formatKoreanDate = () => {
    const date = new Date(weddingDate);
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based index
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek} ${period} ${formattedHour}시`;
}

// 사용 예시
const target = new Date(weddingDate);

export default { weddingDate, targetTime, formatKoreanDate  };
export { weddingDate, targetTime, formatKoreanDate };