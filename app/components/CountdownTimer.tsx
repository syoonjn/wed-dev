import React, { useEffect, useState } from 'react';
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
            <h1 className="text-center text-sm font-medium leading-relaxed text-gray-600">
                {`${groomFirstName} ❤ ${brideFirstName}의 결혼식이`} {`${timeLeft.days}일 남았습니다`}
            </h1>
        </div>
    );
};

export default CountdownTimer;
