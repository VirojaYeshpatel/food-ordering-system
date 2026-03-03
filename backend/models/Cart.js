class CartItem {
  constructor({ id, menuItemId, name, unitPrice, quantity = 1 }) {
    this.id = id;
    this.menuItemId = menuItemId;
    this.name = name;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
  }

  get lineTotal() {
    return this.unitPrice * this.quantity;
  }
}

class Cart {
  constructor({ id, userId, items = [], promoCode = null }) {
    this.id = id;
    this.userId = userId;
    this.items = items.map((item) => new CartItem(item));
    this.promoCode = promoCode;
    this.updatedAt = new Date().toISOString();
  }

  addItem(item) {
    const existing = this.items.find((cartItem) => cartItem.menuItemId === item.menuItemId);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      this.items.push(new CartItem(item));
    }
    this.updatedAt = new Date().toISOString();
    return this;
  }

  updateQuantity(menuItemId, quantity) {
    const target = this.items.find((item) => item.menuItemId === menuItemId);
    if (!target) return this;
    if (quantity <= 0) {
      this.items = this.items.filter((item) => item.menuItemId !== menuItemId);
    } else {
      target.quantity = quantity;
    }
    this.updatedAt = new Date().toISOString();
    return this;
  }

  applyPromoCode(code) {
    this.promoCode = code;
    this.updatedAt = new Date().toISOString();
    return this;
  }
}

module.exports = { Cart, CartItem };
