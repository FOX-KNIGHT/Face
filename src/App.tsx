import { useRef } from 'react';
import Webcam from 'react-webcam';
import { Header } from './components/Header';
import { CameraFeed } from './components/CameraFeed';
import { StatusPanel } from './components/StatusPanel';
import { LogTable } from './components/LogTable';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { useDriverAI } from './hooks/useDriverAI';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const { driverState, logs, isInitialized, clearLogs } = useDriverAI(webcamRef);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
      <Header />

      <main className="container" style={{ paddingTop: '6rem' }}>
        <div className="main-grid">
          {/* Left Column: Camera & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CameraFeed
              webcamRef={webcamRef}
              driverState={driverState}
              isInitialized={isInitialized}
            />
            <StatusPanel status={driverState.status} />
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
