<script>
	import {config} from './stores.js';

	function printPage()
	{
		window.print();
	}
</script>

<aside id="generator-config">
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
	
	<label for="size-selector">Size (mm)</label>
	<!-- A text input next to a slider to pick the width of the tag -->
	<input type="number" id="size-selector" name="size" min="10" max="180" bind:value={$config.tagDimensions}>
	<input type="range" id="size-selector-slider" name="size" min="10" max="180" step="1" bind:value={$config.tagDimensions}>

	<div>
		<label for="margin-selector">Page Margin (mm)</label>
		<input type="number" id="margin-selector" name="margin" min="0" max="30" bind:value={$config.pageMargins}>
	</div>

	<div>
		<label for="tag-count-selector">Starting Index</label>
		<input type="number" id="tag-index-selector" name="tag-index-selector" min="0" bind:value={$config.startingIndex}>
	</div>

	<div>
		<label for="tag-count-selector">Tag Count</label>
		<input type="number" id="tag-count-selector" name="tag-count-selector" min="1" bind:value={$config.tagCount}>
	</div>

	<fieldset>
		<legend>Tag Labels</legend>
	
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

	<div>
		<label for="font-size-selector">Font Size (pt): </label>
		<input type="number" id="font-size-selector" name="font-size" min="1" max="30" bind:value={$config.fontSize}>
	</div>

	<button id="print-button" on:click={printPage}>Print</button>
</aside>

<style>
	#generator-config {
	    padding: 1em;

	    background-color: white;
	    border-color: gray;
	    border-style: solid;
	    border-width: 1px;

	    display: flex;
	    flex-direction: column;
	    align-items: flex-start;

	    flex-grow: 1;

	    width: min-content;
	    height: 100%;
	}
</style>