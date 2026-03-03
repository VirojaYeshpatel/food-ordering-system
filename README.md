# Food Ordering System (Phase 6)

A lightweight web app demonstrating production-style UX enhancements for a food ordering flow.

## Features added in Phase 6

- ✅ Order status tracking (`Pending → Preparing → Out for delivery → Delivered`)
- ✅ Firebase push notifications **placeholder** hook for future integration
- ✅ Dark/light mode with persisted preference
- ✅ Loading states for async operations
- ✅ Error handling with user-facing messages
- ✅ UI polish (cards, badges, responsive layout, improved spacing)
- ✅ Code cleanup using modular helper functions

## Tech stack

- HTML
- CSS
- Vanilla JavaScript (ES Modules)

## Setup guide

### Option 1: Run with Python HTTP server

```bash
python3 -m http.server 4173
```

Open: <http://localhost:4173>

### Option 2: Run with Node (serve)

```bash
npx serve . -l 4173
```

Open: <http://localhost:4173>

## How to use

1. Enter customer name, menu item, and quantity.
2. Click **Place Order**.
3. Review the order in the status tracking panel.
4. Click **Advance Status** to simulate fulfillment progression.
5. Toggle dark/light mode in the header.

## Firebase placeholder notes

The function `sendPushNotificationPlaceholder` in `app.js` is where Firebase Cloud Messaging can be wired in.

Recommended production path:

1. Register clients for push tokens.
2. Send order lifecycle events to backend.
3. Trigger FCM notifications from a secure server (or Cloud Function).

## Validation checklist

- [x] Form validation prevents invalid orders.
- [x] Loading spinner appears during async operations.
- [x] UI displays success/error messages.
- [x] Status transitions stop at `Delivered`.
- [x] Theme preference survives refresh.
