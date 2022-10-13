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

		includePageBorder: true,

		dataToggles: {
			enabled: true,
			type: true,
			number: true,
			dimensions: true,
			custom: false
		},

		customTagLabel: "",

		colorStripEnabled: false,
		colorStripColor: "#ff0000",

		debug: false
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

	setCSSVariable('--page-border', (value.includePageBorder ? "1mm" : "0"));

	setCSSVariable('--color-strip-color', value.colorStripColor);

	let contentAreaWidth = pageWidth - (2 * value.printerMarginX);
	let contentAreaHeight = pageHeight - (2 * value.printerMarginY);

	setCSSVariable('--x-scale', (pageWidth / contentAreaWidth));
	setCSSVariable('--y-scale', (pageHeight / contentAreaHeight));

	// Save the config
	localStorage.setItem("apriltag-pdf-generator-config", JSON.stringify(value));
	console.log("Saving config");
});

function setCSSVariable(name, value) {
	document.documentElement.style.setProperty(name, value);
};

export const previewScale = writable(1);

export const previewInfo = writable({
	scale: 1,
	pages: 1,
	tagsPerX: 0,
	tagsPerY: 0,
	tagsPerPage: 0,

	// Debug Info
	tagSize: 0,
	contentWidth: 0,
	contentHeight: 0,
	
});

previewInfo.subscribe(value => {
	setCSSVariable("--sim-scale", value.scale);
});

export const previewWidth = writable(1);
previewWidth.subscribe(value => {
	previewInfo.update(info => {
		info.scale=(value / (8.5 * 96));
		return info;
	});
});