<script>
	import {config} from '../stores.js';
	import Page from './Page.svelte';

	const pageWidth = 215.9; // The width of a page in mm
	const pageHeight = 279.4; // The height of a page in mm

	//$: range = 

	let pageData = [
		{
			start: 0,
			length: 0
		}
	]; // An array containing objects that specify the range of tags to print on each page

	// Updates each page to have their correct tags
	function updatePages()
	{
		pageData = [];

		let contentWidth = (pageWidth) - ($config.pageMargins * 2);
		let contentHeight = (pageHeight) - ($config.pageMargins * 2);

		let tagBlockSize = $config.tagDimensions + (2 * ($config.tagDimensions / 10)); // The size of a tag block, including the padding (padding is size/10 on each side)

		let tagsPerX = Math.floor(contentWidth / tagBlockSize);
		let tagsPerY = Math.floor(contentHeight / tagBlockSize);

		console.log(`Tag Size: ${tagBlockSize}`);
		console.log(`True page width: ${pageWidth}`)
		console.log(`Tags per x: ${tagsPerX} (page width: ${contentWidth}`);
		console.log(`Tags per y: ${tagsPerY} (page height: ${contentHeight})`);

		let tagsPerPage = tagsPerX * tagsPerY;
		//let pagesNeeded = Math.ceil($config.tagCount / tagsPerPage);

		if (tagsPerPage == 0)
		{
			pageData.push({
				start: 0,
				length: 0
			});

			return;
		}

		let tagsAdded = 0;
		let tagsRemaining = $config.tagCount;
		
		while (tagsRemaining > 0)
		{
			let length = 0;

			if (tagsRemaining >= tagsPerPage)
			{
				length = tagsPerPage;
				tagsRemaining -= tagsPerPage;
			}

			else
			{
				length = tagsRemaining;
				tagsRemaining = 0;
			}

			let page = {
				start: tagsAdded + $config.startingIndex,
				length: length
			};

			pageData.push(page);
		}
		
	}

	config.subscribe(()=> {
		updatePages();
	});

</script>

<main id="pages">
	{#each pageData as page}
		<Page {...page}/>
	{/each}
	
</main>