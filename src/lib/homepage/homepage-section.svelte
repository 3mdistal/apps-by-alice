<script lang="ts">
	import { state } from '$lib/stores';
	import gsap from 'gsap';
	import { goto } from '$app/navigation';

	export let background: string;
	export let name: string;
	export let transitionOutWrapper: () => void;

	let section: HTMLAnchorElement;
	let hover = true;

	function ease(yPos: number) {
		gsap.to(section, { y: yPos, ease: 'elastic.out', duration: 2 });
	}

	function animateOut() {
		const tl = gsap.timeline({ onComplete: navigate });
		tl.to(section, {
			y: '-50vh',
			delay: 0.25,
			ease: 'power4.in',
			duration: 0.75
		});
		tl.to(
			document.body,
			{
				backgroundColor: background,
				delay: 0.25
			},
			'<'
		);
	}

	function handleMouseEnter() {
		if (hover) {
			ease(-30);
		}
	}

	function handleMouseLeave() {
		if (hover) {
			ease(0);
		}
	}

	function navigate() {
		goto(name);
	}

	function handleClick() {
		state.set(name);
		hover = false;
		ease(0);
		animateOut();
		transitionOutWrapper();
	}
</script>

<a
	href={name}
	title={name}
	class="homepage-section {name}"
	style:background
	bind:this={section}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:mousedown={handleClick}
	on:click|preventDefault
>
	<div class="homepage-section-menu-link {name}">
		<h2>{name}</h2>
	</div>
</a>

<style>
	.homepage-section {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.homepage-section:hover {
		filter: brightness(0.95) hue-rotate(5deg) saturate(1.5);
	}

	.homepage-section:focus {
		filter: brightness(0.85) hue-rotate(10deg) saturate(1.75);
	}

	.homepage-section-menu-link h2 {
		font-weight: 300;
		font-size: 1.125rem;
	}

	.homepage-section {
		&.about {
			clip-path: url(#about-path);
		}

		&.studio {
			clip-path: url(#studio-path);
		}

		&.commissions {
			clip-path: url(#commissions-path);
			height: 82%;
		}

		&.blog {
			clip-path: url(#blog-path);
			height: 75%;
		}

		&.connect {
			clip-path: url(#connect-path);
			height: 50%;
		}
	}

	.homepage-section-menu-link {
		position: absolute;

		&.about {
			top: 15%;
			left: 33%;
		}

		&.studio {
			top: 8%;
			right: 18%;
		}

		&.commissions {
			top: 9%;
			right: 32%;
		}

		&.blog {
			top: 22%;
			right: 20%;

			& h2 {
				color: #fafafa;
			}
		}

		&.connect {
			top: 12%;
			left: 27%;
		}
	}

	@media screen and (max-width: 1024px) {
		.homepage-section {
			&.studio {
				clip-path: url(#studio-path-mobile);
				height: 90%;
			}

			&.commissions {
				clip-path: url(#commissions-path-mobile);
				height: 78%;
			}

			&.blog {
				clip-path: url(#blog-path-mobile);
				height: 68%;
			}

			&.connect {
				height: 55%;
			}
		}

		.homepage-section-menu-link {
			&.about {
				top: 10%;
			}

			&.studio {
				top: 6%;
				right: 14%;
			}

			&.commissions {
				right: 25%;
			}

			&.blog {
				top: 12%;
			}

			&.connect {
				left: 23%;
			}
		}
	}

	@media (min-width: 768px) {
		.homepage-section-menu-link h2 {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.homepage-section-menu-link h2 {
			font-size: 1.875rem;
		}
	}
</style>
