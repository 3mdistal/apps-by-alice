export const inputs = {
	ArrowUp: 'Up',
	w: 'Up',
	ArrowLeft: 'Left',
	a: 'Left',
	ArrowDown: 'Down',
	s: 'Down',
	ArrowRight: 'Right',
	d: 'Right',
	' ': 'Jump',
	z: 'Jump'
};

export class InputHandler {
	canvas: HTMLCanvasElement;
	possibleInputs: { [key: string]: string };
	currentInputs: Set<string>;
	jumpTimeout: boolean;

	constructor(canvas: HTMLCanvasElement, possibleInputs: { [key: string]: string } = inputs) {
		this.canvas = canvas;
		this.currentInputs = new Set();
		this.possibleInputs = possibleInputs;
		this.jumpTimeout = false;

		this.#listenKeyDown();
		this.#listenKeyUp();
	}

	#listenKeyDown() {
		document.addEventListener('keydown', (event) => {
			const action = this.possibleInputs[event.key];
			if (!action) return;
			this.currentInputs.add(action);
		});
	}

	#listenKeyUp() {
		document.addEventListener('keyup', (event) => {
			const action = this.possibleInputs[event.key];
			if (action && this.currentInputs.has(action)) {
				this.currentInputs.delete(action);
			}
		});
	}

	handleInputs() {
		return this.currentInputs;
	}
}
