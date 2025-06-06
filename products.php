<?php include 'connect.php'; ?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Каталог товарів | Електроінструмент "Потужно"</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <header>
        <div class="logo-bar">
            <h1>ЕЛЕКТРОІНСТРУМЕНТ "Потужно"</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Головна</a></li>
                <li><a href="products.php">Товари</a></li>
                <li><a href="about.html">Про нас</a></li>
            </ul>
        </nav>
        <button id="open-cart" class="btn cart-btn">
            <img src="images/icons/cart.png" alt="Кошик" class="icon-cart"> Кошик (<span id="cart-count">0</span>)
        </button>
    </header>

    <main class="products">
        <h2>Каталог товарів</h2>

        <!-- Форма фільтрації -->
        <form method="get" style="margin-bottom: 20px;">
            <label>Категорія:</label>
            <input type="text" name="category">
            <label>Максимальна ціна:</label>
            <input type="number" name="max_price">
            <button type="submit" class="btn">Фільтрувати</button>
        </form>

        <!-- Вивід товарів з БД -->
        <div class="product-grid">
        <?php
            $sql = "SELECT * FROM products WHERE 1=1";
            $params = [];

            if (!empty($_GET['category'])) {
                $sql .= " AND category = :category";
                $params['category'] = $_GET['category'];
            }

            if (!empty($_GET['max_price'])) {
                $sql .= " AND price <= :max_price";
                $params['max_price'] = $_GET['max_price'];
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

            foreach ($stmt as $item) {
                echo "<div class='product-card' data-id='{$item['id']}' data-name='{$item['name']}' data-price='{$item['price']}'>";
                echo "<img src='images/products/{$item['image']}' alt='{$item['name']}'>";
                echo "<h3>{$item['name']}</h3>";
                echo "<p>Ціна: {$item['price']} грн</p>";
                echo "<button class='btn add-to-cart'>Додати до кошика</button>";
                echo "</div>";
            }
        ?>
        </div>
    </main>

    <!-- Модальне вікно кошика -->
    <div id="cart-modal" class="modal hidden">
        <div class="modal-content">
            <img src="images/icons/close.png" alt="Закрити" id="close-cart" class="icon-close">
            <h2>Ваше замовлення</h2>
            <div id="cart-items"></div>
            <p class="total">Загальна сума: <span id="cart-total">0</span> грн</p>
        </div>
    </div>

    <footer>
        <p>&copy; 2025 Електроінструмент "Потужно". Всі права захищені.</p>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
