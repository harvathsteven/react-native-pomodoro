import { Alert } from 'react-native';

/**
 * Show a notification when a timer session completes
 * @param {string} sessionType - Type of session that completed
 * @param {string} sessionName - Human-readable session name
 */
export const showSessionCompleteNotification = (sessionType, sessionName) => {
  Alert.alert(
    'Session Complete!',
    `${sessionName} has finished. Great job!`,
    [
      {
        text: 'Continue',
        style: 'default',
      },
      {
        text: 'Start Next',
        style: 'default',
        onPress: () => {
          // This will be handled by the timer context
          console.log('User chose to start next session');
        },
      },
    ],
    { cancelable: false }
  );
};

/**
 * Show a notification when a work session completes
 */
export const showWorkSessionComplete = () => {
  showSessionCompleteNotification('work', 'Work Session');
};

/**
 * Show a notification when a break session completes
 */
export const showBreakSessionComplete = () => {
  showSessionCompleteNotification('break', 'Break Session');
};

/**
 * Show a notification for long break completion
 */
export const showLongBreakComplete = () => {
  showSessionCompleteNotification('long-break', 'Long Break');
};

/**
 * Show a custom notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {Array} buttons - Array of button objects
 */
export const showCustomNotification = (title, message, buttons = []) => {
  Alert.alert(title, message, buttons, { cancelable: true });
};

/**
 * Show a confirmation dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Function} onConfirm - Function to call on confirm
 * @param {Function} onCancel - Function to call on cancel
 */
export const showConfirmation = (title, message, onConfirm, onCancel) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
}; 