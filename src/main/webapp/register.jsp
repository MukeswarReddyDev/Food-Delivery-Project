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
  <meta name="description" content="Register an account on FoodieHub. Order meals and get fast delivery in Bengaluru.">
  <title>FoodieHub | Sign Up</title>
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
            <a href="login" class="btn btn-outline btn-sm">Login</a>
            <a href="register" class="btn btn-primary btn-sm active">Sign Up</a>
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

  <!-- Register Main Content -->
  <main class="auth-page" style="padding: 40px 24px;">
    <div class="auth-card" style="max-width: 540px;">
      <div class="auth-header">
        <h2>Create an Account</h2>
        <p>Join FoodieHub to get premium benefits and hot deals in Bangalore</p>
      </div>

      <!-- Error Message Alerts -->
      <%
         String errorMessage = (String) request.getAttribute("errorMessage");
         if (errorMessage != null) {
      %>
          <div style="background-color: rgba(226, 55, 68, 0.1); color: #E23744; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-weight: 500; font-size: 0.9rem; text-align: center;">
              <%= errorMessage %>
          </div>
      <% } %>

      <!-- Registration Form -->
      <form action="register" method="POST" autocomplete="on">
        
        <!-- Name Group -->
        <div class="form-group">
          <input type="text" id="reg-name" name="username" class="form-input" placeholder=" " required autocomplete="name">
          <label for="reg-name" class="form-label">Full Name</label>
        </div>

        <!-- Email Group -->
        <div class="form-group">
          <input type="email" id="reg-email" name="email" class="form-input" placeholder=" " required autocomplete="email">
          <label for="reg-email" class="form-label">Email Address</label>
        </div>

        <!-- Mobile Number Group -->
        <div class="form-group">
          <input type="tel" id="reg-mobile" name="mobile" class="form-input" placeholder=" " required autocomplete="tel">
          <label for="reg-mobile" class="form-label">Mobile Number</label>
        </div>

        <!-- Password Group -->
        <div class="form-group">
          <input type="password" id="reg-pass" name="password" class="form-input" placeholder=" " required autocomplete="new-password">
          <label for="reg-pass" class="form-label">Password</label>
        </div>

        <!-- Confirm Password Group -->
        <div class="form-group">
          <input type="password" id="reg-confirm" class="form-input" placeholder=" " required autocomplete="new-password">
          <label for="reg-confirm" class="form-label">Confirm Password</label>
        </div>

        <!-- Address Group -->
        <div class="form-group">
          <textarea id="reg-address" name="address" class="form-input" placeholder=" " rows="3" required style="resize: none; min-height: 100px;"></textarea>
          <label for="reg-address" class="form-label">Delivery Address (Bengaluru)</label>
        </div>

        <!-- Terms checkbox -->
        <label class="remember-me" style="margin-bottom: 28px;">
          <input type="checkbox" required>
          I agree to the <a href="#" style="color: var(--primary-color); margin-left: 4px; font-weight: 500;">Terms of Service</a> &amp; <a href="#" style="color: var(--primary-color); font-weight: 500;">Privacy Policy</a>
        </label>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px;">
          Sign Up
        </button>

        <!-- Redirect Link -->
        <p style="text-align: center; margin-top: 32px; color: var(--text-medium); font-size: 0.95rem;">
          Already have an account? <a href="login" style="color: var(--primary-color); font-weight: 600;">Log In</a>
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
  <script>
      // Password confirmation validator
      document.querySelector('form').addEventListener('submit', function(e) {
          const pass = document.getElementById('reg-pass').value;
          const confirm = document.getElementById('reg-confirm').value;
          if (pass !== confirm) {
              e.preventDefault();
              alert('Passwords do not match!');
          }
      });
  </script>
</body>
</html>
