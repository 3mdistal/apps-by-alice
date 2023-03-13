export function subAndSuper(context: HTMLElement) {
	const content = Array.from(context.querySelectorAll('p, h1, h2, h3, li'));
	const superscript = /\{super:([^}]*)\}/g;
	const subscript = /\{sub:([^}]*)\}/g;
	content.forEach((e) => {
		e.innerHTML = e.innerHTML
			.replace(superscript, '<sup>$1</sup>')
			.replace(subscript, '<sub>$1</sub>');
	});
}

export function wrapLists(context: HTMLElement) {
	// Select all list items
	const liArray = Array.from(context.querySelectorAll('li'));

	const firstSiblings: HTMLLIElement[] = [];

	// Loop through all list items to get first sibling of new group
	liArray.forEach((li) => {
		if (
			li.previousElementSibling?.tagName !== 'LI' ||
			li.className !== li.previousElementSibling?.className
		) {
			firstSiblings.push(li);
		}
	});

	// Loop over each first sibling to create new parent for group
	firstSiblings.forEach((fs) => {
		const newParent = document.createElement(fs.classList.contains('ordered') ? 'ol' : 'ul');
		fs.parentNode!.insertBefore(newParent, fs);
		// Loop over parent siblings until they're not <li>
		for (
			let i = newParent.nextElementSibling;
			i && i.tagName && i.tagName === 'LI';
			i = newParent.nextElementSibling
		) {
			newParent.appendChild(i);
		}
	});
}

export function createTOC() {
	const headerTwos = Array.from(document.querySelectorAll('h2'));
	const ol = document.createElement('ol');
	ol.className = 'toc';
	for (let i = 1; i <= headerTwos.length; i++) {
		const headerTwo: HTMLHeadingElement = headerTwos[i - 1]!;
		headerTwo.id = i.toString();
		const TOCItem = document.createElement('li');
		const TOCLink = document.createElement('a');
		TOCLink.innerText = headerTwo.innerText;
		TOCLink.href = `#${i}`;
		TOCItem.appendChild(TOCLink);
		ol.appendChild(TOCItem);
	}
	headerTwos[0]?.parentElement?.insertBefore(ol, headerTwos[0]);
}
