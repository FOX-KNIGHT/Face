import React from 'react';
import { ShieldCheck, Activity, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
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
                            <span>Neural Engine Active</span>
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
                            <span>12ms</span>
                        </div>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-2 px-3 py-1.5 border border-[var(--success-color)] bg-[rgba(34,197,94,0.05)] rounded-sm">
                        <div className="w-2 h-2 rounded-full bg-[var(--success-color)] animate-pulse shadow-[0_0_8px_var(--success-color)]" />
                        <span className="text-xs font-bold tracking-wider text-[var(--success-color)]">ONLINE</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
