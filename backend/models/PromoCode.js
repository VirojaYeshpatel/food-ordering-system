const promoCodes = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrderValue: 150, active: true },
  { code: 'FLAT50', type: 'flat', value: 50, minOrderValue: 300, active: true },
  { code: 'FREEDLV', type: 'delivery', value: 40, minOrderValue: 200, active: true },
];

function getPromoByCode(code) {
  if (!code) return null;
  return promoCodes.find((promo) => promo.code === code.toUpperCase() && promo.active) || null;
}

module.exports = { promoCodes, getPromoByCode };
