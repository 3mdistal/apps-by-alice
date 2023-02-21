<script>
	import { state } from "../../stores";
	import gsap from "gsap";

	export let background;
	export let name;
	export let transitionOutWrapper;

	let section;
	let hover = true;

	function easeDown() {
		gsap.to(section, { y: 0, ease: "elastic.out", duration: 2 });
	}

	function animateOut() {
		gsap.to(section, {
			y: "-50vh",
			delay: 0.25,
			ease: "power4.in",
			duration: 0.75,
		});
	}

	function handleMouseEnter(e) {
		if (hover) {
			gsap.to(e.target, { y: -30, ease: "elastic", duration: 2 });
		}
	}

	function handleMouseLeave(e) {
		if (hover) {
			easeDown();
		}
	}

	function setState() {
		state.set(name);
		hover = false;
		easeDown();
		animateOut();
		transitionOutWrapper();
	}
</script>

<a
	data-sveltekit-preload-code="hover"
	href="{name}"
	name="{name}"
	class="homepage-section h-[100%] absolute bottom-0 w-[100%] {name} hover:saturate-150 hover:brightness-95 hover:hue-rotate-[5deg] focus:saturate-[175%] focus:brightness-[85%] focus:hue-rotate-[10deg]"
	style:background="{background}"
	bind:this="{section}"
	on:mouseenter="{handleMouseEnter}"
	on:mouseleave="{handleMouseLeave}"
	on:click="{setState}"
>
	{#if $state === "home" || name}
		<div class="homepage-section-menu-link {name} absolute">
			<h1>{name}</h1>
		</div>
	{/if}
</a>

<style lang="scss">
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
