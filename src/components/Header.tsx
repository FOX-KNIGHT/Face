import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="glass-panel app-header">
            <div className="container header-content">
                <div className="flex items-center gap-3">
                    <div className="icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                        <Activity className="w-6 h-6" style={{ color: '#60a5fa' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Driver Attention Monitor</h1>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Real-time Safety Analytics</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="status-badge">
                        <div className="status-dot" />
                        <span>System Active</span>
                    </div>
                    <button style={{ padding: '0.5rem', background: 'transparent', border: 'none' }}>
                        <ShieldCheck className="w-5 h-5" style={{ color: '#9ca3af' }} />
                    </button>
                </div>
            </div>
        </header>
    );
};
