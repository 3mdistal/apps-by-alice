export async function loadScrollTrigger() {
	const module = await import('gsap/dist/ScrollTrigger');
	const { ScrollTrigger } = module;
	return ScrollTrigger;
}
