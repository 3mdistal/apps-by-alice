import { animate, type MotionKeyframesDefinition } from 'motion';

export function replaceSpaces(str: string, imageKit: boolean = true) {
	if (imageKit) {
		return str.replace(/\s/g, '%20');
	}
	return str.replace(/\s/g, '_');
}

export function createIntersectionObserver(element: HTMLVideoElement) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				element.play();
			} else {
				element.pause();
			}
		});
	});

	observer.observe(element);
}

export function motionTransition(
	target: HTMLElement,
	{
		animation,
		duration,
		delay = 0
	}: {
		animation: MotionKeyframesDefinition;
		duration: number;
		delay?: number;
	}
) {
	animate(target, animation, { duration, delay });

	return {
		duration: (duration + delay) * 1000
	};
}
