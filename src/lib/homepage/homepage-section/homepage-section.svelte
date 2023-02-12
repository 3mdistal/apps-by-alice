<script>
	import { state } from "../../stores";
	import gsap from "gsap";

	export let color;
	export let name;
	export let transitionOutWrapper;

	let section;
	let hover = true;

	function animateOut() {
		gsap.to(section, { y: 0, ease: "elastic.out", duration: 2 });
	}

	function animateOut2() {
		gsap.to(section, { y: "-50vh", delay: .25, ease: "power4.in", duration: .75})
	}
	
	function delay() {
		let duration = 1500;
		return {
			duration,
		};
	}

	function handleMouseEnter(e) {
		if (hover) {
			gsap.to(e.target, { y: -30, ease: "elastic", duration: 2 });
		}
	}

	function handleMouseLeave(e) {
		if (hover) {
			animateOut(e);
		}
	}

	function setState() {
		state.set(name);
		hover = false;
		animateOut()
		animateOut2()
		transitionOutWrapper()
	}
</script>

	<a
		href="{name}"
		data-sveltekit-prefetch
		class="homepage-section {name} {$state == 'home' ? 'hover-color' : ''}"
		style="background:{color};"
		bind:this="{section}"
		on:mouseenter="{handleMouseEnter}"
		on:mouseleave="{handleMouseLeave}"
		on:click="{setState}"
		aria-label="{name}"
		out:delay
	>
		{#if $state === "home" || name}
			<div class="homepage-section-menu-link {name}">
				<h1>{name}</h1>
			</div>
		{/if}
	</a>

<style lang="scss">
	.hover-color {
		&:hover {
			filter: saturate(150%) brightness(95%) hue-rotate(5deg);
			cursor: pointer;
		}

		&:focus {
			filter: saturate(175%) brightness(85%) hue-rotate(10deg);
		}
	}

	.homepage-section {
		height: 100%;
		position: absolute;
		bottom: 0%;
		width: 100%;
		opacity: 100%;

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
		pointer-events: none;
		transition: 0.5s;

		&.about {
			top: 15%;
			left: 33%;
		}

		&.studio {
			right: 18%;
			top: 8%;
		}

		&.commissions {
			right: 32%;
			top: 9%;
		}

		&.blog {
			right: 20%;
			top: 22%;

			& h1 {
				color: #fafafa;
			}
		}

		&.connect {
			left: 27%;
			top: 12%;
		}
	}

	@media screen and (max-width: 45rem) {
		.homepage-wrapper {
			margin-top: 6%;
		}

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
				right: 20%;
			}

			&.blog {
				top: 12%;
			}

			&.connect {
				left: 23%;
			}
		}
	}
</style>
