import { writable } from 'svelte/store';
import {pageWidth, pageHeight} from "./preview/Page.svelte";

class Config
{
	tagType= "tagStandard41h12";
	
	tagDimensions= 100;
	
	pageMargins= 25;
	
	printerMarginX= 0;
	printerMarginY= 0;
	
	startingIndex= 0;
	tagCount= 1;
	
	includePageBorder= true;
	
	dataToggles= {
		enabled: true,
		type: true,
		number: true,
		dimensions: true,
		custom: false
	};
	customTagLabel= "";
	
	colorStripEnabled= false;
	colorStripColor= "#ff0000";
	
	debug= false;
}

function loadConfig()
{
	let savedConfig = JSON.parse(localStorage.getItem("apriltag-pdf-generator-config"));
	
	savedConfig = null;
	if (savedConfig == null)
	{
		savedConfig = {};
	}

	return Object.assign(new Config(), savedConfig);
}

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
	scaleX: 0,
	scaleY: 0,

});

export const config = writable(loadConfig());

config.subscribe(value => {
	setCSSVariable('--true-tag-size', value.tagDimensions + "mm");
	setCSSVariable('--true-page-margin', value.pageMargins + 'mm');
	setCSSVariable('--printer-margin-x', value.printerMarginX + 'mm');
	setCSSVariable('--printer-margin-y', value.printerMarginY + 'mm');

	setCSSVariable('--page-border', (value.includePageBorder ? "1mm" : "0"));

	setCSSVariable('--color-strip-color', value.colorStripColor);

	let contentAreaWidth = pageWidth - (2 * value.printerMarginX);
	let contentAreaHeight = pageHeight - (2 * value.printerMarginY);

	setCSSVariable('--x-scale', Math.max(pageWidth / contentAreaWidth, 0));
	setCSSVariable('--y-scale', Math.max(pageHeight / contentAreaHeight, 0));

	previewInfo.update(info => {
		info.scaleX = (pageWidth / contentAreaWidth);
		info.scaleY = (pageHeight / contentAreaHeight);
		return info;
	});

	// Save the config
	localStorage.setItem("apriltag-pdf-generator-config", JSON.stringify(value));
	console.log("Saving config");
});

function setCSSVariable(name, value) {
	document.documentElement.style.setProperty(name, value);
};

export const previewScale = writable(1);

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

export function resetConfig()
{
	config.set(new Config());
}