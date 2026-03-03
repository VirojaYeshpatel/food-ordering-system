import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getOrderHistory } from '../services/api';

export function OrderHistoryScreen({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await getOrderHistory(userId);
      setOrders(response.orders || []);
    }

    loadOrders();
  }, [userId]);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text>Order: {item.id}</Text>
            <Text>Status: {item.orderStatus}</Text>
            <Text>Total: ₹{item.total.toFixed(2)}</Text>
            <Text>Placed: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No orders yet.</Text>}
      />
    </View>
  );
}
