/* project-wide script */

const products = [
    { 
        id: 1, 
        name: 'Quantum Pro Laptop', 
        price: 1499.99, 
        category: 'Computing',
        description: 'Experience unparalleled power and speed with the new Quantum Pro Laptop. Featuring next-generation processing, a stunning 4K OLED display, and all-day battery life.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500' 
    },
    { 
        id: 2, 
        name: 'Aero Noise-Cancelling Headphones', 
        price: 299.99, 
        category: 'Audio',
        description: 'Immerse yourself in pure sound. The Aero headphones feature industry-leading active noise cancellation and premium comfort for extended listening sessions.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500' 
    },
    { 
        id: 3, 
        name: 'Nebula Smartwatch', 
        price: 399.99, 
        category: 'Wearables',
        description: 'Track your health, stay connected, and look stylish with the Nebula Smartwatch. Water-resistant and packed with advanced fitness sensors.',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500' 
    },
    { 
        id: 4, 
        name: 'Zenith Mechanical Keyboard', 
        price: 149.99, 
        category: 'Accessories',
        description: 'Tactile, responsive, and fully customizable RGB backlighting. The Zenith Keyboard is built for both passionate gamers and typists.',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500' 
    },
    { 
        id: 5, 
        name: 'Orbit Drone 4K', 
        price: 899.99, 
        category: 'Accessories',
        description: 'Capture breathtaking aerial footage with ease. Features a stabilized 4K camera, intelligent obstacle avoidance, and smart tracking modes.',
        image: 'https://images.unsplash.com/photo-1507580461415-9705dc8ceeb8?auto=format&fit=crop&w=500' 
    },
    { 
        id: 6, 
        name: 'Lumina Wireless Mouse', 
        price: 79.99, 
        category: 'Accessories',
        description: 'Ultra-lightweight ergonomic design with pixel-perfect tracking. The Lumina mouse offers zero latency wireless connectivity.',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500' 
    },
    { id: 7, name: 'Pixel Pro Monitor', price: 549.99, category: 'Computing', description: 'Stunning 4K display with ultra-fast refresh rates.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500' },
    { id: 8, name: 'Sonic Bluetooth Speaker', price: 129.99, category: 'Audio', description: 'Portable, waterproof speaker with 360-degree sound.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500' },
    { id: 9, name: 'Velocity Gaming Console', price: 499.99, category: 'Computing', description: 'Next-gen gaming experience with lightning-fast load times.', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500' },
    { id: 10, name: 'Crystal Webcam HD', price: 89.99, category: 'Accessories', description: '1080p high-definition webcam for crisp video calls.', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=500' },
    { id: 11, name: 'Thunderbolt Hub', price: 199.99, category: 'Accessories', description: 'Expand your connectivity with this ultra-fast Thunderbolt hub.', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=500' },
    { id: 12, name: 'Fusion Smart Home Hub', price: 149.99, category: 'Accessories', description: 'Control all your smart devices from one central hub.', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=500' },
    { id: 13, name: 'Apex Gaming Chair', price: 349.99, category: 'Accessories', description: 'Ergonomic gaming chair designed for comfort and performance.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=500' },
    { id: 14, name: 'Nova Tablet Pro', price: 649.99, category: 'Computing', description: 'A powerful tablet for creativity and productivity on the go.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500' },
    { id: 15, name: 'Echo Smart Speaker', price: 99.99, category: 'Audio', description: 'Voice-controlled smart speaker with rich sound quality.', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500' },
    { id: 16, name: 'Stream Deck Mini', price: 79.99, category: 'Accessories', description: 'Compact control pad with customizable LCD keys.', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500' },
    { id: 17, name: 'Hyper SSD 1TB', price: 159.99, category: 'Computing', description: 'Lightning-fast solid-state drive for maximum storage speed.', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500' },
    { id: 18, name: 'Wireless Charging Pad', price: 49.99, category: 'Accessories', description: 'Fast and convenient wireless charging for your devices.', image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=500' },
    { id: 19, name: 'USB-C Hub Pro', price: 89.99, category: 'Accessories', description: 'Multi-port USB-C hub for expanding your device\'s connectivity.', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=500' },
    { id: 20, name: 'Smart Ring Tracker', price: 199.99, category: 'Wearables', description: 'Track your health and activity seamlessly with this smart ring.', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500' }
];

const cart = [];
let currentFilter = 'All';
let currentSearch = '';

function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        countSpan.textContent = totalItems;
        const cartLink = document.getElementById('cart-link');
        cartLink.style.transform = 'scale(1.1)';
        cartLink.style.borderColor = 'var(--accent)';
        setTimeout(() => {
            cartLink.style.transform = 'none';
            cartLink.style.borderColor = 'var(--glass-border)';
        }, 200);
    }
}

function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<div class="toast-icon">✓</div> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name: prod.name, price: prod.price, quantity: 1, image: prod.image });
    }
    updateCartCounter();
    saveCart();
    showToast(`${prod.name} added to cart`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const stored = localStorage.getItem('cart');
    if (stored) {
        const items = JSON.parse(stored);
        items.forEach(i => cart.push(i));
        updateCartCounter();
    }
}

function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;
    container.innerHTML = '';
    
    let filtered = products.filter(p => p.name.toLowerCase().includes(currentSearch.toLowerCase()));
    
    if (currentFilter !== 'All') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 1.2rem; padding: 3rem;">No products found matching your criteria.</p>`;
        return;
    }

    filtered.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.setAttribute('data-id', p.id);
        div.style.animation = `fadeInUp 0.6s ease forwards ${i * 0.1}s`;
        div.style.opacity = '0';
        div.innerHTML = `
            <div class="product-img-wrapper">
                <div class="product-category">${p.category}</div>
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <h3>${p.name}</h3>
            <div class="product-price-row">
                <p class="price">$${p.price.toFixed(2)}</p>
                <button class="add-cart" data-id="${p.id}">Add to Cart</button>
            </div>
        `;
        
        // Open modal on click (except if clicking add to cart)
        div.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-cart')) {
                openQuickView(p.id);
            }
        });
        
        container.appendChild(div);
    });
    
    attachProductListeners();
}

function attachProductListeners() {
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', e => {
            e.stopPropagation();
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            currentSearch = e.target.value;
            renderProducts();
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.getAttribute('data-category');
                renderProducts();
            });
        });
    }
}

// Quick View Modal
function setupModal() {
    const modalOverlay = document.getElementById('quick-view-modal');
    const closeBtn = document.getElementById('modal-close');
    const addToCartBtn = document.getElementById('modal-add-cart');
    
    if (!modalOverlay) return;

    closeBtn.addEventListener('click', closeQuickView);
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeQuickView();
    });
    
    addToCartBtn.addEventListener('click', e => {
        const id = parseInt(e.target.getAttribute('data-id'));
        if (id) {
            addToCart(id);
            closeQuickView();
        }
    });
}

function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-desc').textContent = product.description;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-add-cart').setAttribute('data-id', product.id);
    
    document.getElementById('quick-view-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function setupNavToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    if (!menuToggle || !nav) return;
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Simulate form submission
        showToast(`Thank you ${name}! We'll contact you at ${email} soon.`);
        form.reset();
    });
}

// cart page functions
function renderCartPage() {
    const tbody = document.getElementById('cart-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 4rem;">Your cart is empty. <br><br><a href="index.html" style="display: inline-block; margin-top: 1.5rem; padding: 1rem 2rem; background: var(--accent); color: white; text-decoration: none; font-weight: 600; border-radius: 8px;">Continue Shopping</a></td></tr>`;
        updateCartSummary();
        return;
    }

    cart.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="display: flex; align-items: center; gap: 1.5rem; text-align: left;">
                <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                ${item.name}
            </td>
            <td style="color: var(--text-muted);">$${item.price.toFixed(2)}</td>
            <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="qty-input"></td>
            <td style="color: var(--text-main); font-weight: bold; font-size: 1.2rem;">$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item" data-id="${item.id}">✕</button></td>
        `;
        tbody.appendChild(tr);
    });
    setupCartPageListeners();
    updateCartSummary();
}

function updateCartSummary() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const summary = document.getElementById('cart-total');
    if (summary) summary.textContent = `$${total.toFixed(2)}`;
}

function setupCartPageListeners() {
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const qty = parseInt(e.target.value);
            const item = cart.find(i => i.id === id);
            if (item && qty > 0) {
                item.quantity = qty;
                saveCart();
                renderCartPage();
                updateCartCounter();
            }
        });
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const idx = cart.findIndex(i => i.id === id);
            if (idx > -1) {
                const name = cart[idx].name;
                cart.splice(idx, 1);
                saveCart();
                renderCartPage();
                updateCartCounter();
                showToast(name + ' removed');
            }
        });
    });
    const checkout = document.getElementById('checkout-btn');
    if (checkout) {
        checkout.addEventListener('click', () => {
            if(cart.length === 0) return alert('Your cart is empty!');
            alert('Proceeding to secure checkout...');
            // Optional: clear cart on checkout
            // cart.length = 0;
            // saveCart();
            // renderCartPage();
            // updateCartCounter();
        });
    }
}

// initialization
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupNavToggle();
    setupContactForm();

    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
    } else {
        renderProducts();
        setupFilters();
        setupModal();
    }
});
