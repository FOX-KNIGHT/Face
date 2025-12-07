import React from 'react';
import { CheckCircle, EyeOff, Zap, AlertTriangle } from 'lucide-react';

interface StatusPanelProps {
    status: 'NORMAL' | 'DROWSY' | 'RAGE' | 'DISTRACTED';
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
    const getStatusConfig = () => {
        switch (status) {
            case 'DROWSY':
                return {
                    color: 'text-[var(--red)]',
                    borderColor: 'border-[var(--red)]',
                    shadow: 'shadow-[0_0_30px_var(--red-dim)]',
                    icon: EyeOff,
                    text: 'CRITICAL ALERT',
                    subtext: 'DROWSINESS DETECTED',
                    pulse: 'animate-pulse'
                };
            case 'RAGE':
                return {
                    color: 'text-[var(--yellow)]',
                    borderColor: 'border-[var(--yellow)]',
                    shadow: 'shadow-[0_0_30px_var(--yellow-dim)]',
                    icon: Zap,
                    text: 'BEHAVIOR WARNING',
                    subtext: 'AGGRESSIVE MANEUVERS',
                    pulse: 'animate-pulse'
                };
            case 'DISTRACTED':
                return {
                    color: 'text-[var(--yellow)]',
                    borderColor: 'border-[var(--yellow)]',
                    shadow: 'shadow-[0_0_30px_var(--yellow-dim)]',
                    icon: AlertTriangle,
                    text: 'ATTENTION ALERT',
                    subtext: 'EYES OFF ROAD',
                    pulse: 'animate-pulse'
                };
            default:
                return {
                    color: 'text-[var(--cyan)]',
                    borderColor: 'border-[var(--cyan)]',
                    shadow: 'shadow-[0_0_30px_var(--cyan-dim)]',
                    icon: CheckCircle,
                    text: 'SYSTEM NOMINAL',
                    subtext: 'DRIVER ATTENTIVE',
                    pulse: ''
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div className="glass-panel p-6 relative overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full border-2 ${config.borderColor} flex items-center justify-center ${config.shadow} ${config.pulse} bg-black/50`}>
                        <Icon className={`w-8 h-8 ${config.color}`} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-bold tracking-widest ${config.color} font-display`}>
                            {config.text}
                        </h2>
                        <p className="text-gray-400 font-mono text-xs tracking-wider uppercase">
                            {config.subtext}
                        </p>
                    </div>
                </div>

                {/* Decorative Tech Elements */}
                <div className="flex flex-col gap-1 items-end opacity-50">
                    <div className="w-24 h-1 bg-[var(--glass-border)] rounded-full overflow-hidden">
                        <div className={`h-full ${status === 'NORMAL' ? 'bg-[var(--cyan)]' : 'bg-[var(--red)]'} w-2/3 animate-pulse`}></div>
                    </div>
                    <div className="w-16 h-1 bg-[var(--glass-border)] rounded-full overflow-hidden">
                        <div className={`h-full ${status === 'NORMAL' ? 'bg-[var(--cyan)]' : 'bg-[var(--red)]'} w-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
