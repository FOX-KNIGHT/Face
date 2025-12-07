import React from 'react';
import { Clock, AlertTriangle, Download, Trash2 } from 'lucide-react';
import type { LogEntry } from '../hooks/useDriverAI';

interface LogTableProps {
    logs: LogEntry[];
    onClearLogs: () => void;
}

export const LogTable: React.FC<LogTableProps> = ({ logs, onClearLogs }) => {
    const downloadCSV = () => {
        const headers = ['ID', 'Timestamp', 'Type'];
        const rows = logs.map(log => [log.id, log.timestamp, log.type]);
        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `driver_logs_${new Date().toISOString()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-[var(--glass-border)] pb-4 shrink-0">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--cyan)]" />
                    <h3 className="text-lg font-bold text-white tracking-wider uppercase font-display">Event Log</h3>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadCSV}
                        disabled={logs.length === 0}
                        className="cyber-button flex items-center gap-2"
                        title="Export CSV"
                    >
                        <Download className="w-4 h-4" />
                        <span>EXPORT</span>
                    </button>
                    <button
                        onClick={onClearLogs}
                        disabled={logs.length === 0}
                        className="cyber-button flex items-center gap-2"
                        style={{ borderColor: 'var(--red)', color: 'var(--red)' }}
                        title="Clear Logs"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-2 custom-scrollbar">
                {logs.length === 0 ? (
                    <div className="text-center py-12 text-gray-600 font-mono text-sm border border-dashed border-gray-800 rounded-lg">
                        NO ANOMALIES DETECTED
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className="log-row flex items-center justify-between p-3 rounded-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-sm ${log.type === 'DROWSINESS' ? 'bg-[rgba(255,0,60,0.1)] text-[var(--red)]' :
                                        log.type === 'RAGE' ? 'bg-[rgba(252,238,10,0.1)] text-[var(--yellow)]' :
                                            'bg-[rgba(252,238,10,0.1)] text-[var(--yellow)]'
                                    }`}>
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold tracking-wide ${log.type === 'DROWSINESS' ? 'text-[var(--red)]' : 'text-[var(--yellow)]'
                                        }`}>
                                        {log.type}
                                    </p>
                                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                                        ID: {log.id.slice(0, 8)}
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-[var(--cyan)] bg-black/40 px-2 py-1 rounded-sm border border-[var(--glass-border)]">
                                {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
