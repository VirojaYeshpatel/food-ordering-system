import AddRestaurantForm from './AddRestaurantForm';
import AddMenuItemForm from './AddMenuItemForm';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';

function AdminRestaurantMenuPanel({ onCreateRestaurant, onCreateMenuItem }) {
  return (
    <main>
      <h1>Restaurant & Menu Admin</h1>
      <AddRestaurantForm onSubmit={onCreateRestaurant} />
      <AddMenuItemForm onSubmit={onCreateMenuItem} />
      <ImageUploadPlaceholder />
    </main>
  );
}

export default AdminRestaurantMenuPanel;
