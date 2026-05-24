# FoodieHub 🍔

FoodieHub is a premium, highly responsive, dark-themed online food ordering and delivery web application built to connect hungry foodies with the finest restaurants across Bengaluru. 

Featuring an immersive **Orange-Red Glow Dark Theme** with modern glassmorphism, smooth animations, and high-fidelity simulated interactions, FoodieHub replicates the user experience of leading delivery platforms like Zomato and Swiggy.

---

## 🌟 Key Features

### 1. Immersive Dark Theme & Glassmorphism
- A cohesive, tailored design system based on HSL color properties, featuring a dark background (`#0f0f0f`) combined with glassmorphic cards and floating panels (`backdrop-filter`).
- Sleek glowing accent outlines (`box-shadow`, custom gradients) that light up on interactions and form focus.

### 2. Zomato-Style Location & Autocomplete Search
- Dual suggestion boxes for locations and restaurant/cuisine search.
- Simulated **GPS location tracker** that updates search focus and triggers toast notifications.
- Localized suggestions tailored specifically to Bengaluru neighborhoods (Koramangala, Indiranagar, Jayanagar, Basavanagudi, Whitefield, HSR Layout).

### 3. Dietary & Rating Filters
- Pure Veg filtering (`veg-pure`) that filters out non-vegetarian restaurants instantly.
- Location-based filters to discover eateries in specific areas of Bangalore.
- Rating filter that isolates top-rated restaurants (`4.0★ and above`).

### 4. Interactive Shopping Cart & Checkout
- Real-time cart synchronization using browser `localStorage` to preserve items across page reloads.
- Auto-calculated checkout pricing including item subtotals, delivery partner fees, taxes, and automatic coupon discount codes (`WELCOME50` applied for orders above ₹200).
- Fully responsive dark-glass cart item boxes with dynamic quantity controllers (+ / -).

### 5. Live Zomato-Style Order Success & Tracking Modal
- An interactive status modal that triggers upon placing an order.
- **Animated Map Tracker**: A food delivery scooter icon animated via CSS keyframes (`deliverFood`) that drives along a dotted route path from the restaurant to home.
- **Live Status Timeline**: A 4-stage tracking timeline (Order Received ➔ Preparing Food ➔ Out for Delivery ➔ Delivered) that advances automatically in real-time, sending visual status updates and updates to the delivery status bar.
- **Delivery Partner Card**: Details of the delivery driver ("Ramesh Kumar"), his rating, status, and interactive call/chat buttons.
- Fully responsive centered dialog box scaling comfortably on desktop, tablet, and mobile screens.

### 6. App-like Responsive Mobile Drawer
- On mobile viewports, the standard menu collapses into a hamburger icon (☰) triggering a right-side sliding off-canvas drawer (`100vh` height).
- Styled with dark glassmorphic backgrounds and integrated close buttons (`&times;`) for clean touch navigation.

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5 markup.
- **Styling**: Vanilla CSS3 Custom Properties (variables), Media Queries, Flexbox, CSS Grid, and Keyframe Animations.
- **Logics**: Vanilla ES6 JavaScript (DOM manipulation, custom event listeners, timers, LocalStorage state management).
- **Fonts & Icons**: Outfit & Montserrat (Google Fonts), FontAwesome 6 (icons).

---

## 📂 Project Directory Structure

```
food-delivery-project/
│
├── css/
│   └── style.css            # Global stylesheet, design system tokens, media queries
│
├── js/
│   ├── app.js               # Main application logic (search, locations, auth, mobile nav)
│   └── cart.js              # Shopping cart CRUD, totals calculation, and live tracking simulation
│
├── images/
│   ├── store_images/        # Badges for Google Play and App Store
│   └── restaurant_images/   # Food & restaurant visual banners
│
├── index.html               # Main homepage layout with cinematic hero banner
├── restaurants.html         # Restaurant index with filters
├── restaurant-details.html  # Custom menus and mock item addition buttons
├── cart.html                # Cart page, bill breakdown, and checkout modal
├── login.html               # User auth sign-in interface
└── register.html            # User auth registration interface
```

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MukeswarReddyDev/Food-Delivery-Project.git
   ```
2. **Launch a local server**:
   Since the app dynamically loads cart states and handles absolute routing path parameters, it is recommended to run the project using a local HTTP server.
   
   - **VS Code**: Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, open the project workspace, and click **Go Live**.
   - **Python**: Run `python -m http.server 8000` in the project root directory.
   - **Node.js**: Run `npx serve` or compile a local static server.

3. **Explore the app**: Open `http://localhost:8000` (or the port specified by your server) to experience FoodieHub!

---

## 🎨 Premium Details & Implementation Notes

- **Cache-Busting Integration**: Stylesheet links are appended with version query strings (`css/style.css?v=2.0`) to force mobile/tablet browsers to refresh cached styles instantly on code changes.
- **Brace Integrity Checked**: CSS rules are verified using parsing checks to ensure curly braces match perfectly, guaranteeing compatibility on older browser layouts.
- **Dietary Indicators**: Restaurant menu items feature red/green indicators for non-vegetarian/vegetarian dishes in compliance with standard food delivery app guidelines.
- **Pure CSS Toggle Hacks**: Hamburger menu toggling and CSS modal targeting are handled using standard HTML checkboxes (`:checked ~`) and URL hashes (`:target`), minimizing Javascript overhead.
