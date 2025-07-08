import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Divider, IconButton, Menu, Text } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { borderRadius, shadows, spacing, typography } from '../../constants/layout';
import { TASK_CATEGORIES, TASK_PRIORITY, TASK_STATUS } from '../../context/TaskContext';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete, onStartTimer }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const getPriorityColor = () => {
    switch (task.priority) {
      case TASK_PRIORITY.URGENT:
        return '#FF4444';
      case TASK_PRIORITY.HIGH:
        return '#FF8800';
      case TASK_PRIORITY.MEDIUM:
        return '#FFAA00';
      case TASK_PRIORITY.LOW:
        return '#4CAF50';
      default:
        return colors.textSecondary;
    }
  };

  const getPriorityLabel = () => {
    switch (task.priority) {
      case TASK_PRIORITY.URGENT:
        return 'Urgent';
      case TASK_PRIORITY.HIGH:
        return 'High';
      case TASK_PRIORITY.MEDIUM:
        return 'Medium';
      case TASK_PRIORITY.LOW:
        return 'Low';
      default:
        return 'Medium';
    }
  };

  const getCategoryIcon = () => {
    switch (task.category) {
      case TASK_CATEGORIES.WORK:
        return 'briefcase';
      case TASK_CATEGORIES.PERSONAL:
        return 'account';
      case TASK_CATEGORIES.STUDY:
        return 'school';
      case TASK_CATEGORIES.HEALTH:
        return 'heart';
      case TASK_CATEGORIES.FINANCE:
        return 'currency-usd';
      default:
        return 'tag';
    }
  };

  const getCategoryLabel = () => {
    switch (task.category) {
      case TASK_CATEGORIES.WORK:
        return 'Work';
      case TASK_CATEGORIES.PERSONAL:
        return 'Personal';
      case TASK_CATEGORIES.STUDY:
        return 'Study';
      case TASK_CATEGORIES.HEALTH:
        return 'Health';
      case TASK_CATEGORIES.FINANCE:
        return 'Finance';
      default:
        return 'Other';
    }
  };

  const isCompleted = task.status === TASK_STATUS.COMPLETED;

  return (
    <Card style={[styles.card, isCompleted && styles.completedCard]}>
      <Card.Content style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <IconButton
              icon={isCompleted ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
              size={24}
              iconColor={isCompleted ? colors.primary : colors.textSecondary}
              onPress={() => onToggleComplete(task.id)}
            />
            <View style={styles.titleTextContainer}>
              <Text
                style={[styles.title, isCompleted && styles.completedTitle]}
                numberOfLines={2}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text
                  style={[styles.description, isCompleted && styles.completedDescription]}
                  numberOfLines={2}
                >
                  {task.description}
                </Text>
              )}
            </View>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                iconColor={colors.textSecondary}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              leadingIcon="play"
              onPress={() => {
                setMenuVisible(false);
                onStartTimer(task);
              }}
              title="Start Timer"
            />
            <Menu.Item
              leadingIcon="pencil"
              onPress={() => {
                setMenuVisible(false);
                onEdit(task);
              }}
              title="Edit"
            />
            <Divider />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                setMenuVisible(false);
                onDelete(task.id);
              }}
              title="Delete"
              titleStyle={{ color: '#FF4444' }}
            />
          </Menu>
        </View>

        {/* Tags and Info */}
        <View style={styles.tagsContainer}>
          <Chip
            icon={getCategoryIcon()}
            style={styles.categoryChip}
            textStyle={styles.chipText}
          >
            {getCategoryLabel()}
          </Chip>
          <Chip
            style={[styles.priorityChip, { backgroundColor: getPriorityColor() + '20' }]}
            textStyle={[styles.chipText, { color: getPriorityColor() }]}
          >
            {getPriorityLabel()}
          </Chip>
          {task.estimatedPomodoros > 0 && (
            <Chip
              icon="timer"
              style={styles.pomodoroChip}
              textStyle={styles.chipText}
            >
              {task.completedPomodoros}/{task.estimatedPomodoros}
            </Chip>
          )}
        </View>

        {/* Due Date */}
        {task.dueDate && (
          <View style={styles.dueDateContainer}>
            <Text style={styles.dueDateText}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  completedCard: {
    opacity: 0.7,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  completedDescription: {
    color: colors.textTertiary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.full,
  },
  priorityChip: {
    borderRadius: borderRadius.full,
  },
  pomodoroChip: {
    backgroundColor: colors.primary + '20',
    borderRadius: borderRadius.full,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dueDateContainer: {
    marginTop: spacing.xs,
  },
  dueDateText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default TaskItem; 