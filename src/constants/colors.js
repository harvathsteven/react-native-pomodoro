// TODO: Define color constants for themes and UI 

export const colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Secondary colors
  secondary: '#10B981', // Emerald
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Accent colors
  accent: '#F59E0B', // Amber
  accentLight: '#FBBF24',
  accentDark: '#D97706',
  
  // Background colors
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Timer colors
  timerWork: '#EF4444', // Red for work sessions
  timerBreak: '#10B981', // Green for breaks
  timerLongBreak: '#3B82F6', // Blue for long breaks
  
  // Dark theme colors
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textTertiary: '#64748B',
  }
};

export const gradients = {
  primary: ['#6366F1', '#8B5CF6'],
  secondary: ['#10B981', '#059669'],
  accent: ['#F59E0B', '#D97706'],
  timer: ['#EF4444', '#DC2626'],
}; 