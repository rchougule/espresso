"use client";

import React, { useEffect } from 'react';
import { INTERVAL_TIME } from '../../../constants';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function PublishedTemplate() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [timer, setTimer] = React.useState(INTERVAL_TIME / 1000);

    const setIntervalTimer = () => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    clearInterval(interval);
                    // Move navigation to a separate effect
                    setTimeout(() => {
                        router.push('/template-list');
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return interval;
    };

    useEffect(() => {
        const interval = setIntervalTimer();
        return () => clearInterval(interval);
    }, []);

    // Check if searchParams has any entries
    const hasParams = searchParams ? Array.from(searchParams.entries()).length > 0 : false;

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="flex items-center">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full border border-solid border-green-500 bg-green-500 text-white">
                    {/* <ZIcon unicode="e80f" className="text-s" /> */}
                </span>
                {`Your template has been ${hasParams ? 'updated' : 'published'} successfully!`}
            </p>
            <p className="text-s mt-2 text-gray-500">{`Redirecting in ${timer}...`}</p>
        </div>
    );
}

export default PublishedTemplate;