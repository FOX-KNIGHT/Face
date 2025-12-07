import { useRef } from 'react';
import Webcam from 'react-webcam';
import { Header } from './components/Header';
import { CameraFeed } from './components/CameraFeed';
import { StatusPanel } from './components/StatusPanel';
import { LogTable } from './components/LogTable';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ModeSelector } from './components/ModeSelector';
import { SessionInfo } from './components/SessionInfo';
import { useDriverAI } from './hooks/useDriverAI';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    driverState,
    logs,
    isInitialized,
    clearLogs,
    isMonitoring,
    toggleMonitoring,
    driverMode,
    setDriverMode,
    sessionStartTime,
    alertCount
  } = useDriverAI(webcamRef, canvasRef);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
      <Header isMonitoring={isMonitoring} onToggleMonitoring={toggleMonitoring} />

      <main className="container" style={{ paddingTop: '6rem' }}>
        {/* Control Bar */}
        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <ModeSelector currentMode={driverMode} onModeChange={setDriverMode} />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4" />
          <SessionInfo startTime={sessionStartTime} alertCount={alertCount} />
        </div>

        <div className="main-grid">
          {/* Left Column: Camera & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CameraFeed
              webcamRef={webcamRef}
              canvasRef={canvasRef}
              driverState={driverState}
              isInitialized={isInitialized}
            />
            <StatusPanel status={driverState.status} isMonitoring={isMonitoring} />
            <PrivacyPolicy />
          </div>

          {/* Right Column: Logs */}
          <div style={{ height: 'calc(100vh - 8rem)' }}>
            <LogTable logs={logs} onClearLogs={clearLogs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
