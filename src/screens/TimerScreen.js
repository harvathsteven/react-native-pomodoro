import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';

const TimerScreen = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Pomodoro Timer</Title>
        <Paragraph>Focus on your tasks with timed work sessions</Paragraph>
      </View>
      
      <View style={styles.content}>
        <Card style={styles.timerCard}>
          <Card.Content>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
            <Paragraph style={styles.timerLabel}>Work Session</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.controls}>
          <Button
            mode="contained"
            onPress={isRunning ? handlePause : handleStart}
            style={styles.button}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            mode="outlined"
            onPress={handleReset}
            style={styles.button}
          >
            Reset
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  timerCard: {
    marginBottom: 40,
  },
  timerText: {
    fontSize: 72,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timerLabel: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default TimerScreen; 