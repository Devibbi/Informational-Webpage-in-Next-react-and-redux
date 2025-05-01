import React, { useEffect, useState } from 'react';

export default function Quote() {
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
    <div className="relative">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-6 text-center">Daily Inspiration</h2>
      
      {loading && (
        <div className="text-center py-6">
          <div className="animate-pulse-slow">
            <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-purple-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-purple-200 rounded w-2/3 mx-auto"></div>
            <div className="mt-4 h-3 bg-purple-100 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-6">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchQuote} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}
      
      {quote && !loading && !error && (
        <div className="text-center py-4">
          <div className="relative">
            <svg className="absolute -top-6 -left-2 w-12 h-12 text-purple-300 opacity-50" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <blockquote className="italic text-gray-800 text-xl mb-4 px-8">
              "{quote.content}"
            </blockquote>
            <svg className="absolute -bottom-6 -right-2 w-12 h-12 text-purple-300 opacity-50 transform rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <footer className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mt-6">
            — {quote.author}
          </footer>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={fetchQuote}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'New Quote'}
        </button>
      </div>
    </div>
  );
}