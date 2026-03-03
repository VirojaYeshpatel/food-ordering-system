import { useState } from 'react';

function AddRestaurantForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    imageUrl: '',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Restaurant</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={updateField} required />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={updateField}
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={updateField}
        required
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={updateField}
      />
      <button type="submit">Save Restaurant</button>
    </form>
  );
}

export default AddRestaurantForm;
