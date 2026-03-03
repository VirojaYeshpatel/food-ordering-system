class Order {
  constructor({
    id,
    userId,
    items,
    subtotal,
    discount,
    taxes,
    deliveryFee,
    total,
    promoCode = null,
    paymentProvider = 'stripe-test',
    paymentStatus = 'pending',
    orderStatus = 'placed',
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.subtotal = subtotal;
    this.discount = discount;
    this.taxes = taxes;
    this.deliveryFee = deliveryFee;
    this.total = total;
    this.promoCode = promoCode;
    this.paymentProvider = paymentProvider;
    this.paymentStatus = paymentStatus;
    this.orderStatus = orderStatus;
    this.createdAt = createdAt;
  }
}

module.exports = { Order };
