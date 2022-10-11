<script>
	import {config} from '../stores.js';
	import {tagData} from "../preview/Tag.svelte";
	import InfoPanel from "../InfoPanel.svelte";

	import {pageWidth, pageHeight} from "../preview/Page.svelte";

	let maxTagSize = calculateMaxTagSize();

	function calculateMaxTagSize()
	{
		let marginSizeX = ($config.pageMargins * 2) + ($config.printerMarginX * 2);
		let marginSizeY = ($config.pageMargins * 2) + ($config.printerMarginY * 2);

		let usableWidth = (pageWidth - marginSizeX);
		let usableHeight = (pageHeight - marginSizeY);

		// Calculate the max width and height by accounting for tag margins
		let maxWidth = (usableWidth * 5) / 6;
		let maxHeight = (usableHeight * 5) / 6;

		return Math.min(maxWidth, maxHeight);
	}

	// Handle updating the config constraints to match other config settings
	config.subscribe((value) => {
		maxTagSize = calculateMaxTagSize();

		if (value.tagDimensions > maxTagSize)
		{
			$config.tagDimensions = maxTagSize;
		}

		if (value.startingIndex > (tagData[$config.tagType].count - 1))
		{
			$config.startingIndex = (tagData[$config.tagType].count - 1);
		}

		if (value.tagCount > (tagData[value.tagType].count - value.startingIndex))
		{
			$config.tagCount = (tagData[value.tagType].count - value.startingIndex);
		}

	});

	function printPage()
	{
		window.print();
	}

</script>

<section id="generator-config">
	<h1>Config</h1>

	<label for="type-selector">Type</label>
	<select name="type" id="type-selector" bind:value={$config.tagType}>
		<option value="tag16h5">tag16h5</option>
		<option value="tag25h9">tag25h9</option>
		<option value="tag36h11">tag36h11</option>
		<option value="tagCircle21h7">tagCircle21h7</option>
		<option value="tagCircle49h12">tagCircle49h12</option>
		<option value="tagCustom48h12">tagCustom48h12</option>
		<option value="tagStandard41h12" selected>tagStandard41h12</option>
		<option value="tagStandard52h13">tagStandard52h13</option>
	</select>

	<div>
		<input type="checkbox" id="debug-toggle" name="debug-toggle" bind:checked={$config.debug}>
  		<label for="debug-toggle">Debug Mode</label>
	</div>


	<details>
		<summary>Tag Stats</summary>
		<div>
			<p>Max tags: {tagData[$config.tagType].count}</p>
			<p>Dimensions: {tagData[$config.tagType].bitwidth}px x {tagData[$config.tagType].bitwidth}px</p>
		</div>
	</details>	  

	
	
	<label for="size-selector">Size (mm)</label>
	<!-- A text input next to a slider to pick the width of the tag -->
	<input type="number" id="size-selector" name="size" min="10" max={maxTagSize} step="0.1" bind:value={$config.tagDimensions}>
	<input type="range" id="size-selector-slider" name="size" min="10" max={maxTagSize} step="0.1" bind:value={$config.tagDimensions}>

	<div>
		<label for="tag-index-selector">Starting Index</label>
		<input type="number" id="tag-index-selector" name="tag-index-selector" min="0" max={tagData[$config.tagType].count - 1}  bind:value={$config.startingIndex}>
	</div>

	<div>
		<label for="tag-count-selector">Tag Count</label>
		<input type="number" id="tag-count-selector" name="tag-count-selector" min="1" max={tagData[$config.tagType].count - $config.startingIndex} bind:value={$config.tagCount}>
	</div>

	<div>
		<label for="margin-selector">Page Margin (mm)</label>
		<input type="number" id="margin-selector" name="margin" min="0" max="30" bind:value={$config.pageMargins}>
	</div>

	<fieldset>
		<legend>Printer Margin (mm)</legend>
		
		<div>
			<label for="printer-margin-selector">x:</label>
			<input type="number" id="printer-margin-selector" name="printer-margin" min="0" step="1" bind:value={$config.printerMarginX}>mm
		</div>
		<div>
			<label for="printer-margin-selector">y:</label>
			<input type="number" id="printer-margin-selector" name="printer-margin" min="0" step="1" bind:value={$config.printerMarginY}>mm
		</div>
	</fieldset>

	<fieldset disabled={!$config.dataToggles.enabled}>
		<legend>
			<input type="checkbox" id="labels-toggle" name="lables-toggle" bind:checked={$config.dataToggles.enabled}>
			<label for="index-toggle">Tag Labels</label>
		</legend>
	
		<div>
		  <input type="checkbox" id="type-toggle" name="type" bind:checked={$config.dataToggles.type}>
		  <label for="type-toggle">Type</label>
		</div>
	
		<div>
			<input type="checkbox" id="index-toggle" name="index" bind:checked={$config.dataToggles.number}>
			<label for="index-toggle">Index</label>
		</div>

		<div>
			<input type="checkbox" id="dimensions-toggle" name="dimensions" bind:checked={$config.dataToggles.dimensions}>
			<label for="dimensions-toggle">Dimensions</label>
		</div>
	</fieldset>

	<button id="print-button" on:click={printPage}>Print</button>

	<InfoPanel/>

</section>

<style>
	#generator-config {
	    padding: 1em;

	    

	    display: flex;
	    flex-direction: column;
	    align-items: flex-start;

	    width: 100%;

		overflow-y: auto;
	}
</style>