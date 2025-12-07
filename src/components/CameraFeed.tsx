import React from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';
import type { DriverState } from '../hooks/useDriverAI';

interface CameraFeedProps {
    webcamRef: React.RefObject<Webcam | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    driverState: DriverState;
    isInitialized: boolean;
}

export const CameraFeed: React.FC<CameraFeedProps> = ({ webcamRef, canvasRef, driverState, isInitialized }) => {

    return (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-white/10">
            {!isInitialized && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-blue-400 font-medium">Initializing AI Models...</p>
                    </div>
                </div>
            )}

            <Webcam
                ref={webcamRef}
                audio={false}
                className="absolute inset-0 w-full h-full object-cover"
                mirrored
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: "user"
                }}
            />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 z-10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-medium text-white">LIVE FEED</span>
                <Camera className="w-3 h-3 text-gray-400" />
            </div>

            {/* Live Metrics Panel */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs font-mono">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between gap-4">
                            <span className="text-gray-400">FPS:</span>
                            <span className="text-green-400">{driverState.fps}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-gray-400">EYE OPENNESS:</span>
                            <span className={driverState.ear < 0.25 ? "text-red-400 font-bold" : "text-blue-400"}>
                                {driverState.ear.toFixed(3)}
                            </span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-gray-400">HEAD VELOCITY:</span>
                            <span className={driverState.headVelocity > 15 ? "text-yellow-400 font-bold" : "text-blue-400"}>
                                {driverState.headVelocity.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* No Face Detected Warning */}
                {isInitialized && driverState.status === 'NO_FACE' && (
                    <div className="bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-lg border border-red-500/50 animate-pulse">
                        <span className="text-red-400 font-bold tracking-wider text-sm">NO FACE DETECTED</span>
                    </div>
                )}
            </div>
        </div>
    );
};
