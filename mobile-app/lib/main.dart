import 'package:flutter/material.dart';

import 'screens/home_screen.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const FoodOrderingApp());
}

class FoodOrderingApp extends StatefulWidget {
  const FoodOrderingApp({super.key});

  @override
  State<FoodOrderingApp> createState() => _FoodOrderingAppState();
}

class _FoodOrderingAppState extends State<FoodOrderingApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food Ordering App',
      themeMode: _themeMode,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.orange,
          brightness: Brightness.dark,
        ),
      ),
      home: SplashScreen(
        nextScreen: HomeScreen(
          isDarkMode: _themeMode == ThemeMode.dark,
          onToggleTheme: _toggleTheme,
        ),
      ),
    );
  }
}
