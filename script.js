// بيانات تجريبية (مؤقتة) لمحاكاة الـ API الخاص بـ Google Sheets
const mockProducts = [
    { id: 1, name: "حقيبة مكرمية", price: 150, image: "https://via.placeholder.com/300x200/ff9a9e/fff?text=Macrame+Bag" },
    { id: 2, name: "إكسسوار خرز يدوي", price: 50, image: "https://via.placeholder.com/300x200/a18cd1/fff?text=Handmade+Accessory" },
    { id: 3, name: "شمعة معطرة", price: 80, image: "https://via.placeholder.com/300x200/fecfef/555?text=Scented+Candle" },
    { id: 4, name: "ميدالية ريزن", price: 40, image: "https://via.placeholder.com/300x200/ff9a9e/fff?text=Resin+Keychain" }
];

let cartCount = 0;

// دالة لجلب البيانات من Google Sheets
async function fetchProducts() {
    const productsContainer = document.getElementById('products-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    try {
        const apiUrl = 'https://script.google.com/macros/s/AKfycbwedlp47snqCe8_1rvR9zzwpTUIt5gTAEowrkHNp8wiZWNS2Io8GO8jjimwQmIl14cA/exec';
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        loadingIndicator.style.display = 'none';
        
        // مسح المحتوى القديم
        productsContainer.innerHTML = '';
        
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // التأكد من وجود صورة، وإلا نضع صورة افتراضية
            const imageUrl = product.image_url || product.image || "https://via.placeholder.com/300x200/ff9a9e/fff?text=Handmade+Product";
            
            productCard.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price} ج.م</p>
                <button class="btn-add" onclick="addToCart(${product.id || 0})">أضف للسلة</button>
            `;
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        loadingIndicator.innerText = 'حدث خطأ أثناء جلب المنتجات. يرجى المحاولة لاحقاً.';
    }
}

// دالة إضافة للسلة
function addToCart(productId) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    // تأثير حركي بسيط
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
