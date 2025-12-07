import React from 'react';
import { Activity, Cpu, Power } from 'lucide-react';

interface HeaderProps {
    isMonitoring: boolean;
    onToggleMonitoring: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMonitoring, onToggleMonitoring }) => {
    return (
        <header className="app-header">
            <div className="container header-content">
                <div className="flex items-center gap-4">
                    <div className="p-2 border border-[var(--cyan)] bg-[var(--cyan-dim)] rounded-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[var(--cyan)] opacity-20 animate-pulse"></div>
                        <Cpu className="w-6 h-6 text-[var(--cyan)] relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-widest uppercase text-white" style={{ textShadow: '0 0 10px rgba(0, 243, 255, 0.5)' }}>
                            SENTINEL<span className="text-[var(--cyan)]">AI</span>
                        </h1>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--cyan)] tracking-[0.2em] font-mono uppercase opacity-70">
                            <Activity className="w-3 h-3" />
                            <span>Neural Engine {isMonitoring ? 'Active' : 'Standby'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-8 font-mono text-xs text-gray-400">
                        <div className="flex flex-col items-end">
                            <span className="text-[var(--cyan)]">SYS.VER</span>
                            <span>2.4.0-ALPHA</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[var(--cyan)]">LATENCY</span>
                            <span>{isMonitoring ? '12ms' : '--'}</span>
                        </div>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

                    <button
                        onClick={onToggleMonitoring}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-sm transition-all duration-300 ${isMonitoring
                                ? 'border-[var(--red)] bg-[rgba(255,0,60,0.1)] text-[var(--red)] hover:bg-[rgba(255,0,60,0.2)]'
                                : 'border-[var(--success-color)] bg-[rgba(34,197,94,0.1)] text-[var(--success-color)] hover:bg-[rgba(34,197,94,0.2)]'
                            }`}
                    >
                        <Power className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wider">{isMonitoring ? 'STOP SYSTEM' : 'START SYSTEM'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
