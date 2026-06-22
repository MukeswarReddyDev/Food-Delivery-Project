<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.tap.Model.Cart, com.tap.Model.CartItem, com.tap.Model.User" %>
<%
    User currentUser = (User) session.getAttribute("currentUser");
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
  <meta name="description" content="Log in to FoodieHub to order delicious food from the best restaurants in Bengaluru.">
  <title>FoodieHub | Login</title>
  <link rel="stylesheet" href="EntireCss.css?v=<%= System.currentTimeMillis() %>">
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
            <a href="login" class="btn btn-outline btn-sm active">Login</a>
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

  <!-- Login Main Content -->
  <main class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p>Login to manage your orders and check latest offers</p>
      </div>

      <!-- Error & Success Message Alerts -->
      <%
         String errorMessage = (String) request.getAttribute("errorMessage");
         if (errorMessage == null) {
             errorMessage = (String) session.getAttribute("errorMessage");
         }
         if (errorMessage != null) {
             session.removeAttribute("errorMessage");
      %>
          <div style="background-color: rgba(226, 55, 68, 0.1); color: #E23744; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-weight: 500; font-size: 0.9rem; text-align: center;">
              <%= errorMessage %>
          </div>
      <% } %>

      <% if (request.getParameter("registered") != null) { %>
          <div style="background-color: rgba(36, 150, 63, 0.1); color: #24963F; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-weight: 500; font-size: 0.9rem; text-align: center;">
              ✓ Registration successful! Please log in.
          </div>
      <% } %>

      <!-- Login Form -->
      <form action="login" method="POST" autocomplete="on">
        
        <!-- Email Input Group -->
        <div class="form-group">
          <input type="email" id="login-email" name="email" class="form-input" placeholder=" " required autocomplete="email">
          <label for="login-email" class="form-label">Email Address</label>
        </div>

        <!-- Password Input Group -->
        <div class="form-group">
          <input type="password" id="login-password" name="password" class="form-input" placeholder=" " required autocomplete="current-password">
          <label for="login-password" class="form-label">Password</label>
        </div>

        <!-- Extra Options -->
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" checked>
            Remember me
          </label>
          <a href="#" class="forgot-link">Forgot Password?</a>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px;">
          Log In
        </button>

        <!-- Social Login -->
        <div class="social-login-wrapper">
          <div class="social-divider">
            <span>OR LOGIN WITH</span>
          </div>
          <div class="social-buttons">
            <button type="button" id="btn-google" class="btn-social">
              Google
            </button>
            <button type="button" id="btn-facebook" class="btn-social">
              Facebook
            </button>
          </div>
        </div>

        <!-- Redirect Link -->
        <p style="text-align: center; margin-top: 32px; color: var(--text-medium); font-size: 0.95rem;">
          Don't have an account? <a href="register" style="color: var(--primary-color); font-weight: 600;">Sign Up</a>
        </p>

      </form>
    </div>
  </main>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom" style="border-top: none; padding-top: 0;">
        <p>&copy; 2025 FoodieHub. All rights reserved.</p>
        <p>Designed with ❤️ for food lovers in Bengaluru</p>
      </div>
    </div>
  </footer>
  <script src="JavaScript/cart.js?v=<%= System.currentTimeMillis() %>"></script>
  <script src="JavaScript/app.js?v=<%= System.currentTimeMillis() %>"></script>
</body>
</html>
