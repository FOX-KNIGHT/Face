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
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-md border border-[var(--glass-border)]">
            {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;

                return (
                    <button
                        key={mode.id}
                        onClick={() => onModeChange(mode.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all duration-300 ${isActive
                                ? `bg-[${mode.color}]/10 border border-[${mode.color}] text-[${mode.color}] shadow-[0_0_10px_${mode.color}40]`
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <Icon className="w-3 h-3" />
                        <span className="text-[10px] font-bold tracking-wider">{mode.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
