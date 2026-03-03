import React from 'react';
import { Button } from 'react-native';
import { useCart } from '../context/CartContext';

export function AddToCartButton({ item }) {
  const { addItem } = useCart();

  return <Button title="Add to Cart" onPress={() => addItem({ ...item, quantity: 1 })} />;
}
