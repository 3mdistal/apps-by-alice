export class Note {
	frequency: number;
	duration: number;
	gain: number;

	context: AudioContext;
	gainNode: GainNode;
	oscillator: OscillatorNode;

	constructor(
		context: AudioContext,
		oscType: OscillatorType = 'sine',
		frequency = 440,
		duration = 0.1,
		gain = 1
	) {
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

	constructor(
		context: AudioContext,
		oscType: OscillatorType,
		frequency: number,
		duration = 0,
		gain = 1,
		attackTime = 0.01,
		decayTime = 0.09,
		sustainLevel = 0,
		releaseTime = 0
	) {
		super(context, oscType, frequency, duration, gain);

		this.attackTime = attackTime;
		this.decayTime = decayTime;
		this.sustainLevel = sustainLevel;
		this.releaseTime = releaseTime;
	}

	override play() {
		let now = this.context.currentTime;

		this.gainNode.gain.setValueAtTime(0, now);

		// Schedule Attack
		this.gainNode.gain.linearRampToValueAtTime(this.gain, now + this.attackTime);

		// Schedule Decay
		this.gainNode.gain.linearRampToValueAtTime(
			this.sustainLevel * this.gain,
			now + this.attackTime + this.decayTime
		);

		// Begin Playback
		this.oscillator.start(now);

		// Schedule Release
		this.gainNode.gain.setValueAtTime(this.sustainLevel * this.gain, now + this.duration); // Ensure the gain is set to the sustain level at the end of the note's duration
		this.gainNode.gain.linearRampToValueAtTime(
			0,
			now + this.attackTime + this.decayTime + this.duration + this.releaseTime
		);

		// Schedule Stop
		this.oscillator.stop(now + this.attackTime + this.decayTime + this.duration + this.releaseTime);
	}
}
