# React Native Pomodoro & Task Manager

A modern productivity app combining task management with a Pomodoro timer, built with Expo, React Native Paper, and Victory Native. Features a beautiful UI, statistics dashboard, and user settings.

## Features
- **Task Management:** Create, edit, complete, and organize tasks by category
- **Pomodoro Timer:** Work/break cycles, session controls, and progress tracking
- **Statistics Dashboard:** Visualize productivity with charts and quick stats
- **User Settings:** Theme, timer durations, and notification preferences

## Tech Stack
- [Expo](https://expo.dev) (React Native)
- [Expo Router](https://expo.github.io/router/docs/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Victory Native](https://formidable.com/open-source/victory/docs/native/) (charts)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Folder Structure
```
app/                # Expo Router file-based navigation
  (tabs)/           # Bottom tab screens (Tasks, Timer, Stats, Settings)
  _layout.tsx       # Root layout with providers
  index.tsx         # Redirects to main tab
src/
  components/       # Reusable UI components
  constants/        # Design tokens (colors, spacing, etc.)
  context/          # Context providers (tasks, theme)
  hooks/            # Custom hooks
  screens/          # Main screen implementations
  utils/            # Utility functions
assets/             # Fonts and images
```

## Setup
1. **Clone the repo:**
   ```bash
   git clone https://github.com/harvathsteven/react-native-pomodoro.git
   cd react-native-pomodoro
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the app:**
   - For web:
     ```bash
     npx expo start --web
     ```
   - For mobile (Expo Go or simulator):
     ```bash
     npx expo start
     ```

## Screenshots
<!-- Add screenshots here when available -->

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`