<script>

	import {config} from './stores.js';
	import {tagData} from "./preview/Tag.svelte";

	// All of this is pulled from https://optitag.io/blogs/news/designing-your-perfect-apriltag

	let hFOV = 90;
	let hResolution = 1920;
	let pixelsPerBitDetection = 5; // The number of pixels to detect a bit

	$: hFOVRadians = hFOV * (Math.PI / 180); // The horizontal field of view in radians

	$: maxDetectionDistance = ($config.tagDimensions / 1000) / (2 * Math.tan((tagData[$config.tagType].bitwidth * hFOVRadians * pixelsPerBitDetection) / (2 * hResolution)));

</script>

<details>
	<summary>Info</summary>
	<div>
		<label for="hfov-input">Horizontal FOV (Degrees)</label>
		<input type="number" id="hfov-input" bind:value={hFOV} min="0" max="180" step="1">

		<label for="hres-input">Horizontal Resolution (Pixels)</label>
		<input type="number" id="hres-input" bind:value={hResolution} min="0" max="10000" step="1">

		<output>Maximum Detection Distance: {maxDetectionDistance}</output>
	</div>
</details>

<style>

</style>