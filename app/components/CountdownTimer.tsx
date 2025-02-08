import React, { useEffect, useState } from 'react';
import getCouple from '../common/name';
import { targetTime } from '../common/wedDate';

const CountdownTimer: React.FC = () => {
    const { brideFirstName, groomFirstName } = getCouple();


    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

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
    }, [targetTime]);

    return (
        <div className="space-y-6"> {/* 전체 간격 약간 줄임 */}
            <div className="countdown-container">
                <div className="time-box">
                    <span>{timeLeft.days}</span>
                    <div>Days</div> {/* 색상 및 폰트 수정 */}
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
            <h1 className="text-center text-lg font-bold">
                {`${groomFirstName} ❤ ${brideFirstName}의 결혼식이 ${timeLeft.days}일 남았습니다`}
            </h1>
        </div>
    );
};

export default CountdownTimer;
