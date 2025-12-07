import React from 'react';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';

interface DashboardProps {
    score: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ score }) => {
    const getStatusColor = (score: number) => {
        if (score >= 70) return '#22c55e'; // green-500
        if (score >= 40) return '#eab308'; // yellow-500
        return '#ef4444'; // red-500
    };

    const getStatusText = (score: number) => {
        if (score >= 70) return 'Focused';
        if (score >= 40) return 'Distracted';
        return 'Drowsy';
    };

    const color = getStatusColor(score);
    const rgbaColor = score >= 70 ? 'rgba(34, 197, 94, 0.2)' : score >= 40 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)';

    return (
        <div className="glass-panel dashboard-card">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))', pointerEvents: 'none' }} />

            <div className="relative z-10">
                <div className="mb-6 relative flex justify-center">
                    <div className="score-circle-outer" style={{ borderColor: rgbaColor }}>
                        <div className="score-circle-inner" style={{
                            borderColor: color,
                            boxShadow: `0 0 20px ${color}4d` // 4d = 30% opacity
                        }}>
                            <div className="score-text">
                                {Math.round(score)}%
                            </div>
                        </div>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>Current Status</h2>
                <div className="flex items-center justify-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 500, color }}>
                    {score >= 70 ? <CheckCircle className="w-6 h-6" /> : score >= 40 ? <Eye className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    {getStatusText(score)}
                </div>
            </div>
        </div>
    );
};
