<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.tap.Model.Restaurant, com.tap.Model.Menu, com.tap.Model.User, java.util.List, com.tap.Model.Cart, com.tap.Model.CartItem" %>
<%
    User currentUser = (User) session.getAttribute("currentUser");
    Restaurant restaurant = (Restaurant) request.getAttribute("restaurant");
    List<Menu> menuList = (List<Menu>) request.getAttribute("menuList");
    
    Cart sessionCart = (Cart) session.getAttribute("cart");
    int totalItems = 0;
    double subtotal = 0.0;
    if (sessionCart != null) {
        totalItems = sessionCart.getItems().values().stream().mapToInt(CartItem::getQuantity).sum();
        subtotal = sessionCart.getSubtotal();
    }

    if (restaurant == null) {
        String idParam = request.getParameter("id");
        if (idParam == null) idParam = request.getParameter("restaurantId");
        if (idParam != null && !idParam.trim().isEmpty()) {
            try {
                int resId = Integer.parseInt(idParam);
                com.tap.DAO.RestaurantDAO restaurantDAO = new com.tap.DAOimplementation.RestaurantDAOimplementation();
                com.tap.DAO.MenuDAO menuDAO = new com.tap.DAOimplementation.MenuDAOimplementation();
                restaurant = restaurantDAO.getRestaurent(resId);
                menuList = menuDAO.getMenuByRestaurant(resId);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="View detailed menu, prices, and ratings for restaurants in Bengaluru. Add items to cart and check out.">
  <title>FoodieHub | <%= restaurant != null ? restaurant.getRestaurantName() : "Restaurant Details & Menu" %></title>
  <link rel="stylesheet" href="EntireCss.css?v=<%= System.currentTimeMillis() %>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    .restaurant-detail-section {
      display: block !important;
    }
  </style>
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

  <main class="restaurant-details-wrapper">
    <% if (restaurant == null) { %>
      <div class="no-restaurant-selected">
        <div class="container" style="text-align: center; padding: 100px 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 24 24" width="80" fill="var(--text-muted)" style="margin-bottom: 20px; opacity: 0.5;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
          </svg>
          <h2 style="font-size: 1.75rem; margin-bottom: 10px; color: var(--text-dark);">No Restaurant Selected</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Please choose a restaurant from our directory to view its menu.</p>
          <a href="restaurants.jsp" class="btn btn-primary">Browse Restaurants</a>
        </div>
      </div>
    <% } else { %>
      <section id="res-<%= restaurant.getRestaurantId() %>" class="restaurant-detail-section">
        <div class="details-banner" style="background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.9)), url('<%= restaurant.getimagePath() %>') no-repeat center center/cover; padding: 80px 0 40px 0; color: #FFF;">
          <div class="container details-banner-content">
            <div class="details-header-meta">
              <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 12px;"><%= restaurant.getRestaurantName() %></h1>
              <div class="details-badges" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
                <span class="details-badge-pill rating">⭐ <%= restaurant.getRating() %></span>
                <span class="details-badge-pill"><%= restaurant.getDelivaryTime() %> mins</span>
                <span class="details-badge-pill offer" style="background-color: var(--veg-green, #24963F); color: #FFF;">20% OFF</span>
                <span class="details-badge-pill">&#8377;300 for one</span>
              </div>
              <p style="color: rgba(255, 255, 255, 0.85); font-weight: 500; font-size: 1rem;"><%= restaurant.getCausinType() %> | <%= restaurant.getAddress() %></p>
            </div>
          </div>
        </div>
        
        <div class="container menu-layout" style="display: grid; grid-template-columns: 240px 1fr; gap: 40px; padding: 40px 0;">
          <div class="menu-categories-list" style="display: flex; flex-direction: column; gap: 10px; position: sticky; top: 100px; height: fit-content;">
            <a href="#" class="active" style="padding: 12px 20px; font-weight: 600; border-radius: 8px; color: var(--primary-color); background: rgba(226, 55, 68, 0.05); text-decoration: none;">Recommended Menu</a>
            <a href="#" style="padding: 12px 20px; font-weight: 500; border-radius: 8px; color: var(--text-dark); text-decoration: none;">Main Course</a>
            <a href="#" style="padding: 12px 20px; font-weight: 500; border-radius: 8px; color: var(--text-dark); text-decoration: none;">Drinks & Desserts</a>
          </div>
          
          <div class="menu-list-section">
            <h3 class="menu-section-title" style="font-size: 1.4rem; font-weight: 700; color: var(--text-dark); margin-bottom: 20px; border-left: 4px solid var(--primary-color); padding-left: 12px;">Recommended Menu</h3>
            <div class="menu-items-container">
              <%
              if (menuList != null && !menuList.isEmpty()) {
                  for (Menu m : menuList) {
                      String nameLower = m.getItemName().toLowerCase();
                      boolean isItemVeg = !nameLower.contains("chicken") && !nameLower.contains("mutton") && !nameLower.contains("egg") && !nameLower.contains("fish") && !nameLower.contains("prawn") && !nameLower.contains("kebab") && !nameLower.contains("non-veg");
              %>
                <div class="menu-item-row" style="display: flex; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid #ECECEC;">
                  <div class="menu-item-details" style="flex: 1; padding-right: 20px;">
                    <div class="tag-veg-nonveg" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <% if (isItemVeg) { %>
                        <span class="indicator indicator-veg"><span class="indicator-dot"></span></span><span class="type-label">Veg</span>
                      <% } else { %>
                        <span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span><span class="type-label">Non-Veg</span>
                      <% } %>
                    </div>
                    <h4 style="font-size: 1.15rem; color: var(--text-dark); margin-bottom: 6px; font-weight: 600;"><%= m.getItemName() %></h4>
                    <div class="menu-item-price" style="font-weight: 600; font-size: 1.1rem; color: var(--text-dark); margin-bottom: 8px;">&#8377;<%= (int)m.getPrice() %></div>
                    <p class="menu-item-desc" style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;"><%= m.getDescription() %></p>
                  </div>
                  <div class="menu-item-image-box" style="position: relative; width: 120px; height: 120px;">
                    <img src="<%= m.getImagePath() %>" alt="<%= m.getItemName() %>" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius-md);">
                    <!-- AJAX-bound Add Button -->
                    <button class="btn-add-item-mock" data-id="<%= m.getMenuId() %>" style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #FFF; color: var(--primary-color); border: 1px solid #ECECEC; border-radius: var(--border-radius-sm); padding: 6px 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.08); text-decoration: none; font-size: 0.88rem; text-align: center; transition: all 0.2s ease;">Add +</button>
                  </div>
                </div>
              <%
                  }
              } else {
              %>
                <p style="color: var(--text-muted); text-align: center; padding: 40px 0;">No menu items available for this restaurant.</p>
              <% } %>
            </div>
          </div>
        </div>
      </section>
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

  <!-- Floating Cart Widget -->
  <div class="floating-cart-btn" id="floating-cart-widget" onclick="window.location.href='cart'" style="<%= totalItems > 0 ? "display: flex;" : "display: none;" %>">
    <span class="floating-cart-icon">🛒</span>
    <span class="floating-cart-text" id="floating-cart-text"><%= totalItems %> Item<%= totalItems > 1 ? "s" : "" %> | &#8377;<%= (int)subtotal %></span>
    <span class="floating-cart-arrow">➔</span>
  </div>

  <script>
      window.serverCart = {
          <%
          if (sessionCart != null) {
              int idx = 0;
              for (CartItem ci : sessionCart.getItems().values()) {
                  if (idx > 0) out.print(",");
                  out.print("\"" + ci.getItemId() + "\":" + ci.getQuantity());
                  idx++;
              }
          }
          %>
      };
  </script>
  <script src="JavaScript/cart.js?v=<%= System.currentTimeMillis() %>"></script>
  <script src="JavaScript/app.js?v=<%= System.currentTimeMillis() %>"></script>
</body>
</html>
