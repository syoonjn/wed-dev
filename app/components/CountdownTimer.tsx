import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
    // 목표 날짜 설정 (예시로 2025년 1월 1일 설정)
    const targetDate = new Date('2026-04-04T00:00:00').getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="space-y-8">
            <div className="countdown-container">
                <div className="time-box">
                    <span>{timeLeft.days}</span>
                    <div>Days</div>
                </div>
                <div className="separator">:</div>
                <div className="time-box">
                    <span>{timeLeft.hours}</span>
                    <div>Hour</div>
                </div>
                <div className="separator">:</div>
                <div className="time-box">
                    <span>{timeLeft.minutes}</span>
                    <div>Min</div>
                </div>
                <div className="separator">:</div>
                <div className="time-box">
                    <span>{timeLeft.seconds}</span>
                    <div>Sec</div>
                </div>
            </div>
            <h1 className="text-xl font-bold">00 ♥ 00 의 결혼식이 {timeLeft.days}일 남았습니다</h1>
        </div>
    );
};

export default CountdownTimer;
