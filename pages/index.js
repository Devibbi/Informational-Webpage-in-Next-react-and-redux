import React from 'react';
import Weather from '../src/components/Weather';
import GoalsList from '../src/components/GoalsList';
import Quote from '../src/components/Quote';
import ImageGallery from '../src/components/ImageGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400/30 via-indigo-300/20 to-pink-300/30 bg-fixed p-6 md:p-8">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-purple-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 -left-32 -top-32" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob2 -right-32 top-1/3" />
        <div className="absolute w-[500px] h-[500px] bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob3 left-1/3 -bottom-32" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold heading-gradient mb-4">
            Inspirational Homepage
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto glass-card py-2 px-4 rounded-full inline-block">
            Your daily dose of motivation, beautiful imagery, and personal goals tracking
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="glass-card p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <Quote />
          </div>
          <div className="glass-card p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <Weather />
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mb-8 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <ImageGallery />
        </div>
        
        <div className="glass-card p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mb-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <GoalsList />
        </div>
        
        <footer className="text-center text-gray-600 mt-12 pb-6 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <div className="glass-card py-3 px-6 rounded-full inline-block">
            <p>&copy; {new Date().getFullYear()} Inspirational Homepage • Made with ❤️ and Next.js</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
