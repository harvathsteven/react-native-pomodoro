import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB, Card, Title, Paragraph, Chip, IconButton } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing, borderRadius, shadows, typography } from '../constants/layout';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <Text style={styles.headerSubtitle}>Stay focused and productive</Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton
            icon="filter-variant"
            size={24}
            iconColor={colors.textSecondary}
            onPress={() => console.log('Filter tasks')}
          />
          <IconButton
            icon="magnify"
            size={24}
            iconColor={colors.textSecondary}
            onPress={() => console.log('Search tasks')}
          />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Today's Tasks</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card.Content>
          </Card>
        </View>
        
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            <Chip
              icon="briefcase"
              selected
              style={styles.categoryChip}
              textStyle={styles.categoryText}
            >
              Work
            </Chip>
            <Chip
              icon="account"
              style={styles.categoryChip}
              textStyle={styles.categoryText}
            >
              Personal
            </Chip>
            <Chip
              icon="school"
              style={styles.categoryChip}
              textStyle={styles.categoryText}
            >
              Study
            </Chip>
            <Chip
              icon="plus"
              style={styles.categoryChip}
              textStyle={styles.categoryText}
            >
              Add
            </Chip>
          </ScrollView>
        </View>
        
        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <View style={styles.emptyIconContainer}>
                <IconButton
                  icon="checkbox-blank-circle-outline"
                  size={48}
                  iconColor={colors.textTertiary}
                />
              </View>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptySubtitle}>
                Create your first task to start being productive
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      
      {/* FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Add task')}
        color={colors.surface}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerContent: {
    flex: 1,
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
  headerActions: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
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
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    marginHorizontal: -spacing.xs,
  },
  categoryChip: {
    marginHorizontal: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  categoryText: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  emptyContent: {
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyIconContainer: {
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    ...shadows.lg,
  },
});

export default TasksScreen; 