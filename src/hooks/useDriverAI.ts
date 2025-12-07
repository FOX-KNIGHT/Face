import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import type { Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { playAlertSound } from '../utils/audio';
import Webcam from 'react-webcam';

// Types
export interface DriverState {
    isDrowsy: boolean;
    isRage: boolean;
    ear: number;
    fps: number;
    headVelocity: number;
    status: 'NORMAL' | 'DROWSY' | 'RAGE';
}

export interface LogEntry {
    id: string;
    timestamp: string; // ISO string for easier serialization
    type: 'DROWSINESS' | 'RAGE';
}

// Constants
const EAR_THRESHOLD = 0.25;
const CONSECUTIVE_FRAMES = 15;
const RAGE_VELOCITY_THRESHOLD = 0.5; // Threshold for head movement velocity

export const useDriverAI = (videoRef: React.RefObject<Webcam | null>) => {
    const [driverState, setDriverState] = useState<DriverState>({
        isDrowsy: false,
        isRage: false,
        ear: 0,
        fps: 0,
        headVelocity: 0,
        status: 'NORMAL',
    });

    // Load logs from localStorage on mount
    const [logs, setLogs] = useState<LogEntry[]>(() => {
        try {
            const saved = localStorage.getItem('driver_logs');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [isInitialized, setIsInitialized] = useState(false);

    const [isMonitoring, setIsMonitoring] = useState(false);

    // Refs for logic to avoid re-renders
    const frameCounter = useRef(0);
    const lastProcessTime = useRef(Date.now());
    const lastNosePos = useRef<{ x: number, y: number } | null>(null);
    const distractionStartTime = useRef<number | null>(null);

    // Persist logs whenever they change
    useEffect(() => {
        localStorage.setItem('driver_logs', JSON.stringify(logs));
    }, [logs]);

    const clearLogs = useCallback(() => {
        setLogs([]);
        localStorage.removeItem('driver_logs');
    }, []);

    const toggleMonitoring = useCallback(() => {
        setIsMonitoring(prev => !prev);
        // Reset state on toggle
        setDriverState(prev => ({
            ...prev,
            isDrowsy: false,
            isRage: false,
            status: 'NORMAL'
        }));
        frameCounter.current = 0;
        distractionStartTime.current = null;
    }, []);

    // EAR Calculation
    // Indices for left eye: [362, 385, 387, 263, 373, 380] (MediaPipe 468 landmarks)
    // Indices for right eye: [33, 160, 158, 133, 153, 144]
    // Note: MediaPipe indices are different from standard 68-point dlib.
    // Using approximation points for MediaPipe Face Mesh:
    // Left Eye: 33 (inner), 133 (outer), 160 (top1), 158 (top2), 144 (bottom1), 153 (bottom2)
    // Right Eye: 362 (inner), 263 (outer), 385 (top1), 387 (top2), 380 (bottom1), 373 (bottom2)

    const calculateEAR = (landmarks: any[]) => {
        const getDist = (p1: number, p2: number) => {
            const x = landmarks[p1].x - landmarks[p2].x;
            const y = landmarks[p1].y - landmarks[p2].y;
            return Math.sqrt(x * x + y * y);
        };

        // Right Eye (User's left on screen)
        const rightEyeEAR =
            (getDist(160, 144) + getDist(158, 153)) /
            (2 * getDist(33, 133));

        // Left Eye (User's right on screen)
        const leftEyeEAR =
            (getDist(385, 380) + getDist(387, 373)) /
            (2 * getDist(362, 263));

        return (leftEyeEAR + rightEyeEAR) / 2;
    };

    const calculateHeadVelocity = (landmarks: any[], deltaTime: number) => {
        const nose = landmarks[1]; // Nose tip
        if (!lastNosePos.current) {
            lastNosePos.current = { x: nose.x, y: nose.y };
            return 0;
        }

        const dx = nose.x - lastNosePos.current.x;
        const dy = nose.y - lastNosePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Velocity = distance / time (in seconds)
        // Scale up for readability
        const velocity = (distance / (deltaTime / 1000)) * 10;

        lastNosePos.current = { x: nose.x, y: nose.y };
        return velocity;
    };

    const onResults = useCallback((results: Results) => {
        if (!isMonitoring) return;
        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

        const now = Date.now();
        const deltaTime = now - lastProcessTime.current;
        const fps = 1000 / deltaTime;
        lastProcessTime.current = now;

        const landmarks = results.multiFaceLandmarks[0];
        const ear = calculateEAR(landmarks);
        const headVelocity = calculateHeadVelocity(landmarks, deltaTime);

        // Drowsiness Logic
        if (ear < EAR_THRESHOLD) {
            frameCounter.current++;
        } else {
            frameCounter.current = 0;
        }

        const isDrowsy = frameCounter.current >= CONSECUTIVE_FRAMES;

        // Rage Logic: High velocity head movement
        // In a real app, we'd combine this with emotion classification
        const isRage = headVelocity > RAGE_VELOCITY_THRESHOLD;

        let status: DriverState['status'] = 'NORMAL';
        if (isDrowsy) status = 'DROWSY';
        if (isRage) status = 'RAGE';

        setDriverState({
            isDrowsy,
            isRage,
            ear,
            fps: Math.round(fps),
            headVelocity,
            status,
        });

        // Trigger Alerts & Logs
        if (isDrowsy || isRage) {
            const type = isDrowsy ? 'DROWSINESS' : 'RAGE';
            playAlertSound(isDrowsy ? 'drowsiness' : 'rage');

            setLogs(prev => {
                // Debounce logs: don't log if same type occurred in last 3 seconds
                if (prev.length > 0 && prev[0].type === type) {
                    const lastTime = new Date(prev[0].timestamp).getTime();
                    if (now - lastTime < 3000) return prev;
                }

                const newLog: LogEntry = {
                    id: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    type
                };
                return [newLog, ...prev].slice(0, 50); // Keep last 50 logs
            });
        }
    }, []);

    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        if (videoRef.current && videoRef.current.video) {
            const camera = new Camera(videoRef.current.video, {
                onFrame: async () => {
                    if (videoRef.current?.video) {
                        await faceMesh.send({ image: videoRef.current.video });
                    }
                },
                width: 640,
                height: 480,
            });
            camera.start();
            setIsInitialized(true);
        }
    }, [videoRef, onResults]);

    return { driverState, logs, isInitialized, clearLogs, isMonitoring, toggleMonitoring };
};
