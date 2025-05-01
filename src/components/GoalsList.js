import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GoalsList() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [showCompleted, setShowCompleted] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('inspirational-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inspirational-goals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      const newGoalItem = {
        id: Date.now(),
        text: newGoal,
        category: selectedCategory,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      setGoals(prevGoals => [...prevGoals, newGoalItem]);
      setNewGoal('');
    }
  };

  const handleToggleGoal = (id) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === id 
          ? { 
              ...goal, 
              completed: !goal.completed,
              completedAt: !goal.completed ? new Date().toISOString() : undefined
            } 
          : goal
      )
    );
  };

  const handleDeleteGoal = (id) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  };
  
  const startEditing = (goal) => {
    setIsEditing(goal.id);
    setEditText(goal.text);
  };
  
  const saveEdit = () => {
    if (editText.trim()) {
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal.id === isEditing 
            ? { ...goal, text: editText } 
            : goal
        )
      );
    }
    setIsEditing(null);
  };
  
  const cancelEdit = () => {
    setIsEditing(null);
    setEditText('');
  };

  // Filter goals based on category and completion status
  const filteredGoals = goals
    .filter(goal => activeCategory === 'all' || goal.category === activeCategory)
    .filter(goal => showCompleted || !goal.completed)
    .sort((a, b) => {
      // Sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const categories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'work', label: 'Work', icon: '💼' },
    { id: 'health', label: 'Health', icon: '💪' },
    { id: 'learning', label: 'Learning', icon: '📚' }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'personal': return 'from-purple-500 to-indigo-500';
      case 'work': return 'from-blue-500 to-cyan-500';
      case 'health': return 'from-green-500 to-emerald-500';
      case 'learning': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };
  
  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📋';
  };
  
  // Get stats
  const stats = {
    total: goals.length,
    completed: goals.filter(goal => goal.completed).length,
    categories: categories.filter(cat => cat.id !== 'all').map(cat => ({
      ...cat,
      count: goals.filter(goal => goal.category === cat.id).length
    }))
  };

  return (
    <div className="relative goals-container">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-6 text-center">Goal Setting</h2>
      
      {/* Stats Bar */}
      <div className="mb-6 p-4 bg-white/30 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              {stats.completed}/{stats.total}
            </div>
            <div>
              <p className="text-sm text-gray-600">Goals Completed</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                  style={{ width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            {stats.categories.map(cat => (
              <div key={cat.id} className="text-center px-2">
                <div className={`text-xs font-medium bg-gradient-to-r ${getCategoryColor(cat.id)} text-white rounded-full px-2 py-1`}>
                  {cat.icon} {cat.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Goal Form */}
      <form onSubmit={handleAddGoal} className="mb-6">
        <div className="flex flex-col gap-3 glass-card p-4 rounded-xl">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm bg-white/70"
          />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pl-10 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm bg-white/70"
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {getCategoryIcon(selectedCategory)}
                </span>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary py-3 px-6 sm:w-auto w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Add Goal
              </span>
            </button>
          </div>
        </div>
      </form>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md transform scale-105'
                    : 'bg-white/30 backdrop-blur-sm text-gray-700 hover:bg-white/50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <span className="mr-2 text-sm text-gray-700">Show Completed</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <div className="text-center py-10 glass-card rounded-xl">
          <svg className="w-16 h-16 mx-auto text-purple-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600 text-lg">
            {activeCategory === 'all' 
              ? "You haven't set any goals yet." 
              : `No goals in the ${activeCategory} category.`}
          </p>
          <p className="text-gray-500 mt-2">Add a goal to get started on your journey!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredGoals.map(goal => (
            <motion.li 
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-xl transition-all duration-300 glass-card hover:shadow-lg ${
                goal.completed 
                  ? 'bg-opacity-70 border-green-200' 
                  : 'bg-opacity-60 border-purple-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleGoal(goal.id)}
                  className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    goal.completed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' 
                      : 'border-2 border-purple-400 bg-white/50'
                  }`}
                  aria-label={goal.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {goal.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <div className="flex-1">
                  {isEditing === goal.id ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm bg-white/70"
                        autoFocus
                      />
                      <button 
                        onClick={saveEdit}
                        className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p 
                      className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'} font-medium transition-all duration-300`}
                      onClick={() => startEditing(goal)}
                    >
                      {goal.text}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center mt-2 text-xs gap-2">
                    <span className={`px-2 py-1 rounded-full text-white text-xs bg-gradient-to-r ${getCategoryColor(goal.category)} flex items-center gap-1`}>
                      <span>{getCategoryIcon(goal.category)}</span>
                      <span>{goal.category}</span>
                    </span>
                    
                    <span className="text-gray-500 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(goal.createdAt).toLocaleDateString()}
                    </span>
                    
                    {goal.completed && goal.completedAt && (
                      <span className="text-green-600 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {new Date(goal.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {isEditing !== goal.id && (
                    <button
                      onClick={() => startEditing(goal)}
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-300 p-1 rounded-full hover:bg-white/30"
                      aria-label="Edit goal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-white/30"
                    aria-label="Delete goal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
