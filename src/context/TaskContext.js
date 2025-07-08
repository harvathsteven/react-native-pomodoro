import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Task types and interfaces
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const TASK_CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  STUDY: 'study',
  HEALTH: 'health',
  FINANCE: 'finance',
  OTHER: 'other',
};

// Initial state
const initialState = {
  tasks: [],
  selectedCategory: null,
  filterStatus: null,
  searchQuery: '',
  loading: false,
  error: null,
};

// Action types
const TASK_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_TASKS: 'LOAD_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK_COMPLETE: 'TOGGLE_TASK_COMPLETE',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_FILTER_STATUS: 'SET_FILTER_STATUS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
};

// Reducer
function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case TASK_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case TASK_ACTIONS.LOAD_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: null };
    
    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
        error: null,
      };
    
    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
        error: null,
      };
    
    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        loading: false,
        error: null,
      };
    
    case TASK_ACTIONS.TOGGLE_TASK_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status: task.status === TASK_STATUS.COMPLETED
                  ? TASK_STATUS.PENDING
                  : TASK_STATUS.COMPLETED,
                completedAt: task.status === TASK_STATUS.COMPLETED
                  ? null
                  : new Date().toISOString(),
              }
            : task
        ),
        loading: false,
        error: null,
      };
    
    case TASK_ACTIONS.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    
    case TASK_ACTIONS.SET_FILTER_STATUS:
      return { ...state, filterStatus: action.payload };
    
    case TASK_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case TASK_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        selectedCategory: null,
        filterStatus: null,
        searchQuery: '',
      };
    
    default:
      return state;
  }
}

// Context
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from storage on mount
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Save tasks to storage whenever tasks change
  useEffect(() => {
    saveTasksToStorage();
  }, [state.tasks]);

  const loadTasksFromStorage = async () => {
    try {
      dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: true });
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        dispatch({ type: TASK_ACTIONS.LOAD_TASKS, payload: tasks });
      }
    } catch (error) {
      dispatch({ type: TASK_ACTIONS.SET_ERROR, payload: 'Failed to load tasks' });
    }
  };

  const saveTasksToStorage = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  // Task actions
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      category: taskData.category || TASK_CATEGORIES.OTHER,
      priority: taskData.priority || TASK_PRIORITY.MEDIUM,
      status: TASK_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      completedAt: null,
      dueDate: taskData.dueDate || null,
      estimatedPomodoros: taskData.estimatedPomodoros || 1,
      completedPomodoros: 0,
    };

    dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask });
  };

  const updateTask = (taskId, updates) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, ...updates };
      dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: updatedTask });
    }
  };

  const deleteTask = (taskId) => {
    dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });
  };

  const toggleTaskComplete = (taskId) => {
    dispatch({ type: TASK_ACTIONS.TOGGLE_TASK_COMPLETE, payload: taskId });
  };

  const setSelectedCategory = (category) => {
    dispatch({ type: TASK_ACTIONS.SET_SELECTED_CATEGORY, payload: category });
  };

  const setFilterStatus = (status) => {
    dispatch({ type: TASK_ACTIONS.SET_FILTER_STATUS, payload: status });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: TASK_ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const clearFilters = () => {
    dispatch({ type: TASK_ACTIONS.CLEAR_FILTERS });
  };

  // Filtered tasks
  const getFilteredTasks = () => {
    let filteredTasks = [...state.tasks];

    // Filter by category
    if (state.selectedCategory) {
      filteredTasks = filteredTasks.filter(task => task.category === state.selectedCategory);
    }

    // Filter by status
    if (state.filterStatus) {
      filteredTasks = filteredTasks.filter(task => task.status === state.filterStatus);
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return filteredTasks.sort((a, b) => {
      // Sort by priority first (urgent > high > medium > low)
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // Statistics
  const getTaskStats = () => {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(task => task.status === TASK_STATUS.COMPLETED).length;
    const pendingTasks = state.tasks.filter(task => task.status === TASK_STATUS.PENDING).length;
    const inProgressTasks = state.tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS).length;

    const today = new Date().toDateString();
    const todayTasks = state.tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toDateString();
      return taskDate === today;
    }).length;

    return {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      inProgress: inProgressTasks,
      today: todayTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  };

  const value = {
    ...state,
    filteredTasks: getFilteredTasks(),
    taskStats: getTaskStats(),
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedCategory,
    setFilterStatus,
    setSearchQuery,
    clearFilters,
    loadTasksFromStorage,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook to use task context
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 