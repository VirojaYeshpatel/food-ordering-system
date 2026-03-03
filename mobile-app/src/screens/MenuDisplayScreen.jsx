function MenuDisplayScreen({ menuItems }) {
  return (
    <section>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - ${item.price}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MenuDisplayScreen;
