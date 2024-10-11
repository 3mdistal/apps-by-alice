export class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    moveSpeed: number;

    constructor(canvas: HTMLCanvasElement) {
        this.width = 100;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 100;
        this.color = '#0095DD';
        this.moveSpeed = 4;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class Ball {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
    color: string;
    isMoving: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.dx = 2;
        this.dy = -2;
        this.color = 'red'
        this.isMoving = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        if (this.isMoving) {
            this.x += this.dx
            this.y += this.dy
        }
    }

    collideWithWall(canvas: HTMLCanvasElement) {
        if (this.x + this.dx > canvas.width - this.r || this.x + this.dx < this.r) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.r) {
            this.dy = -this.dy;
        }
    }
}

export function isCollidingWithPaddle(ball: Ball, paddle: Paddle): boolean {
    return (
        ball.y + ball.r > paddle.y &&
        ball.y - ball.r < paddle.y + paddle.height &&
        ball.x + ball.r > paddle.x &&
        ball.x - ball.r < paddle.x + paddle.width
    );
}

export class Brick {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    isVisible: boolean;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
        this.isVisible = true;
    }

    draw (ctx: CanvasRenderingContext2D) {
        if (this.isVisible) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}


const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 20;
const PADDING = 10;
const OFFSET_TOP = 30;
const OFFSET_LEFT = 135;
const ROWS = 8;
const COLUMNS = 10;

export function initializeBricks(bricks: Brick[]) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            const x = j * (BRICK_WIDTH + PADDING) + OFFSET_LEFT;
            const y = i * (BRICK_HEIGHT + PADDING) + OFFSET_TOP;
            bricks.push(new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, 'blue'));
        }
    }
}

export function handleBrickCollision(ball: Ball, brick: Brick): boolean {
    if (
        ball.y + ball.r > brick.y && 
        ball.y - ball.r < brick.y + brick.height &&
        ball.x + ball.r > brick.x &&
        ball.x - ball.r < brick.x + brick.width &&
        brick.isVisible
    ) {
        brick.isVisible = false;  // Hide the brick
        return true;
    }
    return false;
}

