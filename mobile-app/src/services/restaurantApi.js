const API_BASE = '/api';

export async function fetchRestaurants() {
  const response = await fetch(`${API_BASE}/restaurants`);
  return response.json();
}

export async function fetchRestaurantById(id) {
  const response = await fetch(`${API_BASE}/restaurants/${id}`);
  return response.json();
}

export async function fetchMenuByRestaurant(id) {
  const response = await fetch(`${API_BASE}/menus/restaurant/${id}`);
  return response.json();
}
