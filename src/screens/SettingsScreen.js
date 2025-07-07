import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Switch, List } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Settings</Title>
        <Paragraph>Customize your app experience</Paragraph>
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title>Appearance</Title>
            <List.Item
              title="Dark Mode"
              description="Switch between light and dark themes"
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                />
              )}
            />
          </Card.Content>
        </Card>
        
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title>Notifications</Title>
            <List.Item
              title="Timer Notifications"
              description="Get notified when timer sessions end"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                />
              )}
            />
            <List.Item
              title="Sound Effects"
              description="Play sounds for timer events"
              right={() => (
                <Switch
                  value={sound}
                  onValueChange={setSound}
                />
              )}
            />
          </Card.Content>
        </Card>
        
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title>Timer Settings</Title>
            <List.Item
              title="Work Duration"
              description="25 minutes"
              right={() => <Text>25 min</Text>}
            />
            <List.Item
              title="Short Break"
              description="5 minutes"
              right={() => <Text>5 min</Text>}
            />
            <List.Item
              title="Long Break"
              description="15 minutes"
              right={() => <Text>15 min</Text>}
            />
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
  settingsCard: {
    marginBottom: 16,
  },
});

export default SettingsScreen; 