import * as Core from "./core.js";
import * as TagManager from "./tagManager.js";

const root = document.querySelector(':root');

export function getDefaultConfig()
{
	return {
		tagType: "tagStandard41h12",
		tagDimensions: 165,
		dataToggles: {
			type: true,
			number: true,
			dimensions: true
		}
	};
}

// Add the type switching functionality
document.getElementById("type-selector").addEventListener("change", (event) => {
	Core.config.tagType = event.target.value;
	TagManager.updateCards();
});

// Add the size change functionality

let sizeSelector = document.getElementById("size-selector");
let sizeSlider = document.getElementById("size-selector-slider");

sizeSelector.addEventListener("change", (event) => {
	Core.config.tagDimensions = event.target.value;
	sizeSlider.value = event.target.value;

	root.style.setProperty("--tag-size", Core.config.tagDimensions + "mm");
	TagManager.updateCards();
});

sizeSlider.addEventListener("input", (event) => {
	Core.config.tagDimensions = event.target.value;
	sizeSelector.value = event.target.value;

	root.style.setProperty("--tag-size", Core.config.tagDimensions + "mm");
	TagManager.updateCards();
});

// Add the toggle functionality
document.getElementById("type-toggle").addEventListener("change", (event) => {
	Core.config.dataToggles.type = event.target.checked;
	TagManager.updateCards();
});

document.getElementById("index-toggle").addEventListener("change", (event) => {
	Core.config.dataToggles.number = event.target.checked;
	TagManager.updateCards();
});

document.getElementById("dimensions-toggle").addEventListener("change", (event) => {
	Core.config.dataToggles.dimensions = event.target.checked;
	TagManager.updateCards();
});

