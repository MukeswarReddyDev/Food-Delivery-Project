<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.tap.Model.User, com.tap.Model.Cart, com.tap.Model.CartItem, java.util.Map" %>
<%
    User currentUser = (User) session.getAttribute("currentUser");
    Cart cart = (Cart) session.getAttribute("cart");
    if (cart == null) {
        cart = new Cart();
        session.setAttribute("cart", cart);
    }
    
    double subtotal = 0.0;
    double taxes = 0.0;
    double discount = 0.0;
    double total = 0.0;
    double deliveryFee = 30.0;
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="View your cart, adjust item quantities, apply promo codes, and check out on FoodieHub.">
  <title>FoodieHub | Shopping Cart & Checkout</title>
  <link rel="stylesheet" href="EntireCss.css?v=<%= System.currentTimeMillis() %>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <!-- Mobile nav drawer checkbox -->
  <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox">

  <!-- Navigation Bar -->
  <header class="navbar-wrapper">
    <div class="container navbar">
      <a href="home" class="logo">
        Foodie<span>Hub</span><div class="logo-dot"></div>
      </a>

      <!-- Location Selector -->
      <div class="location-selector">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <select aria-label="Select Bengaluru Location">
          <option value="bengaluru">Bengaluru (All)</option>
          <option value="koramangala" selected>Koramangala, Bengaluru</option>
          <option value="indiranagar">Indiranagar, Bengaluru</option>
          <option value="jayanagar">Jayanagar, Bengaluru</option>
          <option value="basavanagudi">Basavanagudi, Bengaluru</option>
          <option value="whitefield">Whitefield, Bengaluru</option>
          <option value="hsr">HSR Layout, Bengaluru</option>
        </select>
      </div>

      <!-- Nav Links -->
      <nav class="nav-menu">
        <!-- Close Button for Mobile Drawer -->
        <label for="menu-toggle" class="menu-close-btn">&times;</label>
        <a href="home" class="nav-link">Home</a>
        <a href="restaurants.jsp" class="nav-link">Restaurants</a>
        <a href="home#offers" class="nav-link">Offers</a>
        <% if (currentUser != null) { %>
          <a href="orders" class="nav-link">Orders</a>
        <% } %>
        <a href="cart" class="nav-link nav-cart-btn active">
          Cart 
          <span class="cart-badge"><%= cart.getItems().values().stream().mapToInt(CartItem::getQuantity).sum() %></span>
        </a>
        <div class="nav-auth">
          <% if (currentUser != null) { %>
            <span class="user-greeting" style="font-weight: 600; margin-right: 16px; color: var(--text-dark); font-size: 0.95rem;">Hi, <%= currentUser.getUserName() %></span>
            <a href="login?action=logout" class="btn btn-outline btn-sm">Logout</a>
          <% } else { %>
            <a href="login" class="btn btn-outline btn-sm">Login</a>
            <a href="register" class="btn btn-primary btn-sm">Sign Up</a>
          <% } %>
        </div>
      </nav>

      <!-- Mobile Hamburger Toggle Button -->
      <label for="menu-toggle" class="menu-toggle-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28" fill="#1C1C1C">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </label>
    </div>
  </header>

  <!-- Cart Page Layout -->
  <main class="container cart-layout">
    
    <% if (currentUser == null) { %>
      <!-- Prompt Login Screen -->
      <div class="cart-left-section" style="grid-column: span 2; text-align: center; padding: 100px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 24 24" width="80" fill="var(--text-muted)" style="margin-bottom: 20px; opacity: 0.5;">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
        <h2 style="font-size: 1.75rem; margin-bottom: 10px; color: var(--text-dark);">Please Log In</h2>
        <p style="color: var(--text-muted); margin-bottom: 20px;">You need to log in to your account to view your cart and place orders.</p>
        <a href="login" class="btn btn-primary" style="padding: 12px 36px; border-radius: 30px;">Log In Now</a>
      </div>
    <% } else if (cart.getItems().isEmpty()) { %>
      <!-- Empty Cart View -->
      <div class="cart-left-section" style="grid-column: span 2; text-align: center; padding: 100px 20px;">
        <div style="background: rgba(239, 79, 95, 0.1); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="var(--primary-color)">
            <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.88 1.46h13.08c.88 0 1.65-.62 1.88-1.46l2.54-9.27.04-.15c0-.55-.45-1-1-1h-4.79zM9 9l3-4.5L15 9H9z"/>
          </svg>
        </div>
        <h3 style="border-bottom:none; margin-bottom: 12px; font-size: 1.65rem; font-weight: 700; color: var(--text-dark);">Your Cart is Empty</h3>
        <p style="color: var(--text-muted); max-width: 360px; margin: 0 auto 32px; font-size: 0.95rem; line-height: 1.6;">
          Good food is always cooking! Add tasty items from our handpicked premium restaurants in Bengaluru.
        </p>
        <a href="restaurants.jsp" class="btn btn-primary" style="padding: 12px 36px; border-radius: 30px;">Explore Restaurants</a>
      </div>
    <% } else { 
        subtotal = cart.getSubtotal();
        deliveryFee = 30.0;
        taxes = Math.round(subtotal * 0.05 + 5.0);
        discount = subtotal >= 200.0 ? 100.0 : 0.0;
        total = subtotal + deliveryFee + taxes - discount;
    %>
      <!-- Left Column: Cart Items & Delivery Address -->
      <div class="cart-left-section">
        <!-- Cart Items Box -->
        <div class="cart-box">
          <h3>Items in Your Cart</h3>
          
          <% for (CartItem item : cart.getItems().values()) {
              boolean isVeg = !item.getName().toLowerCase().contains("chicken") && !item.getName().toLowerCase().contains("mutton") && !item.getName().toLowerCase().contains("egg") && !item.getName().toLowerCase().contains("fish") && !item.getName().toLowerCase().contains("kebab");
          %>
            <div class="cart-item">
              <div class="cart-item-info">
                <% if (isVeg) { %>
                  <span class="indicator indicator-veg"><span class="indicator-dot"></span></span>
                <% } else { %>
                  <span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span>
                <% } %>
                <div>
                  <div class="cart-item-title"><%= item.getName() %></div>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div class="qty-control">
                  <form action="cart" method="POST" style="display:inline;">
                    <input type="hidden" name="action" value="update">
                    <input type="hidden" name="menuId" value="<%= item.getItemId() %>">
                    <input type="hidden" name="quantity" value="<%= item.getQuantity() - 1 %>">
                    <button class="qty-btn" type="submit">-</button>
                  </form>
                  <span class="qty-val"><%= item.getQuantity() %></span>
                  <form action="cart" method="POST" style="display:inline;">
                    <input type="hidden" name="action" value="update">
                    <input type="hidden" name="menuId" value="<%= item.getItemId() %>">
                    <input type="hidden" name="quantity" value="<%= item.getQuantity() + 1 %>">
                    <button class="qty-btn" type="submit">+</button>
                  </form>
                </div>
                <div class="cart-item-price" style="margin-left: 24px; min-width: 60px; text-align: right;">&#8377;<%= (int)item.getItemTotal() %></div>
              </div>
            </div>
          <% } %>
        </div>

        <!-- Delivery Address Box -->
        <div class="cart-box">
          <h3 style="display: flex; align-items: center; justify-content: space-between;">
            Delivery Address
            <span onclick="promptChangeAddress()" style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600; cursor: pointer;">Change</span>
          </h3>
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="var(--primary-color)" style="flex-shrink: 0; margin-top: 2px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <div style="font-weight: 600; color: var(--text-dark); font-size: 1.05rem; margin-bottom: 4px;"><%= currentUser.getUserName() %></div>
              <p style="color: var(--text-medium); font-size: 0.9rem; line-height: 1.5;" id="delivery-address-text">
                <%= currentUser.getAddress() != null && !currentUser.getAddress().isEmpty() ? currentUser.getAddress() : "No address specified. Please set one." %>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Bill Details & Checkout Form -->
      <div>
        <!-- Promo Code Box -->
        <div class="cart-box" style="margin-bottom: 24px;">
          <h3>Apply Coupon</h3>
          <div class="promo-container">
            <input type="text" id="promo-code-input" value="" placeholder="Enter Coupon Code" style="text-transform: uppercase; font-weight: 600; color: var(--text-dark); border-color: var(--border-color-dark);">
            <button id="btn-apply-promo" class="btn btn-outline btn-sm" style="font-weight: 600;">Apply</button>
          </div>
          <p id="promo-message" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px; font-weight: 500;">
            Apply any of the available codes (e.g. WELCOME50, BOGOFEST, FREEDEL, WEEKENDJOY)
          </p>
        </div>

        <!-- Bill Details Box -->
        <div class="cart-box">
          <h3>Bill Details</h3>
          <div class="bill-row">
            <span>Item Total</span>
            <span id="bill-subtotal">&#8377;<%= (int)subtotal %></span>
          </div>
          <div class="bill-row">
            <span>Delivery Partner Fee</span>
            <span id="bill-delivery-fee">&#8377;30</span>
          </div>
          <div class="bill-row">
            <span>Taxes &amp; Restaurant Charges</span>
            <span id="bill-taxes">&#8377;<%= (int)taxes %></span>
          </div>
          
          <div class="bill-row" id="bill-discount-row" style="color: var(--veg-green); font-weight: 500; display: none;">
            <span id="bill-discount-label">Coupon Discount</span>
            <span>-&#8377;<span id="bill-discount-val">0</span></span>
          </div>
          
          <div class="bill-total-row">
            <span>To Pay</span>
            <span id="bill-total">&#8377;<%= (int)total %></span>
          </div>
          
          <!-- Real Checkout Form -->
          <form action="checkout" method="POST" id="checkout-form">
              <input type="hidden" name="paymentMethod" value="COD">
              <input type="hidden" name="deliveryAddress" id="checkout-address-input" value="<%= currentUser.getAddress() %>">
              <input type="hidden" name="discountAmount" id="checkout-discount-input" value="<%= (int)discount %>">
              <input type="hidden" name="couponCode" id="checkout-coupon-input" value="<%= discount > 0 ? "WELCOME50" : "" %>">
              <div style="margin-top: 24px;">
                <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 14px 28px;">Place Order (&#8377;<%= (int)total %>)</button>
              </div>
          </form>
        </div>
      </div>
    <% } %>

  </main>

  <!-- CSS-only Success Modal -->
  <div id="order-success-modal" class="modal-overlay">
    <div class="modal-card">
      <a href="restaurants.jsp" class="modal-back-btn" aria-label="Close & Go back to Restaurants">
        <i class="fa-solid fa-arrow-left"></i>
      </a>

      <div class="success-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 24 24" width="60" fill="var(--veg-green)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      
      <h2>Order Confirmed!</h2>
      <p class="order-id-subtitle">Order ID: <strong id="tracking-order-id"><%= session.getAttribute("lastOrderId") != null ? session.getAttribute("lastOrderId") : "" %></strong></p>

      <!-- ETA Display -->
      <div class="tracking-eta-card">
        <div class="eta-pulse-dot"></div>
        <span>Arriving in <strong class="eta-mins">32</strong> Mins</span>
      </div>

      <!-- Live CSS Scooter Map Animation -->
      <div class="live-map-container">
        <div class="map-road-path"></div>
        <div class="map-marker restaurant-marker" id="map-restaurant">
          <i class="fa-solid fa-store"></i>
          <span class="marker-label">Restaurant</span>
        </div>
        <div class="map-marker home-marker">
          <i class="fa-solid fa-house-user"></i>
          <span class="marker-label">Home</span>
        </div>
        <div class="delivery-scooter" id="live-delivery-scooter">
          <i class="fa-solid fa-motorcycle"></i>
          <div class="scooter-glow"></div>
        </div>
      </div>

      <!-- Delivery Partner Card -->
      <div class="delivery-driver-card">
        <div class="driver-avatar">
          <i class="fa-solid fa-user-ninja"></i>
        </div>
        <div class="driver-info">
          <div class="driver-name">Ramesh Kumar</div>
          <div class="driver-status" id="live-driver-status">Ramesh is waiting at the restaurant</div>
          <div class="driver-rating"><i class="fa-solid fa-star"></i> 4.8 &bull; Premium Partner</div>
        </div>
        <div class="driver-actions">
          <button class="btn-driver-action" onclick="showToast('📞 Calling Ramesh Kumar (+91 98765 43210)...')" aria-label="Call driver">
            <i class="fa-solid fa-phone"></i>
          </button>
          <button class="btn-driver-action" onclick="showToast('💬 Opening chat with Ramesh...')" aria-label="Message driver">
            <i class="fa-solid fa-message"></i>
          </button>
        </div>
      </div>
      
      <!-- Order Summary Card -->
      <div class="order-summary-box">
        <div class="order-summary-row"><span>Items:</span><strong id="tracking-items"><%= session.getAttribute("lastOrderItems") != null ? session.getAttribute("lastOrderItems") : "" %></strong></div>
        <div class="order-summary-row"><span>Address:</span><strong id="tracking-address"><%= currentUser != null ? currentUser.getAddress() : "" %></strong></div>
        <div class="order-summary-row"><span>Paid Amount:</span><strong id="tracking-amount">&#8377;<%= session.getAttribute("lastOrderTotal") != null ? (int)((double)session.getAttribute("lastOrderTotal")) : 0 %></strong></div>
      </div>

      <!-- Tracking Timeline -->
      <div class="timeline" id="tracking-timeline">
        <div class="timeline-step completed" id="step-confirmed">
          <div class="timeline-title">Order Received</div>
          <div class="timeline-desc">Your order has been confirmed by the kitchen</div>
        </div>
        <div class="timeline-step active" id="step-preparing">
          <div class="timeline-title">Preparing Food</div>
          <div class="timeline-desc" id="step-preparing-desc">Chef is preparing your fresh meal</div>
        </div>
        <div class="timeline-step" id="step-out">
          <div class="timeline-title">Out for Delivery</div>
          <div class="timeline-desc" id="step-out-desc">Delivery partner will pick up shortly</div>
        </div>
        <div class="timeline-step" id="step-delivered">
          <div class="timeline-title">Delivered</div>
          <div class="timeline-desc">Enjoy your delicious food!</div>
        </div>
      </div>

      <div class="modal-actions">
        <a href="restaurants.jsp" class="btn btn-outline">Order Something Else</a>
        <a href="home" class="btn btn-primary" style="background: var(--veg-green); box-shadow: 0 4px 15px rgba(15,138,95,0.3);">Go to Homepage</a>
      </div>
    </div>
  </div>
  
  <%
      // Clean order session tokens after displaying
      session.removeAttribute("lastOrderId");
      session.removeAttribute("lastOrderItems");
      session.removeAttribute("lastOrderTotal");
  %>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2025 FoodieHub. All rights reserved.</p>
        <p>Designed with ❤️ for food lovers in Bengaluru</p>
      </div>
    </div>
  </footer>

  <script src="JavaScript/cart.js?v=<%= System.currentTimeMillis() %>"></script>
  <script src="JavaScript/app.js?v=<%= System.currentTimeMillis() %>"></script>
  <script>
      function promptChangeAddress() {
          const currentAddress = document.getElementById('delivery-address-text').innerText.trim();
          const newAddress = prompt('Enter your delivery address:', currentAddress);
          if (newAddress !== null && newAddress.trim() !== '') {
              // Update visible text
              document.getElementById('delivery-address-text').innerText = newAddress.trim();
              document.getElementById('checkout-address-input').value = newAddress.trim();
              
              // Also sync to local storage for frontend javascript compatibility
              localStorage.setItem('foodiehub_logged_in_user_address', newAddress.trim());
          }
      }

      // Dynamic Interactive Coupons Logic
      const subtotal = <%= subtotal %>;
      const taxes = <%= taxes %>;
      let deliveryFee = 30;
      let discountAmount = 0;
      let appliedCoupon = "";

      function applyCoupon(code, isInitial) {
          code = code.trim().toUpperCase();
          let valid = false;
          let message = "";
          let tempDiscount = 0;
          let tempDeliveryFee = 30;

          if (code === "WELCOME50") {
              if (subtotal >= 200) {
                  tempDiscount = 100; // Flat ₹100 discount (as per original logic)
                  valid = true;
                  message = "WELCOME50 applied! Flat ₹100 discount saved on this order.";
              } else {
                  message = "Add items worth ₹200 or more to get WELCOME50 coupon discount.";
              }
          } else if (code === "BOGOFEST") {
              if (subtotal >= 250) {
                  tempDiscount = 120; // BOGO flat discount
                  valid = true;
                  message = "BOGOFEST applied! Flat ₹120 discount saved on this order.";
              } else {
                  message = "Add items worth ₹250 or more to apply BOGOFEST coupon.";
              }
          } else if (code === "FREEDEL") {
              if (subtotal >= 150) {
                  tempDeliveryFee = 0; // Waive delivery fee
                  valid = true;
                  message = "FREEDEL applied! Delivery fee has been waived.";
              } else {
                  message = "Add items worth ₹150 or more to apply FREEDEL coupon.";
              }
          } else if (code === "WEEKENDJOY") {
              if (subtotal >= 200) {
                  tempDiscount = 80;
                  valid = true;
                  message = "WEEKENDJOY applied! Flat ₹80 discount saved on this order.";
              } else {
                  message = "Add items worth ₹200 or more to apply WEEKENDJOY coupon.";
              }
          } else {
              message = "Invalid coupon code!";
          }

          const promoInput = document.getElementById('promo-code-input');
          const promoBtn = document.getElementById('btn-apply-promo');
          const promoMsg = document.getElementById('promo-message');
          const discountRow = document.getElementById('bill-discount-row');
          const discountVal = document.getElementById('bill-discount-val');
          const discountLabel = document.getElementById('bill-discount-label');
          const billDeliveryFee = document.getElementById('bill-delivery-fee');
          const billTotal = document.getElementById('bill-total');
          const checkoutBtn = document.querySelector('#checkout-form button[type="submit"]');

          const inputDiscount = document.getElementById('checkout-discount-input');
          const inputCoupon = document.getElementById('checkout-coupon-input');

          if (valid) {
              discountAmount = tempDiscount;
              deliveryFee = tempDeliveryFee;
              appliedCoupon = code;

              if (inputDiscount) inputDiscount.value = discountAmount;
              if (inputCoupon) inputCoupon.value = appliedCoupon;

              promoInput.value = code;
              promoInput.readOnly = true;
              promoInput.style.backgroundColor = "var(--bg-light)";
              promoInput.style.borderColor = "var(--veg-green)";
              promoInput.style.color = "var(--veg-green)";

              promoBtn.innerText = "Remove";
              promoBtn.style.borderColor = "var(--primary-color)";
              promoBtn.style.color = "var(--primary-color)";
              promoBtn.onclick = removeCoupon;

              promoMsg.innerText = message;
              promoMsg.style.color = "var(--veg-green)";

              billDeliveryFee.innerHTML = deliveryFee === 0 ? "<span style='text-decoration: line-through; color: var(--text-muted); margin-right: 8px;'>&#8377;30</span><span style='color: var(--veg-green); font-weight:600;'>FREE</span>" : "&#8377;" + deliveryFee;
              
              if (discountAmount > 0) {
                  discountLabel.innerText = "Coupon Discount (" + code + ")";
                  discountVal.innerText = discountAmount;
                  discountRow.style.display = "flex";
              } else {
                  discountRow.style.display = "none";
              }

              const newTotal = subtotal + deliveryFee + taxes - discountAmount;
              billTotal.innerHTML = "&#8377;" + newTotal;
              if (checkoutBtn) {
                  checkoutBtn.innerHTML = "Place Order (&#8377;" + newTotal + ")";
              }

              if (!isInitial && typeof showToast === 'function') {
                  showToast("🎉 Coupon " + code + " applied successfully!");
              }
          } else {
              if (!isInitial) {
                  if (typeof showToast === 'function') {
                      showToast("❌ " + message);
                  }
                  promoMsg.innerText = message;
                  promoMsg.style.color = "var(--primary-color)";
              }
          }
      }

      function removeCoupon() {
          const promoInput = document.getElementById('promo-code-input');
          const promoBtn = document.getElementById('btn-apply-promo');
          const promoMsg = document.getElementById('promo-message');
          const discountRow = document.getElementById('bill-discount-row');
          const billDeliveryFee = document.getElementById('bill-delivery-fee');
          const billTotal = document.getElementById('bill-total');
          const checkoutBtn = document.querySelector('#checkout-form button[type="submit"]');

          const inputDiscount = document.getElementById('checkout-discount-input');
          const inputCoupon = document.getElementById('checkout-coupon-input');

          discountAmount = 0;
          deliveryFee = 30;
          appliedCoupon = "";

          if (inputDiscount) inputDiscount.value = "0";
          if (inputCoupon) inputCoupon.value = "";

          promoInput.value = "";
          promoInput.readOnly = false;
          promoInput.style.backgroundColor = "";
          promoInput.style.borderColor = "var(--border-color-dark)";
          promoInput.style.color = "var(--text-dark)";

          promoBtn.innerText = "Apply";
          promoBtn.onclick = handleApplyClick;

          promoMsg.innerText = "Apply any of the available codes (e.g. WELCOME50, BOGOFEST, FREEDEL, WEEKENDJOY)";
          promoMsg.style.color = "var(--text-muted)";

          billDeliveryFee.innerHTML = "&#8377;30";
          discountRow.style.display = "none";

          const newTotal = subtotal + deliveryFee + taxes;
          billTotal.innerHTML = "&#8377;" + newTotal;
          if (checkoutBtn) {
              checkoutBtn.innerHTML = "Place Order (&#8377;" + newTotal + ")";
          }

          if (typeof showToast === 'function') {
              showToast("Coupon removed.");
          }
      }

      function handleApplyClick(e) {
          if (e) e.preventDefault();
          const promoInput = document.getElementById('promo-code-input');
          const code = promoInput.value.trim();
          if (code) {
              applyCoupon(code, false);
          } else {
              if (typeof showToast === 'function') {
                  showToast("Please enter a coupon code.");
              }
          }
      }

      document.addEventListener('DOMContentLoaded', () => {
          const promoBtn = document.getElementById('btn-apply-promo');
          if (promoBtn) {
              promoBtn.onclick = handleApplyClick;
          }

          // Pre-apply WELCOME50 if order value is eligible
          if (subtotal >= 200) {
              applyCoupon("WELCOME50", true);
          }
      });
  </script>
</body>
</html>
