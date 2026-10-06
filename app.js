// Mock Database using LocalStorage
class Database {
    static init() {
        if (!localStorage.getItem('stores')) {
            localStorage.setItem('stores', JSON.stringify([]));
        }
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }

    static getStores() {
        return JSON.parse(localStorage.getItem('stores'));
    }

    static addStore(store) {
        const stores = this.getStores();
        store.id = Date.now().toString();
        stores.push(store);
        localStorage.setItem('stores', JSON.stringify(stores));
        return store;
    }

    static updateStore(id, updatedData) {
        let stores = this.getStores();
        stores = stores.map(s => s.id === id ? { ...s, ...updatedData } : s);
        localStorage.setItem('stores', JSON.stringify(stores));
    }

    static deleteStore(id) {
        let stores = this.getStores();
        stores = stores.filter(s => s.id !== id);
        localStorage.setItem('stores', JSON.stringify(stores));
        
        // Also delete associated products
        let products = this.getProducts();
        products = products.filter(p => p.storeId !== id);
        localStorage.setItem('products', JSON.stringify(products));
    }

    static getProducts(storeId = null) {
        const products = JSON.parse(localStorage.getItem('products'));
        if (storeId) {
            return products.filter(p => p.storeId === storeId);
        }
        return products;
    }

    static addProduct(product) {
        const products = JSON.parse(localStorage.getItem('products'));
        product.id = Date.now().toString();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return product;
    }

    static deleteProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Initialize the database on load
Database.init();
