<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Paddle,
		Ball,
		Brick,
		isCollidingWithPaddle,
		initializeBricks,
		handleBrickCollision
	} from './breakout';

	let canvas: HTMLCanvasElement;
	let paddle: Paddle;
	let ball: Ball;
	let bricks: Brick[] = [];

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		paddle = new Paddle(canvas);
		ball = new Ball(canvas.width / 2, canvas.height - 100 - paddle.height / 2);
		initializeBricks(bricks);

		function animate() {
			ctx?.clearRect(0, 0, canvas.width, canvas.height);
			// Begin animation loop

			for (let brick of bricks) {
				brick.draw(ctx);
				if (handleBrickCollision(ball, brick)) {
					ball.dy *= -1;
					break;
				}
			}

			paddle.draw(ctx);

			ball.draw(ctx);
			ball.move();
			ball.collideWithWall(canvas);

			if (isCollidingWithPaddle(ball, paddle)) {
				ball.dy *= -1;
				let delta = ball.x - (paddle.x + paddle.width / 2);
				ball.dx = delta * 0.1;
			}

			// End animation loop
			requestAnimationFrame(animate);
		}

		animate();
	});
</script>

<div class="container">
	<canvas
		width="1080"
		height="720"
		class="game-canvas"
		on:click={() => {
			ball.isMoving = true;
		}}
		on:mousemove={(e) => {
			let relativeX = e.clientX - canvas.offsetLeft;
			if (relativeX - paddle.width / 2 >= 0 && relativeX + paddle.width / 2 <= canvas.width) {
				paddle.x = relativeX - paddle.width / 2;
			}
		}}
		bind:this={canvas}
	></canvas>
</div>

<style>
	.container {
		display: flex;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
	}

	.game-canvas {
		aspect-ratio: 16 / 9;
		width: 1080px;
		border: 2px solid black;
	}
</style>
