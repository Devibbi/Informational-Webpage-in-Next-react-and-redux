// Modern robust quote API using ZenQuotes with fallback options
import axios from 'axios';

// Fallback quotes in case the API fails
const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

export default async function handler(req, res) {
  try {
    // Try to fetch from ZenQuotes API
    const apiRes = await axios.get('https://zenquotes.io/api/random', { 
      timeout: 5000,  // 5 second timeout
      headers: { 'User-Agent': 'Inspirational Homepage App' }
    });
    
    const data = apiRes.data && apiRes.data[0];
    
    // Check if we got valid data
    if (data && data.q && data.a) {
      res.status(200).json({ content: data.q, author: data.a });
    } else {
      // Use fallback if data is incomplete
      const fallbackQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      res.status(200).json(fallbackQuote);
    }
  } catch (error) {
    console.error('Quote API error:', error.message);
    
    // Return a random fallback quote
    const fallbackQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.status(200).json(fallbackQuote);
  }
}
