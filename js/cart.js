// FoodieHub Shopping Cart Javascript Logic

// Helper to get cart from localStorage
function getCart() {
  let cart = localStorage.getItem('foodiehub_cart');
  let initialized = localStorage.getItem('foodiehub_initialized');
  if (!initialized && cart === null) {
    const defaultCart = [
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
    localStorage.setItem('foodiehub_cart', JSON.stringify(defaultCart));
    localStorage.setItem('foodiehub_initialized', 'true');
    return defaultCart;
  }
  return cart ? JSON.parse(cart) : [];
}

// Helper to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('foodiehub_cart', JSON.stringify(cart));
  updateCartBadge();
}

// Function to update the cart badge count in navigation
function updateCartBadge() {
  let cart = getCart();
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.innerText = totalQty;
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // 1. Details page handler (Intercept Add + clicks)
  if (document.querySelector('.btn-add-item-mock')) {
    document.querySelectorAll('.btn-add-item-mock').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Find item details in the same row
        let row = btn.closest('.menu-item-row');
        if (!row) return;
        
        let name = row.querySelector('.menu-item-details h4').innerText.trim();
        let priceText = row.querySelector('.menu-item-price').innerText.trim();
        let price = parseInt(priceText.replace(/[^0-9]/g, ''));
        let isVeg = row.querySelector('.indicator-veg') !== null;
        
        // Find restaurant name from the banner inside the section
        let section = btn.closest('.restaurant-detail-section');
        let restaurantName = "FoodieHub Restaurant";
        if (section) {
          let h1 = section.querySelector('h1');
          if (h1) restaurantName = h1.innerText.trim();
        }

        // Add item to cart
        let cart = getCart();
        let existingItem = cart.find(item => item.name === name && item.restaurant === restaurantName);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            name: name,
            price: price,
            quantity: 1,
            restaurant: restaurantName,
            veg: isVeg
          });
        }
        
        saveCart(cart);
        // Note: The default behavior will redirect to cart.html because href="cart.html" is set.
      });
    });
  }

  // 2. Cart page handler (Render dynamic cart)
  if (document.querySelector('.cart-layout')) {
    renderCart();
  }
});

// Render the cart elements dynamically
function renderCart() {
  let cart = getCart();
  let leftCol = document.querySelector('.cart-left-section');
  let rightCol = document.querySelector('.cart-layout > div:last-child'); // The right column containing bill details
  
  if (!leftCol || !rightCol) return;

  if (cart.length === 0) {
    // Show empty cart view
    leftCol.innerHTML = `
      <div class="cart-box" style="text-align: center; padding: 60px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 24 24" width="80" fill="var(--text-muted)" style="opacity: 0.5; margin-bottom: 20px;">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <h3 style="border-bottom:none; margin-bottom: 10px; font-size: 1.5rem;">Your Cart is Empty</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Add items from your favorite restaurants to place an order.</p>
        <a href="restaurants.html" class="btn btn-primary">Explore Restaurants</a>
      </div>
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

  itemsHtml += `
    </div>

    <!-- Static Delivery Address Card -->
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
          <div style="font-weight: 600; color: var(--text-dark); font-size: 1.05rem; margin-bottom: 4px;">Home</div>
          <p style="color: var(--text-medium); font-size: 0.9rem; line-height: 1.5;">
            Mukesh S, Flat 302, 3rd Floor, Lavender Apartments,<br>
            Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103
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
  
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  
  saveCart(cart);
  renderCart();
};

// Function to handle checkout placement and clear cart
window.clearCartOnCheckout = function(itemsText, grandTotal) {
  // Update order success modal content with real items from cart
  let modalSummary = document.querySelector('#order-success-modal .order-summary-box');
  if (modalSummary) {
    modalSummary.innerHTML = `
      <div class="order-summary-row"><span>Items:</span><strong>${itemsText}</strong></div>
      <div class="order-summary-row"><span>Delivery Address:</span><strong>Flat 302, Green Glen Layout, Bengaluru</strong></div>
      <div class="order-summary-row"><span>Estimated Time:</span><strong>32 Mins</strong></div>
      <div class="order-summary-row"><span>Paid Amount:</span><strong>₹${grandTotal}</strong></div>
    `;
  }
  
  // Clear the cart database since order is placed
  localStorage.removeItem('foodiehub_cart');
  updateCartBadge();
};
