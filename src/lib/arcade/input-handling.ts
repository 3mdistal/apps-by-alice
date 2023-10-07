import type { MovingShape } from "./shapes";

export class InputHandler {
    canvas: HTMLCanvasElement;
    character: MovingShape;

    constructor(canvas: HTMLCanvasElement, character: MovingShape) {
        this.canvas = canvas;
        this.character = character;
    }

    // Need to log currently pressed keys into an array and then check if the key is in the array

    listen() {
        // Add event listener for arrow key input
        this.character.moving = true;
        this.character.move();
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowLeft": // Left arrow key
                    this.character.dx = -3;
                    break;
                case "ArrowUp": // Up arrow key
                    this.character.dy = -3;
                    break;
                case "ArrowRight": // Right arrow key
                    this.character.dx = 3;
                    break;
                case "ArrowDown": // Down arrow key
                    this.character.dy = 3;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
                this.character.dx = 0;
                this.character.dy = 0;
                // this.character.moving = false;
            }
        });
    }

}