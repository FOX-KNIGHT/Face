import React from 'react';
import { CheckCircle, EyeOff, Zap } from 'lucide-react';

interface StatusPanelProps {
    status: 'NORMAL' | 'DROWSY' | 'RAGE';
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
    const getStatusConfig = () => {
        switch (status) {
            case 'DROWSY':
                return {
                    color: 'text-red-500',
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/20',
                    icon: EyeOff,
                    text: 'DROWSINESS DETECTED',
                    subtext: 'Please pull over immediately'
                };
            case 'RAGE':
                return {
                    color: 'text-yellow-500',
                    bg: 'bg-yellow-500/10',
                    border: 'border-yellow-500/20',
                    icon: Zap,
                    text: 'DISTRACTION / RAGE',
                    subtext: 'Calm down and focus on road'
                };
            default:
                return {
                    color: 'text-green-500',
                    bg: 'bg-green-500/10',
                    border: 'border-green-500/20',
                    icon: CheckCircle,
                    text: 'SYSTEM NORMAL',
                    subtext: 'Driver attentive'
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div className={`glass-panel p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${config.bg} ${config.border} border`}>
            <div className={`p-4 rounded-full ${config.bg} mb-4 animate-bounce-slow`}>
                <Icon className={`w-12 h-12 ${config.color}`} />
            </div>

            <h2 className={`text-3xl font-bold mb-2 ${config.color} tracking-tight`}>
                {config.text}
            </h2>

            <p className="text-gray-400 font-medium">
                {config.subtext}
            </p>
        </div>
    );
};
