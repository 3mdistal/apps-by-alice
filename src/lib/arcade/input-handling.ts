export class InputHandler {
	canvas: HTMLCanvasElement;
	currentInputs: Set<string>;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.currentInputs = new Set();
	}

	#listenKeyDown() {
		document.addEventListener('keydown', (event) => {
			if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
				this.currentInputs.add(event.key);
			}
		});
	}

	#listenKeyUp() {
		document.addEventListener('keyup', (event) => {
			if (this.currentInputs.has(event.key)) {
				this.currentInputs.delete(event.key);
			}
		});
	}

	handleInputs() {
		this.#listenKeyDown();
		this.#listenKeyUp();
		return this.currentInputs;
	}
}
