import React from 'react';
import { Car, ShieldAlert, User } from 'lucide-react';

interface ModeSelectorProps {
    currentMode: 'RIDESHARE' | 'EMERGENCY' | 'PRIVATE';
    onModeChange: (mode: 'RIDESHARE' | 'EMERGENCY' | 'PRIVATE') => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    const modes = [
        { id: 'PRIVATE', label: 'PRIVATE', icon: User, color: 'var(--cyan)' },
        { id: 'RIDESHARE', label: 'RIDESHARE', icon: Car, color: 'var(--yellow)' },
        { id: 'EMERGENCY', label: 'EMERGENCY', icon: ShieldAlert, color: 'var(--red)' },
    ] as const;

    return (
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-[var(--glass-border)] shadow-lg">
            {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;

                return (
                    <button
                        key={mode.id}
                        onClick={() => onModeChange(mode.id)}
                        className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${isActive
                            ? `bg-[${mode.color}]/10 border border-[${mode.color}] text-[${mode.color}] shadow-[0_0_15px_${mode.color}40]`
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[${mode.color}]`} />
                        <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="text-xs font-bold tracking-widest">{mode.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
