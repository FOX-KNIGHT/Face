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
            {/* Timer */}
            <div className="flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-mono text-sm text-cyan-50 tracking-[0.1em] font-bold">{elapsed}</span>
            </div>

            {/* Alerts Counter */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 shadow-lg ${alertCount > 0
                ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse'
                : 'bg-black/80 border-white/10 text-gray-500'
                }`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="font-mono text-xs font-bold tracking-widest">ALERTS: {alertCount}</span>
            </div>
        </div>
    );
};
