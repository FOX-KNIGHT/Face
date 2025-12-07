import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SessionInfoProps {
    startTime: number | null;
    alertCount: number;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ startTime, alertCount }) => {
    const [elapsed, setElapsed] = useState('00:00:00');

    useEffect(() => {
        if (!startTime) {
            setElapsed('00:00:00');
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - startTime;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setElapsed(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-sm border border-[var(--glass-border)]">
                <Clock className="w-3 h-3 text-[var(--cyan)]" />
                <span className="font-mono text-xs text-[var(--cyan)] tracking-widest">{elapsed}</span>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 ${alertCount > 0
                    ? 'bg-[var(--red)]/10 border-[var(--red)] text-[var(--red)] animate-pulse'
                    : 'bg-black/40 border-[var(--glass-border)] text-gray-500'
                }`}>
                <AlertTriangle className="w-3 h-3" />
                <span className="font-mono text-xs tracking-widest">ALERTS: {alertCount}</span>
            </div>
        </div>
    );
};
