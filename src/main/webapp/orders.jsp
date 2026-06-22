<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List, java.util.Map, com.tap.Model.User, com.tap.Model.Cart, com.tap.Model.CartItem" %>
<%
    User currentUser = (User) session.getAttribute("currentUser");
    List<Map<String, Object>> orderHistory = (List<Map<String, Object>>) request.getAttribute("orderHistory");
    Cart sessionCart = (Cart) session.getAttribute("cart");
    int totalItems = 0;
    if (sessionCart != null) {
        totalItems = sessionCart.getItems().values().stream().mapToInt(CartItem::getQuantity).sum();
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="View your order history on FoodieHub. Track your past orders from the best restaurants in Bengaluru.">
  <title>Your Orders | FoodieHub</title>
  <link rel="stylesheet" href="EntireCss.css?v=<%= System.currentTimeMillis() %>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <!-- Hidden mobile menu checkbox and controls -->
  <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox">

  <!-- Navigation Bar -->
  <header class="navbar-wrapper">
    <div class="container navbar">
      <a href="home" class="logo">
        Foodie<span>Hub</span><div class="logo-dot"></div>
      </a>

      <!-- Location Selector -->
      <div class="location-selector">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <select onchange="window.location.hash = 'res-' + this.value">
          <option value="">Select Location</option>
          <option value="koramangala">Koramangala, Bengaluru</option>
          <option value="indiranagar">Indiranagar, Bengaluru</option>
          <option value="jayanagar">Jayanagar, Bengaluru</option>
          <option value="basavanagudi">Basavanagudi, Bengaluru</option>
          <option value="whitefield">Whitefield, Bengaluru</option>
          <option value="hsr">HSR Layout, Bengaluru</option>
        </select>
      </div>

      <!-- Nav Links -->
      <nav class="nav-menu">
        <label for="menu-toggle" class="menu-close-btn">&times;</label>
        
        <a href="home" class="nav-link">Home</a>
        <a href="restaurants.jsp" class="nav-link">Restaurants</a>
        <a href="home#offers" class="nav-link">Offers</a>
        <a href="restaurants.jsp?type=dining" class="nav-link">Dining</a>
        <a href="restaurants.jsp?type=nightlife" class="nav-link">Nightlife</a>
        <a href="cart" class="nav-link nav-cart-btn">
          Cart 
          <span class="cart-badge"><%= totalItems %></span>
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

  <!-- Main Content Area -->
  <main class="orders-page container" style="margin-top: 110px; min-height: 75vh; padding: 20px 16px; max-width: 800px; margin-left: auto; margin-right: auto;">
    <div class="orders-header" style="margin-bottom: 30px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
      <h2 style="font-size: 2rem; font-weight: 700; color: var(--text-dark); margin-bottom: 6px;">Your Orders</h2>
      <p style="color: var(--text-medium); font-size: 1rem;">Track and review your past orders from FoodieHub</p>
    </div>

    <% if (orderHistory == null || orderHistory.isEmpty()) { %>
      <!-- Empty State -->
      <div class="empty-orders-state" style="text-align: center; padding: 60px 20px; background: var(--bg-light); border-radius: var(--border-radius-lg); border: 1px dashed var(--border-color);">
        <div class="empty-icon" style="font-size: 4rem; margin-bottom: 20px; color: var(--text-medium);">📦</div>
        <h3 style="font-size: 1.3rem; font-weight: 600; color: var(--text-dark); margin-bottom: 10px;">No Orders Found</h3>
        <p style="color: var(--text-medium); font-size: 0.95rem; margin-bottom: 24px; max-width: 320px; margin-left: auto; margin-right: auto;">You haven't placed any orders yet. Explore our top restaurants and order delicious food today!</p>
        <a href="restaurants.jsp" class="btn btn-primary" style="padding: 12px 28px; text-decoration: none; display: inline-block;">Browse Restaurants</a>
      </div>
    <% } else { %>
      <!-- Orders List -->
      <div class="orders-list" style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 50px;">
        <% for (Map<String, Object> order : orderHistory) { 
            int orderId = (Integer) order.get("orderId");
            String date = (String) order.get("orderDate");
            double total = (Double) order.get("totalAmount");
            String status = (String) order.get("status");
            String payment = (String) order.get("paymentMethod");
            String restaurant = (String) order.get("restaurantName");
            List<Map<String, Object>> items = (List<Map<String, Object>>) order.get("items");
            
            // Format status badge color
            String badgeBg = "rgba(36, 150, 63, 0.1)";
            String badgeColor = "#24963F";
            if ("pending".equalsIgnoreCase(status) || "preparing".equalsIgnoreCase(status)) {
                badgeBg = "rgba(255, 122, 0, 0.1)";
                badgeColor = "#FF7A00";
            } else if ("failed".equalsIgnoreCase(status) || "cancelled".equalsIgnoreCase(status)) {
                badgeBg = "rgba(226, 55, 68, 0.1)";
                badgeColor = "#E23744";
            }
        %>
          <div class="order-card" style="background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; transition: transform 0.2s ease;">
            <!-- Card Header -->
            <div class="order-card-header" style="padding: 18px 24px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.01); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 4px;"><%= restaurant %></h3>
                <span style="font-size: 0.82rem; color: var(--text-medium);"><%= date %></span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="order-id" style="font-size: 0.85rem; font-weight: 600; color: var(--text-medium); background: var(--bg-light); padding: 4px 8px; border-radius: var(--border-radius-sm);">#FH-<%= 100000 + orderId %></span>
                <span class="order-status-badge" style="font-size: 0.78rem; font-weight: 700; background-color: <%= badgeBg %>; color: <%= badgeColor %>; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;"><%= status %></span>
              </div>
            </div>
            <!-- Card Body -->
            <div class="order-card-body" style="padding: 20px 24px;">
              <div class="order-items-list" style="display: flex; flex-direction: column; gap: 10px;">
                <% if (items != null) {
                    for (Map<String, Object> item : items) { %>
                      <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; font-size: 0.92rem; color: var(--text-dark);">
                        <span class="item-name-qty" style="font-weight: 500;">
                          <%= item.get("itemName") %> 
                          <span style="color: var(--text-medium); font-size: 0.85rem; margin-left: 8px;">x <%= item.get("quantity") %></span>
                        </span>
                        <span class="item-price-total" style="font-weight: 600;">&#8377;<%= item.get("itemTotal") %></span>
                      </div>
                <%   }
                   } %>
              </div>
            </div>
            <!-- Card Footer -->
            <div class="order-card-footer" style="padding: 16px 24px; border-top: 1px solid var(--border-color); background: rgba(0,0,0,0.01); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <span style="font-size: 0.85rem; color: var(--text-medium); font-weight: 500;">Paid via: <strong style="color: var(--text-dark);"><%= payment %></strong></span>
              <span style="font-size: 1.1rem; font-weight: 700; color: var(--text-dark);">Total Amount: <strong style="color: var(--primary-color); font-size: 1.2rem; margin-left: 4px;">&#8377;<%= (int)total %></strong></span>
            </div>
          </div>
        <% } %>
      </div>
    <% } %>
  </main>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2025 FoodieHub. All rights reserved.</p>
        <p>Designed with ❤️ for food lovers in Bengaluru</p>
      </div>
    </div>
  </footer>

  <!-- Sticky Bottom Mobile Navigation -->
  <nav class="mobile-bottom-nav">
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'home')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span>Home</span>
    </div>
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'search')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span>Search</span>
    </div>
    <div class="mobile-nav-item active" onclick="handleMobileNavClick(this, 'orders')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <span>Orders</span>
    </div>
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'cart')">
      <div style="position: relative; display: inline-block;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cart-badge"><%= totalItems %></span>
      </div>
      <span>Cart</span>
    </div>
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'profile')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span>Profile</span>
    </div>
  </nav>

  <script src="JavaScript/cart.js?v=<%= System.currentTimeMillis() %>"></script>
  <script src="JavaScript/app.js?v=<%= System.currentTimeMillis() %>"></script>
</body>
</html>
