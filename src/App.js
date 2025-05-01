import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Weather from './components/Weather';
import Quote from './components/Quote';
import ImageGallery from './components/ImageGallery';
import GoalsList from './components/GoalsList';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/30 via-indigo-300/20 to-pink-300/30 bg-fixed p-4">
      <Provider store={store}>
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-extrabold heading-gradient mb-4">
              Inspirational Homepage
            </h1>
            <p className="text-xl text-purple-700 max-w-2xl mx-auto">
              Your daily dose of motivation, beautiful imagery, and personal goals tracking
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="glass-card p-6 rounded-3xl shadow-xl">
              <Quote />
            </div>
            <div className="glass-card p-6 rounded-3xl shadow-xl">
              <Weather />
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl shadow-xl mb-6">
            <ImageGallery />
          </div>
          
          <div className="glass-card p-6 rounded-3xl shadow-xl mb-6">
            <GoalsList />
          </div>
          
          <footer className="text-center text-sm text-gray-600 mt-8">
            <p> 2025 Inspirational Homepage • Made with and React</p>
          </footer>
        </div>
      </Provider>
    </div>
  );
}

export default App;
