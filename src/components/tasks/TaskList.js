import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { borderRadius, shadows, spacing, typography } from '../../constants/layout';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onStartTimer,
  loading = false,
}) => {
  const renderEmptyState = () => (
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
          <Text style={styles.emptyTitle}>No tasks found</Text>
          <Text style={styles.emptySubtitle}>
            {tasks.length === 0
              ? 'Create your first task to start being productive'
              : 'Try adjusting your filters or search terms'}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  const renderTaskItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      onStartTimer={onStartTimer}
    />
  );

  const renderSectionHeader = ({ section }) => {
    if (!section.title) return null;
    
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionCount}>{section.data.length} tasks</Text>
      </View>
    );
  };

  const groupTasksByStatus = (tasks) => {
    const groups = {
      inProgress: { title: 'In Progress', data: [] },
      pending: { title: 'Pending', data: [] },
      completed: { title: 'Completed', data: [] },
    };

    tasks.forEach(task => {
      if (task.status === 'in_progress') {
        groups.inProgress.data.push(task);
      } else if (task.status === 'completed') {
        groups.completed.data.push(task);
      } else {
        groups.pending.data.push(task);
      }
    });

    // Only return sections that have tasks
    return Object.values(groups).filter(section => section.data.length > 0);
  };

  const sections = groupTasksByStatus(tasks);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Card style={styles.loadingCard}>
          <Card.Content style={styles.loadingContent}>
            <IconButton
              icon="loading"
              size={32}
              iconColor={colors.primary}
              animated
            />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  if (tasks.length === 0) {
    return renderEmptyState();
  }

  return (
    <FlatList
      data={sections}
      keyExtractor={(item, index) => `section-${index}`}
      renderItem={({ item: section }) => (
        <View style={styles.section}>
          {renderSectionHeader({ section })}
          <FlatList
            data={section.data}
            keyExtractor={(item) => item.id}
            renderItem={renderTaskItem}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  sectionCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  loadingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  loadingContent: {
    alignItems: 'center',
    padding: spacing.xxl,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default TaskList; 