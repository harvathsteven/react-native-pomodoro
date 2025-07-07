import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, IconButton, ProgressBar } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing, borderRadius, shadows, typography } from '../constants/layout';

const TimerScreen = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // work, short-break, long-break

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = 25 * 60; // 25 minutes
    return (totalTime - time) / totalTime;
  };

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work':
        return colors.timerWork;
      case 'short-break':
        return colors.timerBreak;
      case 'long-break':
        return colors.timerLongBreak;
      default:
        return colors.primary;
    }
  };

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work':
        return 'Focus Session';
      case 'short-break':
        return 'Short Break';
      case 'long-break':
        return 'Long Break';
      default:
        return 'Work Session';
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  const handleSkip = () => {
    // Cycle through session types
    const types = ['work', 'short-break', 'long-break'];
    const currentIndex = types.indexOf(sessionType);
    const nextIndex = (currentIndex + 1) % types.length;
    setSessionType(types[nextIndex]);
    setTime(25 * 60);
    setIsRunning(false);
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
              <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={getProgress()}
                color={getSessionColor()}
                style={styles.progressBar}
              />
            </View>
            
            {/* Session Controls */}
            <View style={styles.sessionControls}>
              <Button
                mode="outlined"
                onPress={() => setSessionType('work')}
                style={[
                  styles.sessionButton,
                  sessionType === 'work' && styles.sessionButtonActive
                ]}
                textColor={sessionType === 'work' ? colors.surface : colors.textPrimary}
              >
                Work
              </Button>
              <Button
                mode="outlined"
                onPress={() => setSessionType('short-break')}
                style={[
                  styles.sessionButton,
                  sessionType === 'short-break' && styles.sessionButtonActive
                ]}
                textColor={sessionType === 'short-break' ? colors.surface : colors.textPrimary}
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
            onPress={isRunning ? handlePause : handleStart}
            style={[styles.controlButton, styles.primaryButton]}
            contentStyle={{ height: 48, justifyContent: 'center' }}
            buttonColor={getSessionColor()}
            textColor={colors.surface}
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
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Sessions Today</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>0h 0m</Text>
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
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
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