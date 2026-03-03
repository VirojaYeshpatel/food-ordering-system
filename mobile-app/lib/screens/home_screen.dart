import 'package:flutter/material.dart';

import 'voice_ordering_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Welcome! Start Phase 5 AI voice ordering flow.'),
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
            ],
          ),
        ),
      ),
    );
  }
}
