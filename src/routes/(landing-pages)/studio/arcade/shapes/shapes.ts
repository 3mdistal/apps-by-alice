class Shape {
    x: number;
    y: number;
    size: number;
    color: string;

    constructor(x: number, y: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

class SVGToImage extends Shape {
    svg: SVGElement;
    paths: Array<SVGPathElement>;
    image: HTMLImageElement;
    isLoaded: boolean;

    constructor(x: number, y: number, size: number, color: string, viewBox: string, paths: Array<string>) {
        super(x, y, size, color)
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

        this.paths.forEach((path) => {
            path.setAttribute('fill', this.color);
        });
    
        this.serialize();
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

export class Triangle extends Shape {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color);
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

export class Circle extends Shape {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class Square extends Shape {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.fill();
    }
}

export class Heart extends SVGToImage {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color, '0 0 30 30', [
            'M15 6.152C18.158.284 24.474.284 27.632 3.218s3.158 8.801 0 14.668c-2.211 4.4-7.895 8.801-12.632 11.734-4.737-2.933-10.421-7.334-12.632-11.734-3.157-5.867-3.157-11.734 0-14.668S11.842.284 15 6.152z'
        ]);
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

export class Star extends SVGToImage {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color, '0, 0, 30, 30', [
            'M14.993 0l3.538 11.438h11.452l-9.264 7.068 3.538 11.438-9.264-7.069-9.265 7.069 3.539-11.438-9.265-7.068h11.452L14.993 0z'
        ]);
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

export class Clear extends SVGToImage {

    constructor(x: number, y: number, size: number, color: string) {
        super(x, y, size, color, '0, 0, 30, 30', [
            'M11.578,13.974l-9.359,-11.461l7.166,-0l5.802,7.282l5.909,-7.282l7.38,-0l-9.626,11.461l11.15,13.513l-7.166,0l-7.647,-9.333l-7.834,9.333l-7.353,0l11.578,-13.513Z'
        ]);
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

export class Note {
    frequency: number;
    duration: number;
    gain: number;

    context: AudioContext;
    gainNode: GainNode;
    oscillator: OscillatorNode;

    constructor(context: AudioContext, oscType: OscillatorType = 'sine', frequency = 440, duration = .1, gain = 1) {
        this.frequency = frequency;
        this.duration = duration;

        this.context = context;

        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.context.destination);
        this.gain = gain;
        this.gainNode.gain.value = gain;

        this.oscillator = this.context.createOscillator();
        this.oscillator.connect(this.gainNode);
        this.oscillator.type = oscType;
        this.oscillator.frequency.value = frequency;
    }

    play() {
        let now = this.context.currentTime;

        this.oscillator.start(now);
        this.oscillator.stop(now + this.duration);
    }
}

export class ADSR extends Note {
    attackTime: number;
    decayTime: number;
    sustainLevel: number;
    releaseTime: number;

    constructor(context: AudioContext, oscType: OscillatorType, frequency: number, duration = 0, gain = 1, attackTime = .01, decayTime = .09, sustainLevel = 0, releaseTime = 0) {
        super(context, oscType, frequency, duration, gain);

        this.attackTime = attackTime;
        this.decayTime = decayTime;
        this.sustainLevel = sustainLevel;
        this.releaseTime = releaseTime;
    }
    
    override play () {

        let now = this.context.currentTime

        this.gainNode.gain.setValueAtTime(0, now);

        // Schedule Attack
        this.gainNode.gain.linearRampToValueAtTime(this.gain, now + this.attackTime);
        
        // Schedule Decay
        this.gainNode.gain.linearRampToValueAtTime(this.sustainLevel * this.gain, now + this.attackTime + this.decayTime);
        
        // Begin Playback
        this.oscillator.start(now);

        // Schedule Release
        this.gainNode.gain.setValueAtTime(this.sustainLevel * this.gain, now + this.duration);  // Ensure the gain is set to the sustain level at the end of the note's duration
        this.gainNode.gain.linearRampToValueAtTime(0, now + this.attackTime + this.decayTime + this.duration + this.releaseTime);

        // Schedule Stop
        this.oscillator.stop(now + this.attackTime + this.decayTime + this.duration + this.releaseTime);
    }
}