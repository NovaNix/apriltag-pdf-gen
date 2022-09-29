import * as Core from "./core.js"
import * as PageSimulator from "./pageSimulator.js"

const tagTemplate = document.getElementById("tag-template");

const cards = [];

// Contains the tag prefix and other info for each tag type
const tagDataDict = {
	"tag16h5": {
		tagPrefix: "tag16_05_",
	},

	"tag25h9": {
		tagPrefix: "tag25_09_",
	},

	"tag36h11": {
		tagPrefix: "tag36_11_",
	},

	"tagCircle21h7": {
		tagPrefix: "tag21_07_",
	}, 

	"tagCircle49h12": {
		tagPrefix: "tag49_12_",
	},
	
	"tagCustom48h12": {
		tagPrefix: "tag48_12_",
	},

	"tagStandard41h12": {
		tagPrefix: "tag41_12_"
	},

	"tagStandard52h13": {
		tagPrefix: "tag52_13_"
	}

};

export function createCards(startIndex, amount, config)
{
	for (let i = startIndex; i < startIndex + amount; i++)
	{
		createCard(i, config, false);
	}

	PageSimulator.showTags(cards); // Add the cards to the page
}

// Creates a new card with the specified index and config
export function createCard(index, config, redraw)
{
	let card = tagTemplate.content.firstElementChild.cloneNode(true);
	cards.push(card);
	card.setAttribute("index", index);

	populateCard(card, config)

	if (redraw == true)
	{
		PageSimulator.showTags(cards); // Add the cards to the page
	}

	return card;
}

export function updateCards()
{
	for (let card of cards)
	{
		populateCard(card, Core.config);
	}

	PageSimulator.showTags(cards); // Add the cards to the page
}

export function clearCards()
{
	cards = [];

	PageSimulator.showTags(cards); // Clear the cards on the page
}

function populateCard(card, config)
{
	let index = card.getAttribute("index");
	let fileName = tagDataDict[config.tagType].tagPrefix + String(index).padStart(5, "0") + ".png";

	let imagePath = Core.imageRepo + config.tagType + "/" + fileName + "?raw=true";

	card.getElementsByClassName("tag-img")[0].src = imagePath;

	let typeText = "";
	if (config.dataToggles.type)
	{
		typeText = config.tagType;
	}

	if (config.dataToggles.number)
	{
		if (typeText.length > 0)
		{
			typeText += ": ";
		}

		typeText += "#" + index;
	}

	let tagType = card.getElementsByClassName("tag-type")[0];

	if (typeText.length != 0)
	{
		tagType.innerText = typeText;
		tagType.style.display = "block";
	}

	else
	{
		tagType.style.display = "none";
	}

	let tagDimensions = card.getElementsByClassName("tag-dimensions")[0];

	if (config.dataToggles.dimensions)
	{
		tagDimensions.innerText = config.tagDimensions + "mm x " + config.tagDimensions + "mm";
		tagDimensions.style.display = "block";
	}

	else
	{
		tagDimensions.style.display = "none";
	}

	let tagMetaData = card.getElementsByClassName("tag-meta")[0];

	if (tagType.style.display == "block" || tagDimensions.style.display == "block")
	{
		tagMetaData.style.display = "block";
	}

	else
	{
		tagMetaData.style.display = "none";
	}

}