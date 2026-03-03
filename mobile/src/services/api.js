const API_BASE_URL = 'http://localhost:4000/api';

export async function getCart(userId) {
  const res = await fetch(`${API_BASE_URL}/cart/${userId}`);
  return res.json();
}

export async function addToCart(userId, item) {
  const res = await fetch(`${API_BASE_URL}/cart/${userId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateQuantity(userId, menuItemId, quantity) {
  const res = await fetch(`${API_BASE_URL}/cart/${userId}/items/${menuItemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
}

export async function applyPromoCode(userId, code) {
  const res = await fetch(`${API_BASE_URL}/cart/${userId}/promo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return res.json();
}

export async function checkout(userId) {
  const res = await fetch(`${API_BASE_URL}/orders/${userId}/checkout`, {
    method: 'POST',
  });
  return res.json();
}

export async function getOrderHistory(userId) {
  const res = await fetch(`${API_BASE_URL}/orders/${userId}`);
  return res.json();
}
