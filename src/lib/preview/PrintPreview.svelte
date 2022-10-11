<script>
	import {config, previewWidth} from '../stores.js';
	import Page from './Page.svelte';
	import PreviewInfo from './PreviewInfo.svelte';

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
		
		let usableWidth = (pageWidth - marginSizeX);
		let usableHeight = (pageHeight - marginSizeY);

		let tagBlockSize = ($config.tagDimensions) * 1.2; // The size of a tag block, including the padding (padding is size/10 on each side)

		let tagsPerX = Math.floor(usableWidth / tagBlockSize);
		let tagsPerY = Math.floor(usableHeight / tagBlockSize);

		console.log(`Tags per page: ${tagsPerX} x ${tagsPerY}`);

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
	<PreviewInfo/>
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
		}
	}

	@media print {
		#preview {
			display: contents;
		}
		
		#pages {
			/*width: 100%;
			height: 100%;*/
			display: contents;
		}
	}
</style>