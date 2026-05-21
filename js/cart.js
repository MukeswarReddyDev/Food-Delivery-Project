// FoodieHub Cart Management & Checkout System

// Initialize cart from localStorage
function getCart() {
  const cart = localStorage.getItem('foodiehub_cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('foodiehub_cart', JSON.stringify(cart));
  updateCartBadges();
  if (window.location.pathname.includes('cart.html')) {
    renderCartPage();
  }
}

// Add item to cart
function addToCart(item, restaurant) {
  let cart = getCart();
  
  // Check if item is from a different restaurant
  if (cart.length > 0 && cart[0].restaurantId !== restaurant.id) {
    if (!confirm(`Your cart contains items from ${cart[0].restaurantName}. Clear cart and add items from ${restaurant.name}?`)) {
      return false;
    }
    cart = []; // Clear cart
  }

  const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: item.name, // Use name as unique identifier inside restaurant menu
      name: item.name,
      price: item.price,
      veg: item.veg,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantLocation: restaurant.locationText,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`${item.name} added to cart!`);
  return true;
}

// Update item quantity
function updateQuantity(itemName, change) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.name === itemName);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart(cart);
    return true;
  }
  return false;
}

// Clear cart completely
function clearCart() {
  saveCart([]);
}

// Update badges on all headers
function updateCartBadges() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalItems;
    if (totalItems === 0) {
      badge.style.display = 'none';
    } else {
      badge.style.display = 'inline-block';
    }
  });
}

// Toast notification helper
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '30px';
    toastContainer.style.right = '30px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.background = 'var(--text-dark, #1C1C1C)';
  toast.style.color = '#FFFFFF';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.marginTop = '10px';
  toast.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
  toast.style.fontWeight = '500';
  toast.style.fontSize = '0.95rem';
  toast.style.transition = 'all 0.3s ease';
  toast.style.transform = 'translateY(50px)';
  toast.style.opacity = '0';
  toast.style.borderLeft = '4px solid var(--primary-color, #E23744)';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Active Coupon State
let activeCoupon = sessionStorage.getItem('foodiehub_coupon') || '';

// ==========================================================================
// Cart Page Dynamic Rendering & Logic
// ==========================================================================

function renderCartPage() {
  const leftSection = document.querySelector('.cart-left-section');
  const rightSection = document.querySelector('.cart-layout > div:last-child');
  
  if (!leftSection || !rightSection) return;

  const cart = getCart();

  // If cart is empty
  if (cart.length === 0) {
    // Check if an order was just placed (to show delivery status)
    const orderPlaced = sessionStorage.getItem('foodiehub_order_placed');
    if (orderPlaced) {
      renderActiveDelivery(leftSection, rightSection);
      return;
    }

    leftSection.innerHTML = `
      <div class="cart-box" style="text-align: center; padding: 60px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 24 24" width="80" fill="var(--text-muted)" style="margin-bottom: 20px; opacity: 0.5;">
          <path d="M17.21 9l-4.38-6.56c-.18-.27-.51-.44-.83-.44-.32 0-.65.17-.83.44L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.5L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        <h3 style="font-size: 1.5rem; margin-bottom: 10px;">Your Cart is Empty</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Add some delicious dishes from your favorite Bengaluru restaurants to get started!</p>
        <a href="restaurants.html" class="btn btn-primary" style="display: inline-block;">Browse Restaurants</a>
      </div>
    `;
    rightSection.style.display = 'none';
    return;
  }

  // Ensure right section is visible
  rightSection.style.display = 'block';

  // Render items list
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let itemsHTML = `<h3>Shopping Cart (${totalItems} items)</h3>`;

  cart.forEach(item => {
    const vegBadgeHTML = item.veg ? 
      `<span class="indicator indicator-veg"><span class="indicator-dot"></span></span>` :
      `<span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span>`;

    itemsHTML += `
      <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #ECECEC;">
        <div class="cart-item-info" style="display: flex; align-items: center; gap: 12px; flex: 1;">
          ${vegBadgeHTML}
          <div>
            <div class="cart-item-title" style="font-weight: 600; color: var(--text-dark);">${item.name}</div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${item.restaurantName}, ${item.restaurantLocation}</p>
          </div>
          <div class="qty-control" style="display: flex; align-items: center; border: 1px solid #ECECEC; border-radius: var(--border-radius-sm); overflow: hidden; margin-left: 20px;">
            <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)" aria-label="Decrease quantity" style="background: #FAFAFA; border: none; padding: 6px 12px; cursor: pointer; font-weight: 600; transition: background 0.2s;">-</button>
            <span class="qty-val" style="padding: 0 12px; font-weight: 600; font-size: 0.9rem;">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)" aria-label="Increase quantity" style="background: #FAFAFA; border: none; padding: 6px 12px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+</button>
          </div>
        </div>
        <div class="cart-item-price" style="font-weight: 600; color: var(--text-dark); font-size: 1.05rem;">₹${item.price * item.quantity}</div>
      </div>
    `;
  });

  leftSection.innerHTML = `
    <div class="cart-box">
      ${itemsHTML}
    </div>
  `;

  // Calculate bill details
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  let deliveryFee = subtotal >= 250 ? 0 : 40;
  const platformFee = 5;

  // Apply Coupon Discounts
  let discount = 0;
  let couponMessage = '';
  let discountRowHTML = '';

  if (activeCoupon) {
    const code = activeCoupon.toUpperCase().trim();
    if (code === 'WELCOME50') {
      discount = Math.round(subtotal * 0.5);
      if (discount > 150) discount = 150; // Cap discount at 150
      couponMessage = `WELCOME50 applied! 50% discount (capped at ₹150)`;
    } else if (code === 'BOGOFEST') {
      if (subtotal >= 300) {
        discount = 100;
        couponMessage = `BOGOFEST applied! Flat ₹100 off`;
      } else {
        couponMessage = `Add items worth ₹${300 - subtotal} more to use BOGOFEST`;
        activeCoupon = '';
        sessionStorage.removeItem('foodiehub_coupon');
      }
    } else if (code === 'FREEDEL') {
      if (subtotal < 250) {
        discount = 40; // Waive the delivery fee
        couponMessage = `FREEDEL applied! Delivery fee waived`;
      } else {
        couponMessage = `Free delivery already active for your order!`;
        activeCoupon = '';
        sessionStorage.removeItem('foodiehub_coupon');
      }
    } else if (code === 'WEEKENDJOY') {
      if (subtotal >= 500) {
        discount = 150;
        couponMessage = `WEEKENDJOY applied! Flat ₹150 off`;
      } else {
        couponMessage = `Add items worth ₹${500 - subtotal} more to use WEEKENDJOY`;
        activeCoupon = '';
        sessionStorage.removeItem('foodiehub_coupon');
      }
    } else {
      couponMessage = 'Invalid Coupon Code';
      activeCoupon = '';
      sessionStorage.removeItem('foodiehub_coupon');
    }
  }

  if (discount > 0) {
    discountRowHTML = `
      <div class="bill-row" style="display: flex; justify-content: space-between; padding: 10px 0; color: var(--veg-green); font-weight: 500;">
        <span>Promo Discount (${activeCoupon})</span>
        <span>-₹${discount}</span>
      </div>
    `;
  }

  const finalTotal = subtotal + gst + deliveryFee + platformFee - discount;

  // Render bill details side column
  rightSection.innerHTML = `
    <div class="cart-box" style="position: sticky; top: 100px;">
      <h3>Bill Details</h3>
      
      <div class="bill-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #ECECEC;">
        <span>Items Subtotal</span>
        <span style="font-weight: 600; color: var(--text-dark);">₹${subtotal}</span>
      </div>
      <div class="bill-row" style="display: flex; justify-content: space-between; padding: 10px 0;">
        <span>Taxes & Restaurant Charges (5% GST)</span>
        <span>₹${gst}</span>
      </div>
      <div class="bill-row" style="display: flex; justify-content: space-between; padding: 10px 0;">
        <span>Delivery Partner Fee</span>
        <span>${deliveryFee === 0 ? '<span style="color: var(--veg-green); font-weight: 600;">FREE</span>' : '₹' + deliveryFee}</span>
      </div>
      ${discountRowHTML}
      <div class="bill-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ECECEC;">
        <span>Platform Fee</span>
        <span>₹${platformFee}</span>
      </div>

      <div class="bill-total-row" style="display: flex; justify-content: space-between; padding: 20px 0; font-size: 1.25rem; font-weight: 700; color: var(--text-dark);">
        <span>To Pay</span>
        <span>₹${finalTotal}</span>
      </div>

      <!-- Coupon Code Form -->
      <div class="promo-container" style="display: flex; gap: 8px; margin-top: 15px;">
        <input type="text" id="coupon-input" placeholder="Enter coupon code" value="${activeCoupon}" aria-label="Coupon Code" style="flex: 1; padding: 10px 14px; border: 1px solid #ECECEC; border-radius: var(--border-radius-sm); font-size: 0.9rem; font-weight: 500;">
        <button id="apply-coupon-btn" class="btn btn-outline btn-sm" style="border-radius: var(--border-radius-sm); cursor: pointer;">${activeCoupon ? 'Remove' : 'Apply'}</button>
      </div>
      ${couponMessage ? `<p id="coupon-feedback" style="font-size: 0.8rem; margin-top: 8px; color: ${discount > 0 ? 'var(--veg-green)' : 'var(--primary-color)'}; font-weight: 500;">${couponMessage}</p>` : ''}

      <!-- Place Order Button -->
      <button id="place-order-btn" class="btn btn-primary" style="width: 100%; margin-top: 24px; padding: 16px; font-weight: 700; border-radius: var(--border-radius-md); border: none; cursor: pointer; transition: background 0.2s;">
        Proceed to Pay (₹${finalTotal})
      </button>
      
      <p style="font-size: 0.8rem; text-align: center; color: var(--text-muted); margin-top: 12px; line-height: 1.4;">
        By clicking pay, you agree to our Terms &amp; Conditions. Cancellation charges of ₹100 apply once order preparation starts.
      </p>
    </div>
  `;

  // Wire up coupon form
  const applyBtn = document.getElementById('apply-coupon-btn');
  const couponInput = document.getElementById('coupon-input');
  if (applyBtn && couponInput) {
    applyBtn.addEventListener('click', () => {
      if (activeCoupon) {
        // Remove coupon
        activeCoupon = '';
        sessionStorage.removeItem('foodiehub_coupon');
        showToast('Coupon removed');
        renderCartPage();
      } else {
        // Apply coupon
        const code = couponInput.value.toUpperCase().trim();
        if (!code) {
          showToast('Please enter a coupon code');
          return;
        }
        activeCoupon = code;
        sessionStorage.setItem('foodiehub_coupon', code);
        renderCartPage();
      }
    });
  }

  // Wire up place order
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      // Simulate payment processing
      placeOrderBtn.textContent = 'Processing Payment...';
      placeOrderBtn.disabled = true;
      placeOrderBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        // Store placed order info
        const orderData = {
          restaurantName: cart[0].restaurantName,
          restaurantLocation: cart[0].restaurantLocation,
          total: finalTotal,
          itemsCount: totalItems,
          placedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        sessionStorage.setItem('foodiehub_order_placed', JSON.stringify(orderData));
        // Clear actual cart so items are bought
        clearCart();
        showToast('Order Placed Successfully!');
        renderCartPage();
      }, 1500);
    });
  }
}

// Render simulation of active delivery tracking
function renderActiveDelivery(leftSection, rightSection) {
  const orderDetails = JSON.parse(sessionStorage.getItem('foodiehub_order_placed'));
  if (!orderDetails) return;

  rightSection.style.display = 'none';

  // Calculate simulated delivery details
  const timeNow = new Date();
  timeNow.setMinutes(timeNow.getMinutes() + 25);
  const etaTime = timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  leftSection.innerHTML = `
    <div class="cart-box" style="text-align: center; border-bottom: 2px solid #ECECEC; padding: 40px 20px;">
      <div style="background: rgba(36, 150, 63, 0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="var(--veg-green)">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
      <h2 style="color: var(--text-dark); margin-bottom: 8px;">Order Confirmed!</h2>
      <p style="color: var(--text-muted);">Thank you for ordering from ${orderDetails.restaurantName}. Your payment of ₹${orderDetails.total} was successful.</p>
    </div>

    <div class="cart-box" style="margin-top: 30px;">
      <h3>Live Delivery Status</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 24px;">Estimated Delivery: <strong style="color: var(--text-dark);">${etaTime} (In 25 mins)</strong></p>
      
      <div class="timeline">
        <div class="timeline-step completed">
          <div class="timeline-title">Order Confirmed</div>
          <div class="timeline-desc">Your order has been received by ${orderDetails.restaurantName}.</div>
        </div>
        <div class="timeline-step active">
          <div class="timeline-title">Food is Preparing</div>
          <div class="timeline-desc" style="color: var(--primary-color); font-weight: 500;">Kitchen is preparing your fresh order.</div>
        </div>
        <div class="timeline-step">
          <div class="timeline-title">Delivery Hero Assigned</div>
          <div class="timeline-desc">Rahul (our delivery partner) will pick up the packages from ${orderDetails.restaurantName}.</div>
        </div>
        <div class="timeline-step">
          <div class="timeline-title">Out for Delivery</div>
          <div class="timeline-desc">Rahul will ride towards your delivery address in Bangalore.</div>
        </div>
        <div class="timeline-step">
          <div class="timeline-title">Arrived at Destination</div>
          <div class="timeline-desc">Rahul will deliver the food contactless at your doorstep.</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; border-top: 1px solid #ECECEC; padding-top: 20px;">
        <button id="cancel-tracking-btn" class="btn btn-secondary btn-sm" style="cursor: pointer;">Back to Home</button>
      </div>
    </div>
  `;

  const backHomeBtn = document.getElementById('cancel-tracking-btn');
  if (backHomeBtn) {
    backHomeBtn.addEventListener('click', () => {
      sessionStorage.removeItem('foodiehub_order_placed');
      window.location.href = 'index.html';
    });
  }
}

// Document load handler for cart page
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  if (window.location.pathname.includes('cart.html')) {
    renderCartPage();
  }
});
