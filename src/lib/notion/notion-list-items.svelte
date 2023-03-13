<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount, tick } from 'svelte';
	import TextMacro from './text-macro.svelte';

	let listItem: HTMLLIElement;
	export let ordered: boolean;
	export let listContent: NumberedListItemBlockObjectResponse;

	const moveListItem = async () => {
		await tick();
		if (!listItem.previousSibling) return;
		if (listItem.previousSibling.nodeName === 'OL' || listItem.previousSibling.nodeName === 'UL') {
			listItem.previousSibling.appendChild(listItem);
		} else {
			if (!listItem.parentNode) return;
			if (ordered === true) {
				const list = document.createElement('ol');
				listItem.parentNode.insertBefore(list, listItem);
				list.appendChild(listItem);
			} else {
				const list = document.createElement('ul');
				listItem.parentNode.insertBefore(list, listItem);
				list.appendChild(listItem);
			}
		}
	};

	onMount(() => {
		setTimeout(moveListItem, 1000);
	});
</script>

<li bind:this={listItem}><TextMacro type={listContent} /></li>
