// FoodieHub Shopping Cart Javascript Logic

// Helper to get active user specific storage key
function getCartKey() {
  const currentUser = localStorage.getItem('foodiehub_logged_in_user') || 'guest';
  return 'foodiehub_cart_' + currentUser;
}

// Helper to get cart from localStorage
function getCart() {
  const key = getCartKey();
  let cart = localStorage.getItem(key);
  let initialized = localStorage.getItem(key + '_initialized');
  if (!initialized && cart === null) {
    let defaultCart = [];
    if (key === 'foodiehub_cart_guest') {
      defaultCart = [
        {
          name: "Chicken Dum Biryani",
          price: 320,
          quantity: 1,
          restaurant: "Meghana Foods",
          veg: false
        },
        {
          name: "Garlic Naan",
          price: 60,
          quantity: 2,
          restaurant: "Empire Restaurant",
          veg: true
        }
      ];
    }
    localStorage.setItem(key, JSON.stringify(defaultCart));
    localStorage.setItem(key + '_initialized', 'true');
    return defaultCart;
  }
  return cart ? JSON.parse(cart) : [];
}

// Helper to save cart to localStorage
function saveCart(cart) {
  const key = getCartKey();
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartBadge();
  // Sync the menu quantity selectors if we are on the details page
  if (typeof initMenuAddButtons === 'function') {
    initMenuAddButtons();
  }
}

// Function to update the cart badge count in navigation and floating cart widget
function updateCartBadge() {
  let cart = getCart();
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.innerText = totalQty;
  });

  // Update floating cart widget
  const widget = document.getElementById('floating-cart-widget');
  const widgetText = document.getElementById('floating-cart-text');
  if (widget) {
    if (totalQty > 0) {
      let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if (widgetText) {
        widgetText.innerText = `${totalQty} Item${totalQty > 1 ? 's' : ''} | ₹${totalPrice}`;
      }
      widget.style.display = 'flex';
      
      // Bounce pulse effect
      widget.classList.add('pulse');
      setTimeout(() => {
        widget.classList.remove('pulse');
      }, 400);
    } else {
      widget.style.display = 'none';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Initialize interactive menu buttons on details page
  initMenuAddButtons();

  // Cart page handler (Render dynamic cart)
  if (document.querySelector('.cart-layout')) {
    renderCart();
  }
});

// Function to initialize menu Add buttons on details page
function initMenuAddButtons() {
  const addButtons = document.querySelectorAll('.btn-add-item-mock');
  if (addButtons.length === 0) return;

  const cart = getCart();

  addButtons.forEach(btn => {
    // Find item details
    const row = btn.closest('.menu-item-row');
    if (!row) return;

    const name = row.querySelector('.menu-item-details h4').innerText.trim();
    
    // Find restaurant name from the banner inside the section
    const section = btn.closest('.restaurant-detail-section');
    let restaurantName = "FoodieHub Restaurant";
    if (section) {
      const h1 = section.querySelector('h1');
      if (h1) restaurantName = h1.innerText.trim();
    }

    // Check if it's already in the cart
    const existingItem = cart.find(item => item.name === name && item.restaurant === restaurantName);

    // Get parent element (menu-item-image-box)
    let parent = btn.parentElement;
    
    // If it exists in the cart, hide the btn and show qty selector
    if (existingItem && existingItem.quantity > 0) {
      btn.style.display = 'none';
      createQtySelector(parent, name, restaurantName, existingItem.quantity, btn);
    } else {
      btn.style.display = 'block';
      let oldSelector = parent.querySelector('.qty-selector-container');
      if (oldSelector) oldSelector.remove();
    }

    // Single click interceptor setup (remove previous to avoid duplicate listeners)
    if (!btn.dataset.listenerAdded) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const priceText = row.querySelector('.menu-item-price').innerText.trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const isVeg = row.querySelector('.indicator-veg') !== null;

        // Add to cart
        let currentCart = getCart();
        let cartItem = currentCart.find(item => item.name === name && item.restaurant === restaurantName);
        if (cartItem) {
          cartItem.quantity = 1;
        } else {
          currentCart.push({
            name: name,
            price: price,
            quantity: 1,
            restaurant: restaurantName,
            veg: isVeg
          });
        }
        saveCart(currentCart);

        btn.style.display = 'none';
        createQtySelector(parent, name, restaurantName, 1, btn);
        
        if (typeof showToast === 'function') {
          showToast(`✓ Added ${name} to your cart!`);
        }
      });
      btn.dataset.listenerAdded = 'true';
    }
  });
}

function createQtySelector(parent, name, restaurantName, initialQty, btnRef) {
  // Remove existing selector if any
  let existing = parent.querySelector('.qty-selector-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'qty-selector-container';
  container.innerHTML = `
    <button class="qty-selector-btn qty-minus" type="button" aria-label="Decrease quantity">-</button>
    <span class="qty-selector-value">${initialQty}</span>
    <button class="qty-selector-btn qty-plus" type="button" aria-label="Increase quantity">+</button>
  `;

  parent.appendChild(container);

  const minusBtn = container.querySelector('.qty-minus');
  const plusBtn = container.querySelector('.qty-plus');
  const qtyVal = container.querySelector('.qty-selector-value');

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let currentCart = getCart();
    let index = currentCart.findIndex(item => item.name === name && item.restaurant === restaurantName);
    if (index !== -1) {
      currentCart[index].quantity -= 1;
      if (currentCart[index].quantity <= 0) {
        currentCart.splice(index, 1);
        saveCart(currentCart);
        container.remove();
        btnRef.style.display = 'block';
      } else {
        qtyVal.innerText = currentCart[index].quantity;
        saveCart(currentCart);
      }
    }
  });

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let currentCart = getCart();
    let index = currentCart.findIndex(item => item.name === name && item.restaurant === restaurantName);
    if (index !== -1) {
      currentCart[index].quantity += 1;
      qtyVal.innerText = currentCart[index].quantity;
      saveCart(currentCart);
    }
  });
}

// Render the cart elements dynamically
function renderCart() {
  let cart = getCart();
  let leftCol = document.querySelector('.cart-left-section');
  let rightCol = document.querySelector('.cart-layout > div:last-child'); // The right column containing bill details
  
  if (!leftCol || !rightCol) return;

  if (cart.length === 0) {
    // Show empty cart view
    leftCol.innerHTML = `
      <div class="cart-box" style="text-align: center; padding: 80px 20px; border-radius: var(--border-radius-lg); box-shadow: var(--shadow-sm); border: 1px dashed var(--border-color-dark); background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);">
        <div style="position: relative; display: inline-block; margin-bottom: 30px;">
          <div style="position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px; border-radius: 50%; background: rgba(239, 79, 95, 0.05); animation: pulseEmpty 2s infinite ease-in-out;"></div>
          <div style="background: rgba(239, 79, 95, 0.1); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative;">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="var(--primary-color)">
              <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.88 1.46h13.08c.88 0 1.65-.62 1.88-1.46l2.54-9.27.04-.15c0-.55-.45-1-1-1h-4.79zM9 9l3-4.5L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
          </div>
        </div>
        <h3 style="border-bottom:none; margin-bottom: 12px; font-size: 1.65rem; font-weight: 700; color: var(--text-dark);">Your Cart is Empty</h3>
        <p style="color: var(--text-muted); max-width: 360px; margin: 0 auto 32px; font-size: 0.95rem; line-height: 1.6;">
          Good food is always cooking! Add tasty items from our handpicked premium restaurants in Bengaluru.
        </p>
        <a href="restaurants.html" class="btn btn-primary" style="padding: 12px 36px; border-radius: 30px; font-weight: 600; box-shadow: 0 8px 20px rgba(239, 79, 95, 0.25);">Explore Restaurants</a>
      </div>
      <style>
        @keyframes pulseEmpty {
          0% { transform: scale(0.9); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.9); opacity: 1; }
        }
      </style>
    `;
    rightCol.style.display = 'none';
    return;
  }

  // Ensure right column is visible
  rightCol.style.display = 'block';

  // Render Left Column (Items List & Delivery Address)
  let itemsHtml = `
    <div class="cart-box">
      <h3>Items in Your Cart</h3>
  `;

  cart.forEach((item, index) => {
    let vegIndicator = item.veg ? 
      `<span class="indicator indicator-veg"><span class="indicator-dot"></span></span>` :
      `<span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span>`;

    itemsHtml += `
      <!-- Cart Item -->
      <div class="cart-item">
        <div class="cart-item-info">
          ${vegIndicator}
          <div>
            <div class="cart-item-title">${item.name}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">${item.restaurant}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center;">
          <div class="qty-control">
            <button class="qty-btn" type="button" aria-label="Decrease quantity" onclick="updateQty(${index}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" type="button" aria-label="Increase quantity" onclick="updateQty(${index}, 1)">+</button>
          </div>
          <div class="cart-item-price" style="margin-left: 24px; min-width: 60px; text-align: right;">₹${item.price * item.quantity}</div>
        </div>
      </div>
    `;
  });

  // Dynamic user data injection
  let userName = localStorage.getItem('foodiehub_logged_in_user_name') || 'Guest User';
  let userAddress = localStorage.getItem('foodiehub_logged_in_user_address') || 'Mukesh S, Flat 302, 3rd Floor, Lavender Apartments, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103';

  itemsHtml += `
    </div>

    <!-- Dynamic Delivery Address Card -->
    <div class="cart-box">
      <h3 style="display: flex; align-items: center; justify-content: space-between;">
        Delivery Address
        <span style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600; cursor: pointer;">Change</span>
      </h3>
      <div style="display: flex; gap: 16px; align-items: flex-start;">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="var(--primary-color)" style="flex-shrink: 0; margin-top: 2px;">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div>
          <div style="font-weight: 600; color: var(--text-dark); font-size: 1.05rem; margin-bottom: 4px;">${userName}</div>
          <p style="color: var(--text-medium); font-size: 0.9rem; line-height: 1.5;">
            ${userAddress}
          </p>
        </div>
      </div>
    </div>
  `;

  leftCol.innerHTML = itemsHtml;

  // Calculate bill totals
  let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let deliveryFee = 30;
  let taxes = Math.round(subtotal * 0.05 + 5); // 5% GST + Rs 5 convenience charge
  let discount = subtotal >= 200 ? 100 : 0; // Flat 100 off on orders >= 200 using promo
  let total = subtotal + deliveryFee + taxes - discount;

  // Render Right Column
  rightCol.innerHTML = `
    <!-- Promo Code Box -->
    <div class="cart-box" style="margin-bottom: 24px;">
      <h3>Apply Coupon</h3>
      <div class="promo-container">
        <input type="text" value="${discount > 0 ? 'WELCOME50' : ''}" placeholder="Enter Promo Code" readonly style="background-color: var(--bg-light); border-color: ${discount > 0 ? 'var(--veg-green)' : 'var(--border-color-dark)'}; font-weight: 600; color: ${discount > 0 ? 'var(--veg-green)' : 'var(--text-dark)'};">
        <button class="btn btn-outline btn-sm" style="border-color: ${discount > 0 ? 'var(--veg-green)' : 'var(--primary-color)'}; color: ${discount > 0 ? 'var(--veg-green)' : 'var(--primary-color)'}; font-weight: 600; pointer-events: none;">${discount > 0 ? 'Applied ✓' : 'Apply'}</button>
      </div>
      ${discount > 0 ? `
        <p style="font-size: 0.8rem; color: var(--veg-green); margin-top: 8px; font-weight: 500;">
          WELCOME50 applied! Flat ₹100 discount saved on this order.
        </p>
      ` : `
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px; font-weight: 500;">
          Add items worth ₹200 or more to get WELCOME50 coupon discount.
        </p>
      `}
    </div>

    <!-- Bill Details Box -->
    <div class="cart-box">
      <h3>Bill Details</h3>
      <div class="bill-row">
        <span>Item Total</span>
        <span>₹${subtotal}</span>
      </div>
      <div class="bill-row">
        <span>Delivery Partner Fee</span>
        <span>₹${deliveryFee}</span>
      </div>
      <div class="bill-row">
        <span>Taxes &amp; Restaurant Charges</span>
        <span>₹${taxes}</span>
      </div>
      ${discount > 0 ? `
        <div class="bill-row" style="color: var(--veg-green); font-weight: 500;">
          <span>Coupon Discount (WELCOME50)</span>
          <span>-₹${discount}</span>
        </div>
      ` : ''}
      
      <div class="bill-total-row">
        <span>To Pay</span>
        <span>₹${total}</span>
      </div>

      <div style="margin-top: 24px;">
        <a href="#order-success-modal" class="btn btn-primary" onclick="clearCartOnCheckout('${cart.map(i => i.name).join(', ')}', '${total}')" style="width: 100%; font-size: 1.1rem; padding: 14px 28px;">Place Order (₹${total})</a>
      </div>
    </div>
  `;
}

// Function to update item quantity in cart
window.updateQty = function(index, delta) {
  let cart = getCart();
  if (index < 0 || index >= cart.length) return;
  
  let newQty = cart[index].quantity + delta;
  if (newQty <= 0) {
    let cartItems = document.querySelectorAll('.cart-item');
    if (cartItems[index]) {
      cartItems[index].classList.add('cart-item-removed');
      setTimeout(() => {
        let currentCart = getCart();
        currentCart.splice(index, 1);
        saveCart(currentCart);
        renderCart();
      }, 400);
    } else {
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    }
  } else {
    cart[index].quantity = newQty;
    saveCart(cart);
    renderCart();
  }
};

// Function to handle checkout placement and clear cart
window.clearCartOnCheckout = function(itemsText, grandTotal) {
  let modalSummary = document.querySelector('#order-success-modal .order-summary-box');
  if (modalSummary) {
    modalSummary.innerHTML = `
      <div class="order-summary-row"><span>Items:</span><strong>${itemsText}</strong></div>
      <div class="order-summary-row"><span>Delivery Address:</span><strong>Flat 302, Green Glen Layout, Bengaluru</strong></div>
      <div class="order-summary-row"><span>Estimated Time:</span><strong>32 Mins</strong></div>
      <div class="order-summary-row"><span>Paid Amount:</span><strong>₹${grandTotal}</strong></div>
    `;
  }
  
  const key = getCartKey();
  localStorage.removeItem(key);
  updateCartBadge();
};
