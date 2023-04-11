export function getCookie(name) {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();
	document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}

export function removeCookie(name) {
	setCookie(name, '', -1);
}

export function loadGoogleAnalytics() {
	if (getCookie('analytics_consent') === 'true') {
		const gaScript = document.createElement('script');
		gaScript.async = true;
		gaScript.src = 'https://www.google-analytics.com/analytics.js';
		document.head.appendChild(gaScript);

		gaScript.onload = () => {
			window.ga =
				window.ga ||
				function () {
					(ga.q = ga.q || []).push(arguments);
				};
			ga.l = +new Date();

			ga('create', 'G-PDT964J1J3', 'auto');
			ga('send', 'pageview');
		};
	}
}
