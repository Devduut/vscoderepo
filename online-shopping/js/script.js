// Load products dynamically
fetch('data/products.json')
.then(response => response.json())
.then(products => {
    const productList = document.getElementById('product-list');
    if(productList){
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    }
});

// Cart Functions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId){
    const index = cart.findIndex(item => item.id === productId);
    if(index > -1){
        cart[index].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

function loadCart(){
    const cartItemsDiv = document.getElementById('cart-items');
    if(cartItemsDiv){
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsDiv.innerHTML = "";
        if(cartData.length === 0){
            cartItemsDiv.innerHTML = "Cart is empty.";
            return;
        }
        cartData.forEach(item => {
            cartItemsDiv.innerHTML += `
                <p>Product ID: ${item.id} | Quantity: ${item.quantity}</p>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', loadCart);