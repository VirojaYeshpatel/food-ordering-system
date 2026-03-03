import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/api';

export function OrderSummaryScreen({ userId }) {
  const { cart, totals, changeQuantity, applyPromo } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const onApplyPromo = async () => {
    const response = await applyPromo(promoCode);
    if (response.message) {
      Alert.alert('Promo code', response.message);
    }
  };

  const onCheckout = async () => {
    const response = await checkout(userId);
    Alert.alert('Order placed', `Order #${response.order.id} created`);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Order Summary</Text>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.menuItemId}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>{item.name}</Text>
            <Text>₹{item.unitPrice} x {item.quantity}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="-" onPress={() => changeQuantity(item.menuItemId, item.quantity - 1)} />
              <Button title="+" onPress={() => changeQuantity(item.menuItemId, item.quantity + 1)} />
            </View>
          </View>
        )}
      />

      <TextInput
        value={promoCode}
        onChangeText={setPromoCode}
        placeholder="Enter promo code"
        autoCapitalize="characters"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 }}
      />
      <Button title="Apply promo code" onPress={onApplyPromo} />

      <Text>Subtotal: ₹{totals.subtotal.toFixed(2)}</Text>
      <Text>Discount: -₹{totals.discount.toFixed(2)}</Text>
      <Text>Taxes: ₹{totals.taxes.toFixed(2)}</Text>
      <Text>Delivery Fee: ₹{totals.deliveryFee.toFixed(2)}</Text>
      <Text style={{ fontWeight: '700' }}>Total: ₹{totals.total.toFixed(2)}</Text>

      <Button title="Place order" onPress={onCheckout} />
    </View>
  );
}
