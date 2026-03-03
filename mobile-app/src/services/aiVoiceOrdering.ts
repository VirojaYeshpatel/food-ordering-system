export type MenuItem = {
  id: string;
  name: string;
  keywords: string[];
  price: number;
};

export type CartItem = MenuItem & { quantity: number };

export type VoiceAction =
  | { type: 'ADD_TO_CART'; item: MenuItem; quantity: number }
  | { type: 'CONFIRM_ORDER' }
  | { type: 'UNKNOWN'; reason: string };

const QUANTITY_PATTERNS: Array<[RegExp, number]> = [
  [/\bone\b|\b1\b/, 1],
  [/\btwo\b|\b2\b/, 2],
  [/\bthree\b|\b3\b/, 3],
  [/\bfour\b|\b4\b/, 4],
  [/\bfive\b|\b5\b/, 5],
];

export function parseVoiceCommand(transcript: string, menu: MenuItem[]): VoiceAction {
  const normalized = transcript.toLowerCase().trim();

  if (normalized.includes('confirm order') || normalized.includes('place order')) {
    return { type: 'CONFIRM_ORDER' };
  }

  const isAddIntent =
    normalized.includes('add') || normalized.includes('order') || normalized.includes('cart');

  if (!isAddIntent) {
    return { type: 'UNKNOWN', reason: 'No add-to-cart or confirm keywords detected.' };
  }

  const quantity = extractQuantity(normalized);
  const matchedItem = menu.find((item) =>
    [item.name.toLowerCase(), ...item.keywords.map((kw) => kw.toLowerCase())].some((kw) =>
      normalized.includes(kw),
    ),
  );

  if (!matchedItem) {
    return { type: 'UNKNOWN', reason: 'No menu item matched keywords in transcript.' };
  }

  return { type: 'ADD_TO_CART', item: matchedItem, quantity };
}

function extractQuantity(normalizedTranscript: string): number {
  for (const [pattern, value] of QUANTITY_PATTERNS) {
    if (pattern.test(normalizedTranscript)) {
      return value;
    }
  }
  return 1;
}

export function upsertCartItem(cart: CartItem[], item: MenuItem, quantity: number): CartItem[] {
  const existing = cart.find((cartItem) => cartItem.id === item.id);
  if (!existing) {
    return [...cart, { ...item, quantity }];
  }

  return cart.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
  );
}
