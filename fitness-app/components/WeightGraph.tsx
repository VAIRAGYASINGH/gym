'use client';

import { useEffect, useRef, useState } from 'react';

interface WeightGraphProps {
  startWeight?: number;
  currentWeight?: number;
  goalWeight?: number;
}

export default function WeightGraph({ 
  startWeight = 82.0, 
  currentWeight = 75.2, 
  goalWeight = 70.0 
}: WeightGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
  const weights = [82.0, 81.2, 80.5, 79.8, 78.5, 77.2, 76.0, 75.2];
  const totalLoss = startWeight - currentWeight;

  useEffect(() => {
    setIsVisible(true);
    drawGraph();
    
    const handleResize = () => drawGraph();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.offsetWidth - 40;
    canvas.height = 300;

    const padding = 50;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;

    const maxWeight = Math.max(...weights) + 2;
    const minWeight = Math.min(goalWeight - 2, Math.min(...weights) - 2);
    const weightRange = maxWeight - minWeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding + (graphHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();

      const weight = maxWeight - (weightRange / 5) * i;
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(weight.toFixed(1) + ' kg', padding - 10, y + 4);
    }

    // Draw goal line
    const goalY = padding + ((maxWeight - goalWeight) / weightRange) * graphHeight;
    ctx.strokeStyle = '#90ee90';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, goalY);
    ctx.lineTo(canvas.width - padding, goalY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#90ee90';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Goal: ' + goalWeight + ' kg', canvas.width - padding + 10, goalY + 4);

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.05)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);

    const xStep = graphWidth / (weeks.length - 1);

    weights.forEach((weight, index) => {
      const x = padding + xStep * index;
      const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;
      ctx.lineTo(x, y);
    });

    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw weight line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    weights.forEach((weight, index) => {
      const x = padding + xStep * index;
      const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw data points
    weights.forEach((weight, index) => {
      const x = padding + xStep * index;
      const y = padding + ((maxWeight - weight) / weightRange) * graphHeight;

      ctx.fillStyle = '#667eea';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#666';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(weeks[index], x, canvas.height - padding + 20);

      ctx.fillStyle = '#764ba2';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(weight.toFixed(1) + 'kg', x, y - 15);
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h2 className="text-center text-purple-600 text-3xl font-bold mb-8">Weight Progress</h2>
      <div className="bg-gray-50 rounded-2xl p-5 mb-8 min-h-[300px]">
        <canvas 
          ref={canvasRef} 
          className={`w-full h-[300px] transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-xl text-white text-center hover:-translate-y-1 transition-transform duration-300">
          <p className="text-sm opacity-90 mb-2">Current Weight:</p>
          <p className="text-2xl font-bold">{currentWeight} kg</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-xl text-white text-center hover:-translate-y-1 transition-transform duration-300">
          <p className="text-sm opacity-90 mb-2">Starting Weight:</p>
          <p className="text-2xl font-bold">{startWeight} kg</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-xl text-white text-center hover:-translate-y-1 transition-transform duration-300">
          <p className="text-sm opacity-90 mb-2">Goal Weight:</p>
          <p className="text-2xl font-bold">{goalWeight} kg</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-xl text-white text-center hover:-translate-y-1 transition-transform duration-300">
          <p className="text-sm opacity-90 mb-2">Progress:</p>
          <p className="text-2xl font-bold text-green-300 drop-shadow-lg">{totalLoss.toFixed(1)} kg</p>
        </div>
      </div>
    </div>
  );
}
