import { writable } from 'svelte/store';

export const config = writable({
	tagType: "tagStandard41h12",
		tagDimensions: 165,
		pageMargins: 25,

		startingIndex: 0,
		tagCount: 10,


		dataToggles: {
			type: true,
			number: true,
			dimensions: true
		}
});

config.subscribe(value => {
	setCSSVariable('--true-tag-size', value.tagDimensions + "mm");
	setCSSVariable('--true-page-margin', value.pageMargins + 'mm');
});

function setCSSVariable(name, value) {
	document.documentElement.style.setProperty(name, value);
};

export const scale = writable(1);

