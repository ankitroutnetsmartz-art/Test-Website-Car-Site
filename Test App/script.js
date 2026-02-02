const carData = [
    { name: "Titan GT", fuel: "gas", price: 95000, hp: 650, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800" },
    { name: "Nebula X", fuel: "electric", price: 120000, hp: 1020, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800" },
    { name: "Vanguard S", fuel: "gas", price: 88000, hp: 610, img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800" },
    { name: "Summit SUV", fuel: "electric", price: 72000, hp: 450, img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=800" },
    { name: "Phantom E", fuel: "electric", price: 155000, hp: 800, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800" }
];

// Inventory Logic
function renderCars(data) {
    const grid = document.getElementById('car-grid');
    grid.innerHTML = data.map(car => `
        <div class="car-card">
            <div class="car-img" style="background-image: url('${car.img}')"></div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>${car.fuel.toUpperCase()} | ${car.hp} HP</p>
                <div class="price-tag">$${car.price.toLocaleString()}</div>
                <button class="btn-cta" style="width:100%">Configure</button>
            </div>
        </div>
    `).join('');
}

function updateInventory() {
    const search = document.getElementById('carSearch').value.toLowerCase();
    const fuel = document.getElementById('fuelFilter').value;
    const sort = document.getElementById('priceSort').value;

    let filtered = carData.filter(c => 
        c.name.toLowerCase().includes(search) && (fuel === 'all' || c.fuel === fuel)
    );

    if(sort === 'low') filtered.sort((a,b) => a.price - b.price);
    if(sort === 'high') filtered.sort((a,b) => b.price - a.price);

    renderCars(filtered);
}

// Finance Logic
function updateEMI() {
    const p = (document.getElementById('car-price').value - document.getElementById('down-payment').value);
    const r = document.getElementById('interest-rate').value / 12 / 100;
    const n = document.getElementById('loan-term').value;
    document.getElementById('rate-val').innerText = document.getElementById('interest-rate').value + "%";
    
    const emi = (p * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    document.getElementById('emi-amount').innerText = emi > 0 ? emi.toFixed(2) : "0.00";
}

// Reveal Logic
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', () => { updateInventory(); updateEMI(); }));

renderCars(carData);
updateEMI();