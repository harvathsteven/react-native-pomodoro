import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, Card, Title, Paragraph } from 'react-native-paper';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Tasks</Title>
        <Paragraph>Manage your tasks and stay productive</Paragraph>
      </View>
      
      <View style={styles.content}>
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Title>No tasks yet</Title>
            <Paragraph>Tap the + button to add your first task</Paragraph>
          </Card.Content>
        </Card>
      </View>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Add task')}
      />
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
  emptyCard: {
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TasksScreen; 