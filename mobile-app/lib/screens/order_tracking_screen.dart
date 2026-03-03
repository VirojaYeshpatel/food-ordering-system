import 'package:flutter/material.dart';

class OrderTrackingScreen extends StatelessWidget {
  const OrderTrackingScreen({super.key});

  static const List<_OrderStatusStep> _steps = [
    _OrderStatusStep('Order placed', true),
    _OrderStatusStep('Preparing food', true),
    _OrderStatusStep('Driver picked up order', false),
    _OrderStatusStep('Out for delivery', false),
    _OrderStatusStep('Delivered', false),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Tracking')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Track your latest order',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            const Text('Order #FO-2024-106 • ETA 15-20 min'),
            const SizedBox(height: 20),
            const LinearProgressIndicator(value: 0.4),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.separated(
                itemCount: _steps.length,
                separatorBuilder: (_, __) => const Divider(height: 20),
                itemBuilder: (context, index) {
                  final step = _steps[index];
                  return Row(
                    children: [
                      Icon(
                        step.isComplete ? Icons.check_circle : Icons.radio_button_unchecked,
                        color: step.isComplete
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).disabledColor,
                      ),
                      const SizedBox(width: 12),
                      Text(step.label),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OrderStatusStep {
  const _OrderStatusStep(this.label, this.isComplete);

  final String label;
  final bool isComplete;
}
