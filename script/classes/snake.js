export default class Snake {
    constructor() {
        this.segments = [{ x: 0, y: 0 }];
        this.direction = 'right';
    }

    move() {
        // Перемещение змейки на один шаг
    }

    grow() {
        // Увеличение длины змейки
    }

    checkCollision() {
        // Проверка столкновения с границами и самой собой
    }

    changeDirection(newDirection) {
        // Изменение направления змейки
    }

    reset() {
        // Сброс положения змейки
    }
}