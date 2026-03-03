import { useEffect, useState } from 'react';
import { fetchRestaurantById, fetchMenuByRestaurant } from '../services/restaurantApi';
import MenuDisplayScreen from './MenuDisplayScreen';

function RestaurantDetailScreen({ restaurantId }) {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    fetchRestaurantById(restaurantId).then(setRestaurant);
    fetchMenuByRestaurant(restaurantId).then(setMenuItems);
  }, [restaurantId]);

  if (!restaurant) {
    return <p>Select a restaurant to view details.</p>;
  }

  return (
    <article>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>{restaurant.address}</p>
      <MenuDisplayScreen menuItems={menuItems} />
    </article>
  );
}

export default RestaurantDetailScreen;
