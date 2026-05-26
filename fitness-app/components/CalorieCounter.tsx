'use client';

import { useState } from 'react';

interface CalorieCounterProps {
  calorieAmount?: number;
  calorieGoal?: number;
}

export default function CalorieCounter({ calorieAmount = 1650, calorieGoal = 2000 }: CalorieCounterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const caloriePercentage = Math.round((calorieAmount / calorieGoal) * 100);

  const breakdown = [
    { name: 'Protein', amount: 520, color: '#f4a460' },
    { name: 'Carbs', amount: 680, color: '#fff8dc' },
    { name: 'Veggies', amount: 150, color: '#90ee90' },
    { name: 'Fruits', amount: 200, color: '#ff6b6b' },
    { name: 'Fats', amount: 100, color: '#f0e68c' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
      <h2 className="text-center text-purple-600 text-3xl font-bold mb-6">Calorie Intake</h2>
      <div 
        className="relative flex justify-center items-center min-h-[300px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg 
          className={`w-64 h-64 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105 rotate-3' : ''}`}
          viewBox="0 0 250 250" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for realistic food */}
            <radialGradient id="plateGradient">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="70%" stopColor="#f5f5f5"/>
              <stop offset="100%" stopColor="#e8e8e8"/>
            </radialGradient>
            <radialGradient id="chickenGradient">
              <stop offset="0%" stopColor="#f4c27f"/>
              <stop offset="100%" stopColor="#d4954f"/>
            </radialGradient>
            <radialGradient id="riceGradient">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#f5f0d8"/>
            </radialGradient>
            <radialGradient id="broccoliGradient">
              <stop offset="0%" stopColor="#9bde7e"/>
              <stop offset="100%" stopColor="#5a9943"/>
            </radialGradient>
            <radialGradient id="tomatoGradient">
              <stop offset="0%" stopColor="#ff6b6b"/>
              <stop offset="100%" stopColor="#d63447"/>
            </radialGradient>
            <linearGradient id="avocadoGradient">
              <stop offset="0%" stopColor="#a8d76f"/>
              <stop offset="100%" stopColor="#7cb342"/>
            </linearGradient>
          </defs>
          
          {/* Plate with realistic shadow */}
          <ellipse cx="125" cy="135" rx="95" ry="15" fill="#00000015"/>
          <circle cx="125" cy="125" r="95" fill="url(#plateGradient)" stroke="#d0d0d0" strokeWidth="3"/>
          <circle cx="125" cy="125" r="88" fill="none" stroke="#e8e8e8" strokeWidth="2"/>
          <circle cx="125" cy="125" r="5" fill="#e0e0e0"/>
          
          <g className="food-sections">
            {/* Grilled Chicken (Protein) - Top Right */}
            <g className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} style={{ animationDelay: '0s' }}>
              <ellipse cx="155" cy="95" rx="28" ry="22" fill="url(#chickenGradient)" stroke="#c47f3f" strokeWidth="1"/>
              {/* Grill marks */}
              <line x1="145" y1="88" x2="165" y2="88" stroke="#a0652f" strokeWidth="1.5" opacity="0.6"/>
              <line x1="145" y1="95" x2="165" y2="95" stroke="#a0652f" strokeWidth="1.5" opacity="0.6"/>
              <line x1="145" y1="102" x2="165" y2="102" stroke="#a0652f" strokeWidth="1.5" opacity="0.6"/>
            </g>
            
            {/* Rice - Top Left */}
            <g className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.1s' }}>
              <ellipse cx="85" cy="95" rx="32" ry="25" fill="url(#riceGradient)" stroke="#e8ddb0" strokeWidth="1"/>
              {/* Rice texture */}
              <circle cx="80" cy="90" r="2" fill="#fff" opacity="0.8"/>
              <circle cx="90" cy="92" r="2" fill="#fff" opacity="0.8"/>
              <circle cx="85" cy="98" r="2" fill="#fff" opacity="0.8"/>
              <circle cx="78" cy="98" r="1.5" fill="#f8f5e8" opacity="0.9"/>
              <circle cx="92" cy="99" r="1.5" fill="#f8f5e8" opacity="0.9"/>
            </g>
            
            {/* Broccoli (Veggies) - Bottom Left */}
            <g className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.2s' }}>
              {/* Broccoli florets */}
              <circle cx="75" cy="145" r="10" fill="url(#broccoliGradient)" stroke="#4a7d35" strokeWidth="1"/>
              <circle cx="85" cy="148" r="9" fill="url(#broccoliGradient)" stroke="#4a7d35" strokeWidth="1"/>
              <circle cx="80" cy="155" r="8" fill="url(#broccoliGradient)" stroke="#4a7d35" strokeWidth="1"/>
              {/* Stems */}
              <rect x="78" y="153" width="3" height="8" fill="#d4e8c1" rx="1"/>
              <rect x="83" y="156" width="3" height="7" fill="#d4e8c1" rx="1"/>
            </g>
            
            {/* Cherry Tomatoes (Fruits/Veggies) - Bottom Right */}
            <g className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.3s' }}>
              <circle cx="155" cy="145" r="11" fill="url(#tomatoGradient)" stroke="#c53333" strokeWidth="1"/>
              <circle cx="165" cy="152" r="10" fill="url(#tomatoGradient)" stroke="#c53333" strokeWidth="1"/>
              {/* Shine effect */}
              <circle cx="158" cy="142" r="3" fill="#ff9999" opacity="0.6"/>
              <circle cx="168" cy="149" r="2.5" fill="#ff9999" opacity="0.6"/>
              {/* Stems */}
              <line x1="155" y1="134" x2="155" y2="138" stroke="#5a9943" strokeWidth="1.5"/>
              <line x1="165" y1="142" x2="165" y2="145" stroke="#5a9943" strokeWidth="1.5"/>
            </g>
            
            {/* Avocado slices (Healthy Fats) - Center */}
            <g className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.4s' }}>
              <ellipse cx="120" cy="125" rx="16" ry="12" fill="url(#avocadoGradient)" stroke="#6a9c32" strokeWidth="1"/>
              <ellipse cx="120" cy="125" rx="8" ry="6" fill="#d4a574" stroke="#b8924f" strokeWidth="0.5"/>
              {/* Texture lines */}
              <path d="M 112 120 Q 120 122, 128 120" fill="none" stroke="#8fb85a" strokeWidth="0.5" opacity="0.6"/>
              <path d="M 112 130 Q 120 128, 128 130" fill="none" stroke="#8fb85a" strokeWidth="0.5" opacity="0.6"/>
            </g>
          </g>
          
          {/* Fork and Knife - More detailed */}
          <g className="utensils">
            {/* Fork - Left */}
            <rect x="15" y="120" width="25" height="3" rx="1" fill="#b8b8b8" stroke="#888" strokeWidth="0.5"/>
            <line x1="18" y1="105" x2="18" y2="120" stroke="#888" strokeWidth="2"/>
            <line x1="23" y1="108" x2="23" y2="120" stroke="#888" strokeWidth="2"/>
            <line x1="28" y1="105" x2="28" y2="120" stroke="#888" strokeWidth="2"/>
            <line x1="33" y1="108" x2="33" y2="120" stroke="#888" strokeWidth="2"/>
            
            {/* Knife - Right */}
            <rect x="210" y="120" width="25" height="3" rx="1" fill="#b8b8b8" stroke="#888" strokeWidth="0.5"/>
            <path d="M 235 105 L 237 120 L 233 120 Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5"/>
          </g>
          
          {/* Garnish - Lemon slice */}
          <g opacity="0.8">
            <circle cx="125" cy="85" r="8" fill="#fff9b1" stroke="#e8d85f" strokeWidth="1"/>
            <line x1="125" y1="77" x2="125" y2="93" stroke="#e8d85f" strokeWidth="0.5"/>
            <line x1="117" y1="85" x2="133" y2="85" stroke="#e8d85f" strokeWidth="0.5"/>
            <line x1="119" y1="79" x2="131" y2="91" stroke="#e8d85f" strokeWidth="0.5"/>
            <line x1="119" y1="91" x2="131" y2="79" stroke="#e8d85f" strokeWidth="0.5"/>
          </g>
        </svg>
        
        <div 
          className={`absolute top-1/2 left-full ml-6 -translate-y-1/2 bg-white/98 rounded-2xl p-5 shadow-xl border-2 border-purple-600 min-w-[280px] transition-all duration-300 ${
            isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-4'
          }`}
        >
          <p className="text-xl font-bold text-purple-600 mb-2">
            {calorieAmount} / {calorieGoal} kcal
          </p>
          <p className="text-lg text-purple-800 mb-3">
            {caloriePercentage}% of daily goal
          </p>
          <div className="pt-3 border-t border-gray-200 text-sm space-y-2">
            {breakdown.map((item) => (
              <div key={item.name} className="flex items-center text-gray-600">
                <span 
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color, border: item.name === 'Carbs' ? '1px solid #ddd' : 'none' }}
                />
                {item.name}: {item.amount} kcal
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-4 italic">Hover to view details</p>
    </div>
  );
}
