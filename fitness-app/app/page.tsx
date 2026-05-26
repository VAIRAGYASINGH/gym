import WaterTracker from '@/components/WaterTracker';
import CalorieCounter from '@/components/CalorieCounter';
import WeightGraph from '@/components/WeightGraph';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center text-white mb-12 py-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            FitTrack
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Track Your Daily Fitness Goals
          </p>
        </header>

        {/* Stats Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <WaterTracker waterAmount={1.8} waterGoal={2.5} />
          <CalorieCounter calorieAmount={1650} calorieGoal={2000} />
        </div>

        {/* Weight Progress Graph */}
        <WeightGraph startWeight={82.0} currentWeight={75.2} goalWeight={70.0} />
      </div>
    </div>
  );
}
