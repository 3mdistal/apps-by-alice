<script lang="ts">
	import { onMount } from 'svelte';
	import { Triangle, Circle, Square, Heart, Star, Clear } from '$lib/arcade/shapes';
	import { ADSR } from '$lib/arcade/notes';

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

	const canvases = [
		canvasTriangle,
		canvasCircle,
		canvasSquare,
		canvasHeart,
		canvasStar,
		canvasClear
	];

	const contexts = [ctxTriangle, ctxCircle, ctxSquare, ctxHeart, ctxStar, ctxClear];
	const shapes = [Triangle, Circle, Square, Heart, Star, Clear];
	const shapesString = ['triangle', 'circle', 'square', 'heart', 'star', 'clear'];

	// Event Handlers
	function resetDimensions() {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;
	}

	function handleClick(e: MouseEvent) {
		const size = checkWindowWidth() === 'mobile' ? 50 : 100;

		shapesString.forEach((shape) => {
			if (currentShape !== shape || currentShape === 'clear') return;

			const shapeClass = shapes[shapesString.indexOf(shape)];

			if (!shapeClass) return;

			const shapeInstance = new shapeClass(
				e.offsetX,
				e.offsetY,
				size,
				`hsl(${Math.random() * 360}, 50%, 50%)`
			);
			shapeInstance.draw(ctxBackground);
		});
	}

	let currentShape = shapesString[0];

	const audioContext = new AudioContext();

	function getFrequency(referenceFreq: number, stepsFromReference: number) {
		const a = Math.pow(2, 1 / 12); // twelfth root of 2
		return referenceFreq * Math.pow(a, stepsFromReference);
	}

	function playNote(keyMultiplier: number) {
		const frequencies = [
			440,
			getFrequency(440, 2),
			getFrequency(440, 4),
			getFrequency(440, 5),
			getFrequency(440, 7),
			getFrequency(440, -12)
		];

		shapesString.forEach((shape, index) => {
			const frequency = frequencies[index];

			if (currentShape !== shape || !frequency) return;

			const soundEffect = new ADSR(audioContext, 'sine', frequency * keyMultiplier, 0, 0.5, 0.005);
			soundEffect.play();
		});
	}

	function handleMouseDown(e: MouseEvent, shape: string) {
		const canvas = e.target as HTMLCanvasElement;
		canvas.style.transform = 'scale(1)';

		// Set State
		currentShape = shape;

		playNote(0.63);
	}

	function handleMouseUp(e: MouseEvent) {
		const canvas = e.target as HTMLCanvasElement;
		canvas.style.transform = 'scale(1.05)';

		// Draw shape on sidebar
		shapesString.forEach((shape, index) => {
			if (currentShape !== shape) return;

			const shapeClass = shapes[index];
			const context = contexts[index];
			const currentCanvas = canvases[index];

			if (!shapeClass || !context || !currentCanvas) return;

			const shapeInstance = new shapeClass(
				currentCanvas.width / 2,
				currentCanvas.height / 2,
				checkWindowWidth() === 'mobile' ? 50 : 100,
				currentShape !== shapesString[5] ? `hsl(0, 0%, 80%)` : `hsl(0, 50%, 50%)`
			);
			shapeInstance.draw(context);

			// Clear background canvas
			if (currentShape !== shapesString[5]) return;

			ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
		});
	}

	function handleMouseEnter(e: MouseEvent) {
		const canvas = e.target as HTMLCanvasElement;
		canvas.style.transform = 'scale(1.05)';
	}

	function handleMouseLeave(e: MouseEvent) {
		const canvas = e.target as HTMLCanvasElement;
		canvas.style.transform = 'scale(1)';
	}

	function initializeSidebar(contexts: CanvasRenderingContext2D[]) {
		shapes.forEach((shape, index) => {
			const currentCanvas = canvases[index];
			const context = contexts[index];

			if (!currentCanvas || !context) return;

			const shapeInstance = new shape(
				currentCanvas.width / 2,
				currentCanvas.height / 2,
				checkWindowWidth() === 'mobile' ? 50 : 100,
				currentCanvas !== canvases[5] ? `hsl(0, 0%, 80%)` : `hsl(0, 50%, 50%)`
			);
			shapeInstance.draw(context);
		});
	}

	function checkWindowWidth() {
		if (window.innerWidth < 768) {
			return 'mobile';
		} else {
			return 'desktop';
		}
	}

	function scale(e: HTMLCanvasElement) {
		if (window.innerWidth < 768) {
			e.width = 50;
			e.height = 50;
		}
	}

	// Lifecycle
	onMount(() => {
		// Initialize Background Canvas
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;
		ctxBackground = canvasBackground.getContext('2d')!;

		// Initialize Sidebar Canvases
		canvases.forEach((canvas, index) => {
			contexts[index] = canvas.getContext('2d')!;
		});

		initializeSidebar(contexts);
	});
</script>

<svelte:window on:resize={resetDimensions} />

<canvas class="bg-black" on:click={handleClick} bind:this={canvasBackground}></canvas>

<div
	class="absolute left-0 top-0 flex h-screen flex-col justify-center gap-y-10 bg-[#222222] px-4 md:px-8"
>
	{#each canvases as canvas}
		<canvas
			bind:this={canvas}
			class="cursor-pointer last:mt-20"
			on:mousedown={(e) => handleMouseDown(e, shapesString[canvases.indexOf(canvas)])}
			on:mouseup={handleMouseUp}
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
			use:scale
			width="100"
			height="100"
		></canvas>
	{/each}
</div>
