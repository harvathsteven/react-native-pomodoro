// Time formatting utilities

/**
 * Format seconds into MM:SS format
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds into a human-readable duration
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted duration (e.g., "2h 30m" or "45m")
 */
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Format focus time based on completed sessions
 * @param {number} sessions - Number of completed work sessions
 * @param {number} sessionDuration - Duration of each session in minutes
 * @returns {string} Formatted focus time
 */
export const formatFocusTime = (sessions, sessionDuration = 25) => {
  const totalMinutes = sessions * sessionDuration;
  return formatDuration(totalMinutes * 60);
};

/**
 * Calculate progress percentage
 * @param {number} current - Current value
 * @param {number} total - Total value
 * @returns {number} Progress percentage (0-1)
 */
export const calculateProgress = (current, total) => {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(1, (total - current) / total));
};

/**
 * Get time remaining in a more readable format
 * @param {number} seconds - Seconds remaining
 * @returns {string} Human-readable time remaining
 */
export const getTimeRemaining = (seconds) => {
  if (seconds <= 0) return 'Complete';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Convert minutes to seconds
 * @param {number} minutes - Minutes to convert
 * @returns {number} Seconds
 */
export const minutesToSeconds = (minutes) => minutes * 60;

/**
 * Convert seconds to minutes
 * @param {number} seconds - Seconds to convert
 * @returns {number} Minutes
 */
export const secondsToMinutes = (seconds) => Math.floor(seconds / 60); 