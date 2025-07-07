import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing, borderRadius, shadows, typography } from '../constants/layout';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Track your productivity and progress</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <IconButton
                    icon="check-circle"
                    size={24}
                    iconColor={colors.success}
                  />
                </View>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Tasks Completed</Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <IconButton
                    icon="timer"
                    size={24}
                    iconColor={colors.primary}
                  />
                </View>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Pomodoros</Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <IconButton
                    icon="clock"
                    size={24}
                    iconColor={colors.accent}
                  />
                </View>
                <Text style={styles.statNumber}>0h 0m</Text>
                <Text style={styles.statLabel}>Focus Time</Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statIconContainer}>
                  <IconButton
                    icon="fire"
                    size={24}
                    iconColor={colors.error}
                  />
                </View>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </Card.Content>
            </Card>
          </View>
        </View>
        
        {/* Weekly Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <Card style={styles.chartCard}>
            <Card.Content style={styles.chartContent}>
              <View style={styles.chartPlaceholder}>
                <IconButton
                  icon="chart-line"
                  size={48}
                  iconColor={colors.textTertiary}
                />
                <Text style={styles.chartPlaceholderText}>Weekly Chart</Text>
                <Text style={styles.chartPlaceholderSubtext}>
                  Your productivity trends will appear here
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>
        
        {/* Category Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <Card style={styles.categoryCard}>
            <Card.Content>
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryDot, { backgroundColor: colors.primary }]} />
                  <Text style={styles.categoryName}>Work</Text>
                </View>
                <Text style={styles.categoryValue}>0 tasks</Text>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryDot, { backgroundColor: colors.secondary }]} />
                  <Text style={styles.categoryName}>Personal</Text>
                </View>
                <Text style={styles.categoryValue}>0 tasks</Text>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryDot, { backgroundColor: colors.accent }]} />
                  <Text style={styles.categoryName}>Study</Text>
                </View>
                <Text style={styles.categoryValue}>0 tasks</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
        
        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Card style={styles.achievementCard}>
            <Card.Content style={styles.achievementContent}>
              <View style={styles.achievementItem}>
                <IconButton
                  icon="trophy"
                  size={32}
                  iconColor={colors.accent}
                />
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>First Task</Text>
                  <Text style={styles.achievementDesc}>Complete your first task</Text>
                </View>
              </View>
              
              <View style={styles.achievementItem}>
                <IconButton
                  icon="fire"
                  size={32}
                  iconColor={colors.error}
                />
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>Streak Master</Text>
                  <Text style={styles.achievementDesc}>Maintain a 7-day streak</Text>
                </View>
              </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  statContent: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  statIconContainer: {
    marginBottom: spacing.sm,
  },
  statNumber: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  chartContent: {
    padding: spacing.xl,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  chartPlaceholderText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  chartPlaceholderSubtext: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  categoryName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  categoryValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  achievementCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  achievementContent: {
    padding: spacing.lg,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  achievementText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  achievementTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  achievementDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default StatsScreen; 