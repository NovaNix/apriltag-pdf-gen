<script>
	import { config } from '../stores.js';
	import LengthInput from './LengthInput.svelte';

	// Define standard paper sizes in mm
	const paperSizes = [
		{ name: 'US Letter', width: 215.9, height: 279.4 },
		{ name: 'A4', width: 210, height: 297 },
		{ name: 'US Legal', width: 215.9, height: 355.6 },
		{ name: 'A3', width: 297, height: 420 },
	];

	let selectedSizeName = '';

	// Update the dropdown selection if the dimensions match a preset
	$: {
		const match = paperSizes.find(
			(s) => s.width === $config.pageWidth && s.height === $config.pageHeight
		);
		selectedSizeName = match ? match.name : 'Custom';
	}

	function handleDropdownChange(e) {
		const size = paperSizes.find((s) => s.name === e.target.value);
		if (size) {
			$config.pageWidth = size.width;
			$config.pageHeight = size.height;
		}
	}
</script>

<fieldset class="page-selector">
	<legend>Paper Dimensions</legend>

	<div class="input-group">
		<label for="paper-preset">Preset:</label>
		<select id="paper-preset" value={selectedSizeName} on:change={handleDropdownChange}>
			{#each paperSizes as size}
				<option value={size.name}>{size.name}</option>
			{/each}
			<option value="Custom">Custom</option>
		</select>
	</div>

	<div class="custom-inputs">
		<LengthInput name="width" bind:value={$config.pageWidth} step={0.1} min={10}>
			Width (mm):
		</LengthInput>
		<LengthInput name="height" bind:value={$config.pageHeight} step={0.1} min={10}>
			Height (mm):
		</LengthInput>
	</div>
</fieldset>

<style>
	.page-selector {
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #aaa;
		border-radius: 4px;
		padding: 0.5em;
	}

	.input-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	select {
		padding: 2px 5px;
		border: 1.5px solid black;
		border-radius: 5px;
		background: white;
	}

	.custom-inputs {
		display: flex;
		gap: 10px;
	}
</style>