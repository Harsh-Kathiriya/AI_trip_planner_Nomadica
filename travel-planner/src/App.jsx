import React from 'react'
import ParticlesBg from './components/custom/ParticlesBg'
import './App.css';


function App() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center">
      {/* Particles Background */}
      <ParticlesBg />

      <div className="absolute inset-0 flex flex-col justify-between z-10">
        {/* Top Section: Branding and Sign In Button */}
        <div className="flex justify-between items-center p-6 sm:p-8 md:p-10">
          <div className="text-white text-lg font-semibold">
            <h1 className="text-3xl md:text-4xl font-bold">Nomadica</h1>
            <p className="text-sm md:text-base">Your Adventure, Perfected by AI</p>
          </div>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition">
            Sign In
          </button>
        </div>

        {/* Middle Section: Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center text-white px-4 sm:px-8 lg:px-16">
          {/* Main Text Above the Card */}
          <div className="text-4xl sm:text-5xl md:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12 animate-slide">
            <span className="block">Because Your Journey Deserves to Be</span>
            <span className="text-accent block">as Smart as You Are</span>
          </div>

          {/* Glassmorphism Card with Text Below */}
          <div className="glassmorphic-card p-8 sm:p-10 md:p-12 lg:p-16 rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 w-full md:w-2/3 lg:w-1/2">
            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              Why settle for average when you can travel like a pro? Nomadica’s sleek, AI-powered planner makes every trip effortlessly perfect. Try it once – and see the difference for yourself.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition">
                Create Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

