import React from 'react';
import { Car, ShieldAlert, User } from 'lucide-react';

interface ModeSelectorProps {
    currentMode: 'RIDESHARE' | 'EMERGENCY' | 'PRIVATE';
    onModeChange: (mode: 'RIDESHARE' | 'EMERGENCY' | 'PRIVATE') => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    const modes = [
        { id: 'PRIVATE', label: 'PRIVATE', icon: User, colorClass: 'cyan' },
        { id: 'RIDESHARE', label: 'RIDESHARE', icon: Car, colorClass: 'yellow' },
        { id: 'EMERGENCY', label: 'EMERGENCY', icon: ShieldAlert, colorClass: 'red' },
    ] as const;

    return (
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl">
            {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;

                let activeClasses = '';
                let iconColor = '';

                if (isActive) {
                    if (mode.id === 'PRIVATE') {
                        activeClasses = 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]';
                        iconColor = 'text-cyan-400';
                    } else if (mode.id === 'RIDESHARE') {
                        activeClasses = 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]';
                        iconColor = 'text-yellow-400';
                    } else {
                        activeClasses = 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
                        iconColor = 'text-red-400';
                    }
                } else {
                    activeClasses = 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5';
                    iconColor = 'text-gray-500 group-hover:text-gray-300';
                }

                return (
                    <button
                        key={mode.id}
                        onClick={() => onModeChange(mode.id)}
                        className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${activeClasses}`}
                    >
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${iconColor} ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-bold tracking-[0.2em]">{mode.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
