import React from 'react';
import { Shield, Lock, Server, Trash2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div className="flex items-center gap-2 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <Shield className="w-5 h-5" style={{ color: '#4ade80' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Privacy & Data Policy</h3>
            </div>

            <div className="policy-grid">
                <div className="policy-item">
                    <div className="icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                        <Lock className="w-4 h-4" style={{ color: '#60a5fa' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', marginBottom: '0.25rem' }}>On-Device Processing</h4>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>All processing occurs locally. No video data leaves your device.</p>
                    </div>
                </div>

                <div className="policy-item">
                    <div className="icon-box" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                        <Server className="w-4 h-4" style={{ color: '#c084fc' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', marginBottom: '0.25rem' }}>No Cloud Storage</h4>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>We do not store or transmit your personal biometric data.</p>
                    </div>
                </div>

                <div className="policy-item">
                    <div className="icon-box" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
                        <Trash2 className="w-4 h-4" style={{ color: '#fb923c' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', marginBottom: '0.25rem' }}>Auto-Deletion</h4>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Session data is automatically cleared after 3 days.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
