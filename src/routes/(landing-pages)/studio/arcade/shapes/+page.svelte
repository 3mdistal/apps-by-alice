<script lang="ts">
	import { onMount } from 'svelte';

	let canvasBackground: HTMLCanvasElement;
	let canvasTriangle: HTMLCanvasElement;
	let canvasCircle: HTMLCanvasElement;
	let canvasSquare: HTMLCanvasElement;
	let canvasHeart: HTMLCanvasElement;
	let canvasStar: HTMLCanvasElement;
	let canvasClear: HTMLCanvasElement;

	let ctxBackground: CanvasRenderingContext2D;
	let ctxTriangle: CanvasRenderingContext2D;
	let ctxCircle: CanvasRenderingContext2D;
	let ctxSquare: CanvasRenderingContext2D;
	let ctxHeart: CanvasRenderingContext2D;
	let ctxStar: CanvasRenderingContext2D;
	let ctxClear: CanvasRenderingContext2D;

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
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
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
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
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
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
			ctx.fill();
		}
	}

	class SVGToImage {
		svg: SVGElement;
		paths: Array<SVGPathElement>;
		image: HTMLImageElement;
		isLoaded: boolean;

		constructor(viewBox: string, paths: Array<string>) {
			this.isLoaded = false;

			this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.svg.setAttribute('viewBox', viewBox);

			paths.forEach((path) => {
				const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				newPath.setAttribute('d', path);

				this.svg.appendChild(newPath);
			});

			this.paths = Array.from(this.svg.querySelectorAll('path'));

			this.image = new Image();
		}

		serialize() {
			let serializer = new XMLSerializer();
			let svgStr = serializer.serializeToString(this.svg);
			let encodedData = 'data:image/svg+xml;base64,' + btoa(svgStr);

			this.image.src = encodedData;
		}

		whenReady(callback: Function) {
			if (this.isLoaded) {
				callback();
			} else {
				this.image.onload = () => {
					this.isLoaded = true;
					callback();
				};
			}
		}
	}

	class Heart extends SVGToImage {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			super('0 0 30 30', [
				'M15 6.152C18.158.284 24.474.284 27.632 3.218s3.158 8.801 0 14.668c-2.211 4.4-7.895 8.801-12.632 11.734-4.737-2.933-10.421-7.334-12.632-11.734-3.157-5.867-3.157-11.734 0-14.668S11.842.284 15 6.152z'
			]);
			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;

			this.paths.forEach((path) => {
				path.setAttribute('fill', this.color);
			});

			this.serialize();
		}

		draw(ctx: CanvasRenderingContext2D) {
			this.whenReady(() => {
				ctx.drawImage(
					this.image,
					this.x - this.size / 2,
					this.y - this.size / 2,
					this.size,
					this.size
				);
			});
		}
	}

	class Star extends SVGToImage {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			super('0, 0, 30, 30', [
				'M14.993 0l3.538 11.438h11.452l-9.264 7.068 3.538 11.438-9.264-7.069-9.265 7.069 3.539-11.438-9.265-7.068h11.452L14.993 0z'
			]);
			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;

			this.paths.forEach((path) => {
				path.setAttribute('fill', this.color);
			});

			this.serialize();
		}

		draw(ctx: CanvasRenderingContext2D) {
			this.whenReady(() => {
				ctx.drawImage(
					this.image,
					this.x - this.size / 2,
					this.y - this.size / 2,
					this.size,
					this.size
				);
			});
		}
	}

	class Clear extends SVGToImage {
		x: number;
		y: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			super('0, 0, 30, 30', [
				'M11.578,13.974l-9.359,-11.461l7.166,-0l5.802,7.282l5.909,-7.282l7.38,-0l-9.626,11.461l11.15,13.513l-7.166,0l-7.647,-9.333l-7.834,9.333l-7.353,0l11.578,-13.513Z'
			]);

			this.x = x;
			this.y = y;
			this.size = 100;
			this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;

			this.paths.forEach((path) => {
				path.setAttribute('fill', 'hsl(0, 50%, 50%)');
			});

			this.serialize();
		}

		draw(ctx: CanvasRenderingContext2D) {
			this.whenReady(() => {
				ctx.drawImage(
					this.image,
					this.x - this.size / 2,
					this.y - this.size / 2,
					this.size,
					this.size
				);
			});
		}
	}

	// Event Handlers
	function resetDimensions() {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;
	}

	function handleClick(e: MouseEvent) {
		if (currentShape === 'triangle') {
			const triangle = new Triangle(e.offsetX, e.offsetY);
			triangle.draw(ctxBackground);
		} else if (currentShape === 'circle') {
			const circle = new Circle(e.offsetX, e.offsetY);
			circle.draw(ctxBackground);
		} else if (currentShape === 'square') {
			const square = new Square(e.offsetX, e.offsetY);
			square.draw(ctxBackground);
		} else if (currentShape === 'heart') {
			const heart = new Heart(e.offsetX, e.offsetY);
			heart.draw(ctxBackground);
		} else if (currentShape === 'star') {
			const star = new Star(e.offsetX, e.offsetY);
			star.draw(ctxBackground);
		}
	}

	function handleMouseDown(e: MouseEvent, shape) {
		e.target.style.transform = 'scale(1)';
		currentShape = shape;
	}

	function handleMouseUp(e: MouseEvent) {
		e.target.style.transform = 'scale(1.05)';
		if (currentShape === 'triangle') {
			const triangle = new Triangle(50, 50);
			triangle.draw(ctxTriangle);
		} else if (currentShape === 'circle') {
			const circle = new Circle(50, 50);
			circle.draw(ctxCircle);
		} else if (currentShape === 'square') {
			const square = new Square(50, 50);
			square.draw(ctxSquare);
		} else if (currentShape === 'heart') {
			const heart = new Heart(50, 50);
			heart.draw(ctxHeart);
		} else if (currentShape === 'star') {
			const star = new Star(50, 50);
			star.draw(ctxStar);
		} else if (currentShape === 'clear') {
			const clear = new Clear(50, 50);
			clear.draw(ctxClear);
			ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
		}
	}

	function handleMouseEnter(e: MouseEvent) {
		e.target.style.transform = 'scale(1.05)';
	}

	function handleMouseLeave(e: MouseEvent) {
		e.target.style.transform = 'scale(1)';
	}

	// Lifecycle
	onMount(() => {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;

		ctxBackground = canvasBackground.getContext('2d')!;
		ctxTriangle = canvasTriangle.getContext('2d')!;
		ctxCircle = canvasCircle.getContext('2d')!;
		ctxSquare = canvasSquare.getContext('2d')!;
		ctxHeart = canvasHeart.getContext('2d')!;
		ctxStar = canvasStar.getContext('2d')!;
		ctxClear = canvasClear.getContext('2d')!;

		const triangle = new Triangle(50, 50);
		triangle.draw(ctxTriangle);

		const circle = new Circle(50, 50);
		circle.draw(ctxCircle);

		const square = new Square(50, 50);
		square.draw(ctxSquare);

		const heart = new Heart(50, 50);
		heart.draw(ctxHeart);

		const star = new Star(50, 50);
		star.draw(ctxStar);

		const clear = new Clear(50, 50);
		clear.draw(ctxClear);
	});
</script>

<svelte:window on:resize={resetDimensions} />

<canvas class="bg-black" on:click={handleClick} bind:this={canvasBackground}></canvas>
<div
	class="absolute top-0 flex h-screen w-screen flex-col items-center justify-center [&_p]:text-gray-300"
	on:click={(e) => e.target.classList.add('hidden')}
>
	<p>Click to place shapes.</p>
	<p>Click on shapes to place other shapes.</p>
	<p>X to clear.</p>
</div>
<div
	class="absolute left-0 top-0 flex h-screen flex-col justify-center gap-y-10 bg-black pl-20 pr-4"
>
	<canvas
		on:mousedown={(e) => handleMouseDown(e, 'triangle')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasTriangle}
	></canvas>
	<canvas
		on:mousedown={(e) => handleMouseDown(e, 'circle')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasCircle}
	></canvas>
	<canvas
		on:mousedown={(e) => handleMouseDown(e, 'square')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasSquare}
	></canvas>
	<canvas
		on:mousedown={(e) => handleMouseDown(e, 'heart')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasHeart}
	></canvas>
	<canvas
		on:mousedown={(e) => handleMouseDown(e, 'star')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasStar}
	></canvas>
	<canvas
		class="mt-10"
		on:mousedown={(e) => handleMouseDown(e, 'clear')}
		on:mouseup={handleMouseUp}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		width="100"
		height="100"
		bind:this={canvasClear}
	></canvas>
</div>
