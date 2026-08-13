/* =========================================
   RENU TOYS - JAVASCRIPT
   ========================================= */

let cart = [];

/* =========================================
   MOBILE MENU
   ========================================= */

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    if (navLinks) {
        navLinks.classList.toggle("show");
    }
}


/* =========================================
   ADD PRODUCT TO CART
   ========================================= */

function addToCart(productName, price) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();

    alert(productName + " has been added to your cart! 🛒");
}


/* =========================================
   UPDATE CART COUNT
   ========================================= */

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }
}


/* =========================================
   SHOW CART
   ========================================= */

function showCart() {

    const modal = document.getElementById("cartModal");

    if (!modal) {
        return;
    }

    updateCartDisplay();

    modal.style.display = "flex";
}


/* =========================================
   CLOSE CART
   ========================================= */

function closeCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =========================================
   DISPLAY CART ITEMS
   ========================================= */

function updateCartDisplay() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent = "0";

        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>
                </div>

                <div>
                    <strong>₹${itemTotal}</strong>
                    <br>
                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = total;
}


/* =========================================
   REMOVE FROM CART
   ========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();
    updateCartDisplay();
}


/* =========================================
   CHECKOUT
   ========================================= */

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a toy first! 🧸");
        return;
    }

    let message = "Hello Renu Toys! I would like to order:%0A%0A";
    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";
    });

    message +=
        "%0ATotal: ₹" +
        total +
        "%0A%0APlease provide me with the order details.";

    /*
       WhatsApp number:
       +91 98281 25366
    */

    const whatsappNumber = "919828125366";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;

    window.open(whatsappURL, "_blank");
}


/* =========================================
   CONTACT FORM
   ========================================= */

function submitForm(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const formMessage = document.getElementById("formMessage");

    if (!name || !phone || !message) {
        formMessage.textContent =
            "Please fill in all the fields.";
        return;
    }

    /*
       This is a front-end demo form.
       It opens WhatsApp with the entered information.
    */

    const whatsappMessage =
        "Hello Renu Toys!%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Phone: " + encodeURIComponent(phone) + "%0A" +
        "Message: " + encodeURIComponent(message);

    const whatsappNumber = "919828125366";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        whatsappMessage;

    formMessage.textContent =
        "Opening WhatsApp... 💌";

    window.open(whatsappURL, "_blank");
}


/* =========================================
   CLOSE CART WHEN CLICKING OUTSIDE
   ========================================= */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("cartModal");

    if (modal && event.target === modal) {
        closeCart();
    }

});
