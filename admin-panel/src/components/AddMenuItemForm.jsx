import { useState } from 'react';

function AddMenuItemForm({ restaurantId, onSubmit }) {
  const [form, setForm] = useState({
    restaurantId: restaurantId || '',
    name: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({ ...form, price: Number(form.price) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Menu Item</h2>
      <input
        name="restaurantId"
        placeholder="Restaurant ID"
        value={form.restaurantId}
        onChange={updateField}
        required
      />
      <input name="name" placeholder="Name" value={form.name} onChange={updateField} required />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={updateField}
      />
      <input name="category" placeholder="Category" value={form.category} onChange={updateField} />
      <input
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={updateField}
        required
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={updateField}
      />
      <button type="submit">Save Menu Item</button>
    </form>
  );
}

export default AddMenuItemForm;
