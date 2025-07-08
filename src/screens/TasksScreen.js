import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Divider, FAB, IconButton, Menu, Searchbar, Text } from 'react-native-paper';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { colors } from '../constants/colors';
import { borderRadius, shadows, spacing, typography } from '../constants/layout';
import { TASK_CATEGORIES, TASK_STATUS, useTasks } from '../context/TaskContext';

const TasksScreen = () => {
  const {
    filteredTasks,
    taskStats,
    selectedCategory,
    filterStatus,
    searchQuery,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setSelectedCategory,
    setFilterStatus,
    setSearchQuery,
    clearFilters,
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleAddTask = (taskData) => {
    addTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleUpdateTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(taskId) },
      ]
    );
  };

  const handleStartTimer = (task) => {
    // TODO: Integrate with timer context to start a session for this task
    console.log('Start timer for task:', task.title);
  };

  const handleCategoryPress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
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

  const getCategoryLabel = (category) => {
    switch (category) {
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

  const getStatusLabel = (status) => {
    switch (status) {
      case TASK_STATUS.PENDING:
        return 'Pending';
      case TASK_STATUS.IN_PROGRESS:
        return 'In Progress';
      case TASK_STATUS.COMPLETED:
        return 'Completed';
      default:
        return 'All';
    }
  };

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
            onPress={() => setShowFilterMenu(true)}
          />
          <IconButton
            icon="magnify"
            size={24}
            iconColor={colors.textSecondary}
            onPress={() => setShowSearch(!showSearch)}
          />
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search tasks..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
      )}

      {/* Filter Menu */}
      <Menu
        visible={showFilterMenu}
        onDismiss={() => setShowFilterMenu(false)}
        anchor={<View />}
      >
        <Menu.Item
          leadingIcon="filter"
          onPress={() => {
            setShowFilterMenu(false);
            clearFilters();
          }}
          title="Clear Filters"
        />
        <Divider />
        <Menu.Item
          leadingIcon="clock-outline"
          onPress={() => {
            setShowFilterMenu(false);
            setFilterStatus(TASK_STATUS.PENDING);
          }}
          title="Pending"
        />
        <Menu.Item
          leadingIcon="play-circle-outline"
          onPress={() => {
            setShowFilterMenu(false);
            setFilterStatus(TASK_STATUS.IN_PROGRESS);
          }}
          title="In Progress"
        />
        <Menu.Item
          leadingIcon="check-circle-outline"
          onPress={() => {
            setShowFilterMenu(false);
            setFilterStatus(TASK_STATUS.COMPLETED);
          }}
          title="Completed"
        />
      </Menu>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>{taskStats.today}</Text>
              <Text style={styles.statLabel}>Today's Tasks</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>{taskStats.completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>{taskStats.completionRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {Object.entries(TASK_CATEGORIES).map(([key, value]) => (
              <Chip
                key={key}
                icon={getCategoryIcon(value)}
                selected={selectedCategory === value}
                onPress={() => handleCategoryPress(value)}
                style={styles.categoryChip}
                textStyle={styles.categoryText}
              >
                {getCategoryLabel(value)}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Active Filters */}
        {(selectedCategory || filterStatus || searchQuery) && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Active Filters:</Text>
            <View style={styles.activeFilters}>
              {selectedCategory && (
                <Chip
                  icon="close"
                  onPress={() => setSelectedCategory(null)}
                  style={styles.activeFilterChip}
                >
                  {getCategoryLabel(selectedCategory)}
                </Chip>
              )}
              {filterStatus && (
                <Chip
                  icon="close"
                  onPress={() => setFilterStatus(null)}
                  style={styles.activeFilterChip}
                >
                  {getStatusLabel(filterStatus)}
                </Chip>
              )}
              {searchQuery && (
                <Chip
                  icon="close"
                  onPress={() => setSearchQuery('')}
                  style={styles.activeFilterChip}
                >
                  "{searchQuery}"
                </Chip>
              )}
            </View>
          </View>
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStartTimer={handleStartTimer}
          loading={loading}
        />
      </ScrollView>

      {/* FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowTaskForm(true)}
        color={colors.surface}
      />

      {/* Task Form Modal */}
      <TaskForm
        visible={showTaskForm}
        onDismiss={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialTask={editingTask}
        isEditing={!!editingTask}
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  searchBar: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.full,
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
  filtersContainer: {
    marginBottom: spacing.lg,
  },
  filtersTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  activeFilterChip: {
    backgroundColor: colors.primary + '20',
    borderRadius: borderRadius.full,
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