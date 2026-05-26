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
    <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 relative">
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
              {/* Head - more circular */}
              <circle cx="100" cy="35" r="28"/>
              
              {/* Neck */}
              <path d="M 88 58 Q 88 65, 88 70 L 112 70 Q 112 65, 112 58 Z"/>
              
              {/* Shoulders and upper torso */}
              <path d="M 55 80 Q 55 75, 60 72 L 88 72 L 88 95 Q 70 95, 55 105 Z"/>
              <path d="M 145 80 Q 145 75, 140 72 L 112 72 L 112 95 Q 130 95, 145 105 Z"/>
              
              {/* Torso - more natural shape */}
              <ellipse cx="100" cy="130" rx="38" ry="50"/>
              <path d="M 62 130 Q 58 155, 65 175 L 75 175 Q 70 155, 70 130 Z"/>
              <path d="M 138 130 Q 142 155, 135 175 L 125 175 Q 130 155, 130 130 Z"/>
              
              {/* Waist to hips */}
              <path d="M 70 175 Q 68 185, 72 195 L 92 195 Q 88 185, 88 175 Z"/>
              <path d="M 130 175 Q 132 185, 128 195 L 108 195 Q 112 185, 112 175 Z"/>
              
              {/* Hips */}
              <ellipse cx="100" cy="200" rx="32" ry="20"/>
              
              {/* Arms - more curved and natural */}
              <path d="M 60 75 Q 52 85, 48 100 Q 45 120, 48 145 Q 50 160, 54 170 L 62 168 Q 58 150, 56 130 Q 55 110, 60 95 Z"/>
              <path d="M 140 75 Q 148 85, 152 100 Q 155 120, 152 145 Q 150 160, 146 170 L 138 168 Q 142 150, 144 130 Q 145 110, 140 95 Z"/>
              
              {/* Forearms */}
              <path d="M 54 170 Q 50 190, 50 210 L 58 210 Q 58 190, 62 170 Z"/>
              <path d="M 146 170 Q 150 190, 150 210 L 142 210 Q 142 190, 138 170 Z"/>
              
              {/* Hands */}
              <ellipse cx="54" cy="215" rx="6" ry="8"/>
              <ellipse cx="146" cy="215" rx="6" ry="8"/>
              
              {/* Thighs - more anatomical */}
              <path d="M 75 210 Q 73 240, 75 270 Q 76 290, 78 315 L 88 315 Q 86 290, 85 270 Q 83 240, 85 210 Z"/>
              <path d="M 125 210 Q 127 240, 125 270 Q 124 290, 122 315 L 112 315 Q 114 290, 115 270 Q 117 240, 115 210 Z"/>
              
              {/* Calves */}
              <path d="M 78 315 Q 76 335, 78 355 Q 79 370, 80 385 L 86 385 Q 85 370, 84 355 Q 82 335, 84 315 Z"/>
              <path d="M 122 315 Q 124 335, 122 355 Q 121 370, 120 385 L 114 385 Q 115 370, 116 355 Q 118 335, 116 315 Z"/>
              
              {/* Feet */}
              <ellipse cx="83" cy="390" rx="8" ry="6"/>
              <ellipse cx="117" cy="390" rx="8" ry="6"/>
            </clipPath>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4facfe" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9"/>
            </linearGradient>
          </defs>
          
          <g className="body-stroke">
            {/* Head */}
            <circle cx="100" cy="35" r="28" fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Neck */}
            <path d="M 88 58 Q 88 65, 88 70 L 112 70 Q 112 65, 112 58" fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Shoulders */}
            <path d="M 60 72 Q 55 75, 55 85" fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 140 72 Q 145 75, 145 85" fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Torso outline */}
            <path d="M 88 70 Q 70 75, 62 95 Q 58 120, 62 145 Q 65 170, 72 185 Q 75 195, 80 205" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 112 70 Q 130 75, 138 95 Q 142 120, 138 145 Q 135 170, 128 185 Q 125 195, 120 205" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Hips */}
            <path d="M 80 205 Q 75 210, 75 215" fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 120 205 Q 125 210, 125 215" fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Arms */}
            <path d="M 60 75 Q 50 90, 48 110 Q 46 135, 50 160 Q 52 175, 54 185" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 140 75 Q 150 90, 152 110 Q 154 135, 150 160 Q 148 175, 146 185" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Forearms */}
            <path d="M 54 185 Q 50 200, 50 215" fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 146 185 Q 150 200, 150 215" fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Hands */}
            <ellipse cx="54" cy="218" rx="6" ry="8" fill="none" stroke="#333" strokeWidth="2"/>
            <ellipse cx="146" cy="218" rx="6" ry="8" fill="none" stroke="#333" strokeWidth="2"/>
            
            {/* Legs */}
            <path d="M 78 215 Q 76 245, 76 275 Q 76 300, 78 325" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 88 215 Q 86 245, 86 275 Q 86 300, 88 325" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 112 215 Q 114 245, 114 275 Q 114 300, 112 325" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 122 215 Q 124 245, 124 275 Q 124 300, 122 325" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Calves and ankles */}
            <path d="M 78 325 Q 77 350, 78 375 Q 78 382, 80 388" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 88 325 Q 87 350, 86 375 Q 86 382, 84 388" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 112 325 Q 113 350, 114 375 Q 114 382, 116 388" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            <path d="M 122 325 Q 123 350, 122 375 Q 122 382, 120 388" 
                  fill="none" stroke="#333" strokeWidth="2.5"/>
            
            {/* Feet */}
            <ellipse cx="83" cy="392" rx="8" ry="6" fill="none" stroke="#333" strokeWidth="2"/>
            <ellipse cx="117" cy="392" rx="8" ry="6" fill="none" stroke="#333" strokeWidth="2"/>
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
        
      </div>
      
      {/* Water details - bottom right corner */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
        <p className="text-lg font-bold text-purple-600 mb-1">
          {waterAmount}L / {waterGoal}L
        </p>
        <p className="text-sm text-purple-800">
          {waterPercentage}% of daily goal
        </p>
      </div>
    </div>
  );
}
