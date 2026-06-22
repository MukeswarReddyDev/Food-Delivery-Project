<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List, com.tap.Model.Restaurant, com.tap.Model.User, com.tap.Model.Cart, com.tap.Model.CartItem" %>
<%
    User currentUser = (User) session.getAttribute("currentUser");
    com.tap.DAO.RestaurantDAO restaurantDAO = new com.tap.DAOimplementation.RestaurantDAOimplementation();
    List<Restaurant> restaurantList = restaurantDAO.getAllRestaurent();
    Cart sessionCart = (Cart) session.getAttribute("cart");
    int totalItems = 0;
    double subtotal = 0.0;
    if (sessionCart != null) {
        totalItems = sessionCart.getItems().values().stream().mapToInt(CartItem::getQuantity).sum();
        subtotal = sessionCart.getSubtotal();
    }
    
    List<Integer> favoriteIds = new java.util.ArrayList<>();
    if (currentUser != null) {
        com.tap.DAO.FavoriteDAO favoriteDAO = new com.tap.DAOimplementation.FavoriteDAOimplementation();
        favoriteIds = favoriteDAO.getFavoriteRestaurantIds(currentUser.getUserId());
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Explore and filter 20 popular restaurants in Bengaluru on FoodieHub. Filter by cuisine, location, rating, and veg status.">
  <title>FoodieHub | Explore Restaurants in Bengaluru</title>
  <link rel="stylesheet" href="EntireCss.css?v=<%= System.currentTimeMillis() %>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <!-- Target Anchors for Cuisine Filter -->
  <div id="all" style="display:none;"></div>
  <div id="biryani" style="display:none;"></div>
  <div id="north-indian" style="display:none;"></div>
  <div id="south-indian" style="display:none;"></div>
  <div id="burgers" style="display:none;"></div>
  <div id="pizza" style="display:none;"></div>
  <div id="chinese" style="display:none;"></div>
  <div id="desserts" style="display:none;"></div>
  <div id="mexican" style="display:none;"></div>
  <div id="healthy" style="display:none;"></div>


  <!-- Pure CSS Filtering Control Inputs (Hidden) -->
  <div class="filter-inputs-holder">
    <!-- Cuisine Filters -->
    <input type="radio" id="filter-cuisine-all" name="cuisine-filter" checked>
    <input type="radio" id="filter-cuisine-biryani" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-north-indian" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-south-indian" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-burgers" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-pizza" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-chinese" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-desserts" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-mexican" name="cuisine-filter">
    <input type="radio" id="filter-cuisine-healthy" name="cuisine-filter">

    <!-- Rating Filter (4.0+) -->
    <input type="checkbox" id="filter-rating-40" name="rating-filter">

    <!-- Location Filters -->
    <input type="radio" id="filter-loc-all" name="location-filter" checked>
    <input type="radio" id="filter-loc-koramangala" name="location-filter">
    <input type="radio" id="filter-loc-indiranagar" name="location-filter">
    <input type="radio" id="filter-loc-jayanagar" name="location-filter">
    <input type="radio" id="filter-loc-basavanagudi" name="location-filter">
    <input type="radio" id="filter-loc-whitefield" name="location-filter">
    <input type="radio" id="filter-loc-hsr" name="location-filter">

    <!-- Veg Only Filter -->
    <input type="checkbox" id="filter-veg-only" name="veg-filter">

    <!-- Mobile Filter Sidebar Toggle (Hidden) -->
    <input type="checkbox" id="filter-toggle" class="filter-toggle-checkbox" style="display: none;">
    <label for="filter-toggle" class="filter-overlay-backdrop"></label>
  </div>

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
        <a href="restaurants.jsp" class="nav-link active">Restaurants</a>
        <a href="home#offers" class="nav-link">Offers</a>
        <% if (currentUser != null) { %>
          <a href="orders" class="nav-link">Orders</a>
        <% } %>
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

  <!-- Filter & Listing Layout -->
  <main class="container restaurants-layout">

    <!-- Mobile Filters Bar -->
    <div class="mobile-filter-bar">
      <label for="filter-toggle" class="filter-toggle-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
        Filters &amp; Sort
      </label>
    </div>
    
    <!-- Sidebar Filters -->
    <aside class="filter-sidebar">
      <div class="filter-group">
        <h4>Filter by Cuisine</h4>
        <div class="filter-options">
          <a href="#all" class="filter-label">
            All Cuisines
          </a>
          <a href="#biryani" class="filter-label">
            Biryani
          </a>
          <a href="#north-indian" class="filter-label">
            North Indian
          </a>
          <a href="#south-indian" class="filter-label">
            South Indian
          </a>
          <a href="#burgers" class="filter-label">
            Burgers
          </a>
          <a href="#pizza" class="filter-label">
            Pizza
          </a>
          <a href="#chinese" class="filter-label">
            Chinese
          </a>
          <a href="#desserts" class="filter-label">
            Desserts
          </a>
          <a href="#mexican" class="filter-label">
            Mexican
          </a>
          <a href="#healthy" class="filter-label">
            Healthy Food
          </a>
        </div>
      </div>
      <div class="filter-group">
        <h4>Dietary Preference</h4>
        <div class="filter-options">
          <label for="filter-veg-only" class="filter-label">
            <input type="checkbox" id="veg-check-display" onclick="document.getElementById('filter-veg-only').click();">
            Pure Veg Only
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h4>Ratings</h4>
        <div class="filter-options">
          <label for="filter-rating-40" class="filter-label">
            <input type="checkbox" id="rating-check-display" onclick="document.getElementById('filter-rating-40').click();">
            Top Rated (4.0 ★ +)
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h4>Favorites</h4>
        <div class="filter-options">
          <label class="filter-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="filter-favorites-only" onchange="toggleFavoritesFilter(this.checked)" style="accent-color: #EF4F5F; cursor: pointer;">
            <span style="color: #EF4F5F; font-weight: 600;">&#10084; Favorites Only</span>
          </label>
        </div>
      </div>

      <div class="filter-group" style="display:none;">
        <div class="filter-options">
          <label style="display:none;">
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h4>Select Location</h4>
        <div class="filter-options">
          <label for="filter-loc-all" class="filter-label">
            All Bengaluru
          </label>
          <label for="filter-loc-koramangala" class="filter-label">
            Koramangala
          </label>
          <label for="filter-loc-indiranagar" class="filter-label">
            Indiranagar
          </label>
          <label for="filter-loc-jayanagar" class="filter-label">
            Jayanagar
          </label>
          <label for="filter-loc-basavanagudi" class="filter-label">
            Basavanagudi
          </label>
          <label for="filter-loc-whitefield" class="filter-label">
            Whitefield
          </label>
          <label for="filter-loc-hsr" class="filter-label">
            HSR Layout
          </label>
        </div>
      </div>
    </aside>

    <!-- Restaurants List Grid -->
    <section>
      <div class="section-header" style="margin-bottom: 24px;">
        <h2>All Restaurants in Bengaluru</h2>
        <p>Explore variety of local options with ratings and speedy delivery</p>
      </div>

      <div class="restaurant-grid">
      <%
      if (restaurantList != null) {
          for (Restaurant r : restaurantList) {
              boolean isVeg = r.getCausinType().toLowerCase().contains("veg") || r.getCausinType().toLowerCase().contains("south indian") || r.getCausinType().toLowerCase().contains("vegetarian");
              String cuisineClass = "cuisine-all";
              String type = r.getCausinType().toLowerCase();
              if (type.contains("biryani")) cuisineClass += " cuisine-biryani";
              if (type.contains("north indian")) cuisineClass += " cuisine-north-indian";
              if (type.contains("south indian")) cuisineClass += " cuisine-south-indian";
              if (type.contains("burger")) cuisineClass += " cuisine-burgers";
              if (type.contains("pizza")) cuisineClass += " cuisine-pizza";
              if (type.contains("chinese") || type.contains("wok") || type.contains("momo")) cuisineClass += " cuisine-chinese";
              if (type.contains("dessert") || type.contains("ice cream") || type.contains("sweet") || type.contains("bakery")) cuisineClass += " cuisine-desserts";
              if (type.contains("mexican") || type.contains("taco")) cuisineClass += " cuisine-mexican";
              if (type.contains("healthy") || type.contains("salad") || type.contains("spa") || type.contains("juice")) cuisineClass += " cuisine-healthy";
              
              String locClass = "loc-all";
              String addr = r.getAddress().toLowerCase();
              if (addr.contains("koramangala")) locClass += " loc-koramangala";
              if (addr.contains("indiranagar")) locClass += " loc-indiranagar";
              if (addr.contains("jayanagar")) locClass += " loc-jayanagar";
              if (addr.contains("basavanagudi")) locClass += " loc-basavanagudi";
              if (addr.contains("whitefield")) locClass += " loc-whitefield";
              if (addr.contains("hsr")) locClass += " loc-hsr";
              
              String ratingClass = r.getRating() >= 4.0 ? "rating-high" : "rating-med";
              String vegClass = isVeg ? "veg-pure" : "";
      %>
            <a href="restaurant-details?id=<%= r.getRestaurantId() %>" class="restaurant-card <%= cuisineClass %> <%= ratingClass %> <%= locClass %> <%= vegClass %>">
              <div class="restaurant-img-wrapper">
                <% boolean isFavorite = favoriteIds.contains(r.getRestaurantId()); %>
                <button class="btn-favorite<%= isFavorite ? " active" : "" %>" 
                        data-restaurant-id="<%= r.getRestaurantId() %>" 
                        data-restaurant-name="<%= r.getRestaurantName() %>" 
                        aria-label="Add to Favorites" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" 
                       fill="<%= isFavorite ? "#EF4F5F" : "rgba(0, 0, 0, 0.45)" %>" 
                       stroke="<%= isFavorite ? "#EF4F5F" : "#ffffff" %>">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
                <% if (r.getRating() >= 4.5) { %><span class="badge-trending">Trending</span><% } %>
                <img src="<%= r.getimagePath() %>" alt="<%= r.getRestaurantName() %>" loading="lazy">
              </div>
              <div class="restaurant-info">
                <div class="restaurant-info-top">
                  <h3><%= r.getRestaurantName() %></h3>
                  <span class="rating-badge <%= ratingClass %>">&#11088; <%= r.getRating() %></span>
                </div>
                <div class="tag-veg-nonveg">
                  <% if (isVeg) { %>
                    <span class="indicator indicator-veg"><span class="indicator-dot"></span></span><span class="type-label">100% Pure Veg</span>
                  <% } else { %>
                    <span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span><span class="type-label">Non-Veg Specialty</span>
                  <% } %>
                </div>
                <p class="cuisine-tags"><%= r.getCausinType() %></p>
                <div class="location-tag"><%= r.getAddress() %></div>
                <div class="restaurant-meta">
                  <span class="meta-delivery">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor" style="vertical-align: middle; margin-right: 4px; opacity: 0.7;">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 10V7h-2v6h5v-2h-3z"/>
                    </svg>
                    <%= r.getDelivaryTime() %> mins
                  </span>
                </div>
              </div>
            </a>
      <%
          }
      }
      %>
    </div>
  </section>
  </main>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <h3>FoodieHub</h3>
          <p>FoodieHub is Bengaluru's premium online food ordering and delivery marketplace, connecting hungry foodies with the finest restaurants across Bangalore.</p>
          <div class="social-links">
            <a href="#" class="social-icon facebook" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon instagram" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" class="social-icon linkedin" aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-icon twitter" aria-label="Twitter/X">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" class="social-icon youtube" aria-label="YouTube">
              <i class="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4>About FoodieHub</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">FoodieHub Blog</a></li>
            <li><a href="#">Security & Fraud</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Legal Information</h4>
          <ul>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Refund & Cancellation</a></li>
            <li><a href="#">Merchant Terms</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact & Locations</h4>
          <address>
            <strong>FoodieHub Corporate Office</strong><br>
            4th Floor, 80 Feet Road,<br>
            Koramangala 4th Block,<br>
            Bengaluru, KA 560034<br><br>
            Email: support@foodiehub.in<br>
            Phone: +91 80 4930 2000
          </address>
        </div>
      </div>

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

  <!-- Sticky Bottom Mobile Navigation -->
  <nav class="mobile-bottom-nav">
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'home')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span>Home</span>
    </div>
    <div class="mobile-nav-item active" onclick="handleMobileNavClick(this, 'search')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span>Search</span>
    </div>
    <div class="mobile-nav-item" onclick="handleMobileNavClick(this, 'orders')">
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