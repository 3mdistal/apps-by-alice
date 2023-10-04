<script lang="ts">
	import { onMount } from 'svelte';

	let canvasBackground: HTMLCanvasElement;
	let canvasTriangle: HTMLCanvasElement;
	let canvasCircle: HTMLCanvasElement;
	let canvasSquare: HTMLCanvasElement;

	let ctx: CanvasRenderingContext2D;
	let ctxTriangle: CanvasRenderingContext2D;
	let ctxCircle: CanvasRenderingContext2D;
	let ctxSquare: CanvasRenderingContext2D;

	let currentShape = 'triangle';

	class Triangle {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
		}

		draw(ctx: CanvasRenderingContext2D) {
			const x = this.x - this.size / 2;
			const y = this.y + this.size / 2;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + this.size, y);
			ctx.lineTo(x + this.size / 2, y - this.size);
			ctx.fill();
		}
	}

	class Circle {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	class Square {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
			ctx.fill();
		}
	}

	function resetDimensions() {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;
	}

	function handleClick(e: MouseEvent) {
		if (currentShape === 'triangle') {
			const triangle = new Triangle(e.offsetX, e.offsetY);
			triangle.draw(ctx);
		} else if (currentShape === 'circle') {
			const circle = new Circle(e.offsetX, e.offsetY);
			circle.draw(ctx);
		} else if (currentShape === 'square') {
			const square = new Square(e.offsetX, e.offsetY);
			square.draw(ctx);
		}
	}

	function changeShape(e: MouseEvent, shape: string) {
		currentShape = shape;

		console.log(e.target);
	}

	onMount(() => {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;

		ctx = canvasBackground.getContext('2d')!;
		ctxTriangle = canvasTriangle.getContext('2d')!;
		ctxCircle = canvasCircle.getContext('2d')!;
		ctxSquare = canvasSquare.getContext('2d')!;

		const triangle = new Triangle(50, 50);
		triangle.draw(ctxTriangle);

		const circle = new Circle(50, 50);
		circle.draw(ctxCircle);

		const square = new Square(50, 50);
		square.draw(ctxSquare);
	});
</script>

<canvas
	class="bg-black"
	on:resize={resetDimensions}
	on:click={handleClick}
	bind:this={canvasBackground}
></canvas>
<div class="absolute left-10 top-10 flex flex-col gap-y-10 hover:[&_canvas]:scale-90">
	<canvas
		on:click={(e) => changeShape(e, 'triangle')}
		width="100"
		height="100"
		bind:this={canvasTriangle}
	></canvas>
	<canvas
		on:click={(e) => changeShape(e, 'circle')}
		width="100"
		height="100"
		bind:this={canvasCircle}
	></canvas>
	<canvas
		on:click={(e) => changeShape(e, 'square')}
		width="100"
		height="100"
		bind:this={canvasSquare}
	></canvas>
</div>
