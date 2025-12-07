import React from 'react';
import type { Alert } from '../hooks/useDriverSimulation';
import { AlertCircle, Bell } from 'lucide-react';

interface AlertsListProps {
    alerts: Alert[];
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <div className="flex items-center gap-2 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <Bell className="w-5 h-5" style={{ color: '#60a5fa' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Recent Alerts</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {alerts.length === 0 ? (
                    <div className="text-center" style={{ color: '#6b7280', padding: '2rem 0', fontSize: '0.875rem' }}>
                        No recent alerts detected
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`alert-item ${alert.type === 'drowsiness' ? 'alert-drowsiness' : 'alert-distraction'
                                }`}
                        >
                            <AlertCircle className="w-5 h-5" style={{ flexShrink: 0 }} />
                            <div>
                                <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>{alert.message}</p>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }}>
                                    {alert.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
