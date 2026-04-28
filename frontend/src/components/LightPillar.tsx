import React, { useEffect, useRef } from 'react';

const LightPillar: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Calculate dynamic dimensions for rotation coverage
        let diagonal = Math.sqrt(width * width + height * height);

        const lineCount = 10;
        const speed = 0.002;
        let time = 0;

        class Ray {
            x: number;
            width: number;
            frequency: number;
            amplitude: number;
            phase: number;
            speed: number;
            alpha: number;
            color: string;

            constructor() {
                // Distribute centered relative to the rotated axis
                this.x = (Math.random() - 0.5) * 250;
                this.width = Math.random() * 20 + 5;
                this.frequency = Math.random() * 0.01 + 0.002;
                this.amplitude = Math.random() * 100 + 50;
                this.phase = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.02 + 0.005;
                this.alpha = Math.random() * 0.3 + 0.1;

                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                const hue = isLight ? (180 + Math.random() * 40) : (250 + Math.random() * 60); // Cyan/Blue vs Violet/Pink
                this.color = `hsla(${hue}, 80%, ${isLight ? '45%' : '65%'}, ${this.alpha})`;
            }

            draw() {
                if (!ctx) return;

                ctx.beginPath();

                // Draw along the diagonal length (taller than screen height)
                const limit = diagonal * 0.8;

                for (let y = -limit; y < limit; y += 15) {
                    const offset = Math.sin(y * this.frequency + time + this.phase) *
                        Math.sin(y * this.frequency * 0.5 + time * 1.5) *
                        this.amplitude;

                    // Convergence effect tapering at ends
                    const centerFactor = Math.abs(y) / limit;
                    const shapeMultiplier = 1.2 - Math.pow(centerFactor, 2);

                    // x is relative to center axis
                    const finalX = this.x + offset * Math.max(0, shapeMultiplier);

                    if (y === -limit) ctx.moveTo(finalX, y);
                    else ctx.lineTo(finalX, y);
                }

                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                ctx.lineWidth = this.width;
                ctx.strokeStyle = this.color;
                ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';
                ctx.stroke();
                ctx.globalCompositeOperation = 'source-over';
            }
        }

        let rays: Ray[] = [];

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            diagonal = Math.sqrt(width * width + height * height);

            rays = [];
            for (let i = 0; i < lineCount; i++) {
                rays.push(new Ray());
            }
        };

        const animate = () => {
            if (!ctx) return;

            // 1. Clear Canvas (Transparent)
            ctx.clearRect(0, 0, width, height);

            time += speed;

            // 2. Setup Rotation for the Pillar
            ctx.save();
            ctx.translate(width / 2, height / 2); // Move to center
            ctx.rotate(Math.PI / 4); // Rotate 45deg

            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const gradient = ctx.createLinearGradient(-300, 0, 300, 0);
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(0.5, isLight ? 'rgba(99, 102, 241, 0.05)' : 'rgba(139, 92, 246, 0.1)'); 
            gradient.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(-300, -diagonal, 600, diagonal * 2);

            // 4. Draw Rays
            rays.forEach(ray => ray.draw());

            ctx.restore();

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%', pointerEvents: 'none', filter: 'blur(8px)', transform: 'scale(0.95)' }} />
    );
};

export default LightPillar;
