
document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const gridSize = 20;
    const cellSize = 30;

    let snake;
    let food;
    let direction = 'RIGHT'; // Направление движения змейки

    // Инициализация игрового поля
    function initializeGameBoard() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameContainer.appendChild(cell);
            }
        }
    }

    // Отображение змейки
    function displaySnake(snake) {
        snake.forEach((position) => {
            const cellIndex = position.y * gridSize + position.x;
            const cell = gameContainer.children[cellIndex];
            cell.classList.add('snake');
        });
    }

    // Отображение еды
    function displayFood(food) {
        const foodIndex = food.y * gridSize + food.x;
        const foodCell = gameContainer.children[foodIndex];
        foodCell.classList.add('food');
    }

    // Очистка игрового поля
    function clearGameBoard() {
        const cells = gameContainer.getElementsByClassName('cell');
        Array.from(cells).forEach((cell) => {
            cell.className = 'cell';
        });
    }

    // Обработка движения змейки
    function moveSnake() {
        const head = snake[0];
        let newHead;

        // Определяем новое положение головы в зависимости от направления
        switch (direction) {
            case 'UP':
                newHead = { x: head.x, y: head.y - 2 };
                break;
            case 'DOWN':
                newHead = { x: head.x, y: head.y + 2 };
                break;
            case 'LEFT':
                newHead = { x: head.x - 2, y: head.y };
                break;
            case 'RIGHT':
                newHead = { x: head.x + 2, y: head.y };
                break;
        }

        // Добавляем новую голову в начало массива змейки
        snake.unshift(newHead);

        // Проверяем столкновение с едой
        if (newHead.x === food.x && newHead.y === food.y) {
            // Генерируем новое положение еды
            generateFood();
        } else {
            // Убираем хвост змейки, если не съели еду
            snake.pop();
        }

        // Очищаем и обновляем отображение
        clearGameBoard();
        displaySnake(snake);
        displayFood(food);

        // Проверяем столкновение с границами поля или самой собой
        if (checkCollision()) {
            // Обработка завершения игры (например, вывод сообщения об окончании игры)
            alert('Game Over!');
            // Перезапуск игры или другая логика
            initializeGame();
        }
    }

    // Генерация новой еды
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    // Проверка столкновений
    function checkCollision() {
        const head = snake[0];

        // Проверка столкновения с границами поля
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            return true;
        }

        // Проверка столкновения с самой собой
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    }

    // Главный таймер для движения змейки
    setInterval(() => {
        moveSnake();
    }, 1000); // Обновление каждую секунду

    // Обработка клавиш управления
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'UP';
                break;
            case 'ArrowDown':
                direction = 'DOWN';
                break;
            case 'ArrowLeft':
                direction = 'LEFT';
                break;
            case 'ArrowRight':
                direction = 'RIGHT';
                break;
        }
    });

    // Инициализация игры
    function initializeGame() {
        snake = [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 }
        ];

        food = { x: 10, y: 10 };

        clearGameBoard();
        displaySnake(snake);
        displayFood(food);
    }

    // Инициализация игры при загрузке страницы
    initializeGame();
});