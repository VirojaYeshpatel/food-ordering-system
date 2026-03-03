const ORDER_STATUSES = ['Pending', 'Preparing', 'Out for delivery', 'Delivered'];

const state = {
  orders: [],
  loading: false,
};

const elements = {
  form: document.querySelector('#order-form'),
  customerName: document.querySelector('#customer-name'),
  item: document.querySelector('#order-item'),
  quantity: document.querySelector('#quantity'),
  orders: document.querySelector('#orders'),
  loading: document.querySelector('#loading'),
  message: document.querySelector('#message'),
  submitButton: document.querySelector('#submit-btn'),
  themeToggle: document.querySelector('#theme-toggle'),
  template: document.querySelector('#order-template'),
};

const setMessage = (text, tone = '') => {
  elements.message.textContent = text;
  elements.message.className = `message ${tone}`.trim();
};

const setLoading = (loading) => {
  state.loading = loading;
  elements.loading.classList.toggle('hidden', !loading);
  elements.submitButton.disabled = loading;
};

const getStoredTheme = () => localStorage.getItem('theme') || 'light';

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const icon = theme === 'dark' ? '☀️' : '🌙';
  const text = theme === 'dark' ? 'Light mode' : 'Dark mode';
  elements.themeToggle.textContent = `${icon} ${text}`;
};

const persistTheme = (theme) => localStorage.setItem('theme', theme);

const sendPushNotificationPlaceholder = async (order) => {
  // Placeholder for Firebase Cloud Messaging integration.
  // In production, replace this with your backend endpoint and FCM token handling.
  await new Promise((resolve) => setTimeout(resolve, 250));
  console.info('Push notification placeholder sent for order:', order.id);
};

const statusToClass = (status) => status.toLowerCase().replaceAll(' ', '-');

const renderOrders = () => {
  elements.orders.innerHTML = '';

  if (state.orders.length === 0) {
    elements.orders.innerHTML = '<li class="order-meta">No orders yet.</li>';
    return;
  }

  state.orders.forEach((order) => {
    const fragment = elements.template.content.cloneNode(true);
    const root = fragment.querySelector('.order-card');
    const title = fragment.querySelector('.order-title');
    const meta = fragment.querySelector('.order-meta');
    const badge = fragment.querySelector('.badge');
    const advanceButton = fragment.querySelector('.advance-btn');

    title.textContent = `${order.customerName} • ${order.item}`;
    meta.textContent = `Qty ${order.quantity} • Order #${order.id}`;

    badge.textContent = order.status;
    badge.classList.add(statusToClass(order.status));

    const statusIndex = ORDER_STATUSES.indexOf(order.status);
    const isDelivered = statusIndex === ORDER_STATUSES.length - 1;
    advanceButton.disabled = isDelivered;

    advanceButton.addEventListener('click', () => {
      advanceOrderStatus(order.id).catch((error) => {
        console.error(error);
        setMessage('Could not advance order status. Please retry.', 'error');
      });
    });

    root.dataset.orderId = order.id;
    elements.orders.appendChild(fragment);
  });
};

const validateOrderInput = (payload) => {
  if (!payload.customerName || payload.customerName.trim().length < 2) {
    throw new Error('Please enter a customer name with at least 2 characters.');
  }
  if (!payload.item) {
    throw new Error('Please select an item.');
  }
  if (!Number.isInteger(payload.quantity) || payload.quantity < 1) {
    throw new Error('Quantity must be at least 1.');
  }
};

const createOrder = async (payload) => {
  validateOrderInput(payload);
  setLoading(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const order = {
      ...payload,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      status: ORDER_STATUSES[0],
    };

    state.orders.unshift(order);
    await sendPushNotificationPlaceholder(order);
    renderOrders();
    setMessage(`Order ${order.id} created successfully.`, 'success');
  } finally {
    setLoading(false);
  }
};

const advanceOrderStatus = async (orderId) => {
  setLoading(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 350));

    state.orders = state.orders.map((order) => {
      if (order.id !== orderId) return order;

      const currentIndex = ORDER_STATUSES.indexOf(order.status);
      const nextIndex = Math.min(currentIndex + 1, ORDER_STATUSES.length - 1);

      return {
        ...order,
        status: ORDER_STATUSES[nextIndex],
      };
    });

    renderOrders();
    setMessage('Order status updated.', 'success');
  } finally {
    setLoading(false);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage('');

  const payload = {
    customerName: elements.customerName.value.trim(),
    item: elements.item.value,
    quantity: Number.parseInt(elements.quantity.value, 10),
  };

  try {
    await createOrder(payload);
    elements.form.reset();
    elements.quantity.value = '1';
  } catch (error) {
    setMessage(error.message || 'Unable to place order.', 'error');
  }
};

const initialize = () => {
  applyTheme(getStoredTheme());
  renderOrders();

  elements.form.addEventListener('submit', (event) => {
    handleSubmit(event).catch((error) => {
      console.error(error);
      setMessage('Unexpected error while placing order.', 'error');
    });
  });

  elements.themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  });
};

initialize();
