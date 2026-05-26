'use client';

import { useState } from 'react';

interface WaterTrackerProps {
  waterAmount?: number;
  waterGoal?: number;
}

export default function WaterTracker({ waterAmount = 1.8, waterGoal = 2.5 }: WaterTrackerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const waterPercentage = Math.round((waterAmount / waterGoal) * 100);
  const fillHeight = 400 * (waterPercentage / 100);
  const yPosition = 400 - fillHeight;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
      <h2 className="text-center text-purple-600 text-3xl font-bold mb-6">Water Intake</h2>
      <div 
        className="relative flex justify-center items-center min-h-[400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg 
          className={`w-52 h-[400px] cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
          viewBox="0 0 200 400" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="bodyClip">
              <ellipse cx="100" cy="40" rx="30" ry="35"/>
              <rect x="90" y="70" width="20" height="15"/>
              <ellipse cx="100" cy="140" rx="45" ry="70"/>
              <rect x="55" y="95" width="15" height="80" rx="7"/>
              <rect x="130" y="95" width="15" height="80" rx="7"/>
              <rect x="75" y="205" width="20" height="110" rx="10"/>
              <rect x="105" y="205" width="20" height="110" rx="10"/>
            </clipPath>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4facfe" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9"/>
            </linearGradient>
          </defs>
          
          <g className="body-stroke">
            <ellipse cx="100" cy="40" rx="30" ry="35" fill="none" stroke="#333" strokeWidth="2"/>
            <rect x="90" y="70" width="20" height="15" fill="none" stroke="#333" strokeWidth="2"/>
            <ellipse cx="100" cy="140" rx="45" ry="70" fill="none" stroke="#333" strokeWidth="2"/>
            <rect x="55" y="95" width="15" height="80" rx="7" fill="none" stroke="#333" strokeWidth="2"/>
            <rect x="130" y="95" width="15" height="80" rx="7" fill="none" stroke="#333" strokeWidth="2"/>
            <rect x="75" y="205" width="20" height="110" rx="10" fill="none" stroke="#333" strokeWidth="2"/>
            <rect x="105" y="205" width="20" height="110" rx="10" fill="none" stroke="#333" strokeWidth="2"/>
          </g>
          
          <rect 
            className={`transition-all duration-600 ${isHovered ? 'animate-pulse' : ''}`}
            x="0" 
            y={yPosition} 
            width="200" 
            height={fillHeight} 
            fill="url(#waterGradient)"
            clipPath="url(#bodyClip)"
          />
        </svg>
        
        <div 
          className={`absolute top-1/2 left-full ml-6 -translate-y-1/2 bg-white/98 rounded-2xl p-5 shadow-xl border-2 border-purple-600 min-w-[200px] transition-all duration-300 ${
            isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-4'
          }`}
        >
          <p className="text-xl font-bold text-purple-600 mb-2">
            {waterAmount}L / {waterGoal}L
          </p>
          <p className="text-lg text-purple-800">
            {waterPercentage}% of daily goal
          </p>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-4 italic">Hover to view details</p>
    </div>
  );
}
