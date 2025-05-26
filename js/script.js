// Масив товарів у кошику
let cart = [];

// Елементи
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Додати товар до кошика
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    });
});

// Відкрити кошик
openCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// Закрити кошик
closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Оновити вміст кошика
function updateCart() {
    cartItemsContainer.innerHTML = '';

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-controls">
        <button class="decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">×</button>
      </div>
      <p>${item.price * item.quantity} грн</p>
    `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total;
    cartCount.textContent = count;

    setControlEvents();
}

// Прив'язати події до кнопок в кошику
function setControlEvents() {
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.id === id);
            item.quantity++;
            updateCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(i => i.id !== id);
            }
            updateCart();
        });
    });

    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            cart = cart.filter(i => i.id !== id);
            updateCart();
        });
    });
}
