import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Weather Data
export const fetchWeather = createAsyncThunk('app/fetchWeather', async (city) => {
  const apiKey = '689e563a4664417e5bbde0e2ba455089'; 
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  return response.data;
});

// Fetch Quote Data
export const fetchQuote = createAsyncThunk('app/fetchQuote', async () => {
  const apiKey = 'yLG8M5Ui3UstBbie2WACFA==zwtG0KDkCgvbHXJl'; // Replace with your actual API key
  const response = await axios.get(
    `https://api.api-ninjas.com/v1/quotes?category=inspirational`, {
      headers: { 'X-Api-Key': apiKey }
    }
  );
  const quotes = response.data;
  
  // Return a random quote from the fetched quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
});

// Fetch Inspirational Images (this can be from any image API)
export const fetchImages = createAsyncThunk('app/fetchImages', async () => {
  const response = await axios.get('https://api.unsplash.com/photos/random?client_id=XFp6L-zULuz0OEIfbsFh9-cowcaMekDMx6VrS-lufSQ&count=5');
  return response.data;
});

// Slice to manage all state
const appSlice = createSlice({
  name: 'app',
  initialState: {
    weather: {
      data: null,
      status: 'idle',
    },
    quote: {
      data: null,
      status: 'idle',
    },
    images: {
      data: [],
      status: 'idle',
    },
    goals: [],
  },
  reducers: {
    // Reducers for goals
    addGoal: (state, action) => {
      const { text, category = 'personal' } = typeof action.payload === 'object' 
        ? action.payload 
        : { text: action.payload };
        
      state.goals.push({ 
        id: Date.now(), 
        text, 
        category, 
        completed: false,
        createdAt: new Date().toISOString()
      });
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
    toggleGoal: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload);
      if (goal) {
        goal.completed = !goal.completed;
        if (goal.completed) {
          goal.completedAt = new Date().toISOString();
        } else {
          delete goal.completedAt;
        }
      }
    },
    updateGoalCategory: (state, action) => {
      const { id, category } = action.payload;
      const goal = state.goals.find((goal) => goal.id === id);
      if (goal) {
        goal.category = category;
      }
    }
  },
  extraReducers: (builder) => {
    // Handle weather API call
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weather.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.status = 'succeeded';
        state.weather.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.weather.status = 'failed';
      })
      // Handle quote API call
      .addCase(fetchQuote.pending, (state) => {
        state.quote.status = 'loading';
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quote.status = 'succeeded';
        state.quote.data = action.payload;
      })
      .addCase(fetchQuote.rejected, (state) => {
        state.quote.status = 'failed';
      })
      // Handle images API call
      .addCase(fetchImages.pending, (state) => {
        state.images.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images.status = 'succeeded';
        state.images.data = action.payload;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.images.status = 'failed';
      });
  },
});

// Export actions for goals management
export const { addGoal, deleteGoal, toggleGoal, updateGoalCategory } = appSlice.actions;

export default appSlice.reducer;
