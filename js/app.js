/**
 * FoodieHub - Premium Modern Frontend Interactive Logic
 * Handles:
 * 1. Scroll-responsive sticky navbar transition
 * 2. Zomato-style dual autocomplete location & search suggestion boxes
 * 3. Simulated GPS location detection with toast validation
 * 4. Favorite heart button spring toggle & event interception
 * 5. Share App Link form validation and floating toast notification
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initLocationSelector();
  initRestaurantSearch();
  initFavoriteHearts();
  initAppDownloadForm();
  initMobileMenu();
  initUserAuth();
  initFormInterceptors();

  // Premium Redesign features
  initDynamicGreeting();
  initAdvancedSearchSuggestions();
  initVegToggle();
  initPromoCarousel();
  initSkeletonLoader();
  initScrollReveal();
  initActiveTabHighlighter();

  // Show pending toast messages if any
  const pendingToast = localStorage.getItem('foodiehub_toast_message');
  if (pendingToast) {
    showToast(pendingToast);
    localStorage.removeItem('foodiehub_toast_message');
  }
});

/**
 * 1. Scroll-responsive Navbar Transition
 */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar-wrapper');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run once on load in case page is already scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * 2. Zomato-style Autocomplete Location Box & GPS Detector
 */
function initLocationSelector() {
  const locInput = document.getElementById('location-input');
  const locDropdown = document.getElementById('location-suggestions');
  const locArrow = document.querySelector('.location-arrow');
  const gpsDetect = document.getElementById('detect-gps');

  if (!locInput || !locDropdown) return;

  // Toggle dropdown on focus / click
  const showDropdown = () => {
    // Close other dropdowns first
    const resDropdown = document.getElementById('restaurant-suggestions');
    if (resDropdown) resDropdown.classList.remove('active');
    
    locDropdown.classList.add('active');
    if (locArrow) locArrow.style.transform = 'rotate(180deg)';
  };

  const hideDropdown = (e) => {
    // Timeout to allow click events on dropdown items to fire
    setTimeout(() => {
      if (document.activeElement !== locInput) {
        locDropdown.classList.remove('active');
        if (locArrow) locArrow.style.transform = 'rotate(0deg)';
      }
    }, 200);
  };

  locInput.addEventListener('focus', showDropdown);
  locInput.addEventListener('click', showDropdown);
  locInput.addEventListener('blur', hideDropdown);

  // Filter suggestion list as user types
  locInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const items = locDropdown.querySelectorAll('.suggestion-item');
    
    items.forEach(item => {
      // Skip the GPS detect item
      if (item.classList.contains('detect-location')) return;

      const text = item.innerText.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Handle suggestion selection
  locDropdown.querySelectorAll('.suggestion-item').forEach(item => {
    if (item.classList.contains('detect-location')) return;

    item.addEventListener('click', (e) => {
      const val = item.getAttribute('data-value');
      locInput.value = val;
      locDropdown.classList.remove('active');
      if (locArrow) locArrow.style.transform = 'rotate(0deg)';
      showToast(`Location set to ${val}`);
      
      // Keep main navigation select box in sync (if present)
      syncNavLocationSelect(val);
    });
  });

  // 3. Simulated GPS Location Retrieval
  if (gpsDetect) {
    gpsDetect.addEventListener('click', (e) => {
      e.stopPropagation();
      locInput.value = '';
      locInput.placeholder = 'Retrieving GPS position...';
      gpsDetect.innerHTML = `
        <svg class="spin" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="#EF4F5F">
          <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
        </svg>
        <span>Locating...</span>
      `;

      setTimeout(() => {
        const detectedLoc = "Green Glen Layout, Bengaluru";
        locInput.value = detectedLoc;
        locInput.placeholder = 'Bengaluru';
        locDropdown.classList.remove('active');
        if (locArrow) locArrow.style.transform = 'rotate(0deg)';
        
        gpsDetect.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="#EF4F5F">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1c0-.55-.45-1-1-1s-1 .45-1 1v2.06C6.83 3.52 3.52 6.83 3.06 11H1c-.55 0-1 .45-1 1s.45 1 1 1h2.06c.46 4.17 3.77 7.48 7.94 7.94V23c0 .55.45 1 1 1s1-.45 1-1v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23c.55 0 1-.45 1-1s-.45-1-1-1h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
          <span>Use Current Location (GPS)</span>
        `;
        showToast("✓ GPS coordinates matches: Bellandur, Bengaluru!");
        syncNavLocationSelect("bellandur");
      }, 1000);
    });
  }
}

/**
 * Synchronize dropdown selector in navbar with location input
 */
function syncNavLocationSelect(locationVal) {
  const selectBox = document.querySelector('.location-selector select');
  if (!selectBox) return;

  const textLower = locationVal.toLowerCase();
  let matchedOptionValue = "";

  for (let option of selectBox.options) {
    if (textLower.includes(option.value)) {
      matchedOptionValue = option.value;
      break;
    }
  }

  if (matchedOptionValue) {
    selectBox.value = matchedOptionValue;
  }
}

/**
 * 3. Combined Restaurant/Cuisine Search Autocomplete Dropdown
 */
function initRestaurantSearch() {
  const searchInput = document.getElementById('restaurant-input');
  const searchDropdown = document.getElementById('restaurant-suggestions');

  if (!searchInput || !searchDropdown) return;

  const showDropdown = () => {
    // Close location dropdown
    const locDropdown = document.getElementById('location-suggestions');
    const locArrow = document.querySelector('.location-arrow');
    if (locDropdown) locDropdown.classList.remove('active');
    if (locArrow) locArrow.style.transform = 'rotate(0deg)';

    searchDropdown.classList.add('active');
  };

  const hideDropdown = () => {
    setTimeout(() => {
      if (document.activeElement !== searchInput) {
        searchDropdown.classList.remove('active');
      }
    }, 200);
  };

  searchInput.addEventListener('focus', showDropdown);
  searchInput.addEventListener('click', showDropdown);
  searchInput.addEventListener('blur', hideDropdown);

  // Filter cuisines & restaurants list as user types
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const items = searchDropdown.querySelectorAll('.suggestion-item');
    let hasResults = false;

    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'flex';
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Handle suggestion section titles visibility
    const titles = searchDropdown.querySelectorAll('.suggestion-title');
    titles.forEach(title => {
      let nextSib = title.nextElementSibling;
      let visibleCount = 0;
      while (nextSib && !nextSib.classList.contains('suggestion-title')) {
        if (nextSib.classList.contains('suggestion-item') && nextSib.style.display !== 'none') {
          visibleCount++;
        }
        nextSib = nextSib.nextElementSibling;
      }
      title.style.display = visibleCount > 0 ? 'block' : 'none';
    });
  });

  // Handle cuisine item click redirects
  searchDropdown.querySelectorAll('.item-cuisine').forEach(item => {
    item.addEventListener('click', () => {
      const filterCuisine = item.getAttribute('data-filter');
      window.location.href = `restaurants.html#${filterCuisine}`;
    });
  });

  // Handle restaurant item click redirects
  searchDropdown.querySelectorAll('.item-restaurant').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.getAttribute('data-url');
      window.location.href = url;
    });
  });
}

/**
 * 4. Favorite Heart Button Spring Toggle & Interception
 */
function initFavoriteHearts() {
  const favoriteBtns = document.querySelectorAll('.btn-favorite');
  if (favoriteBtns.length === 0) return;

  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Stop anchor card redirection
      e.stopPropagation(); // Stop event bubbling

      btn.classList.toggle('active');

      // Heart svg reference
      const heartIcon = btn.querySelector('svg');
      if (btn.classList.contains('active')) {
        if (heartIcon) {
          heartIcon.setAttribute('fill', '#EF4F5F');
          heartIcon.setAttribute('stroke', '#EF4F5F');
        }
        // Save favorite status
        const restName = btn.closest('.restaurant-card').querySelector('.restaurant-info-top h3').innerText.trim();
        showToast(`❤ Saved ${restName} to your favorites!`);
      } else {
        if (heartIcon) {
          heartIcon.setAttribute('fill', 'rgba(0, 0, 0, 0.45)');
          heartIcon.setAttribute('stroke', '#ffffff');
        }
        const restName = btn.closest('.restaurant-card').querySelector('.restaurant-info-top h3').innerText.trim();
        showToast(`Removed ${restName} from favorites`);
      }
    });
  });
}

/**
 * 5. Share App Link Form Validation and Toast
 */
function initAppDownloadForm() {
  const appForm = document.getElementById('share-app-form');
  if (!appForm) return;

  appForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const contactInput = appForm.querySelector('input[type="text"]');
    const contactVal = contactInput.value.trim();

    if (!contactVal) {
      showToast("⚠ Please enter your email or phone number first!");
      return;
    }

    // Basic Validation check
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
    const isPhone = /^[6-9]\d{9}$/.test(contactVal.replace(/[^0-9]/g, ''));

    if (isEmail || isPhone) {
      showToast(`✓ Download link sent successfully to ${contactVal}!`);
      contactInput.value = '';
    } else {
      showToast("⚠ Please enter a valid Email Address or 10-digit Mobile Number!");
    }
  });
}

/**
 * Responsive Mobile Navigation Drawer Logic
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;

  // Sync menu state if label toggle is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.checked = false; // close drawer
    });
  });
}

/**
 * Create and show a modern visual toast message (Zomato-style)
 */
function showToast(message) {
  // Remove existing toast if any
  let oldToast = document.querySelector('.foodiehub-toast');
  if (oldToast) {
    oldToast.remove();
  }

  // Create new toast container
  const toast = document.createElement('div');
  toast.className = 'foodiehub-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  // Smooth slide-up transition via active class
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Slide down and remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3200);
}

/**
 * Initialize user authentication status and replace nav headers dynamically
 */
function initUserAuth() {
  const currentUser = localStorage.getItem('foodiehub_logged_in_user');
  const navAuths = document.querySelectorAll('.nav-auth');
  
  if (currentUser && navAuths.length > 0) {
    const name = localStorage.getItem('foodiehub_logged_in_user_name') || 'User';
    navAuths.forEach(navAuth => {
      navAuth.innerHTML = `
        <span class="user-greeting" style="font-weight: 600; margin-right: 16px; color: var(--text-dark); font-size: 0.95rem;">Hi, ${name}</span>
        <a href="#" class="btn btn-outline btn-sm" onclick="logoutUser(event)">Logout</a>
      `;
    });
  }

  // Update profile monogram initials
  const initialsAvatar = document.getElementById('user-avatar-initials');
  if (initialsAvatar) {
    const name = localStorage.getItem('foodiehub_logged_in_user_name') || 'Guest';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    initialsAvatar.innerText = initials;
  }
}

/**
 * Handle signup and login interceptors to save session info dynamically
 */
function initFormInterceptors() {
  // 1. Intercept Register Form
  const regForm = document.querySelector('.auth-page form[action="login.html"]');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const mobile = document.getElementById('reg-mobile').value.trim();
      const address = document.getElementById('reg-address').value.trim();

      const userRecord = { name, email, mobile, address };
      localStorage.setItem('foodiehub_user_' + email, JSON.stringify(userRecord));
      localStorage.setItem('foodiehub_toast_message', '✓ Registration successful! Please log in.');
    });
  }

  // 2. Intercept Login Form
  const loginForm = document.querySelector('.auth-page form[action="index.html"]');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      const email = document.getElementById('login-email').value.trim();
      
      // Look up registered user or default to Mukesh S
      const storedUser = localStorage.getItem('foodiehub_user_' + email);
      let name = 'Mukesh S';
      let address = 'Mukesh S, Flat 302, 3rd Floor, Lavender Apartments, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103';
      
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          name = userObj.name;
          address = `${userObj.name}, ${userObj.address}`;
        } catch(e) {}
      } else {
        // Automatically register mock details for smooth prototyping
        const userObj = { name, email, mobile: '9876543210', address };
        localStorage.setItem('foodiehub_user_' + email, JSON.stringify(userObj));
      }

      localStorage.setItem('foodiehub_logged_in_user', email);
      localStorage.setItem('foodiehub_logged_in_user_name', name);
      localStorage.setItem('foodiehub_logged_in_user_address', address);
      localStorage.setItem('foodiehub_toast_message', `✓ Welcome back, ${name}!`);
    });
  }
}

/**
 * Handle user logout
 */
window.logoutUser = function(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('foodiehub_logged_in_user');
  localStorage.removeItem('foodiehub_logged_in_user_name');
  localStorage.removeItem('foodiehub_logged_in_user_address');
  localStorage.setItem('foodiehub_toast_message', 'Logged out successfully!');
  window.location.reload();
};

/**
 * Premium Dynamic Greeting Row
 */
function initDynamicGreeting() {
  const greetingEl = document.getElementById('app-time-greeting');
  if (!greetingEl) return;
  
  const hrs = new Date().getHours();
  let greet = 'Good Evening';
  if (hrs < 12) greet = 'Good Morning';
  else if (hrs < 17) greet = 'Good Afternoon';
  
  const name = localStorage.getItem('foodiehub_logged_in_user_name') || 'Guest';
  greetingEl.innerText = `${greet}, ${name} 👋`;
}

/**
 * Filter homepage restaurant cards list
 */
function filterHomepageRestaurants(query) {
  const container = document.getElementById('restaurant-cards-container');
  if (!container) return;
  
  const cards = container.querySelectorAll('.restaurant-card');
  const queryLower = query.toLowerCase().trim();
  
  cards.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    const cuisines = card.querySelector('.cuisine-tags').innerText.toLowerCase();
    const location = card.querySelector('.location-tag').innerText.toLowerCase();
    
    if (name.includes(queryLower) || cuisines.includes(queryLower) || location.includes(queryLower)) {
      const toggle = document.getElementById('veg-only-toggle');
      if (toggle && toggle.checked) {
        const hasVeg = card.querySelector('.indicator-veg');
        card.style.display = hasVeg ? 'block' : 'none';
      } else {
        card.style.display = 'block';
      }
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Veg-only toggle switch
 */
function initVegToggle() {
  const toggle = document.getElementById('veg-only-toggle');
  const container = document.getElementById('restaurant-cards-container');
  if (!toggle || !container) return;

  toggle.addEventListener('change', () => {
    const cards = container.querySelectorAll('.restaurant-card');
    const isVegOnly = toggle.checked;
    
    cards.forEach(card => {
      const searchInput = document.getElementById('restaurant-input');
      const queryLower = searchInput ? searchInput.value.toLowerCase().trim() : '';
      
      const name = card.querySelector('h3').innerText.toLowerCase();
      const cuisines = card.querySelector('.cuisine-tags').innerText.toLowerCase();
      const location = card.querySelector('.location-tag').innerText.toLowerCase();
      
      const matchesSearch = queryLower === '' || name.includes(queryLower) || cuisines.includes(queryLower) || location.includes(queryLower);
      
      if (isVegOnly) {
        const hasVeg = card.querySelector('.indicator-veg');
        card.style.display = (hasVeg && matchesSearch) ? 'block' : 'none';
      } else {
        card.style.display = matchesSearch ? 'block' : 'none';
      }
    });
  });
}

/**
 * Advanced Search suggestions dropdown behavior
 */
function initAdvancedSearchSuggestions() {
  const searchInput = document.getElementById('restaurant-input');
  const dropdown = document.getElementById('advanced-search-dropdown');
  if (!searchInput || !dropdown) return;

  const recentList = document.getElementById('recent-searches-list');
  const clearRecentBtn = document.getElementById('clear-recent-searches');

  const getRecentSearches = () => {
    try {
      return JSON.parse(localStorage.getItem('foodiehub_recent_searches')) || [];
    } catch (e) {
      return [];
    }
  };

  const saveRecentSearch = (query) => {
    if (!query || !query.trim()) return;
    let searches = getRecentSearches();
    searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase().trim());
    searches.unshift(query.trim());
    if (searches.length > 5) searches.pop();
    localStorage.setItem('foodiehub_recent_searches', JSON.stringify(searches));
    renderRecentSearches();
  };

  const deleteRecentSearch = (query) => {
    let searches = getRecentSearches();
    searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase().trim());
    localStorage.setItem('foodiehub_recent_searches', JSON.stringify(searches));
    renderRecentSearches();
  };

  const renderRecentSearches = () => {
    const searches = getRecentSearches();
    const section = document.getElementById('section-recent-searches');
    if (searches.length === 0) {
      if (section) section.style.display = 'none';
      return;
    }
    if (section) section.style.display = 'block';
    
    if (recentList) {
      recentList.innerHTML = searches.map(query => `
        <div class="recent-search-item" data-query="${query}">
          <span>${query}</span>
          <span class="delete-btn" data-query="${query}">&times;</span>
        </div>
      `).join('');

      recentList.querySelectorAll('.recent-search-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.classList.contains('delete-btn')) {
            e.stopPropagation();
            const q = e.target.getAttribute('data-query');
            deleteRecentSearch(q);
          } else {
            const q = item.getAttribute('data-query');
            searchInput.value = q;
            filterHomepageRestaurants(q);
            dropdown.classList.remove('active');
          }
        });
      });
    }
  };

  if (clearRecentBtn) {
    clearRecentBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.setItem('foodiehub_recent_searches', JSON.stringify([]));
      renderRecentSearches();
    });
  }

  searchInput.addEventListener('focus', () => {
    dropdown.classList.add('active');
    renderRecentSearches();
  });

  searchInput.addEventListener('click', () => {
    dropdown.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    filterHomepageRestaurants(query);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        saveRecentSearch(query);
        filterHomepageRestaurants(query);
        dropdown.classList.remove('active');
        searchInput.blur();
      }
    }
  });

  document.querySelectorAll('.trending-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const query = tag.innerText.replace(/🔥\s*/, '').trim();
      searchInput.value = query;
      saveRecentSearch(query);
      filterHomepageRestaurants(query);
      dropdown.classList.remove('active');
    });
  });

  document.querySelectorAll('.popular-cuisine-item').forEach(item => {
    item.addEventListener('click', () => {
      const cuisine = item.getAttribute('data-cuisine');
      if (cuisine) {
        window.location.href = `restaurants.html#${cuisine}`;
      }
    });
  });

  renderRecentSearches();
}

/**
 * Auto-sliding Promo Carousel
 */
function initPromoCarousel() {
  const wrapper = document.getElementById('carousel-slides-wrapper');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!wrapper || dots.length === 0) return;

  let currentSlide = 0;
  const slideCount = 3;
  let timer;

  const goToSlide = (idx) => {
    currentSlide = idx;
    wrapper.style.transform = `translateX(-${idx * 33.3333}%)`;
    
    dots.forEach((dot, index) => {
      if (index === idx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const startTimer = () => {
    timer = setInterval(() => {
      let next = (currentSlide + 1) % slideCount;
      goToSlide(next);
    }, 4000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopTimer();
      goToSlide(index);
      startTimer();
    });
  });

  startTimer();
}

/**
 * Skeleton loader simulation
 */
function initSkeletonLoader() {
  const skeletons = document.getElementById('restaurant-skeleton-grid');
  const container = document.getElementById('restaurant-cards-container');
  if (!skeletons || !container) return;

  setTimeout(() => {
    skeletons.style.display = 'none';
    container.style.display = 'grid';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 50);
  }, 800);
}

/**
 * Scroll Reveal Observer
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/**
 * Mobile Bottom Nav highlight and click handlers
 */
function initActiveTabHighlighter() {
  const navItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
  if (navItems.length === 0) return;

  const path = window.location.pathname.toLowerCase();
  navItems.forEach(item => item.classList.remove('active'));

  if (path.includes('index.html') || path.endsWith('/') || path === '') {
    const homeTab = Array.from(navItems).find(item => item.innerText.trim().toLowerCase() === 'home');
    if (homeTab) homeTab.classList.add('active');
  } else if (path.includes('restaurants.html') || path.includes('restaurant-details.html')) {
    const searchTab = Array.from(navItems).find(item => item.innerText.trim().toLowerCase() === 'search');
    if (searchTab) searchTab.classList.add('active');
  } else if (path.includes('cart.html')) {
    const cartTab = Array.from(navItems).find(item => item.innerText.trim().toLowerCase() === 'cart');
    if (cartTab) cartTab.classList.add('active');
  } else if (path.includes('login.html') || path.includes('register.html')) {
    const profileTab = Array.from(navItems).find(item => item.innerText.trim().toLowerCase() === 'profile');
    if (profileTab) profileTab.classList.add('active');
  }
}

window.handleMobileNavClick = function(element, tab) {
  if (tab === 'home') {
    window.location.href = 'index.html';
  } else if (tab === 'search') {
    window.location.href = 'restaurants.html';
  } else if (tab === 'orders') {
    window.location.href = 'cart.html';
  } else if (tab === 'cart') {
    window.location.href = 'cart.html';
  } else if (tab === 'profile') {
    const loggedIn = localStorage.getItem('foodiehub_logged_in_user');
    if (loggedIn) {
      showToast(`✓ Logged in as ${localStorage.getItem('foodiehub_logged_in_user_name')}`);
    } else {
      window.location.href = 'login.html';
    }
  }
};
