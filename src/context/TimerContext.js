import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { showWorkSessionComplete, showBreakSessionComplete, showLongBreakComplete } from '../utils/notifications';

// Timer session types
export const SESSION_TYPES = {
  WORK: 'work',
  SHORT_BREAK: 'short-break',
  LONG_BREAK: 'long-break',
};

// Timer states
export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// Default timer durations (in seconds)
const DEFAULT_DURATIONS = {
  [SESSION_TYPES.WORK]: 25 * 60, // 25 minutes
  [SESSION_TYPES.SHORT_BREAK]: 5 * 60, // 5 minutes
  [SESSION_TYPES.LONG_BREAK]: 15 * 60, // 15 minutes
};

// Action types
const ACTIONS = {
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  SKIP_TIMER: 'SKIP_TIMER',
  TICK: 'TICK',
  SET_SESSION_TYPE: 'SET_SESSION_TYPE',
  SET_DURATION: 'SET_DURATION',
  COMPLETE_SESSION: 'COMPLETE_SESSION',
};

// Initial state
const initialState = {
  currentSession: SESSION_TYPES.WORK,
  timeLeft: DEFAULT_DURATIONS[SESSION_TYPES.WORK],
  totalTime: DEFAULT_DURATIONS[SESSION_TYPES.WORK],
  timerState: TIMER_STATES.IDLE,
  durations: DEFAULT_DURATIONS,
  completedSessions: 0,
  autoStartBreaks: false,
};

// Reducer function
function timerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER:
      return {
        ...state,
        timerState: TIMER_STATES.RUNNING,
      };
    
    case ACTIONS.PAUSE_TIMER:
      return {
        ...state,
        timerState: TIMER_STATES.PAUSED,
      };
    
    case ACTIONS.RESET_TIMER:
      return {
        ...state,
        timeLeft: state.durations[state.currentSession],
        totalTime: state.durations[state.currentSession],
        timerState: TIMER_STATES.IDLE,
      };
    
    case ACTIONS.SKIP_TIMER:
      const sessionTypes = Object.values(SESSION_TYPES);
      const currentIndex = sessionTypes.indexOf(state.currentSession);
      const nextIndex = (currentIndex + 1) % sessionTypes.length;
      const nextSession = sessionTypes[nextIndex];
      
      return {
        ...state,
        currentSession: nextSession,
        timeLeft: state.durations[nextSession],
        totalTime: state.durations[nextSession],
        timerState: TIMER_STATES.IDLE,
      };
    
    case ACTIONS.TICK:
      if (state.timeLeft <= 1) {
        return {
          ...state,
          timeLeft: 0,
          timerState: TIMER_STATES.COMPLETED,
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    
    case ACTIONS.SET_SESSION_TYPE:
      const newSession = action.payload;
      return {
        ...state,
        currentSession: newSession,
        timeLeft: state.durations[newSession],
        totalTime: state.durations[newSession],
        timerState: TIMER_STATES.IDLE,
      };
    
    case ACTIONS.SET_DURATION:
      const { sessionType, duration } = action.payload;
      const newDurations = { ...state.durations, [sessionType]: duration };
      return {
        ...state,
        durations: newDurations,
        timeLeft: state.currentSession === sessionType ? duration : state.timeLeft,
        totalTime: state.currentSession === sessionType ? duration : state.totalTime,
      };
    
    case ACTIONS.COMPLETE_SESSION:
      return {
        ...state,
        completedSessions: state.completedSessions + 1,
      };
    
    default:
      return state;
  }
}

// Create context
const TimerContext = createContext();

// Provider component
export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const [intervalId, setIntervalId] = React.useState(null);

  // Timer tick effect
  useEffect(() => {
    if (state.timerState === TIMER_STATES.RUNNING) {
      const id = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state.timerState]);

  // Handle session completion
  useEffect(() => {
    if (state.timerState === TIMER_STATES.COMPLETED) {
      dispatch({ type: ACTIONS.COMPLETE_SESSION });
      
      // Show appropriate notification based on session type
      switch (state.currentSession) {
        case SESSION_TYPES.WORK:
          showWorkSessionComplete();
          break;
        case SESSION_TYPES.SHORT_BREAK:
          showBreakSessionComplete();
          break;
        case SESSION_TYPES.LONG_BREAK:
          showLongBreakComplete();
          break;
        default:
          break;
      }
      
      // Auto-start next session if enabled and current session was work
      if (state.autoStartBreaks && state.currentSession === SESSION_TYPES.WORK) {
        setTimeout(() => {
          dispatch({ type: ACTIONS.SKIP_TIMER });
          dispatch({ type: ACTIONS.START_TIMER });
        }, 1000);
      }
    }
  }, [state.timerState, state.autoStartBreaks, state.currentSession]);

  // Actions
  const startTimer = useCallback(() => {
    dispatch({ type: ACTIONS.START_TIMER });
  }, []);

  const pauseTimer = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_TIMER });
  }, []);

  const resetTimer = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_TIMER });
  }, []);

  const skipTimer = useCallback(() => {
    dispatch({ type: ACTIONS.SKIP_TIMER });
  }, []);

  const setSessionType = useCallback((sessionType) => {
    dispatch({ type: ACTIONS.SET_SESSION_TYPE, payload: sessionType });
  }, []);

  const setDuration = useCallback((sessionType, duration) => {
    dispatch({ type: ACTIONS.SET_DURATION, payload: { sessionType, duration } });
  }, []);

  const setAutoStartBreaks = useCallback((enabled) => {
    // This would be handled in settings, but we can add it to state
    // For now, we'll handle this in the settings screen
  }, []);

  // Computed values
  const progress = state.totalTime > 0 ? (state.totalTime - state.timeLeft) / state.totalTime : 0;
  const isRunning = state.timerState === TIMER_STATES.RUNNING;
  const isPaused = state.timerState === TIMER_STATES.PAUSED;
  const isCompleted = state.timerState === TIMER_STATES.COMPLETED;

  const value = {
    // State
    currentSession: state.currentSession,
    timeLeft: state.timeLeft,
    totalTime: state.totalTime,
    timerState: state.timerState,
    durations: state.durations,
    completedSessions: state.completedSessions,
    autoStartBreaks: state.autoStartBreaks,
    
    // Computed values
    progress,
    isRunning,
    isPaused,
    isCompleted,
    
    // Actions
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    setSessionType,
    setDuration,
    setAutoStartBreaks,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

// Custom hook to use timer context
export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 