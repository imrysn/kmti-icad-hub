import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import fallbackImg from '../assets/froming4.webp';

interface ModelViewer3DProps {
    glbUrl: string;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ glbUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<THREE.Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [webglError, setWebglError] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // Check WebGL availability beforehand to avoid noisy console errors from Three.js
        const hasWebGL = (() => {
            try {
                const c = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('webgl2')));
            } catch (e) {
                return false;
            }
        })();

        if (!hasWebGL) {
            setWebglError(true);
            setLoading(false);
            return;
        }

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // 1. Scene setup
        const scene = new THREE.Scene();

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 10);

        // 3. Renderer setup
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true // Transparent background to integrate with glassmorphic cards
            });
        } catch (e) {
            console.error('Failed to create WebGL context:', e);
            setWebglError(true);
            setLoading(false);
            return;
        }

        renderer.setSize(container.clientWidth, container.clientHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 4. Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight1.position.set(5, 10, 7);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 0.8); // Subtle purple accent light
        dirLight2.position.set(-5, -5, -5);
        scene.add(dirLight2);

        // 5. Load GLB Model (with DRACO compression support & Local Cache API)
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        let active = true;
        let objectUrlToRevoke: string | null = null;

        const loadModelData = async () => {
            let finalUrl = glbUrl;
            try {
                // Check if Cache API is supported (standard in modern browsers/Electron)
                if ('caches' in window) {
                    const cache = await caches.open('kmti-3d-assets');
                    const cachedResponse = await cache.match(glbUrl);
                    if (cachedResponse) {
                        const blob = await cachedResponse.blob();
                        finalUrl = URL.createObjectURL(blob);
                        objectUrlToRevoke = finalUrl;
                    } else {
                        const response = await fetch(glbUrl);
                        if (response.ok) {
                            const responseClone = response.clone();
                            await cache.put(glbUrl, responseClone);
                            const blob = await response.blob();
                            finalUrl = URL.createObjectURL(blob);
                            objectUrlToRevoke = finalUrl;
                        }
                    }
                }
            } catch (e) {
                console.warn('Failed to resolve from local cache, loading directly:', e);
            }

            if (!active) {
                if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
                return;
            }

            loader.load(
                finalUrl,
                (gltf) => {
                    if (!active) return;
                    const model = gltf.scene;

                    // Create a pivot group to rotate the model around its true center
                    const pivotGroup = new THREE.Group();
                    pivotGroup.add(model);
                    scene.add(pivotGroup);
                    modelRef.current = pivotGroup;

                    // Adjust model pivot to center and scale to fit card
                    const box = new THREE.Box3().setFromObject(model);
                    const size = box.getSize(new THREE.Vector3());
                    const center = box.getCenter(new THREE.Vector3());

                    // Center the model geometry relative to the pivot group
                    model.position.set(-center.x, -center.y, -center.z);

                    // Auto-zoom camera based on bounding box dimension
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const fov = camera.fov * (Math.PI / 180);
                    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));

                    // Add margins to prevent clipping (increased to make the model a bit smaller)
                    cameraZ *= 1.55;
                    camera.position.z = cameraZ;
                    camera.lookAt(new THREE.Vector3(0, 0, 0));
                    camera.updateProjectionMatrix();

                    setLoading(false);
                },
                undefined,
                (error) => {
                    console.error('Failed to load 3D model:', error);
                    setLoading(false);
                }
            );
        };

        loadModelData();

        // 6. Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (modelRef.current) {
                // Auto-rotate on Y-axis (slowed down for a premium float feel)
                modelRef.current.rotation.y += 0.0005;
                // Add a very subtle Y oscillation for floating effect
                modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.0015;
            }

            renderer.render(scene, camera);
        };
        animate();

        // 7. Responsive Resizing
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        // 8. Clean up resources
        return () => {
            active = false;
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);

            // Traverse and dispose geometries and materials
            scene.traverse((object) => {
                if (!(object instanceof THREE.Mesh)) return;

                object.geometry.dispose();

                if (object.material instanceof Array) {
                    object.material.forEach((material) => material.dispose());
                } else {
                    object.material.dispose();
                }
            });

            dracoLoader.dispose();
            renderer.dispose();

            if (objectUrlToRevoke) {
                URL.revokeObjectURL(objectUrlToRevoke);
            }
        };
    }, [glbUrl]);

    if (webglError) {
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img 
                    src={fallbackImg} 
                    alt="3D Preview Fallback" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '8px',
                        opacity: 0.8
                    }} 
                />
            </div>
        );
    }

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-heading)'
                }}>
                    Loading 3D asset...
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};
