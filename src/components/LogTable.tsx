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
        <div className="glass-panel p-6 h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Incident Log</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={downloadCSV}
                        disabled={logs.length === 0}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Export CSV"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onClearLogs}
                        disabled={logs.length === 0}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Clear Logs"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scrollbar">
                {logs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-sm">
                        No incidents recorded in this session
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md ${log.type === 'DROWSINESS' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${log.type === 'DROWSINESS' ? 'text-red-200' : 'text-yellow-200'
                                        }`}>
                                        {log.type}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Detected via AI Engine
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded">
                                {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
