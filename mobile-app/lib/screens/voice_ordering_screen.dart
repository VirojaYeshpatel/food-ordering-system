import 'package:flutter/material.dart';

enum VoiceOrderStage { idle, listening, processing, review, placed }

class VoiceOrderingScreen extends StatefulWidget {
  const VoiceOrderingScreen({super.key});

  @override
  State<VoiceOrderingScreen> createState() => _VoiceOrderingScreenState();
}

class _VoiceOrderingScreenState extends State<VoiceOrderingScreen> {
  VoiceOrderStage _stage = VoiceOrderStage.idle;
  String _transcript = '';
  String _aiSummary = '';

  static const String _sampleTranscript =
      'I want one chicken burger, a small fries, and a lemonade.';

  static const String _sampleAiSummary =
      'Got it! I added 1 Chicken Burger, 1 Small Fries, and 1 Lemonade. '
      'Estimated total is \$14.40. Would you like to place this order?';

  Future<void> _startVoiceCapture() async {
    setState(() {
      _stage = VoiceOrderStage.listening;
      _transcript = '';
      _aiSummary = '';
    });

    await Future<void>.delayed(const Duration(seconds: 1));
    if (!mounted) return;

    setState(() {
      _stage = VoiceOrderStage.processing;
      _transcript = _sampleTranscript;
    });

    await Future<void>.delayed(const Duration(seconds: 1));
    if (!mounted) return;

    setState(() {
      _stage = VoiceOrderStage.review;
      _aiSummary = _sampleAiSummary;
    });
  }

  void _confirmOrder() {
    setState(() {
      _stage = VoiceOrderStage.placed;
    });
  }

  void _startOver() {
    setState(() {
      _stage = VoiceOrderStage.idle;
      _transcript = '';
      _aiSummary = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Voice Ordering')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              _statusLabel(),
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            if (_transcript.isNotEmpty) ...[
              const Text('Transcript', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text(_transcript),
              const SizedBox(height: 16),
            ],
            if (_aiSummary.isNotEmpty) ...[
              const Text('AI Assistant', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text(_aiSummary),
              const SizedBox(height: 24),
            ],
            _buildPrimaryAction(),
            if (_stage == VoiceOrderStage.review || _stage == VoiceOrderStage.placed) ...[
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: _startOver,
                child: const Text('Start over'),
              ),
            ],
          ],
        ),
      ),
    );
  }

  String _statusLabel() {
    switch (_stage) {
      case VoiceOrderStage.idle:
        return 'Tap below to start voice ordering.';
      case VoiceOrderStage.listening:
        return 'Listening for your order...';
      case VoiceOrderStage.processing:
        return 'Understanding your request with AI...';
      case VoiceOrderStage.review:
        return 'Review your generated order summary.';
      case VoiceOrderStage.placed:
        return 'Order placed successfully!';
    }
  }

  Widget _buildPrimaryAction() {
    switch (_stage) {
      case VoiceOrderStage.idle:
      case VoiceOrderStage.listening:
      case VoiceOrderStage.processing:
        return FilledButton.icon(
          onPressed: _stage == VoiceOrderStage.idle ? _startVoiceCapture : null,
          icon: const Icon(Icons.mic),
          label: const Text('Start voice order'),
        );
      case VoiceOrderStage.review:
        return FilledButton(
          onPressed: _confirmOrder,
          child: const Text('Confirm order'),
        );
      case VoiceOrderStage.placed:
        return FilledButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Back to home'),
        );
    }
  }
}
