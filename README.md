# React Native Pomodoro & Task Manager

A modern productivity app combining task management with a Pomodoro timer, built with Expo, React Native Paper, and Victory Native. Features a beautiful UI, comprehensive task management, statistics dashboard, and user settings.

## Features

### ✅ Phase 1: Core Timer Functionality
- **Pomodoro Timer:** Work/break cycles with session controls
- **Session Management:** Work, short break, and long break sessions
- **Progress Tracking:** Visual progress bar and session completion
- **Timer Controls:** Start, pause, reset, and skip functionality
- **Notifications:** Session completion alerts
- **Auto-start:** Optional automatic break session start

### ✅ Phase 2: Task Management
- **Task CRUD Operations:** Create, read, update, and delete tasks
- **Task Categories:** Work, Personal, Study, Health, Finance, Other
- **Priority Levels:** Urgent, High, Medium, Low with color coding
- **Task Status:** Pending, In Progress, Completed with visual indicators
- **Due Dates:** Optional due date setting with web-compatible date picker
- **Pomodoro Integration:** Estimated and completed pomodoro tracking per task
- **Search & Filtering:** Search tasks by title/description, filter by status/category
- **Task Statistics:** Completion rates, daily task counts, and productivity metrics
- **Data Persistence:** AsyncStorage for local task storage

### 🚧 Phase 3: Enhanced Features (Coming Soon)
- **Statistics Dashboard:** Charts and detailed productivity analytics
- **Theme Support:** Light/dark mode switching
- **Timer-Task Integration:** Start timer sessions directly from tasks
- **Advanced Settings:** Customizable timer durations and preferences

## Tech Stack
- [Expo](https://expo.dev) (React Native)
- [Expo Router](https://expo.github.io/router/docs/) (File-based navigation)
- [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design components)
- [Victory Native](https://formidable.com/open-source/victory/docs/native/) (Charts)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (Local storage)
- [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) (Date/time selection)

## Project Structure
```
app/                # Expo Router file-based navigation
  (tabs)/           # Bottom tab screens (Tasks, Timer, Stats, Settings)
  _layout.tsx       # Root layout with providers
  index.tsx         # Redirects to main tab
src/
  components/       # Reusable UI components
    tasks/          # Task-related components
      TaskForm.js   # Task creation/editing modal
      TaskItem.js   # Individual task display
      TaskList.js   # Task list with filtering
    timer/          # Timer components (planned)
    stats/          # Statistics components (planned)
    common/         # Shared UI components
  constants/        # Design tokens (colors, spacing, etc.)
  context/          # Context providers
    TaskContext.js  # Task state management
    TimerContext.js # Timer state management
  screens/          # Main screen implementations
  utils/            # Utility functions
    timeUtils.js    # Time formatting utilities
    notifications.js # Notification helpers
assets/             # Fonts and images
```

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harvathsteven/react-native-pomodoro.git
   cd react-native-pomodoro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   - **Web:** `npx expo start --web`
   - **Mobile (Expo Go):** `npx expo start`
   - **iOS Simulator:** `npx expo start --ios`
   - **Android Emulator:** `npx expo start --android`

## Usage

### Task Management
- **Create Tasks:** Tap the + FAB button to add new tasks
- **Edit Tasks:** Long press or use the menu on any task
- **Complete Tasks:** Tap the checkbox to mark tasks as complete
- **Filter Tasks:** Use the filter menu or category chips to organize tasks
- **Search Tasks:** Use the search bar to find specific tasks

### Timer Features
- **Start Timer:** Press the Start button to begin a Pomodoro session
- **Session Types:** Switch between Work, Short Break, and Long Break
- **Progress Tracking:** Watch the progress bar and time remaining
- **Session Controls:** Pause, reset, or skip sessions as needed

## Development Status

### Completed Features
- ✅ Modern UI with React Native Paper components
- ✅ Timer context with session management
- ✅ Task context with CRUD operations
- ✅ Task filtering and search functionality
- ✅ Data persistence with AsyncStorage
- ✅ Web-compatible date picker
- ✅ Responsive design with proper spacing and typography

### In Progress
- 🔄 Timer-Task integration (start timer from task)
- 🔄 Enhanced statistics dashboard
- 🔄 Theme switching functionality

### Planned Features
- 📋 Advanced task analytics
- 📋 Export/import functionality
- 📋 Cloud synchronization
- 📋 Push notifications
- 📋 Custom timer durations
- 📋 Achievement system

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Built with ❤️ using Expo and React Native**

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`