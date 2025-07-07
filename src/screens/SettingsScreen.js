import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Switch, List, Divider, IconButton } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing, borderRadius, shadows, typography } from '../constants/layout';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const [autoStart, setAutoStart] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your app experience</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <List.Item
                title="Dark Mode"
                description="Switch between light and dark themes"
                left={(props) => (
                  <List.Icon {...props} icon="theme-light-dark" color={colors.primary} />
                )}
                right={() => (
                  <Switch
                    value={isDarkMode}
                    onValueChange={setIsDarkMode}
                    color={colors.primary}
                  />
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
            </Card.Content>
          </Card>
        </View>
        
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <List.Item
                title="Timer Notifications"
                description="Get notified when timer sessions end"
                left={(props) => (
                  <List.Icon {...props} icon="bell" color={colors.secondary} />
                )}
                right={() => (
                  <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    color={colors.secondary}
                  />
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Sound Effects"
                description="Play sounds for timer events"
                left={(props) => (
                  <List.Icon {...props} icon="volume-high" color={colors.accent} />
                )}
                right={() => (
                  <Switch
                    value={sound}
                    onValueChange={setSound}
                    color={colors.accent}
                  />
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
            </Card.Content>
          </Card>
        </View>
        
        {/* Timer Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timer Settings</Text>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <List.Item
                title="Work Duration"
                description="25 minutes"
                left={(props) => (
                  <List.Icon {...props} icon="timer" color={colors.timerWork} />
                )}
                right={() => (
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>25 min</Text>
                    <IconButton
                      icon="chevron-right"
                      size={20}
                      iconColor={colors.textTertiary}
                    />
                  </View>
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                onPress={() => console.log('Edit work duration')}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Short Break"
                description="5 minutes"
                left={(props) => (
                  <List.Icon {...props} icon="coffee" color={colors.timerBreak} />
                )}
                right={() => (
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>5 min</Text>
                    <IconButton
                      icon="chevron-right"
                      size={20}
                      iconColor={colors.textTertiary}
                    />
                  </View>
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                onPress={() => console.log('Edit short break')}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Long Break"
                description="15 minutes"
                left={(props) => (
                  <List.Icon {...props} icon="bed" color={colors.timerLongBreak} />
                )}
                right={() => (
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>15 min</Text>
                    <IconButton
                      icon="chevron-right"
                      size={20}
                      iconColor={colors.textTertiary}
                    />
                  </View>
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                onPress={() => console.log('Edit long break')}
              />
            </Card.Content>
          </Card>
        </View>
        
        {/* Behavior */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior</Text>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <List.Item
                title="Auto-start Breaks"
                description="Automatically start break sessions"
                left={(props) => (
                  <List.Icon {...props} icon="play-circle" color={colors.info} />
                )}
                right={() => (
                  <Switch
                    value={autoStart}
                    onValueChange={setAutoStart}
                    color={colors.info}
                  />
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
            </Card.Content>
          </Card>
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <List.Item
                title="Version"
                description="1.0.0"
                left={(props) => (
                  <List.Icon {...props} icon="information" color={colors.textSecondary} />
                )}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Privacy Policy"
                left={(props) => (
                  <List.Icon {...props} icon="shield" color={colors.textSecondary} />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    size={20}
                    iconColor={colors.textTertiary}
                  />
                )}
                titleStyle={styles.listItemTitle}
                onPress={() => console.log('Privacy Policy')}
              />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  cardContent: {
    padding: 0,
  },
  listItemTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  listItemDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    backgroundColor: colors.surfaceVariant,
    marginHorizontal: spacing.lg,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
});

export default SettingsScreen; 