document.addEventListener("DOMContentLoaded", function() {

    let cartItems = {};

    document.querySelectorAll('.add-to-cart').forEach(button => {

        button.addEventListener('click', function(event) {

            event.preventDefault();
            let dishName = this.getAttribute('data-dish');
            if (cartItems[dishName]) {

                cartItems[dishName]++;
            } else {

                cartItems[dishName] = 1;
            }

            updateCartCount();
            updateCartItems();
        });
    });

    function updateCartCount() {

        let totalCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
        document.getElementById('cart-count').textContent = totalCount;
    }

    function updateCartItems() {

        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (Object.keys(cartItems).length === 0) {

            cartItemsContainer.innerHTML = '<p>No items in cart</p>';
        } else {

            for (let item in cartItems) {
                const p = document.createElement('p');
                p.textContent = item;

                const quantityDisplay = document.createElement('span');
                quantityDisplay.textContent = cartItems[item];
                quantityDisplay.classList.add('quantity-display');

                const plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.classList.add('adjust-quantity');
                plusButton.addEventListener('click', function() {

                    cartItems[item]++;

                    updateCartCount();
                    updateCartItems();
                });

                const minusButton = document.createElement('button');
                minusButton.textContent = '-';
                minusButton.classList.add('adjust-quantity');
                minusButton.addEventListener('click', function() {

                    cartItems[item]--;

                    if (cartItems[item] === 0) {

                        delete cartItems[item];
                    }

                    updateCartCount();
                    updateCartItems();
                });

                p.appendChild(minusButton);
                p.appendChild(quantityDisplay);
                p.appendChild(plusButton);
                cartItemsContainer.appendChild(p);
            }
        }
    }

    let cartContainer = document.querySelector('.cart-container');
    let cartDropdown = document.querySelector('.cart-dropdown');

    cartContainer.addEventListener('mouseleave', function() {
        // Add 'show' class to cart dropdown
        cartDropdown.classList.add('show');
        
        // Remove 'show' class after 0.5 seconds
        setTimeout(function() {
            cartDropdown.classList.remove('show');
        }, 100);
    });

});
