<div class="pong-loader">
	<svg viewBox="0 0 170 100" xmlns="http://www.w3.org/2000/svg">
		<rect
			class="left-paddle fill-black dark:fill-white"
			x="10"
			y="40"
			width="3"
			height="20"
			rx="1.5"
			ry="1.5"
		/>
		<rect
			class="right-paddle fill-black dark:fill-white"
			x="157"
			y="40"
			width="3"
			height="20"
			rx="1.5"
			ry="1.5"
		/>
		<circle class="ball fill-black dark:fill-white" cx="85" cy="50" r="2" />
	</svg>
</div>

<style>
	.pong-loader {
		width: 100%;
		height: calc(10 / 17 * 100%);
		background-color: transparent;
	}

	@keyframes moveBall {
		0%,
		100% {
			transform: translate(-72px, 0);
		}
		12.5% {
			transform: translate(-34px, -17px);
		}
		25% {
			transform: translate(0px, 0);
		}
		37.5% {
			transform: translate(34px, 17px);
		}
		50% {
			transform: translate(72px, 0);
		}
		62.5% {
			transform: translate(34px, -17px);
		}
		75% {
			transform: translate(0px, 0);
		}
		87.5% {
			transform: translate(-34px, 17px);
		}
	}

	@keyframes movePaddle {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(40px);
		}
	}

	.ball {
		animation: moveBall 2s linear infinite;
	}

	.left-paddle,
	.right-paddle {
		animation: movePaddle 2s ease-in-out infinite;
	}

	.right-paddle {
		animation-delay: -1s;
	}
</style>
