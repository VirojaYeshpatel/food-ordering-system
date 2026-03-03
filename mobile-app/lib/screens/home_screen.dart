import 'package:flutter/material.dart';

import 'order_tracking_screen.dart';
import 'voice_ordering_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    super.key,
    required this.onToggleTheme,
    required this.isDarkMode,
  });

  final VoidCallback onToggleTheme;
  final bool isDarkMode;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          IconButton(
            onPressed: onToggleTheme,
            tooltip: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
            icon: Icon(isDarkMode ? Icons.light_mode : Icons.dark_mode),
          ),
          IconButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Notifications will be available in a future update.'),
                ),
              );
            },
            tooltip: 'Notifications',
            icon: const Icon(Icons.notifications_none),
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Welcome! Start Phase 6 production enhancements.'),
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (_) => const VoiceOrderingScreen(),
                    ),
                  );
                },
                icon: const Icon(Icons.mic),
                label: const Text('AI Voice Ordering'),
              ),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (_) => const OrderTrackingScreen(),
                    ),
                  );
                },
                icon: const Icon(Icons.local_shipping_outlined),
                label: const Text('Track Active Order'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
