import React, { memo, useEffect, useState } from 'react';
import { getCouple } from '../common/name';
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
        // 초기 계산
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            };
        };

        // 즉시 초기값 설정
        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();

            // 값이 변경되었을 때만 상태 업데이트 (불필요한 리렌더 방지)
            setTimeLeft(prev => {
                if (
                    prev.days === newTimeLeft.days &&
                    prev.hours === newTimeLeft.hours &&
                    prev.minutes === newTimeLeft.minutes &&
                    prev.seconds === newTimeLeft.seconds
                ) {
                    return prev;
                }
                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []); // 빈 배열로 한 번만 실행

    return (
        <div className="space-y-6">
            <div className="flex justify-center gap-x-4 text-center">
                {[
                    { value: timeLeft.days, label: 'DAYS' },
                    { value: timeLeft.hours, label: 'HOUR' },
                    { value: timeLeft.minutes, label: 'MIN' },
                    { value: timeLeft.seconds, label: 'SEC' },
                ].map((item, idx, arr) => {
                    const isLast = idx === arr.length - 1;
                    const text = item.value.toString().padStart(2, '0') + (isLast ? '' : ' :');
                    return (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                {item.label}
                            </div>
                            <span className="text-3xl font-semibold tabular-nums">
                                {text}
                            </span>
                        </div>
                    );
                })}
            </div>
            <h1 className="text-center text-sm font-medium leading-relaxed text-gray-600 text-abs-14">
                {`${groomFirstName} ❤ ${brideFirstName}의 결혼식이`} {`${timeLeft.days}일 남았습니다`}
            </h1>
        </div>
    );
};

export default memo(CountdownTimer);
