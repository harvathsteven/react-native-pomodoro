import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Statistics</Title>
        <Paragraph>Track your productivity and progress</Paragraph>
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Today's Progress</Title>
            <Text style={styles.statNumber}>0</Text>
            <Paragraph>Tasks Completed</Paragraph>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Pomodoros</Title>
            <Text style={styles.statNumber}>0</Text>
            <Paragraph>Sessions Completed</Paragraph>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Focus Time</Title>
            <Text style={styles.statNumber}>0h 0m</Text>
            <Paragraph>Total Time Focused</Paragraph>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Streak</Title>
            <Text style={styles.statNumber}>0</Text>
            <Paragraph>Days in a Row</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
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
  },
  statsCard: {
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default StatsScreen; 