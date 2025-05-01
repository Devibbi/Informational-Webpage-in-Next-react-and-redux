import React, { useState, useEffect } from 'react';
import WeatherTime from './WeatherTime';
import ImageGallery from './ImageGallery';
import GoalsList from './GoalsList';

export default function HomeClient() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchQuote() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/quote');
      if (!res.ok) throw new Error('Failed to fetch quote');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-300 opacity-40 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 left-[-8rem] top-[-6rem]" />
        <div className="absolute w-96 h-96 bg-indigo-200 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob2 right-[-8rem] top-1/3" />
        <div className="absolute w-96 h-96 bg-pink-200 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob3 left-1/2 bottom-[-8rem]" />
      </div>
      <section className="w-full flex flex-col items-center mb-8 z-10 animate-fadeInUp">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-500 drop-shadow-xl mb-4 tracking-tight uppercase">Inspiration Hub</h1>
        <p className="text-lg text-gray-700 bg-white/60 rounded-xl px-6 py-2 mb-4 shadow-md font-medium">Your daily source of motivation, beauty, and clarity.</p>
        <WeatherTime />
      </section>
      <section className="w-full flex flex-col items-center z-10 animate-fadeInUp">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 drop-shadow-lg mb-6 uppercase tracking-wide">Gallery & Quotes</h2>
        <ImageGallery
          quote={quote}
          author={quote?.author}
          loadingQuote={loading}
          errorQuote={error}
          onNewQuote={fetchQuote}
        />
      </section>
      
      <section className="w-full max-w-3xl mx-auto mt-12 z-10 animate-fadeInUp">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 drop-shadow-lg mb-6 uppercase tracking-wide text-center">Goals</h2>
          <GoalsList />
        </div>
      </section>
      
      <footer className="mt-16 mb-4 text-center w-full z-10 animate-fadeInUp">
        <div className="inline-block glass-card px-6 py-3 bg-white/60 rounded-xl shadow-lg border border-white/30 flex flex-col items-center">
          <span className="text-gray-700 font-medium">Made with ❤️ & Next.js • &copy; {new Date().getFullYear()} Inspiration Homepage</span>
          <svg className="mt-4 w-16 h-16 text-pink-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </footer>
    </main>
  );
}

// Remove any accidental SVG or shape below
// If you see a shape at the bottom, it may be from a test div, SVG, or leftover code in your layout or a component. Ensure no extra elements are rendered after the closing </main>.
