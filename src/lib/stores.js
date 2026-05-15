import { writable } from 'svelte/store';
import {pageWidth, pageHeight} from "./preview/Page.svelte";

class Config
{
	tagType= "tagStandard41h12";
	
	tagDimensions= 100;

	pageWidth = 215.9; 
    pageHeight = 279.4;
	pageMargins = 25;
	
	printerMarginX = 0;
	printerMarginY = 0;
	
	startingIndex = 0;
	tagCount = 1;
	
	includePageBorder = true;
	
	dataToggles = {
		enabled: true,
		type: true,
		number: true,
		dimensions: true,
		custom: false
	};
	customTagLabel = "";
	
	colorStripEnabled = false;
	colorStripColor = "#ff0000";
	
	debug= false;
}

function loadConfig()
{
	let savedConfig = JSON.parse(localStorage.getItem("apriltag-pdf-generator-config"));
	
	//savedConfig = null;
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
    setCSSVariable('--page-width', value.pageWidth + "mm");
    setCSSVariable('--page-height', value.pageHeight + "mm");
    setCSSVariable('--page-aspect-ratio', value.pageWidth / value.pageHeight);

	setCSSVariable('--true-tag-size', value.tagDimensions + "mm");
	setCSSVariable('--true-page-margin', value.pageMargins + 'mm');
	setCSSVariable('--printer-margin-x', value.printerMarginX + 'mm');
	setCSSVariable('--printer-margin-y', value.printerMarginY + 'mm');

	setCSSVariable('--page-border', (value.includePageBorder ? "1mm" : "0"));

	setCSSVariable('--color-strip-color', value.colorStripColor);

	let contentAreaWidth = value.pageWidth - (2 * value.printerMarginX);
    let contentAreaHeight = value.pageHeight - (2 * value.printerMarginY);

	setCSSVariable('--x-scale', Math.max(value.pageWidth / contentAreaWidth, 0));
    setCSSVariable('--y-scale', Math.max(value.pageHeight / contentAreaHeight, 0));

	previewInfo.update(info => {
        info.scaleX = (value.pageWidth / contentAreaWidth);
        info.scaleY = (value.pageHeight / contentAreaHeight);
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
        const screenDpi = 96; 
        const mmToPx = screenDpi / 25.4;
		const actualPageWidthPx = pageWidth * mmToPx;

            if (value < actualPageWidthPx) {
                info.scale = value / actualPageWidthPx;
            } else {
                info.scale = 1.0; // Stay "true size" if there is enough room
            }
		return info;
	});
});

export function resetConfig()
{
	config.set(new Config());
}