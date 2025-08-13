const products = [
    // Electronics
    { id: 1, title: "Air Purifier", category: "Electronics", price: 8999, rating: 4.6, image: "images/Airpurifier.webp" },
    { id: 2, title: "Digital Camera", category: "Electronics", price: 15999, rating: 4.4, image: "images/digitalcamera.jpg" },
    { id: 3, title: "Laptop", category: "Electronics", price: 59999, rating: 4.9, image: "images/laptop.jpg" },
    { id: 4, title: "Smart Watch", category: "Electronics", price: 4999, rating: 4.6, image: "images/smartwatch.webp" },
    { id: 5, title: "Wireless Headphones", category: "Electronics", price: 2999, rating: 4.5, image: "images/wireles headphones.jpg" },
    // Footwear
    { id: 6, title: "Flip Flops", category: "Footwear", price: 499, rating: 3.9, image: "images/flipfloops.jpg" },
    { id: 7, title: "Formal Shoes", category: "Footwear", price: 3499, rating: 4.5, image: "images/formalshoes.jpg" },
    { id: 8, title: "Running Shoes", category: "Footwear", price: 2499, rating: 4.2, image: "images/running shoes.jpg" },
    { id: 9, title: "Sandals", category: "Footwear", price: 799, rating: 3.8, image: "images/sandals.jpg" },
    { id: 10, title: "Sneakers", category: "Footwear", price: 2999, rating: 4.3, image: "images/snekers.jpg" },
    // Home Appliances
    { id: 11, title: "Blender", category: "Home Appliances", price: 1499, rating: 4.0, image: "images/blender.jpg" },
    { id: 12, title: "Coffee Maker", category: "Home Appliances", price: 3499, rating: 4.8, image: "images/coffee maker.jpg" },
    { id: 13, title: "Microwave Oven", category: "Home Appliances", price: 6999, rating: 4.3, image: "images/microowen.jpg" },
    { id: 14, title: "Vacuum Cleaner", category: "Home Appliances", price: 5999, rating: 4.2, image: "images/vacuum cleaner.jpg" },
    // Accessories
    { id: 15, title: "Backpack", category: "Accessories", price: 999, rating: 4.1, image: "images/backpack.jpg" },
    { id: 16, title: "Belt", category: "Accessories", price: 599, rating: 4.1, image: "images/belt.jpg" },
    { id: 17, title: "Sunglasses", category: "Accessories", price: 499, rating: 3.9, image: "images/sunglasses.jpg" },
    { id: 18, title: "Wallet", category: "Accessories", price: 799, rating: 4.0, image: "images/wallet.jpg" },
    { id: 19, title: "Watch", category: "Accessories", price: 1999, rating: 4.3, image: "images/watch.jpg" }
];

const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const productList = document.getElementById('productList');

function getUniqueCategories() {
    const categories = products.map(p => p.category);
    return [...new Set(categories)];
}

function renderCategoryOptions() {
    const categories = getUniqueCategories();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

function filterProducts() {
    let filtered = [...products];
    const category = categoryFilter.value;
    const price = priceFilter.value;
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    if (price !== 'all') {
        filtered = filtered.filter(p => {
            if (price === 'low') return p.price < 1000;
            if (price === 'mid') return p.price >= 1000 && p.price <= 10000;
            if (price === 'high') return p.price > 10000;
        });
    }
    return filtered;
}

function sortProducts(productsArr) {
    const sort = sortFilter.value;
    if (sort === 'rating-desc') {
        return productsArr.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'rating-asc') {
        return productsArr.sort((a, b) => a.rating - b.rating);
    } else if (sort === 'price-asc') {
        return productsArr.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        return productsArr.sort((a, b) => b.price - a.price);
    }
    return productsArr;
}

let cart = [];

function renderProducts() {
    productList.innerHTML = '';
    let filtered = filterProducts();
    filtered = sortProducts(filtered);
    if (filtered.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }
    filtered.forEach((product) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <div class="product-rating">Rating: ${product.rating} ⭐</div>
            <div class="product-actions">
                <button class="btn btn-cart" data-id="${product.id}">Add to Cart</button>
                <button class="btn btn-buy" data-id="${product.id}">Buy Now</button>
            </div>
        `;
        productList.appendChild(div);
    });
    // Add event listeners for buttons
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (!cart.includes(id)) cart.push(id);
            updateCartCount();
            this.textContent = 'Added!';
            setTimeout(() => { this.textContent = 'Add to Cart'; }, 1200);
        });
    });
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            alert(`Thank you for buying ${product.title} for ₹${product.price.toLocaleString('en-IN')}!`);
        });
    });
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

categoryFilter.addEventListener('change', renderProducts);
priceFilter.addEventListener('change', renderProducts);
sortFilter.addEventListener('change', renderProducts);

renderCategoryOptions();
renderProducts();
