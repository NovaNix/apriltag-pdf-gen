<script>
	import {config, resetConfig} from '../stores.js';
	import {tagData} from "../preview/Tag.svelte";
	import TypeSelector from "./TypeSelector.svelte";
	import TagRangeSelector from './TagRangeSelector.svelte';
	import Toggle from './Toggle.svelte';

	import {pageWidth, pageHeight} from "../preview/Page.svelte";
    import SliderNumberInput from './SliderNumberInput.svelte';
    import LengthInput from './LengthInput.svelte';

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
			$config.tagDimensions = Math.min(+maxTagSize.toFixed(2), maxTagSize); // Fix issues with an infinite loop created by toFixed rounding errors
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

	// Asks the user if they want to reset the config, and resets it if they confirm
	function reset()
	{
		if (confirm("Do you really want to reset the configuration?")) 
		{
  			resetConfig();
		}
	}

</script>

<details id="generator-config" open>
	<summary>
		Config
		<button id="reset-button" on:click={reset}>Reset</button>
	</summary>

	<div>
		<TypeSelector/>

		<Toggle name="debug-toggle" bind:checked={$config.debug}>Debug Mode</Toggle>

		<SliderNumberInput name="size" min="10" max={maxTagSize} step="0.01" bind:value={$config.tagDimensions}>Size (mm)</SliderNumberInput>
		<TagRangeSelector/>

		<LengthInput name="margin-selector" step="1" max=30 bind:value={$config.pageMargins}>Page Margin:</LengthInput>

		<fieldset>
			<legend>Printer Margin</legend>

			<LengthInput name="printer-margin-x-selector" step="1" max=20 bind:value={$config.printerMarginX}>x:</LengthInput>
			<LengthInput name="printer-margin-y-selector" step="1" max=20 bind:value={$config.printerMarginY}>y:</LengthInput>
		</fieldset>

		<fieldset disabled={!$config.dataToggles.enabled}>
			<legend>
				<Toggle name="labels-toggle" bind:checked={$config.dataToggles.enabled}>Tag Labels</Toggle>
			</legend>

			<Toggle name="type-label-toggle" bind:checked={$config.dataToggles.type}>Type</Toggle>
			<Toggle name="index-label-toggle" bind:checked={$config.dataToggles.number}>Index</Toggle>
			<Toggle name="dimensions-label-toggle" bind:checked={$config.dataToggles.dimensions}>Dimensions</Toggle>

			<Toggle name="custom-label-toggle" bind:checked={$config.dataToggles.custom}>Custom
				{#if $config.dataToggles.custom}
					<input type="text" id="custom-label-input" name="custom-label-input" bind:value={$config.customTagLabel}>
				{/if}
			</Toggle>
		</fieldset>

		<Toggle name="color-strip-toggle" bind:checked={$config.colorStripEnabled}>Color Strip
			{#if $config.colorStripEnabled}
				<input type="color" id="color-strip-color-input" name="color-strip-color-input" bind:value={$config.colorStripColor}>
			{/if}
		</Toggle>

		<Toggle name="page-border-toggle" bind:checked={$config.includePageBorder}>Page Border</Toggle>

		<button id="print-button" on:click={printPage}><span class="material-icons md-18">print</span><span id="print-text">Print</span></button>
			
			
	</div>
	

</details>

<style>

	#generator-config {
		box-sizing: border-box;
	    width: 100%;

		overflow-y: auto;
	}

	#generator-config div {
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		gap: 5px 0px;
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
		position: relative;
	}

	details[open] {
	    padding: .5em;
	}

	details[open] summary {
	    border-bottom: 1px solid #aaa;
    	margin-bottom: .5em;
	}

	button {
		border: 1.5px solid black;
		padding: 2px 5px;
		border-radius: 5px;
		
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	#print-button {
		background-color: lightgreen;
	}

	#print-text {
		margin-left: 5px;
		font-weight: bold;
		font-size: 0.8em; 
		line-height: 0.8em;
	}

	#reset-button {
		/* background-color: salmon; */
		position: absolute;
		right: 0.5em;
		top: 50%;
		transform: translate(0%, -50%);

		display: none;
	}

	summary:hover #reset-button {
		display: block;
	}

	input[type=color] {
		height: 1em;
		box-sizing: border-box;
		display: inline-block;
		padding: 0;
		border: 0;
		margin: 0;
	}

	
</style>