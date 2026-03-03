/**
 * Menu model (domain shape).
 */
class Menu {
  constructor({ id, restaurantId, name, description, price, imageUrl, category }) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl || null;
    this.category = category || 'General';
  }
}

module.exports = Menu;
