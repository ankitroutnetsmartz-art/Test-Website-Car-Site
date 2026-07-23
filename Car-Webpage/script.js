// Use DataManager as single source of truth for car data
// Legacy compatibility wrapper
const carData = typeof DataManager !== 'undefined' ? DataManager.getAllCars() : [];

// --- 1. Fleet Rendering ---
function renderFleet(filter = 'all') {
    const grid = document.getElementById('car-grid');
    if (!grid) return;

    let filteredCars = filter === 'all' ? [...carData] : carData.filter(car => car.fuel === filter);

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        if (sortValue === 'price-asc') {
            filteredCars.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredCars.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            filteredCars.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            filteredCars.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    // Animate out before re-render
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(20px)';

    setTimeout(() => {
        grid.innerHTML = filteredCars.map((car, index) => {
            const specs = car.specs || {};
            return `
            <div class="car-card" data-fuel="${car.fuel}" data-car-id="${car.id}" style="animation-delay: ${index * 0.08}s">
                <button class="wishlist-btn" data-car-id="${car.id}" aria-label="Add to wishlist">🤍</button>
                <div class="car-image" style="background-image: url('${car.img}')"></div>
                <div class="car-body">
                    <span class="car-type">${car.fuel} MASTERPIECE</span>
                    <h3 class="car-name">${car.name}</h3>
                    <div class="car-stat-bar">
                        <div class="car-stat">
                            <span class="car-stat-value">${specs['0-60'] || 'N/A'}</span>
                            <span class="car-stat-label">0–60 mph</span>
                        </div>
                        <div class="car-stat">
                            <span class="car-stat-value">${specs.topSpeed || 'N/A'}</span>
                            <span class="car-stat-label">Top Speed</span>
                        </div>
                        <div class="car-stat">
                            <span class="car-stat-value">${specs.horsepower || 'N/A'}</span>
                            <span class="car-stat-label">Horsepower</span>
                        </div>
                    </div>
                    <div class="car-price">$${car.price.toLocaleString()}</div>
                    <div class="card-actions">
                        <button class="card-btn" onclick="window.openCarModal(${car.id})">Details</button>
                        <button class="card-btn secondary" onclick="window.carComparison && window.carComparison.addToCompare(${car.id})">Compare</button>
                    </div>
                </div>
            </div>
        `}).join('');

        grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';

        // Re-observe new elements
        requestAnimationFrame(() => {
            // Add wishlist button handlers
            document.querySelectorAll('.wishlist-btn').forEach(btn => {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                newBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const carId = parseInt(newBtn.dataset.carId);
                    if (window.wishlistManager) {
                        window.wishlistManager.toggleWishlist(carId);
                    }
                });
            });

            // Setup 3D tilt on each card
            setup3DTilt();
        });

        if (window.wishlistManager) {
            window.wishlistManager.updateWishlistButtons();
        }
    }, 200);
}

// --- 3D Tilt Effect ---
function setup3DTilt() {
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            renderFleet(btn.dataset.filter);
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const activeFilter = document.querySelector('.filter-btn.active');
            renderFleet(activeFilter ? activeFilter.dataset.filter : 'all');
        });
    }
}

// --- 2. Modal Functions ---
function openCarModal(id) {
    const car = typeof DataManager !== 'undefined' ? DataManager.getCarById(id) : carData.find(c => c.id === id);
    if (!car) return;

    const modal = document.getElementById('car-modal');
    const modalImg = document.getElementById('modal-car-img');
    const modalType = document.getElementById('modal-car-type');
    const modalName = document.getElementById('modal-car-name');
    const modalPrice = document.getElementById('modal-car-price');
    const modalDesc = document.getElementById('modal-car-description');
    const modalSpec0_60 = document.getElementById('modal-spec-0-60');
    const modalSpecTopSpeed = document.getElementById('modal-spec-top-speed');
    const modalSpecRange = document.getElementById('modal-spec-range');
    const modalSpecHP = document.getElementById('modal-spec-hp');
    const modalFinanceBtn = document.getElementById('modal-finance-btn');

    if (modalImg) modalImg.src = car.img;
    if (modalImg) modalImg.alt = car.name;
    if (modalType) modalType.textContent = `${car.fuel} MASTERPIECE`;
    if (modalName) modalName.textContent = car.name;
    if (modalPrice) modalPrice.textContent = `$${car.price.toLocaleString()}`;
    if (modalDesc) modalDesc.textContent = car.description;
    if (modalSpec0_60) modalSpec0_60.textContent = car.specs["0-60"];
    if (modalSpecTopSpeed) modalSpecTopSpeed.textContent = car.specs.topSpeed;
    if (modalSpecRange) modalSpecRange.textContent = car.specs.range;
    if (modalSpecHP) modalSpecHP.textContent = car.specs.horsepower;

    if (modalFinanceBtn) {
        modalFinanceBtn.onclick = () => {
            closeModal();
            selectCarForFinance(id);
        };
    }

    if (typeof stateManager !== 'undefined' && stateManager.addToRecentlyViewed) {
        stateManager.addToRecentlyViewed(id);
    }

    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.imageGallery) {
        window.imageGallery.renderCarGallery(id);
    }

    const configBtn = document.getElementById('modal-config-btn');
    if (configBtn && window.carConfigurator) {
        const newConfigBtn = configBtn.cloneNode(true);
        configBtn.parentNode.replaceChild(newConfigBtn, configBtn);
        newConfigBtn.onclick = () => {
            closeModal();
            window.carConfigurator.openConfigurator(id);
        };
    }
}

function closeModal() {
    const modal = document.getElementById('car-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initModal() {
    const modal = document.getElementById('car-modal');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// --- 3. Finance Logic with Sliders ---
function formatCurrency(value) {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
}

function updateSliderProgress(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--range-progress', `${pct}%`);
}

function updateEMI() {
    const priceInput = document.getElementById('car-price');
    const downPaymentInput = document.getElementById('down-payment');
    const loanTermInput = document.getElementById('loan-term');
    const emiDisplay = document.getElementById('emi-display');
    const priceDisplayEl = document.getElementById('price-display');
    const depositDisplayEl = document.getElementById('deposit-display');

    const price = priceInput ? parseFloat(priceInput.value) || 0 : 0;
    const down = downPaymentInput ? parseFloat(downPaymentInput.value) || 0 : 0;
    const term = loanTermInput ? parseInt(loanTermInput.value) || 12 : 12;

    // Update slider progress fills and display values
    if (priceInput && priceInput.type === 'range') {
        updateSliderProgress(priceInput);
        if (priceDisplayEl) priceDisplayEl.textContent = formatCurrency(price);
    }
    if (downPaymentInput && downPaymentInput.type === 'range') {
        updateSliderProgress(downPaymentInput);
        if (depositDisplayEl) depositDisplayEl.textContent = formatCurrency(down);
    }

    const principal = Math.max(0, price - down);
    const monthly = principal > 0 ? (principal / term) : 0;

    if (emiDisplay) {
        // Animate the EMI value change
        const emiContainer = emiDisplay.closest('.emi-amount');
        if (emiContainer) {
            emiContainer.classList.add('pulse');
            setTimeout(() => emiContainer.classList.remove('pulse'), 300);
        }
        emiDisplay.innerText = monthly.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

function selectCarForFinance(id) {
    const car = typeof DataManager !== 'undefined' ? DataManager.getCarById(id) : carData.find(c => c.id === id);
    if (!car) return;

    const select = document.getElementById('car-select');
    const priceInput = document.getElementById('car-price');

    if (select) select.value = car.name;
    if (priceInput) {
        priceInput.value = Math.min(car.price, parseFloat(priceInput.max));
        updateEMI();
    }

    const financeSection = document.getElementById('finance');
    if (financeSection) financeSection.scrollIntoView({ behavior: 'smooth' });
}

// --- 4. Scroll Reveal ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '50px' });

// --- 5. Hero Parallax ---
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');

    if (!heroBg && !heroContent) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = window.innerHeight;

                if (scrollY < heroHeight * 1.5) {
                    if (heroBg) {
                        heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
                    }
                    if (heroContent) {
                        const progress = scrollY / heroHeight;
                        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
                        heroContent.style.opacity = `${1 - progress * 1.2}`;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// --- 6. Nav Scroll Class ---
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// --- 7. Testimonial Carousel ---
function initTestimonialCarousel() {
    const track = document.getElementById('testimonials-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;

    // Determine how many cards visible based on viewport
    function getVisibleCount() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const total = getMaxIndex() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        // Calculate card width including gap
        const cardWidth = cards[0].offsetWidth + 40; // 40 = gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
    }

    function next() {
        goTo(currentIndex < getMaxIndex() ? currentIndex + 1 : 0);
    }

    function prev() {
        goTo(currentIndex > 0 ? currentIndex - 1 : getMaxIndex());
    }

    function startAutoplay() {
        autoplayInterval = setInterval(next, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });

    // Touch/drag support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            stopAutoplay();
            diff > 0 ? next() : prev();
            startAutoplay();
        }
    });

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoplay);
    track.parentElement.addEventListener('mouseleave', startAutoplay);

    createDots();
    goTo(0);
    startAutoplay();

    // Handle resize
    window.addEventListener('resize', () => {
        createDots();
        goTo(Math.min(currentIndex, getMaxIndex()));
    });
}

// --- 8. Form Validation ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (!data.firstName.trim() || !data.lastName.trim()) {
            alert('Please enter your full name.');
            return;
        }

        if (!data.email.trim() || !isValidEmail(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!data.message.trim()) {
            alert('Please include a message with your inquiry.');
            return;
        }

        alert('Thank you for your inquiry. Our concierge team will contact you within 24 hours.');
        form.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// --- 9. Mobile Navigation ---
let mobileNavClickHandler = null;

function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        if (mobileNavClickHandler) {
            document.removeEventListener('click', mobileNavClickHandler);
        }

        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        mobileNavClickHandler = (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        };
        document.addEventListener('click', mobileNavClickHandler);
    }
}

// Legacy functions are now called from app.js initLegacyFunctionality()