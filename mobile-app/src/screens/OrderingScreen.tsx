import React, { useMemo, useState } from 'react';
import { Alert, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { parseVoiceCommand, upsertCartItem, type CartItem, type MenuItem } from '../services/aiVoiceOrdering';
import { speakText, startSpeechToText } from '../services/speech';

const MENU: MenuItem[] = [
  { id: '1', name: 'Margherita Pizza', keywords: ['margherita', 'pizza'], price: 8.5 },
  { id: '2', name: 'Veg Burger', keywords: ['burger', 'veg burger'], price: 6.0 },
  { id: '3', name: 'Fries', keywords: ['fries', 'chips'], price: 3.5 },
];

type OrderingMode = 'AI_VOICE' | 'MANUAL';

export default function OrderingScreen() {
  const [mode, setMode] = useState<OrderingMode | null>(null);
  const [showModePopup, setShowModePopup] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const selectMode = (selectedMode: OrderingMode) => {
    setMode(selectedMode);
    setShowModePopup(false);
  };

  const startVoiceOrdering = async () => {
    const transcript = await startSpeechToText();
    const action = parseVoiceCommand(transcript, MENU);

    if (action.type === 'ADD_TO_CART') {
      setCart((existing) => upsertCartItem(existing, action.item, action.quantity));
      const message = `Added ${action.quantity} ${action.item.name} to cart.`;
      await speakText(message);
      Alert.alert('Voice order updated', `${message}\nHeard: "${transcript}"`);
      return;
    }

    if (action.type === 'CONFIRM_ORDER') {
      const hasItems = cart.length > 0;
      const response = hasItems
        ? `Order confirmed. Your total is $${total.toFixed(2)}.`
        : 'Your cart is empty. Please add items first.';
      await speakText(response);
      Alert.alert('Voice confirmation', `${response}\nHeard: "${transcript}"`);
      return;
    }

    await speakText('Sorry, I could not understand your request.');
    Alert.alert('Voice not recognized', `${action.reason}\nHeard: "${transcript}"`);
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={showModePopup} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Choose Ordering Mode</Text>
            <Text style={styles.subtitle}>Use AI voice ordering or continue manually.</Text>
            <Button title="AI Voice Mode" onPress={() => selectMode('AI_VOICE')} />
            <View style={styles.spacer} />
            <Button title="Manual Mode" onPress={() => selectMode('MANUAL')} />
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Food Ordering</Text>
      <Text style={styles.modeText}>Current mode: {mode ?? 'Not selected'}</Text>

      {mode === 'AI_VOICE' && (
        <Pressable style={styles.voiceButton} onPress={startVoiceOrdering}>
          <Text style={styles.voiceButtonText}>🎤 Start Voice Command</Text>
        </Pressable>
      )}

      {mode === 'MANUAL' && <Text style={styles.subtitle}>Manual flow can be plugged in here.</Text>}

      <View style={styles.cartBox}>
        <Text style={styles.title}>Cart</Text>
        {cart.length === 0 ? (
          <Text style={styles.subtitle}>No items yet.</Text>
        ) : (
          cart.map((item) => (
            <Text key={item.id}>{`${item.quantity} x ${item.name} - $${(
              item.quantity * item.price
            ).toFixed(2)}`}</Text>
          ))
        )}
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'center' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000070' },
  popup: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  subtitle: { color: '#666', marginBottom: 8 },
  modeText: { marginBottom: 20 },
  spacer: { height: 8 },
  voiceButton: {
    backgroundColor: '#3a86ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  voiceButtonText: { color: '#fff', fontWeight: '700' },
  cartBox: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
  total: { marginTop: 10, fontWeight: '700' },
});
