# Food Ordering System – Phase 4 (Cart & Checkout)

This phase introduces cart management, promo codes, checkout, and order history support.

## Backend
- Cart model with add/update quantity/apply promo methods.
- Order model for checkout snapshots.
- Promo code catalog with validation rules.
- Price calculation service for subtotal, discounts, taxes, and delivery fee.
- Stripe test mode payment placeholder in checkout response.

## Mobile
- Add-to-cart reusable button component.
- Cart context actions for add/update/apply promo.
- Order summary screen with quantity updates and promo input.
- Order history screen showing placed orders.

## Run backend locally
```bash
npm install express
node backend/server.js
```

Available endpoints:
- `GET /api/cart/:userId`
- `POST /api/cart/:userId/items`
- `PATCH /api/cart/:userId/items/:menuItemId`
- `POST /api/cart/:userId/promo`
- `POST /api/orders/:userId/checkout`
- `GET /api/orders/:userId`
