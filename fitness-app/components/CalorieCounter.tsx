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
          className={`w-64 h-64 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105 rotate-6' : ''}`}
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" fill="#f8f8f8" stroke="#ddd" strokeWidth="3"/>
          <circle cx="100" cy="100" r="85" fill="none" stroke="#eee" strokeWidth="2"/>
          
          <g className="food-sections">
            <ellipse 
              cx="120" cy="80" rx="25" ry="20" 
              fill="#f4a460" 
              className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`}
              style={{ animationDelay: '0s' }}
            />
            <ellipse 
              cx="70" cy="80" rx="28" ry="22" 
              fill="#fff8dc" 
              stroke="#ddd"
              className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`}
              style={{ animationDelay: '0.1s' }}
            />
            <ellipse 
              cx="75" cy="120" rx="22" ry="20" 
              fill="#90ee90" 
              className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`}
              style={{ animationDelay: '0.2s' }}
            />
            <ellipse 
              cx="120" cy="120" rx="20" ry="18" 
              fill="#ff6b6b" 
              className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`}
              style={{ animationDelay: '0.3s' }}
            />
            <circle 
              cx="100" cy="100" r="12" 
              fill="#f0e68c" 
              className={`transition-all duration-300 ${isHovered ? 'animate-bounce' : ''}`}
              style={{ animationDelay: '0.4s' }}
            />
          </g>
          
          <g className="utensils">
            <line x1="30" y1="100" x2="15" y2="100" stroke="#999" strokeWidth="2"/>
            <line x1="15" y1="85" x2="15" y2="115" stroke="#999" strokeWidth="2"/>
            <line x1="170" y1="100" x2="185" y2="100" stroke="#999" strokeWidth="2"/>
            <line x1="185" y1="85" x2="185" y2="100" stroke="#999" strokeWidth="2"/>
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
