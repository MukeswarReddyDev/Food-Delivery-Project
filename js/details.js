// FoodieHub Restaurant Details Page Script

document.addEventListener('DOMContentLoaded', () => {
  renderDetailsFromHash();

  // Listen to hash changes (e.g. if the user clicks a restaurant link elsewhere)
  window.addEventListener('hashchange', renderDetailsFromHash);
});

function renderDetailsFromHash() {
  const container = document.querySelector('.restaurant-details-wrapper');
  if (!container) return;

  // Extract ID from hash, remove the '#' symbol. Default to the first restaurant.
  let resId = window.location.hash.replace('#', '');
  if (!resId) {
    resId = RESTAURANTS_DATA[0].id;
  }

  const restaurant = RESTAURANTS_DATA.find(res => res.id === resId);
  if (!restaurant) {
    container.innerHTML = `
      <div class="container" style="text-align: center; padding: 100px 20px;">
        <h2>Restaurant Not Found</h2>
        <p style="color: var(--text-muted); margin-bottom: 20px;">We couldn't find the restaurant you were looking for.</p>
        <a href="restaurants.html" class="btn btn-primary">Go to Restaurants</a>
      </div>
    `;
    return;
  }

  // Render the restaurant profile layout
  container.innerHTML = '';

  const profileNode = document.createElement('div');
  profileNode.className = 'restaurant-profile-node';
  profileNode.style.display = 'block'; // Bypass default hidden state in CSS

  // Badges lists
  let badgePillsHTML = `<span class="details-badge-pill rating">${restaurant.rating} ★</span>`;
  badgePillsHTML += `<span class="details-badge-pill">${restaurant.deliveryTime} mins</span>`;
  if (restaurant.offer) {
    badgePillsHTML += `<span class="details-badge-pill offer" style="background-color: var(--veg-green, #24963F); color: #FFF;">${restaurant.offer}</span>`;
  }
  badgePillsHTML += `<span class="details-badge-pill">₹${restaurant.priceForOne} for one</span>`;

  // Menu items list rendering
  let menuRowsHTML = '';
  restaurant.menu.forEach((item, index) => {
    const vegBadgeHTML = item.veg ? 
      `<span class="indicator indicator-veg"><span class="indicator-dot"></span></span><span class="type-label">Veg</span>` :
      `<span class="indicator indicator-nonveg"><span class="indicator-dot"></span></span><span class="type-label">Non-Veg</span>`;

    const bestsellerHTML = item.bestseller ? `<span class="badge-bestseller" style="background: #E23744; color: #FFF; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-left: 8px;">Bestseller</span>` : '';

    menuRowsHTML += `
      <div class="menu-item-row" style="display: flex; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid #ECECEC;">
        <div class="menu-item-details" style="flex: 1; padding-right: 20px;">
          <div class="tag-veg-nonveg" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            ${vegBadgeHTML}
            ${bestsellerHTML}
          </div>
          <h4 style="font-size: 1.15rem; color: var(--text-dark); margin-bottom: 6px; font-weight: 600;">${item.name}</h4>
          <div class="menu-item-price" style="font-weight: 600; font-size: 1.1rem; color: var(--text-dark); margin-bottom: 8px;">₹${item.price}</div>
          <p class="menu-item-desc" style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">${item.desc}</p>
        </div>
        <div class="menu-item-image-box" style="position: relative; width: 120px; height: 120px;">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius-md);">
          <button class="btn-add-item-js" data-index="${index}" style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #FFF; color: var(--primary-color); border: 1px solid #ECECEC; border-radius: var(--border-radius-sm); padding: 6px 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.08); cursor: pointer; transition: all 0.2s ease;">Add +</button>
        </div>
      </div>
    `;
  });

  // Set innerHTML of profileNode
  profileNode.innerHTML = `
    <div class="details-banner" style="background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.9)), url('${restaurant.image}') no-repeat center center/cover; padding: 80px 0 40px 0; color: #FFF;">
      <div class="container details-banner-content">
        <div class="details-header-meta">
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 12px;">${restaurant.name}</h1>
          <div class="details-badges" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            ${badgePillsHTML}
          </div>
          <p style="color: rgba(255, 255, 255, 0.85); font-weight: 500; font-size: 1rem;">${restaurant.cuisineText} | ${restaurant.locationText}</p>
        </div>
      </div>
    </div>
    <div class="container menu-layout" style="display: grid; grid-template-columns: 240px 1fr; gap: 40px; padding: 40px 0;">
      <div class="menu-categories-list" style="display: flex; flex-direction: column; gap: 10px; position: sticky; top: 100px; height: fit-content;">
        <a href="#${restaurant.id}" class="active" style="padding: 12px 20px; font-weight: 600; border-radius: 8px; color: var(--primary-color); background: rgba(226, 55, 68, 0.05); text-decoration: none;">Recommended Menu</a>
        <a href="#${restaurant.id}" style="padding: 12px 20px; font-weight: 500; border-radius: 8px; color: var(--text-dark); text-decoration: none;">Main Course</a>
        <a href="#${restaurant.id}" style="padding: 12px 20px; font-weight: 500; border-radius: 8px; color: var(--text-dark); text-decoration: none;">Drinks & Desserts</a>
      </div>
      <div class="menu-list-section">
        <h3 class="menu-section-title" style="font-size: 1.4rem; font-weight: 700; color: var(--text-dark); margin-bottom: 20px; border-left: 4px solid var(--primary-color); padding-left: 12px;">Recommended Menu</h3>
        <div class="menu-items-container">
          ${menuRowsHTML}
        </div>
      </div>
    </div>
  `;

  container.appendChild(profileNode);

  // Wire up Add to Cart buttons
  const addButtons = profileNode.querySelectorAll('.btn-add-item-js');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      const item = restaurant.menu[idx];
      addToCart(item, restaurant);
    });
    
    // Add hover states programmatically
    btn.addEventListener('mouseenter', (e) => {
      e.target.style.background = 'var(--primary-color)';
      e.target.style.color = '#FFF';
    });
    btn.addEventListener('mouseleave', (e) => {
      e.target.style.background = '#FFF';
      e.target.style.color = 'var(--primary-color)';
    });
  });
}
