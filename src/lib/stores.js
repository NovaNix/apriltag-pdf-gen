import { writable } from 'svelte/store';
import {pageWidth, pageHeight} from "./preview/Page.svelte";

const defaultConfig = {
	tagType: "tagStandard41h12",
		tagDimensions: 100,
		pageMargins: 25,
		printerMarginX: 0,
		printerMarginY: 0,

		startingIndex: 0,
		tagCount: 1,

		dataToggles: {
			type: true,
			number: true,
			dimensions: true
		}
}

let savedConfig = JSON.parse(localStorage.getItem("apriltag-pdf-generator-config"));

if (savedConfig == null)
{
	savedConfig = {...defaultConfig};
}

export const config = writable(savedConfig);

config.subscribe(value => {
	setCSSVariable('--true-tag-size', value.tagDimensions + "mm");
	setCSSVariable('--true-page-margin', value.pageMargins + 'mm');
	setCSSVariable('--printer-margin-x', value.printerMarginX + 'mm');
	setCSSVariable('--printer-margin-y', value.printerMarginY + 'mm');

	let contentAreaWidth = pageWidth - (2 * value.printerMarginX);
	let contentAreaHeight = pageHeight - (2 * value.printerMarginY);

	setCSSVariable('--scale-x', (pageWidth / contentAreaWidth));
	setCSSVariable('--scale-y', (pageHeight / contentAreaHeight));

	// Save the config
	localStorage.setItem("apriltag-pdf-generator-config", JSON.stringify(value));
	console.log("Saving config");
});

function setCSSVariable(name, value) {
	document.documentElement.style.setProperty(name, value);
};

export const previewScale = writable(1);
previewScale.subscribe(value => {
	setCSSVariable("--sim-scale", value);
});

export const previewWidth = writable(1);
previewWidth.subscribe(value => {
	previewScale.set(value / (8.5 * 96));
});
