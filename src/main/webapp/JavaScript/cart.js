// FoodieHub Shopping Cart Javascript Logic (AJAX Session Integration)

// Initialize server cart if not set
if (typeof window.serverCart === 'undefined') {
  window.serverCart = {};
}

// Function to update the cart badge count and floating cart widget from server-returned data
function updateCartUI(totalItems, subtotal) {
  // Update nav badges
  let badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.innerText = totalItems;
  });

  // Update floating cart widget
  const widget = document.getElementById('floating-cart-widget');
  const widgetText = document.getElementById('floating-cart-text');
  if (widget) {
    if (totalItems > 0) {
      if (widgetText) {
        widgetText.innerText = `${totalItems} Item${totalItems > 1 ? 's' : ''} | \u20B9${parseInt(subtotal)}`;
      }
      widget.style.display = 'flex';
      widget.classList.add('pulse');
      setTimeout(() => {
        widget.classList.remove('pulse');
      }, 400);
    } else {
      widget.style.display = 'none';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize interactive menu buttons on details page
  initMenuAddButtons();

  // Trigger live tracking automatically if page is loaded/refreshed with modal hash active
  if (window.location.hash === '#order-success-modal') {
    startLiveOrderTracking();
  }
});

// Function to initialize menu Add buttons on details page using window.serverCart
function initMenuAddButtons() {
  const addButtons = document.querySelectorAll('.btn-add-item-mock');
  if (addButtons.length === 0) return;

  addButtons.forEach(btn => {
    const menuId = btn.getAttribute('data-id');
    if (!menuId) return;

    // Find parent element (menu-item-image-box)
    let parent = btn.parentElement;
    
    // Check if it exists in the server cart
    const qty = window.serverCart[menuId];

    if (qty && qty > 0) {
      btn.style.display = 'none';
      createQtySelector(parent, menuId, qty, btn);
    } else {
      btn.style.display = 'block';
      let oldSelector = parent.querySelector('.qty-selector-container');
      if (oldSelector) oldSelector.remove();
    }

    // Set up click listener if not already added
    if (!btn.dataset.listenerAdded) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Send AJAX add to server
        const params = new URLSearchParams();
        params.append('action', 'add');
        params.append('menuId', menuId);
        params.append('ajax', 'true');

        fetch('cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.serverCart[menuId] = 1;
            btn.style.display = 'none';
            createQtySelector(parent, menuId, 1, btn);
            updateCartUI(data.totalItems, data.subtotal);
            
            const row = btn.closest('.menu-item-row');
            const name = row.querySelector('.menu-item-details h4').innerText.trim();
            if (typeof showToast === 'function') {
              showToast(`✓ Added ${name} to your cart!`);
            }
          }
        })
        .catch(err => console.error('Error adding item:', err));
      });
      btn.dataset.listenerAdded = 'true';
    }
  });
}

function createQtySelector(parent, menuId, initialQty, btnRef) {
  let existing = parent.querySelector('.qty-selector-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'qty-selector-container';
  container.innerHTML = `
    <button class="qty-selector-btn qty-minus" type="button" aria-label="Decrease quantity">-</button>
    <span class="qty-selector-value">${initialQty}</span>
    <button class="qty-selector-btn qty-plus" type="button" aria-label="Increase quantity">+</button>
  `;

  parent.appendChild(container);

  const minusBtn = container.querySelector('.qty-minus');
  const plusBtn = container.querySelector('.qty-plus');
  const qtyVal = container.querySelector('.qty-selector-value');

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentQty = window.serverCart[menuId] || 0;
    const newQty = currentQty - 1;

    const params = new URLSearchParams();
    if (newQty <= 0) {
      params.append('action', 'remove');
    } else {
      params.append('action', 'update');
      params.append('quantity', newQty);
    }
    params.append('menuId', menuId);
    params.append('ajax', 'true');

    fetch('cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (newQty <= 0) {
          delete window.serverCart[menuId];
          container.remove();
          btnRef.style.display = 'block';
        } else {
          window.serverCart[menuId] = newQty;
          qtyVal.innerText = newQty;
        }
        updateCartUI(data.totalItems, data.subtotal);
      }
    })
    .catch(err => console.error('Error updating item quantity:', err));
  });

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentQty = window.serverCart[menuId] || 0;
    const newQty = currentQty + 1;

    const params = new URLSearchParams();
    params.append('action', 'update');
    params.append('quantity', newQty);
    params.append('menuId', menuId);
    params.append('ajax', 'true');

    fetch('cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.serverCart[menuId] = newQty;
        qtyVal.innerText = newQty;
        updateCartUI(data.totalItems, data.subtotal);
      }
    })
    .catch(err => console.error('Error updating item quantity:', err));
  });
}

// Live tracking intervals and tracking simulation
let liveTrackingIntervals = [];

function clearLiveTracking() {
  liveTrackingIntervals.forEach(id => clearTimeout(id));
  liveTrackingIntervals = [];
}

window.startLiveOrderTracking = function() {
  clearLiveTracking();

  const scooter = document.getElementById('live-delivery-scooter');
  const driverStatus = document.getElementById('live-driver-status');
  const etaMins = document.querySelector('.eta-mins');
  
  const stepConfirmed = document.getElementById('step-confirmed');
  const stepPreparing = document.getElementById('step-preparing');
  const stepOut = document.getElementById('step-out');
  const stepDelivered = document.getElementById('step-delivered');

  const stepPreparingDesc = document.getElementById('step-preparing-desc');
  const stepOutDesc = document.getElementById('step-out-desc');

  if (stepConfirmed) stepConfirmed.className = 'timeline-step completed';
  if (stepPreparing) {
    stepPreparing.className = 'timeline-step active';
    if (stepPreparingDesc) stepPreparingDesc.innerText = 'Chef is preparing your fresh meal';
  }
  if (stepOut) {
    stepOut.className = 'timeline-step';
    if (stepOutDesc) stepOutDesc.innerText = 'Delivery partner will pick up shortly';
  }
  if (stepDelivered) stepDelivered.className = 'timeline-step';

  if (scooter) {
    scooter.style.left = '12%';
    scooter.style.transition = 'left 0.8s ease-in-out';
  }
  if (driverStatus) driverStatus.innerText = 'Ramesh is waiting at the restaurant';
  if (etaMins) etaMins.innerText = '32';

  const id2 = setTimeout(() => {
    if (stepPreparing) stepPreparing.className = 'timeline-step completed';
    if (stepOut) stepOut.className = 'timeline-step active';
    if (scooter) scooter.style.left = '40%';
    if (driverStatus) driverStatus.innerText = 'Ramesh has picked up your food and is starting the engine!';
    if (etaMins) etaMins.innerText = '22';
    if (typeof showToast === 'function') {
      showToast('🍳 Cooking finished! Restaurant has handed over your hot meal.');
    }
  }, 6000);
  liveTrackingIntervals.push(id2);

  const id3 = setTimeout(() => {
    if (scooter) scooter.style.left = '60%';
    if (driverStatus) driverStatus.innerText = 'Ramesh is traveling down 80 Feet Road at 45km/h';
    if (etaMins) etaMins.innerText = '12';
    if (typeof showToast === 'function') {
      showToast('🚴 Ramesh is driving fast toward Green Glen Layout!');
    }
  }, 14000);
  liveTrackingIntervals.push(id3);

  const id4 = setTimeout(() => {
    if (stepOut) stepOut.className = 'timeline-step completed';
    if (stepDelivered) stepDelivered.className = 'timeline-step active';
    if (scooter) scooter.style.left = '80%';
    if (driverStatus) driverStatus.innerText = 'Ramesh is at the Lavender Apartments main gate!';
    if (etaMins) etaMins.innerText = '2';
    if (typeof showToast === 'function') {
      showToast('🔔 Ramesh has arrived at Lavender Apartments!');
    }
  }, 22000);
  liveTrackingIntervals.push(id4);

  const id5 = setTimeout(() => {
    if (stepDelivered) stepDelivered.className = 'timeline-step completed';
    if (driverStatus) driverStatus.innerText = 'Order delivered. Enjoy your hot meal!';
    if (etaMins) etaMins.innerText = '0';
    if (typeof showToast === 'function') {
      showToast('🎉 Order delivered successfully! Enjoy your meal!');
    }
  }, 28000);
  liveTrackingIntervals.push(id5);
};