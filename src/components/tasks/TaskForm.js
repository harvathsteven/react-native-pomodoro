import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    Chip,
    IconButton,
    Modal,
    Portal,
    Text,
    TextInput
} from 'react-native-paper';
import { colors } from '../../constants/colors';
import { borderRadius, shadows, spacing, typography } from '../../constants/layout';
import { TASK_CATEGORIES, TASK_PRIORITY } from '../../context/TaskContext';

const TaskForm = ({ visible, onDismiss, onSubmit, initialTask = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: TASK_CATEGORIES.WORK,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: null,
    estimatedPomodoros: 1,
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialTask && isEditing) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description || '',
        category: initialTask.category,
        priority: initialTask.priority,
        dueDate: initialTask.dueDate ? new Date(initialTask.dueDate) : null,
        estimatedPomodoros: initialTask.estimatedPomodoros || 1,
      });
    } else {
      resetForm();
    }
  }, [initialTask, isEditing, visible]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: TASK_CATEGORIES.WORK,
      priority: TASK_PRIORITY.MEDIUM,
      dueDate: null,
      estimatedPomodoros: 1,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.estimatedPomodoros < 1) {
      newErrors.estimatedPomodoros = 'Must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const taskData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate ? formData.dueDate.toISOString() : null,
      };

      onSubmit(taskData);
      resetForm();
      onDismiss();
    }
  };

  const handleCancel = () => {
    resetForm();
    onDismiss();
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'web') {
      // For web, we need to handle the event differently
      if (selectedDate) {
        setFormData(prev => ({ ...prev, dueDate: selectedDate }));
      }
      setShowDatePicker(false);
    } else {
      // For mobile platforms
      setShowDatePicker(false);
      if (selectedDate) {
        setFormData(prev => ({ ...prev, dueDate: selectedDate }));
      }
    }
  };

  const removeDueDate = () => {
    setFormData(prev => ({ ...prev, dueDate: null }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  // Web-specific date input
  const renderWebDateInput = () => (
    <View style={styles.dateContainer}>
      <input
        type="date"
        value={formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : ''}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : null;
          setFormData(prev => ({ ...prev, dueDate: date }));
        }}
        min={new Date().toISOString().split('T')[0]}
        style={{
          flex: 1,
          padding: 12,
          borderWidth: 1,
          borderColor: colors.textTertiary,
          borderRadius: 8,
          backgroundColor: colors.surface,
          color: colors.textPrimary,
          fontSize: 16,
        }}
      />
      {formData.dueDate && (
        <IconButton
          icon="close"
          size={20}
          onPress={removeDueDate}
          iconColor={colors.textSecondary}
        />
      )}
    </View>
  );

  // Mobile-specific date button
  const renderMobileDateButton = () => (
    <View style={styles.dateContainer}>
      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
        icon="calendar"
      >
        {formData.dueDate
          ? formData.dueDate.toLocaleDateString()
          : 'Set due date'}
      </Button>
      {formData.dueDate && (
        <IconButton
          icon="close"
          size={20}
          onPress={removeDueDate}
          iconColor={colors.textSecondary}
        />
      )}
    </View>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={styles.modal}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={handleCancel}
              iconColor={colors.textSecondary}
            />
          </View>

          {/* Title */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              mode="outlined"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              placeholder="Enter task title"
              style={styles.input}
              error={!!errors.title}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              mode="outlined"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              placeholder="Enter task description (optional)"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </View>

          {/* Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.chipContainer}>
              {Object.entries(TASK_CATEGORIES).map(([key, value]) => (
                <Chip
                  key={key}
                  icon={getCategoryIcon(value)}
                  selected={formData.category === value}
                  onPress={() => setFormData(prev => ({ ...prev, category: value }))}
                  style={[
                    styles.categoryChip,
                    formData.category === value && styles.selectedChip,
                  ]}
                  textStyle={[
                    styles.chipText,
                    formData.category === value && styles.selectedChipText,
                  ]}
                >
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </Chip>
              ))}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.chipContainer}>
              {Object.entries(TASK_PRIORITY).map(([key, value]) => (
                <Chip
                  key={key}
                  selected={formData.priority === value}
                  onPress={() => setFormData(prev => ({ ...prev, priority: value }))}
                  style={[
                    styles.priorityChip,
                    { backgroundColor: getPriorityColor(value) + '20' },
                    formData.priority === value && styles.selectedChip,
                  ]}
                  textStyle={[
                    styles.chipText,
                    { color: getPriorityColor(value) },
                    formData.priority === value && styles.selectedChipText,
                  ]}
                >
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </Chip>
              ))}
            </View>
          </View>

          {/* Due Date */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Due Date</Text>
            {Platform.OS === 'web' ? renderWebDateInput() : renderMobileDateButton()}
          </View>

          {/* Estimated Pomodoros */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estimated Pomodoros</Text>
            <View style={styles.pomodoroContainer}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => {
                  if (formData.estimatedPomodoros > 1) {
                    setFormData(prev => ({
                      ...prev,
                      estimatedPomodoros: prev.estimatedPomodoros - 1,
                    }));
                  }
                }}
                disabled={formData.estimatedPomodoros <= 1}
              />
              <Text style={styles.pomodoroCount}>{formData.estimatedPomodoros}</Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => {
                  setFormData(prev => ({
                    ...prev,
                    estimatedPomodoros: prev.estimatedPomodoros + 1,
                  }));
                }}
              />
            </View>
            {errors.estimatedPomodoros && (
              <Text style={styles.errorText}>{errors.estimatedPomodoros}</Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={[styles.button, styles.submitButton]}
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </View>
        </ScrollView>

        {/* Date Picker - Only for mobile */}
        {showDatePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={formData.dueDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    maxHeight: '90%',
    ...shadows.lg,
  },
  scrollView: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
  },
  errorText: {
    ...typography.caption,
    color: '#FF4444',
    marginTop: spacing.xs,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.full,
  },
  priorityChip: {
    borderRadius: borderRadius.full,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedChipText: {
    color: colors.surface,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  pomodoroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  pomodoroCount: {
    ...typography.h3,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    minWidth: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: colors.textSecondary,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
});

export default TaskForm; 