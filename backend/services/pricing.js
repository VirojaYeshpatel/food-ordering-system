const TAX_PERCENT = 5;
const DEFAULT_DELIVERY_FEE = 40;

function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function calculateDiscount({ subtotal, promo }) {
  if (!promo) return { discount: 0, deliveryFeeDiscount: 0 };
  if (subtotal < promo.minOrderValue) return { discount: 0, deliveryFeeDiscount: 0 };

  switch (promo.type) {
    case 'percentage':
      return { discount: (subtotal * promo.value) / 100, deliveryFeeDiscount: 0 };
    case 'flat':
      return { discount: Math.min(subtotal, promo.value), deliveryFeeDiscount: 0 };
    case 'delivery':
      return { discount: 0, deliveryFeeDiscount: promo.value };
    default:
      return { discount: 0, deliveryFeeDiscount: 0 };
  }
}

function calculateCartTotals({ items, promo = null }) {
  const subtotal = calculateSubtotal(items);
  const { discount, deliveryFeeDiscount } = calculateDiscount({ subtotal, promo });
  const discountedSubtotal = Math.max(subtotal - discount, 0);
  const taxes = (discountedSubtotal * TAX_PERCENT) / 100;
  const deliveryFee = Math.max(DEFAULT_DELIVERY_FEE - deliveryFeeDiscount, 0);
  const total = discountedSubtotal + taxes + deliveryFee;

  return {
    subtotal,
    discount,
    taxes,
    deliveryFee,
    total,
  };
}

module.exports = {
  TAX_PERCENT,
  DEFAULT_DELIVERY_FEE,
  calculateSubtotal,
  calculateDiscount,
  calculateCartTotals,
};
