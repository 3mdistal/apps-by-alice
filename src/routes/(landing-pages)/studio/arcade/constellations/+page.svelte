<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	class Particle {
		x: number;
		y: number;
		radius: number;
		color: string;

		constructor(x: number, y: number, color: string) {
			this.x = x;
			this.y = y;
			this.radius = 0.5;
			this.color = color;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();

			setTimeout(() => {
				this.move(ctx, Math.random() * 10 - 5, Math.random() * 10 - 5);
			}, 1000 / 60);
		}

		move(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
			this.x += dx;
			this.y += dy;
			this.draw(ctx);
		}
	}

	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		// Initialize Canvas
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.style.backgroundColor = 'black';

		ctx = canvas.getContext('2d')!;

		// Draw Background

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	});

	function handleClick(e: MouseEvent) {
		const spectrum = Math.random() * 360;

		for (let i = 0; i < 10; i++) {
			const particle = new Particle(
				e.offsetX + Math.random() * 50 - 50,
				e.offsetY + Math.random() * 50 - 50,
				`hsl( ${spectrum + Math.random() * 50} , ${0.25 + Math.random() * 0.5 * 100}%, 50%)`
			);
			particle.draw(ctx);
		}
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<canvas bind:this={canvas} on:click={handleClick}></canvas>
	<p class="pointer-events-none absolute bottom-0 text-gray-500">each of us a constellation</p>
</div>
