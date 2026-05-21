// FoodieHub Restaurant Directory Script

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cuisineParam = urlParams.get('cuisine');
  const searchParam = urlParams.get('search');
  
  // 1. Handle URL parameter filters for Pure CSS inputs
  if (cuisineParam) {
    const radioId = `filter-cuisine-${cuisineParam.toLowerCase()}`;
    const radioButton = document.getElementById(radioId);
    if (radioButton) {
      radioButton.checked = true;
    }
  }

  // 2. Render restaurants
  const gridContainer = document.querySelector('.restaurants-layout .restaurant-grid');
  if (gridContainer) {
    renderRestaurants(gridContainer, searchParam);
  }
});

function renderRestaurants(container, searchFilter) {
  let list = RESTAURANTS_DATA;
  let searchTitleText = '';

  // Process search query
  if (searchFilter) {
    const query = searchFilter.toLowerCase().trim();
    list = RESTAURANTS_DATA.filter(res => {
      // Matches restaurant name
      const nameMatch = res.name.toLowerCase().includes(query);
      // Matches cuisine list
      const cuisineMatch = res.cuisineText.toLowerCase().includes(query);
      // Matches dishes in menu
      const dishMatch = res.menu && res.menu.some(dish => 
        dish.name.toLowerCase().includes(query) || 
        dish.desc.toLowerCase().includes(query)
      );
      return nameMatch || cuisineMatch || dishMatch;
    });
    searchTitleText = `Search results for "${searchFilter}" (${list.length} found)`;
  }

  // Clear existing static items
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 24 24" width="80" fill="var(--text-muted)" style="margin-bottom: 20px; opacity: 0.5;">
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
        <h3 style="font-size: 1.5rem; margin-bottom: 10px;">No Restaurants Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">We couldn't find any matches. Try looking for another cuisine or dish!</p>
        <a href="restaurants.html" class="btn btn-primary btn-sm">View All Restaurants</a>
      </div>
    `;
    return;
  }

  // Prepend search status title if searching
  if (searchFilter) {
    const searchHeader = document.createElement('h3');
    searchHeader.style.gridColumn = '1 / -1';
    searchHeader.style.marginBottom = '20px';
    searchHeader.style.fontSize = '1.25rem';
    searchHeader.style.color = 'var(--text-dark)';
    searchHeader.style.fontWeight = '600';
    searchHeader.textContent = searchTitleText;
    container.appendChild(searchHeader);
  }

  list.forEach(res => {
    const card = document.createElement('a');
    card.href = `restaurant-details.html#${res.id}`;
    
    // Add CSS classes for filters
    card.className = `restaurant-card cuisine-${res.cuisine} ${res.rating >= 4.5 ? 'rating-high' : 'rating-med'} loc-${res.location} ${res.veg ? 'veg-pure' : ''}`;
    
    // Badge logic
    let badgeHTML = '';
    if (res.status === 'Trending' || res.trending) {
      badgeHTML += `<span class="badge-trending">Trending</span>`;
    } else if (res.status === 'Legendary') {
      badgeHTML += `<span class="badge-trending" style="background: linear-gradient(135deg, #FF8008, #FFC837);">Legendary</span>`;
    } else if (res.status) {
      badgeHTML += `<span class="badge-status">${res.status}</span>`;
    }
    
    if (res.offer) {
      badgeHTML += `<span class="badge-offer">${res.offer}</span>`;
    }

    // Veg/Nonveg indicator
    const vegIndicatorHTML = res.veg ? 
      `<span class="indicator indicator-veg"><span class="indicator-dot"></span></span><span class="type-label">100% Pure Veg</span>` :
      `<span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span><span class="type-label">Non-Veg Specialty</span>`;

    card.innerHTML = `
      <div class="restaurant-img-wrapper">
        ${badgeHTML}
        <img src="${res.image}" alt="${res.name}" loading="lazy">
      </div>
      <div class="restaurant-info">
        <div class="restaurant-info-top">
          <h3>${res.name}</h3>
          <span class="rating-badge ${res.rating >= 4.5 ? 'rating-high' : 'rating-med'}">${res.rating} ★</span>
        </div>
        <div class="tag-veg-nonveg">
          ${vegIndicatorHTML}
        </div>
        <p class="cuisine-tags">${res.cuisineText}</p>
        <div class="location-tag">${res.locationText}</div>
        <div class="restaurant-meta">
          <span class="meta-delivery">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor" style="vertical-align: middle; margin-right: 4px; opacity: 0.7;">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 10V7h-2v6h5v-2h-3z"/>
            </svg>
            ${res.deliveryTime} mins
          </span>
          <span class="meta-price">₹${res.priceForOne} for one</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
