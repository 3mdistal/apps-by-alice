<script lang="ts">
	import { onMount } from 'svelte';
	import { MovingCircle } from '$lib/arcade/shapes';
	import { InputHandler } from '$lib/arcade/input-handling';

	let backgroundCanvas: HTMLCanvasElement;

	let ctxBackground: CanvasRenderingContext2D;

	const circle = new MovingCircle(100, 100, 50, 'white');

	let inputHandler: InputHandler;

	let lastTimeStamp = 0;

	function animate(timeStamp: number) {
		const deltaTime = timeStamp - lastTimeStamp;
		lastTimeStamp = timeStamp;

		ctxBackground.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

		circle.draw(ctxBackground);
		circle.move(inputHandler, deltaTime);

		requestAnimationFrame(animate);
	}

	onMount(() => {
		ctxBackground = backgroundCanvas.getContext('2d')!;

		backgroundCanvas.width = window.innerWidth;
		backgroundCanvas.height = window.innerHeight;

		inputHandler = new InputHandler(backgroundCanvas);

		animate(0);
	});
</script>

<div class="h-screen w-screen bg-black">
	<canvas bind:this={backgroundCanvas}></canvas>
</div>
