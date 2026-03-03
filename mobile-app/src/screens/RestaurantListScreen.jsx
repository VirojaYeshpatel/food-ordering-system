import { useEffect, useState } from 'react';
import { fetchRestaurants } from '../services/restaurantApi';

function RestaurantListScreen({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(setRestaurants);
  }, []);

  return (
    <section>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <button type="button" onClick={() => onSelectRestaurant?.(restaurant.id)}>
              {restaurant.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RestaurantListScreen;
