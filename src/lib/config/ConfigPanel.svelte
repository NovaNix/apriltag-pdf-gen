<script>
	import {config} from '../stores.js';
	import {tagData} from "../preview/Tag.svelte";
	import TypeSelector from "./TypeSelector.svelte";
	import TagRangeSelector from './TagRangeSelector.svelte';

	import {pageWidth, pageHeight} from "../preview/Page.svelte";
    import SliderNumberInput from './SliderNumberInput.svelte';

	let maxTagSize = calculateMaxTagSize();

	function calculateMaxTagSize()
	{
		let marginSizeX = ($config.pageMargins * 2) + ($config.printerMarginX * 2);
		let marginSizeY = ($config.pageMargins * 2) + ($config.printerMarginY * 2);

		if ($config.includePageBorder)
		{
			marginSizeX += 2;
			marginSizeY += 2;
		}

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

<details id="generator-config" open>
	<summary>Config</summary>

	<TypeSelector/>

	<div>
		<input type="checkbox" id="debug-toggle" name="debug-toggle" bind:checked={$config.debug}>
  		<label for="debug-toggle">Debug Mode</label>
	</div>

	<SliderNumberInput name="size" min="10" max={maxTagSize} step="0.1" bind:value={$config.tagDimensions}>Size (mm)</SliderNumberInput>
	<TagRangeSelector/>

	<div>
		<label for="margin-selector">Page Margin (mm)</label>
		<input type="number" id="margin-selector" name="margin" min="0" max="30" bind:value={$config.pageMargins}>
	</div>

	<legend>
		<input type="checkbox" id="page-border-toggle" name="page-border-toggle" bind:checked={$config.includePageBorder}>
		<label for="page-border-toggle">Page Border</label>
	</legend>

	<fieldset>
		<legend>Printer Margin (mm)</legend>
		
		<div>
			<label for="printer-margin-selector">x:</label>
			<input type="number" id="printer-margin-selector" name="printer-margin" min="0" step="1" bind:value={$config.printerMarginX}> mm
		</div>
		<div>
			<label for="printer-margin-selector">y:</label>
			<input type="number" id="printer-margin-selector" name="printer-margin" min="0" step="1" bind:value={$config.printerMarginY}> mm
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

		<div>
			<input type="checkbox" id="custom-label-toggle" name="custom-label" bind:checked={$config.dataToggles.custom}>
			<label for="custom-label-toggle">Custom</label>
		</div>
	</fieldset>

	{#if $config.dataToggles.custom}
	<div>
		<label for="custom-label-input">Custom Label Text: </label>
		<input type="text" id="custom-label-input" name="custom-label-input" bind:value={$config.customTagLabel}>
	</div>
	{/if}
	
	<div>
		<input type="checkbox" id="color-strip-toggle" name="color-strip-toggle" bind:checked={$config.colorStripEnabled}>
		<label for="color-strip-toggle">Color Strip</label>
	</div>

	{#if $config.colorStripEnabled}
		<div>
			<label for="color-strip-color-input">Color Strip Color: </label>
			<input type="color" id="color-strip-color-input" name="color-strip-color-input" bind:value={$config.colorStripColor}>
		</div>
	{/if}

	<button id="print-button" on:click={printPage}>Print</button>

</details>

<style>

	#generator-config {
	    padding: 1em;

		box-sizing: border-box;
	    width: 100%;

		overflow-y: auto;
	}

	input[type="number"] {
		width: 4em;
	}

	details {
	    border: 1px solid #aaa;
	    border-radius: 4px;
	    padding: .5em .5em 0;
	}

	summary {
	    font-weight: bold;
	    margin: -.5em -.5em 0;
	    padding: .5em;
	}

	details[open] {
	    padding: .5em;
	}

	details[open] summary {
	    border-bottom: 1px solid #aaa;
    	margin-bottom: .5em;
	}
</style>