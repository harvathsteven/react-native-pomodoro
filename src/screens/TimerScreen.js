import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, IconButton, ProgressBar } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing, borderRadius, shadows, typography } from '../constants/layout';
import { useTimer, SESSION_TYPES } from '../context/TimerContext';
import { formatTime, formatFocusTime } from '../utils/timeUtils';

const TimerScreen = () => {
  const {
    currentSession,
    timeLeft,
    totalTime,
    progress,
    isRunning,
    isPaused,
    isCompleted,
    completedSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    setSessionType,
  } = useTimer();



  const getSessionColor = () => {
    switch (currentSession) {
      case SESSION_TYPES.WORK:
        return colors.timerWork;
      case SESSION_TYPES.SHORT_BREAK:
        return colors.timerBreak;
      case SESSION_TYPES.LONG_BREAK:
        return colors.timerLongBreak;
      default:
        return colors.primary;
    }
  };

  const getSessionLabel = () => {
    switch (currentSession) {
      case SESSION_TYPES.WORK:
        return 'Focus Session';
      case SESSION_TYPES.SHORT_BREAK:
        return 'Short Break';
      case SESSION_TYPES.LONG_BREAK:
        return 'Long Break';
      default:
        return 'Work Session';
    }
  };

  const getSessionIcon = () => {
    switch (currentSession) {
      case SESSION_TYPES.WORK:
        return 'briefcase';
      case SESSION_TYPES.SHORT_BREAK:
        return 'coffee';
      case SESSION_TYPES.LONG_BREAK:
        return 'bed';
      default:
        return 'timer';
    }
  };

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleSkip = () => {
    skipTimer();
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pomodoro Timer</Text>
        <Text style={styles.headerSubtitle}>Stay focused and productive</Text>
      </View>
      
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Card style={styles.timerCard}>
          <Card.Content style={styles.timerContent}>
            {/* Session Type Indicator */}
            <View style={styles.sessionIndicator}>
              <View style={[styles.sessionDot, { backgroundColor: getSessionColor() }]} />
              <Text style={styles.sessionLabel}>{getSessionLabel()}</Text>
            </View>
            
            {/* Timer Display */}
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              {isCompleted && (
                <Text style={styles.completedText}>Session Complete!</Text>
              )}
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={progress}
                color={getSessionColor()}
                style={styles.progressBar}
              />
            </View>
            
            {/* Session Controls */}
            <View style={styles.sessionControls}>
              <Button
                mode="outlined"
                onPress={() => setSessionType(SESSION_TYPES.WORK)}
                style={[
                  styles.sessionButton,
                  currentSession === SESSION_TYPES.WORK && styles.sessionButtonActive
                ]}
                textColor={currentSession === SESSION_TYPES.WORK ? colors.surface : colors.textPrimary}
              >
                Work
              </Button>
              <Button
                mode="outlined"
                onPress={() => setSessionType(SESSION_TYPES.SHORT_BREAK)}
                style={[
                  styles.sessionButton,
                  currentSession === SESSION_TYPES.SHORT_BREAK && styles.sessionButtonActive
                ]}
                textColor={currentSession === SESSION_TYPES.SHORT_BREAK ? colors.surface : colors.textPrimary}
              >
                Break
              </Button>
            </View>
          </Card.Content>
        </Card>
        
        {/* Timer Controls */}
        <View style={styles.controls}>
          <Button
            mode="contained"
            onPress={handleStartPause}
            style={[styles.controlButton, styles.primaryButton]}
            contentStyle={{ height: 48, justifyContent: 'center' }}
            buttonColor={getSessionColor()}
            textColor={colors.surface}
            disabled={isCompleted}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <View style={styles.secondaryControls}>
            <Button
              mode="outlined"
              onPress={handleReset}
              style={styles.controlButton}
              textColor={colors.textSecondary}
            >
              Reset
            </Button>
            <Button
              mode="outlined"
              onPress={handleSkip}
              style={styles.controlButton}
              textColor={colors.textSecondary}
            >
              Skip
            </Button>
          </View>
        </View>
      </View>
      
      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{completedSessions}</Text>
            <Text style={styles.statLabel}>Sessions Today</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{formatFocusTime(completedSessions)}</Text>
            <Text style={styles.statLabel}>Focus Time</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    ...shadows.sm,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  timerContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  timerCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.lg,
    marginBottom: spacing.xl,
  },
  timerContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  sessionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sessionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  sessionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  timerDisplay: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  completedText: {
    ...typography.body,
    color: colors.success,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceVariant,
  },
  sessionControls: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sessionButton: {
    borderRadius: borderRadius.full,
    borderColor: colors.textTertiary,
  },
  sessionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  controls: {
    alignItems: 'center',
  },
  controlButton: {
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  primaryButton: {
    minWidth: 200,
    height: 48,
  },
  secondaryControls: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  statContent: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  statNumber: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default TimerScreen; 