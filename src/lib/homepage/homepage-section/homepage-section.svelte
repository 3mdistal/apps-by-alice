<script>
	import { fade } from "svelte/transition";
	import { state } from "../../stores";
	import gsap from "gsap";

	export let color;
	export let name;
	export let moveWrapperUp;

	let section;

	function animateOut(e) {
		gsap.to(e.target, { y: 0, ease: "elastic.out", duration: 1 })
	}

	function afterTimeout() {
		window.location.href = `${name}`;
	}

	function handleClickSection(e) {
		animateOut(e);
		section.blur();
		state.set(name);
		setTimeout(afterTimeout, 1000);
		moveWrapperUp();
	}

	function handleKeyDown(e) {
		switch (e.keyCode) {
			case 13:
			case 32:
				animateOut(e);
				state.set(name);
				setTimeout(afterTimeout, 1000);
				break;
			default:
				break;
		}
	}

	function handleMouseEnter(e) {
		gsap.to(e.target, { y: -30, ease: "elastic", duration: 2 });
	}

	function handleMouseLeave(e) {
		animateOut(e);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="homepage-section {name} {$state == 'home' ? 'hover-color' : ''}"
	style="background:{color};"
	bind:this="{section}"
	on:click="{handleClickSection}"
	on:mouseenter="{handleMouseEnter}"
	on:mouseleave="{handleMouseLeave}"
	on:keydown="{handleKeyDown}"
	tabindex="0"
	role="navigation"
	aria-label="{name}"
	out:fade
	in:fade|local="{{ delay: 250 }}"
>
	{#if $state == "home"}
		<div
			class="homepage-section-menu-link {name}"
			in:fade="{{ delay: 250 }}"
			out:fade
		>
			<h1>{name}</h1>
		</div>
	{/if}
</div>

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
