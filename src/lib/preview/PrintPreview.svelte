<script>
	import {config, previewInfo, previewWidth} from '../stores.js';
	import Page from './Page.svelte';

	import {pageWidth, pageHeight} from "./Page.svelte";

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

		let marginSizeX = ($config.pageMargins * 2) + ($config.printerMarginX * 2);
		let marginSizeY = ($config.pageMargins * 2) + ($config.printerMarginY * 2);
		
		if ($config.includePageBorder)
		{
			marginSizeX += 2;
			marginSizeY += 2;
		}

		let usableWidth = (pageWidth - marginSizeX);
		let usableHeight = (pageHeight - marginSizeY);

		let tagBlockSize = ($config.tagDimensions) * 1.2; // The size of a tag block, including the padding (padding is size/10 on each side)

		let tagsPerX = Math.floor(usableWidth / tagBlockSize);
		let tagsPerY = Math.floor(usableHeight / tagBlockSize);

		let tagsPerPage = tagsPerX * tagsPerY;

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

			tagsAdded += length;

			pageData.push(page);
		}

		// Update the preview info to have it show up in the print info panel
		$previewInfo.tagsPerX = tagsPerX;
		$previewInfo.tagsPerY = tagsPerY;
		$previewInfo.tagsPerPage = tagsPerPage;
		$previewInfo.pages = pageData.length;

		$previewInfo.tagSize = tagBlockSize;
		$previewInfo.contentWidth = usableWidth;
		$previewInfo.contentHeight = usableHeight;
	}

	config.subscribe(()=> {
		updatePages();
	});

</script>

<main id="preview">
	<section id="pages" bind:clientWidth={$previewWidth}>
		{#each pageData as page}
		<Page {...page}/>
		{/each}
	</section>
</main>

<style>
	@media screen {
		#preview {
			width: 60%;
			overflow-y: scroll;
			flex-grow: 2;
			height: 100vh;
			flex-shrink: 0;
			padding: 1em;
			display: block;
			box-sizing: border-box;
			position: relative;
		}
		
		#pages {
			max-width: 8.5in;
			margin: 0 auto;
		}
	}

	@media print {
		#preview {
			display: contents;
		}
		
		#pages {
			display: contents;
		}
	}
</style>