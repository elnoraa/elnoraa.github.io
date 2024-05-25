document.addEventListener("DOMContentLoaded", function() {

    const cartItems = {};

    function updateCartCount() {

        const cartCount = Object.keys(cartItems).reduce((total, item) => total + cartItems[item].quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    }

    function updateCartItems() {

        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalContainer = document.getElementById('cart-total');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (Object.keys(cartItems).length === 0) {

            cartItemsContainer.innerHTML = '<p>No items in cart</p>';
            cartTotalContainer.textContent = 'Total: $0.00';
        } else {

            for (let item in cartItems) {

                const cartItem = cartItems[item];
                const p = document.createElement('p');
                p.textContent = `${item} - $${(cartItem.price * cartItem.quantity).toFixed(2)}`;

                const quantityDisplay = document.createElement('span');
                quantityDisplay.textContent = cartItem.quantity;
                quantityDisplay.classList.add('quantity-display');

                const plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.classList.add('adjust-quantity');
                plusButton.addEventListener('click', function() {

                    cartItems[item].quantity++;
                    updateCartCount();
                    updateCartItems();
                });

                const minusButton = document.createElement('button');
                minusButton.textContent = '-';
                minusButton.classList.add('adjust-quantity');
                minusButton.addEventListener('click', function() {

                    cartItems[item].quantity--;
                    if (cartItems[item].quantity === 0) {
                        
                        delete cartItems[item];
                    }
                    updateCartCount();
                    updateCartItems();
                });

                p.appendChild(minusButton);
                p.appendChild(quantityDisplay);
                p.appendChild(plusButton);
                cartItemsContainer.appendChild(p);

                total += cartItem.price * cartItem.quantity;
            }
            cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {

        button.addEventListener('click', function() {

            const dishName = this.getAttribute('data-dish');
            const dishPrice = parseFloat(this.getAttribute('data-price'));

            if (!cartItems[dishName]) {

                cartItems[dishName] = { quantity: 0, price: dishPrice };
            }

            cartItems[dishName].quantity++;
            updateCartCount();
            updateCartItems();
        });
    });

    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.querySelector('.cart-dropdown');

    cartContainer.addEventListener('mouseleave', function() {
        
        setTimeout(function() {

            cartDropdown.classList.remove('show');
        }, 500);
    });

    cartContainer.addEventListener('mouseenter', function() {

        cartDropdown.classList.add('show');
    });
});
